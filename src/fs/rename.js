import { rename as fsRename } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const rename = async () => {
  const filePath = join(dirname(fileURLToPath(import.meta.url)), '/files/wrongFilename.txt');
  const newFilePath = join(dirname(fileURLToPath(import.meta.url)), '/files/properFilename.md');

  fsRename(filePath, newFilePath, (err) => {
    if (err) {
      console.error('FS operation failed');
      return;
    }
    console.log('File renamed successfully!');
  });
  
};

await rename();