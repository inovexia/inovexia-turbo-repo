#!/usr/bin/env node
/* Create (or reset the password of) an admin account.

   pnpm admin:create                       asks for email, name and password
   pnpm admin:create -- --email a@b.com --name "A B" --password "…"
   pnpm admin:create -- --sql              prints SQL to run in phpMyAdmin
                                           instead of connecting (for a
                                           database that only accepts local
                                           connections)

   Re-running it for an existing email resets that admin's password and
   signs them out everywhere. */
import { stdin, stdout } from 'node:process';
import readline from 'node:readline';
import { prisma } from '@inovexia/database';
import { hashPassword, MIN_PASSWORD_LENGTH } from '@inovexia/database/password';

function arg(name) {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? process.argv[i + 1] : undefined;
}

function ask(question, { hidden = false } = {}) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: stdin, output: stdout, terminal: true });
    if (hidden) {
      // echo nothing while the password is typed
      rl._writeToOutput = (s) => { if (s.includes(question)) stdout.write(s); };
    }
    rl.question(question, (answer) => {
      rl.close();
      if (hidden) stdout.write('\n');
      resolve(answer.trim());
    });
  });
}

const email = (arg('email') || (await ask('Admin email: '))).toLowerCase();
if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(email)) {
  console.error('That is not a valid email address.');
  process.exit(1);
}
const sqlOnly = process.argv.includes('--sql');
const existing = sqlOnly ? null : await prisma.user.findUnique({ where: { email } });
const name = arg('name') || existing?.name || (await ask('Name: ')) || email.split('@')[0];

let password = arg('password');
if (!password) {
  password = await ask(`Password (min ${MIN_PASSWORD_LENGTH} characters): `, { hidden: true });
  const again = await ask('Repeat password: ', { hidden: true });
  if (password !== again) {
    console.error('The passwords do not match.');
    process.exit(1);
  }
}
if (password.length < MIN_PASSWORD_LENGTH) {
  console.error(`Use at least ${MIN_PASSWORD_LENGTH} characters.`);
  process.exit(1);
}

const passwordHash = await hashPassword(password);
if (sqlOnly) {
  // Same effect as below: create the admin, or reset the password (and end
  // the sessions) of an existing one.
  const q = (s) => `'${String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
  console.log(`
-- Run in phpMyAdmin → database → SQL
INSERT INTO \`users\` (\`email\`, \`name\`, \`passwordHash\`, \`updatedAt\`)
VALUES (${q(email)}, ${q(name)}, ${q(passwordHash)}, NOW(3))
ON DUPLICATE KEY UPDATE \`passwordHash\` = VALUES(\`passwordHash\`), \`updatedAt\` = NOW(3);
DELETE s FROM \`sessions\` s JOIN \`users\` u ON u.\`id\` = s.\`userId\` WHERE u.\`email\` = ${q(email)};
`);
} else if (existing) {
  await prisma.user.update({ where: { id: existing.id }, data: { passwordHash } });
  await prisma.session.deleteMany({ where: { userId: existing.id } });
  console.log(`Password reset for ${email}.`);
} else {
  await prisma.user.create({ data: { email, name, passwordHash } });
  console.log(`Admin ${email} created. Sign in at ${process.env.SITE_URL || 'http://localhost:3000'}/admin`);
}
await prisma.$disconnect();
