import {readFileSync,existsSync,readdirSync,statSync} from 'node:fs';
import {resolve,join} from 'node:path';
const root=resolve('out');
const pages=['index.html','projects/co-invest/index.html','projects/eventful/index.html','projects/onyemmemme/index.html','projects/emjay/index.html','404.html'];
let checked=0;
for(const page of pages){
 const html=readFileSync(join(root,page),'utf8');
 if(!/<h1[ >]/.test(html)||!/<title>[^<]+<\/title>/.test(html))throw new Error(`Missing page metadata or heading: ${page}`);
 for(const match of html.matchAll(/(?:href|src)="(\/[^"#?]*)[^\"]*"/g)){
  const path=decodeURIComponent(match[1]); if(path.startsWith('//'))continue;
  const target=join(root,path);
  if(!existsSync(target)||statSync(target).isDirectory()&&!existsSync(join(target,'index.html')))throw new Error(`Broken local target ${path} on ${page}`);
  checked++;
 }
 if(/Content to be supplied|Screenshot Placeholder/.test(html))throw new Error(`Unfinished copy: ${page}`);
}
const pdf=readFileSync(join(root,'Joseph_Ikem_Resume.pdf'));
if(pdf.subarray(0,5).toString()!=='%PDF-')throw new Error('Resume is not a valid PDF file');
if(existsSync(join(root,'qa.html')))throw new Error('Temporary QA page must not ship');
console.log(`Verified ${pages.length} HTML pages, ${checked} local asset/link targets and the résumé download.`);
