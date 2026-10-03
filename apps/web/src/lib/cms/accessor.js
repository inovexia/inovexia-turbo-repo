/* The `c` object every page/template reads its content through.

     c.t(key)  text           c.h(key)  inline HTML (rich text, icons)
     c.a(key)  attribute      c.l(key)  list → an accessor per item

   `data` is the content with defaults already merged in. `{slug}` in a
   value is replaced by the entry's slug (service CTAs link to
   /discuss-your-project?service={slug}). */
export function accessor(data, ctx = {}) {
  const src = data || {};
  const fill = (v) => {
    const s = v == null ? '' : String(v);
    return ctx.slug ? s.replaceAll('{slug}', ctx.slug) : s;
  };
  return {
    data: src,
    t: (k) => fill(src[k]),
    h: (k) => fill(src[k]),
    // An empty src/href would make React warn (and the browser re-request
    // the page); alt="" stays, it means "decorative".
    a: (k) => {
      const v = fill(src[k]);
      return v === '' && !/alt$/i.test(k) ? undefined : v;
    },
    l: (k) => (Array.isArray(src[k]) ? src[k] : []).map((item) => accessor(item, ctx)),
  };
}
