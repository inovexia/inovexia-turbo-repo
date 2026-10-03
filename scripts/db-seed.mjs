#!/usr/bin/env node
/* Fill the content tables with the design's own blogs, services, products
   and case studies (packages/content seed, generated from the design).

   pnpm db:seed           only fills collections that are still empty —
                          never touches anything an editor has changed
   pnpm db:seed -- --reset  deletes ALL entries first and reloads the design
                          (asks for confirmation)
   pnpm db:seed -- --add-missing-pages
                          gives entries that have no page of their own the
                          seed's page (e.g. the starter service pages);
                          entries that already have a page are not touched */
import readline from 'node:readline';
import { prisma } from '@inovexia/database';
import { seedEntries } from '@inovexia/content/seed';

const reset = process.argv.includes('--reset');

if (reset) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const answer = await new Promise((r) => rl.question('This deletes every blog, service, product and case study and reloads the design\'s. Type "reset" to continue: ', r));
  rl.close();
  if (answer.trim() !== 'reset') {
    console.log('Nothing changed.');
    process.exit(0);
  }
  await prisma.entry.deleteMany({});
}

if (process.argv.includes('--add-missing-pages')) {
  for (const s of seedEntries.filter((e) => e.template && e.page)) {
    const row = await prisma.entry.findUnique({ where: { type_slug: { type: s.type, slug: s.slug } } });
    if (!row || row.template) continue;
    await prisma.entry.update({ where: { id: row.id }, data: { template: s.template, page: s.page, seo: s.seo ?? undefined } });
    console.log(`${s.type} "${row.title}": page added (${s.template})`);
  }
  await prisma.$disconnect();
  process.exit(0);
}

for (const type of [...new Set(seedEntries.map((e) => e.type))]) {
  const existing = await prisma.entry.count({ where: { type } });
  if (existing) {
    console.log(`${type}: ${existing} already in the database — left as is`);
    continue;
  }
  const items = seedEntries.filter((e) => e.type === type);
  for (const e of items) {
    await prisma.entry.create({
      data: {
        type: e.type, slug: e.slug, title: e.title, template: e.template, published: e.published, sort: e.sort,
        fields: e.fields, page: e.page ?? undefined, section: e.section ?? undefined, seo: e.seo ?? undefined,
      },
    });
  }
  console.log(`${type}: added ${items.length}`);
}
await prisma.$disconnect();
