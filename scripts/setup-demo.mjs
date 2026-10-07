import { DatabaseSync } from 'node:sqlite';
import { readFileSync, existsSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';
import { spawnSync } from 'node:child_process';
import { randomBytes } from 'node:crypto';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
if (!existsSync(resolve(root, '.env'))) {
  const example = readFileSync(resolve(root, '.env.example'), 'utf8');
  writeFileSync(resolve(root, '.env'), example.replace('replace-with-your-local-secret', randomBytes(32).toString('hex')));
}
const db = new DatabaseSync(resolve(root, 'prisma/fanverse.db'));
try {
  db.exec(readFileSync(resolve(root, 'scripts/demo-schema.sql'), 'utf8').replace(/^\uFEFF/, '').replace(/CREATE TABLE /g, 'CREATE TABLE IF NOT EXISTS ').replace(/CREATE UNIQUE INDEX /g, 'CREATE UNIQUE INDEX IF NOT EXISTS ').replace(/CREATE INDEX /g, 'CREATE INDEX IF NOT EXISTS '));
} finally {
  db.close();
}
const child = spawnSync(process.execPath, [resolve(root, 'scripts/seed-demo.mjs')], { cwd: root, stdio: 'inherit' });
process.exitCode = child.status ?? 1;
