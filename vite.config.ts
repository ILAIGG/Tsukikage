import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
const appVersion = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8')).version;
const previewHeaders = Object.fromEntries(JSON.parse(readFileSync(new URL('./vercel.json',import.meta.url),'utf8')).headers[0].headers.map((h:{key:string;value:string})=>[h.key,h.value]));
export default defineConfig({ preview:{headers:previewHeaders}, base: process.env.VITE_BASE_PATH || '/', plugins: [react(), {name:'offline-shell',writeBundle(options,bundle){const files=Object.keys(bundle).filter(file=>file!=='sw.js');const signature=createHash('sha256');for(const file of files){signature.update(file);const item=bundle[file];signature.update(item.type==='chunk'?item.code:String(item.source))}const worker=readFileSync(new URL('./public/sw.js',import.meta.url),'utf8').replace('/* PRECACHE */ []',JSON.stringify(files)).replace('BUILD_ID',signature.digest('hex').slice(0,16));writeFileSync(resolve(options.dir||'dist','sw.js'),worker)}}], define: { __APP_VERSION__: JSON.stringify(appVersion) } });
