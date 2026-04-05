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

const files = (await walk(extractDir)).sort((a, b) => relative(extractDir, a).localeCompare(relative(extractDir, b), 'en'));
const merged = [];
for (const file of files) merged.push(await readFile(file, 'utf8'));
await mkdir('source/_data', { recursive: true });
await writeFile('source/_data/pub.bib', merged.join(''), 'utf8');
await rm(tmp, { recursive: true, force: true });
console.log(`Generated source/_data/pub.bib from ${files.length} BibTeX files in private ${owner}/${repo}.`);
