import { writeFile } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';

const create = async () => {
  const filePath = join(dirname(fileURLToPath(import.meta.url)), '/files/fresh.txt');

  writeFile(filePath, 'I am fresh and young', { flag: 'wx' }, (err) => {
    if (err?.code === 'EEXIST') {
      console.error('FS operation failed');
    }
  });
};

await create();