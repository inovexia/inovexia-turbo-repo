import AdminApp from './_ui/AdminApp';

export const metadata = {
  title: { default: 'Admin — Inovexia Software', template: '%s · Inovexia admin' },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }) {
  return <AdminApp>{children}</AdminApp>;
}
