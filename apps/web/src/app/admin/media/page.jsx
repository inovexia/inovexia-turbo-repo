'use client';

import { PageHeader } from '../_ui';
import MediaLibrary from '../_ui/MediaLibrary';

export default function MediaPage() {
  return (
    <>
      <PageHeader title="Media" description="Images you can use anywhere on the site. Click one to edit its description." />
      <MediaLibrary />
    </>
  );
}
