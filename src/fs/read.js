import { readFile } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const read = async () => {
 
  const filePath = join(dirname(fileURLToPath(import.meta.url)), '/files/fileToRead.txt');

  readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('FS operation failed');
      return;
    };
    console.log(data);
  });
};

await read();