/* Each design page styles off a class on <body> (page-home, page-about…).
   The root layout owns <body>, so the page sets it with an inline script
   that runs as the HTML is parsed — before first paint, so there is no flash
   of the wrong spacing. `scripts` names the page's own scripts (the inline
   <script>s of the design page), which SiteRuntime runs after hydration. */
export default function BodyClass({ name, scripts }) {
  const js = `document.body.className=${JSON.stringify(name)};`
    + (scripts ? `document.body.dataset.scripts=${JSON.stringify(scripts)};` : 'delete document.body.dataset.scripts;');
  return <script dangerouslySetInnerHTML={{ __html: js }} />;
}
