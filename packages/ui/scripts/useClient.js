import { readFileSync, writeFileSync } from 'node:fs';

import {fileURLToPath} from 'node:url';

import { resolve, dirname,  } from 'node:path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = resolve(__dirname,'../dist/designSystem.es.js' );
console.log(filePath)

writeFileSync(filePath, '"use client"\n' + readFileSync(filePath, 'utf-8'));

