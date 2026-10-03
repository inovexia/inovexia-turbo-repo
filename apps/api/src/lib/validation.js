import { z } from 'zod';

/* The same rules, and the same messages, as the browser-side validators in
   the web app — the server must not trust the browser, but a visitor should
   never see two different explanations for one mistake. */

const EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
const trimmed = (max) => z.string().trim().max(max);

const name = trimmed(120).refine((v) => v.length > 1, 'Please tell us your name.');
const email = trimmed(190).refine((v) => EMAIL.test(v), 'Please enter a valid email address.');
const service = trimmed(120).refine((v) => v !== '', 'Please choose a service.');

export const contactSchema = z.object({
  type: z.literal('contact'),
  name,
  email,
  phone: trimmed(40).refine(
    (v) => v.replace(/\D/g, '').length >= 8,
    'Please enter a number we can reach you on.',
  ),
  service,
  message: trimmed(5000).refine(
    (v) => v.length > 9,
    'A sentence or two about the project helps us reply usefully.',
  ),
  pageUrl: trimmed(255).optional(),
});

export const quoteSchema = z.object({
  type: z.literal('quote'),
  name,
  email,
  mobile: trimmed(40)
    .optional()
    .default('')
    .refine(
      (v) => v === '' || (v.replace(/\D/g, '').length >= 8 && /^[+\d\s()-]+$/.test(v)),
      'Please enter a valid mobile number.',
    ),
  company: trimmed(160).optional().default(''),
  service: trimmed(120).refine((v) => v !== '', 'Please choose what we can help you with.'),
  details: trimmed(5000).refine(
    (v) => v.length > 9,
    'A sentence or two about what you need helps us reply usefully.',
  ),
  website: z.string().optional().default(''), // honeypot
  pageUrl: trimmed(255).optional(),
});

/* Discuss Your Project — the multi-step brief. Choice lists mirror
   apps/web/src/app/discuss-your-project/options.js. */
export const PROJECT_STAGES = ['Idea', 'Planning', 'Design', 'Ready for Development', 'Existing Product', 'Improvement / Enhancement'];
export const TIMELINES = ['As Soon As Possible', 'Within 1 Month', '1–3 Months', '3–6 Months', 'Not Sure Yet'];
const optionalChoice = (list) => z.string().optional().default('').refine((v) => v === '' || list.includes(v), 'Please pick one of the options.');

export const projectSchema = z.object({
  type: z.literal('project'),
  name,
  email,
  phone: trimmed(40)
    .optional()
    .default('')
    .refine(
      (v) => v === '' || (v.replace(/\D/g, '').length >= 8 && /^[+\d\s()-]+$/.test(v)),
      'Please enter a valid phone number.',
    ),
  company: trimmed(160).optional().default(''),
  role: trimmed(120).optional().default(''),
  service: trimmed(120).refine((v) => v !== '', 'Please choose what we can help you with.'),
  overview: trimmed(5000).refine(
    (v) => v.length > 9,
    'A sentence or two about the project helps us prepare — what are you building or improving?',
  ),
  goals: trimmed(5000).optional().default(''),
  websiteUrl: trimmed(255)
    .optional()
    .default('')
    .refine(
      (v) => v === '' || /^(https?:\/\/)?[\w-]+(\.[\w-]+)+([/?#]\S*)?$/i.test(v),
      'Please enter a web address like example.com.',
    ),
  projectStage: optionalChoice(PROJECT_STAGES),
  timeline: optionalChoice(TIMELINES),
  website: z.string().optional().default(''), // honeypot
  pageUrl: trimmed(255).optional(),
});

export const enquirySchema = z.discriminatedUnion('type', [contactSchema, quoteSchema, projectSchema]);

export const CV_MAX_BYTES = 5 * 1024 * 1024;
export const CV_NAME_OK = /\.(pdf|docx?)$/i;

export const applicationSchema = z.object({ name, email });

export const statusSchema = z.object({
  status: z.enum(['NEW', 'IN_PROGRESS', 'CLOSED']),
});
