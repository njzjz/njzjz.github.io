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

const supplementalEntries = String.raw`

@article{Zeng_arXiv_2025_p2502.19161,
  title        = {A Multiple-Backend Framework for Machine Learning Potentials},
  author       = {Zeng, Jinzhe and Zhang, Duo and Peng, Anyang and Zhang, Xiangyu and He, Sensen and Wang, Yan and Liu, Xinzijian and Bi, Hangrui and Li, Yifan and Cai, Chun and Zhang, Chengqian and Du, Yiming and Zhu, Jia-Xin and Mo, Pinghui and Huang, Zhengtao and Zeng, Qiyu and Shi, Shaochen and Qin, Xuejian and Yu, Zhaoxi and Luo, Chenxing and Ding, Ye and Liu, Yun-Pei and Shi, Ruosong and Wang, Zhenyu and Bore, Sigbjørn Løland and Chang, Junhan and Deng, Zhe and Ding, Zhaohan and Han, Siyuan and Jiang, Wanrun and Ke, Guolin and Liu, Zhaoqing and Lu, Denghui and Muraoka, Koki and Oliaei, Hananeh and Singh, Anurag Kumar and Que, Haohui and Xu, Weihong and Xu, Zhangmancang and Zhuang, Yong-Bin and Dai, Jiayu and Giese, Timothy J and Jia, Weile and Xu, Ben and York, Darrin M and Zhang, Linfeng and Wang, Han},
  year         = 2025,
  journal      = {arXiv},
  pages        = {2502.19161},
  doi          = {10.48550/arXiv.2502.19161}
}

@incollection{Zeng_2022_Chapter,
  title        = {{Neural network potentials}},
  author       = {Zeng, Jinzhe and Cao, Liqun and Zhu, Tong},
  year         = 2022,
  booktitle    = {{Quantum Chemistry in the Age of Machine Learning}},
  publisher    = {Elsevier},
  pages        = {279--294},
  editor       = {Dral, Pavlo O.},
  chapter      = 12
}

@article{Giese_2022_JChemTheoryComput,
  title        = {{Combined QM/MM, Machine Learning Path Integral Approach to Compute Free Energy Profiles and Kinetic Isotope Effects in RNA Cleavage Reactions}},
  author       = {Giese, Timothy J and Zeng, Jinzhe and Ekesan, \c{S}\"{o}len and York, Darrin M},
  year         = 2022,
  journal      = {J. Chem. Theory Comput.},
  volume       = 18,
  pages        = {4304--4317},
  doi          = {10.1021/acs.jctc.2c00151}
}

@article{Cao_PhysChemChemPhys_2022,
  title        = {{Ab initio neural network MD simulation of thermal decomposition of a high energy material CL-20/TNT}},
  author       = {Cao, Liqun and Zeng, Jinzhe and Wang, Bo and Zhu, Tong and Zhang, John Z. H.},
  year         = 2022,
  journal      = {Phys. Chem. Chem. Phys.},
  volume       = 24,
  number       = 19,
  pages        = {11801--11811},
  doi          = {10.1039/D2CP00710J}
}

@article{Han_ACSAppliedMatInterface_2018_v10_p31725,
  title        = {{Inorganic-Organic Hybrid Tongue-Mimic for Time-Resolved Luminescent Noninvasive Pattern and Chiral Recognition of Thiols in Biofluids toward Healthcare Monitoring}},
  author       = {Han, Xin-Yue and Chen, Zi-Han and Zeng, Jin-Zhe and Fan, Qian-Xi and Fang, Zheng-Qi and Shi, Guoyue and Zhang, Min},
  year         = 2018,
  journal      = {ACS Appl. Mater. Interfaces},
  volume       = 10,
  number       = 37,
  pages        = {31725--31734},
  doi          = {10.1021/acsami.8b13498}
}
`;

const files = (await walk(extractDir)).sort((a, b) => relative(extractDir, a).localeCompare(relative(extractDir, b), 'en'));
const merged = [];
for (const file of files) merged.push(await readFile(file, 'utf8'));
await mkdir('source/_data', { recursive: true });
await writeFile('source/_data/pub.bib', merged.join('') + supplementalEntries, 'utf8');
await rm(tmp, { recursive: true, force: true });
console.log(`Generated source/_data/pub.bib from ${files.length} BibTeX files in private ${owner}/${repo}, plus supplemental compatibility entries.`);
