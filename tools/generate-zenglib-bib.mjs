import { mkdir, mkdtemp, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, relative } from 'node:path';
import { createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import * as tar from 'tar';

const token = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;
if (!token) throw new Error('Missing GH_TOKEN or GITHUB_TOKEN for private repo access');

const owner = 'jinzhezenggroup';
const repo = 'zenglib';
const url = `https://api.github.com/repos/${owner}/${repo}/tarball`;
const tmp = await mkdtemp(join(tmpdir(), 'zenglib-'));
const tgz = join(tmp, 'zenglib.tar.gz');
const extractDir = join(tmp, 'extract');
await mkdir(extractDir, { recursive: true });

const res = await fetch(url, {
  headers: {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'User-Agent': 'OpenClaw-generate-zenglib-bib'
  }
});
if (!res.ok) throw new Error(`Failed to fetch zenglib tarball: ${res.status} ${res.statusText}`);
await pipeline(res.body, createWriteStream(tgz));
await tar.x({ file: tgz, cwd: extractDir, strip: 1 });

async function walk(dir, acc = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) await walk(full, acc);
    else if (entry.isFile() && entry.name.endsWith('.bib')) acc.push(full);
  }
  return acc;
}

function splitBibEntries(text) {
  const lines = text.split(/\r?\n/);
  const entries = [];
  let cur = [];
  for (const line of lines) {
    if (line.startsWith('@') && cur.length) {
      entries.push(cur.join('\n').trim());
      cur = [line];
    } else {
      cur.push(line);
    }
  }
  if (cur.join('').trim()) entries.push(cur.join('\n').trim());
  return entries.filter(Boolean);
}

function entryKey(entry) {
  const m = entry.match(/^@\w+\{\s*([^,]+),/s);
  return m ? m[1].trim() : null;
}

const files = (await walk(extractDir)).sort((a, b) => relative(extractDir, a).localeCompare(relative(extractDir, b), 'en'));
const parts = [];
for (const file of files) parts.push(await readFile(file, 'utf8'));
parts.push(await readFile('tools/legacy-publications.bib', 'utf8'));

const seen = new Set();
const mergedEntries = [];
for (const part of parts) {
  for (const entry of splitBibEntries(part)) {
    const key = entryKey(entry);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    mergedEntries.push(entry);
  }
}

await mkdir('source/_data', { recursive: true });
await writeFile('source/_data/pub.bib', mergedEntries.join('\n\n') + '\n', 'utf8');
await rm(tmp, { recursive: true, force: true });
console.log(`Generated source/_data/pub.bib from private ${owner}/${repo} with ${mergedEntries.length} deduplicated entries.`);
