import './globals.css';
import SiteRuntime from '@/components/site/SiteRuntime';

export const metadata = {
  metadataBase: new URL('https://inovexiasoftware.com'),
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Cpath d='M16 2 29 9.5v13L16 30 3 22.5v-13z' fill='%236d5efc'/%3E%3Cpath d='M16 9v14M11 11.5v9M21 11.5v9' stroke='%23fff' stroke-width='2.4' stroke-linecap='round'/%3E%3C/svg%3E",
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#f5f6fb',
};

/* Theme is resolved before paint so there is no flash. Light by default
   (the OS setting is deliberately not consulted, as in the design); the
   header toggle stores an explicit choice under the same key main.js uses. */
const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem('inovexia-theme')==='dark'?'dark':'light';document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`;

/* Netlify injects an HTML comment (plus a newline) into <head> after the
   page is rendered. React can't match it during hydration (error #418), so
   it re-renders the whole document and every listener main.js attached is
   lost — the app tabs stop responding. React renders no comments or bare
   text into <head>, so dropping them before hydration is safe. */
const HEAD_CLEAN_SCRIPT = `(function(){var h=document.head,n=h.firstChild,x;while(n){x=n.nextSibling;if(n.nodeType===8||(n.nodeType===3&&!n.nodeValue.trim()))h.removeChild(n);n=x;}})();`;

export default function RootLayout({ children }) {
  return (
    // data-theme and body's page class are set by inline scripts before
    // hydration, so React is told not to compare those two elements.
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: HEAD_CLEAN_SCRIPT }} />
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Inter:wght@400;450;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        {children}
        <SiteRuntime />
      </body>
    </html>
  );
}
