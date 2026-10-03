'use client';

/* Discuss Your Project — a three-step brief.
   Built on the design's own form kit (.form, .field, .form__row, .btn) so it
   reads as part of the site; the stepper and confirmation are
   styled in src/styles/discuss.css. Each step validates before moving on,
   with the same rules and messages the API applies. */
import { useEffect, useRef, useState } from 'react';
import { submitForm } from '@/lib/runtime/api';
import { PROJECT_STAGES, SERVICES, TIMELINES, serviceFromParam } from './options';

const EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
const URL_LIKE = /^(https?:\/\/)?[\w-]+(\.[\w-]+)+([/?#]\S*)?$/i;

const STEPS = [
  {
    short: 'About you',
    heading: 'Tell us about you',
    text: 'Let’s start with a few details, so we know who we’re speaking with.',
    fields: ['name', 'email', 'phone', 'company', 'role'],
  },
  {
    short: 'Your project',
    heading: 'Tell us about your project',
    text: 'Share a few details about what you’re looking to build or improve.',
    fields: ['service', 'overview', 'goals', 'websiteUrl'],
  },
  {
    short: 'Project details',
    heading: 'Project Details',
    text: 'A little more context will help us understand your needs.',
    fields: ['projectStage', 'timeline'],
  },
];

const RULES = {
  name: (v) => (v.length > 1 ? '' : 'Please tell us your name.'),
  email: (v) => (EMAIL.test(v) ? '' : 'Please enter a valid email address.'),
  phone: (v) => (v === '' || (v.replace(/\D/g, '').length >= 8 && /^[+\d\s()-]+$/.test(v)) ? '' : 'Please enter a valid phone number.'),
  service: (v) => (v ? '' : 'Please choose what we can help you with.'),
  overview: (v) => (v.length > 9 ? '' : 'A sentence or two about the project helps us prepare — what are you building or improving?'),
  websiteUrl: (v) => (v === '' || URL_LIKE.test(v) ? '' : 'Please enter a web address like example.com.'),
};

const EMPTY = {
  name: '', email: '', phone: '', company: '', role: '',
  service: '', overview: '', goals: '', websiteUrl: '',
  projectStage: '', timeline: '',
};

const Arrow = () => (
  <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
    <path d="M4 10h11M11 5.5 15.5 10 11 14.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function Field({ id, label, required, optional, error, select, children }) {
  return (
    <div className={`field${select ? ' field--sel' : ''}`}>
      <label htmlFor={id}>
        {label}
        {required && <span className="req" aria-hidden="true">*</span>}
        {optional && <> <span className="opt">(optional)</span></>}
      </label>
      {children}
      <p className="field__err" id={`${id}Err`} role="alert">{error}</p>
    </div>
  );
}

export default function DiscussForm() {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [data, setData] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [serverError, setServerError] = useState('');
  const [done, setDone] = useState(null);
  const [trap, setTrap] = useState('');
  const rootRef = useRef(null);
  const headRef = useRef(null);
  const doneRef = useRef(null);
  const moved = useRef(false);

  // The service page that sent the visitor picks the service: ?service=web-design
  useEffect(() => {
    const preset = serviceFromParam(new URLSearchParams(window.location.search).get('service'));
    if (preset) setData((d) => (d.service ? d : { ...d, service: preset }));
  }, []);

  // On every step change (not the first render): bring the card into view and
  // move focus to the new heading, so keyboard and screen-reader users follow.
  useEffect(() => {
    if (!moved.current) { moved.current = true; return; }
    const top = rootRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 90) window.scrollBy({ top: top - 110, behavior: 'smooth' });
    headRef.current?.focus({ preventScroll: true });
  }, [step]);

  useEffect(() => { if (done) doneRef.current?.focus({ preventScroll: true }); }, [done]);

  const set = (key) => (e) => {
    const { value } = e.target;
    setData((d) => ({ ...d, [key]: value }));
    if (errors[key]) setErrors((x) => ({ ...x, [key]: '' }));
    setServerError('');
  };

  function check(fields) {
    const found = {};
    for (const f of fields) {
      const msg = RULES[f]?.(data[f].trim());
      if (msg) found[f] = msg;
    }
    setErrors((x) => ({ ...x, ...Object.fromEntries(fields.map((f) => [f, found[f] || ''])) }));
    const first = fields.find((f) => found[f]);
    if (first) document.getElementById(`dsp-${first}`)?.focus();
    return !first;
  }

  function go(next) {
    setDir(next > step ? 1 : -1);
    setStep(next);
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (sending) return;
    if (!check(STEPS[step].fields)) return;
    if (step < STEPS.length - 1) { go(step + 1); return; }

    setSending(true);
    const res = await submitForm('/api/enquiries', { type: 'project', ...data, website: trap });
    setSending(false);
    if (res.ok) {
      setDone({ ...data, ref: res.id ? `INV-${String(res.id).padStart(5, '0')}` : '' });
      return;
    }
    setServerError(res.error);
    const fieldErrors = res.fields || {};
    if (Object.keys(fieldErrors).length) {
      setErrors((x) => ({ ...x, ...fieldErrors }));
      // take the visitor to the first step with a problem
      const target = STEPS.findIndex((s) => s.fields.some((f) => fieldErrors[f]));
      if (target >= 0 && target !== step) go(target);
    }
  }

  if (done) return <Done ref={doneRef} brief={done} />;

  const s = STEPS[step];
  const last = step === STEPS.length - 1;
  const input = (key, props = {}) => ({
    id: `dsp-${key}`,
    name: key,
    value: data[key],
    onChange: set(key),
    'aria-invalid': errors[key] ? 'true' : undefined,
    'aria-describedby': `dsp-${key}Err`,
    ...props,
  });

  return (
    <form ref={rootRef} className="form form--hero dsp" noValidate onSubmit={onSubmit} aria-labelledby="dspHeading">
      <ol className="dsp__steps" aria-label={`Step ${step + 1} of ${STEPS.length}`}>
        {STEPS.map((x, i) => (
          <li key={x.short} className={`dsp__step${i < step ? ' is-done' : ''}${i === step ? ' is-current' : ''}`} aria-current={i === step ? 'step' : undefined}>
            <span className="dsp__num" aria-hidden="true">
              {i < step ? (
                <svg viewBox="0 0 20 20" width="14" height="14"><path d="m5 10.5 3.2 3.2L15 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              ) : `0${i + 1}`}
            </span>
            <span className="dsp__lbl">{x.short}</span>
          </li>
        ))}
      </ol>
      <div className="dsp__bar" aria-hidden="true"><i style={{ '--p': (step + 1) / STEPS.length }} /></div>

      <div key={step} className={`dsp__panel${dir < 0 ? ' is-back' : ''}`}>
        <div className="form__head">
          <span className="eyebrow">Step {step + 1} of {STEPS.length} · {s.short}</span>
          <h2 id="dspHeading" ref={headRef} tabIndex={-1}>{s.heading}</h2>
          <p>{s.text}</p>
        </div>

        {step === 0 && (
          <>
            <div className="form__row">
              <Field id="dsp-name" label="Name" required error={errors.name}>
                <input {...input('name', { type: 'text', autoComplete: 'name', placeholder: 'Your full name', required: true })} />
              </Field>
              <Field id="dsp-email" label="Email" required error={errors.email}>
                <input {...input('email', { type: 'email', autoComplete: 'email', placeholder: 'you@company.com', required: true })} />
              </Field>
            </div>
            <div className="form__row">
              <Field id="dsp-phone" label="Phone Number" optional error={errors.phone}>
                <input {...input('phone', { type: 'tel', inputMode: 'tel', autoComplete: 'tel', placeholder: '+91 00000 00000' })} />
              </Field>
              <Field id="dsp-company" label="Company Name" optional>
                <input {...input('company', { type: 'text', autoComplete: 'organization', placeholder: 'Your company' })} />
              </Field>
            </div>
            <Field id="dsp-role" label="Role" optional>
              <input {...input('role', { type: 'text', autoComplete: 'organization-title', placeholder: 'e.g. Founder, Marketing Manager, CTO' })} />
            </Field>
          </>
        )}

        {step === 1 && (
          <>
            <Field id="dsp-service" label="What can we help you with?" required select error={errors.service}>
              <select {...input('service', { required: true })}>
                <option value="">Choose a service</option>
                {SERVICES.map((x) => <option key={x}>{x}</option>)}
              </select>
            </Field>
            <Field id="dsp-overview" label="Project Overview" required error={errors.overview}>
              <textarea {...input('overview', { required: true, placeholder: 'What are you looking to build or improve? Who is it for?' })} />
            </Field>
            <Field id="dsp-goals" label="Goals & Objectives" optional>
              <textarea className="dsp__short" {...input('goals', { placeholder: 'What should this project achieve? e.g. more enquiries, faster checkout, less manual work.' })} />
            </Field>
            <Field id="dsp-websiteUrl" label="Website URL" optional error={errors.websiteUrl}>
              <input {...input('websiteUrl', { type: 'url', inputMode: 'url', autoComplete: 'url', placeholder: 'yourcompany.com' })} />
            </Field>
          </>
        )}

        {step === 2 && (
          <div className="form__row">
            <Field id="dsp-projectStage" label="Project Stage" optional select error={errors.projectStage}>
              <select {...input('projectStage')}>
                <option value="">Select a stage</option>
                {PROJECT_STAGES.map((x) => <option key={x}>{x}</option>)}
              </select>
            </Field>
            <Field id="dsp-timeline" label="Timeline" optional select error={errors.timeline}>
              <select {...input('timeline')}>
                <option value="">Select a timeline</option>
                {TIMELINES.map((x) => <option key={x}>{x}</option>)}
              </select>
            </Field>
          </div>
        )}
      </div>

      {/* Honeypot: people never see or fill it; bots that do are dropped by the API. */}
      <div className="gcap__trap" aria-hidden="true">
        <label htmlFor="dsp-website">Leave this empty</label>
        <input id="dsp-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} />
      </div>

      <div className="dsp__foot">
        {step > 0 && (
          <button type="button" className="btn btn--ghost dsp__back" onClick={() => go(step - 1)} disabled={sending}>
            <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
              <path d="M16 10H5M9 5.5 4.5 10 9 14.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Back</span>
          </button>
        )}
        <button type="submit" className="btn btn--primary" disabled={sending} aria-busy={sending}>
          <span>{last ? (sending ? 'Sending your brief…' : 'Let’s Discuss Your Project') : 'Continue'}</span>
          <Arrow />
        </button>
      </div>
      {serverError && <p className="form__msg is-error" role="alert">{serverError}</p>}
      {last && !serverError && <p className="dsp__note">We reply within one business day. Your details stay confidential.</p>}
    </form>
  );
}

/* Confirmation. Not a one-line "thank you": it confirms what was sent and to
   where, gives a reference, and sets expectations for what happens next. */
function Done({ ref, brief }) {
  const first = brief.name.trim().split(/\s+/)[0];
  const urgent = brief.timeline === 'As Soon As Possible';
  const summary = [
    ['Service', brief.service],
    ['Stage', brief.projectStage],
    ['Timeline', brief.timeline],
  ].filter(([, v]) => v);

  return (
    <div ref={ref} className="form form--hero dsp dsp-done" role="status" aria-live="polite" tabIndex={-1}>
      <span className="dsp-done__badge" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="26" height="26"><path d="m5.5 12.5 4.2 4.2L18.5 8" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </span>
      <span className="eyebrow">Brief received{brief.ref && <> · Ref {brief.ref}</>}</span>
      <h2>Thank you, {first}. Your project is in good hands.</h2>
      <p className="dsp-done__lead">
        We’ve received your <b>{brief.service}</b> brief{brief.company && <> for <b>{brief.company}</b></>}. A project specialist —
        not an automated reply — will review it and write to <b>{brief.email}</b> within one business day.
        {urgent && ' You marked this as urgent, so it goes to the top of the queue.'}
      </p>

      {summary.length > 0 && (
        <dl className="dsp-done__sum">
          {summary.map(([k, v]) => (
            <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
          ))}
        </dl>
      )}

      <p className="dsp-done__label">What happens next</p>
      <ol className="dsp-done__next">
        <li>
          <b>We review your brief</b>
          <span>Your goals, where the project stands and your timeline — so our first reply is specific to you, not a template.</span>
        </li>
        <li>
          <b>We reply with a recommendation</b>
          <span>A suggested approach, a rough timeline and an honest budget range, plus any questions we have.</span>
        </li>
        <li>
          <b>A short discovery call</b>
          <span>If it looks like a fit, we agree scope and next steps together. No obligation.</span>
        </li>
      </ol>

      <p className="dsp-done__soon">
        Need to talk sooner? Call <a href="tel:+919511118896">+91 95111 18896</a> or{' '}
        <a href="https://wa.me/919850748596" target="_blank" rel="noopener">message us on WhatsApp</a>
        {brief.ref && <> and mention <b>{brief.ref}</b></>}.
      </p>

      <div className="dsp-done__actions">
        <a href="/case-studies" className="btn btn--primary"><span>See Our Case Studies</span><Arrow /></a>{' '}
        <a href="/" className="btn btn--ghost">Back to Home</a>
      </div>
    </div>
  );
}
