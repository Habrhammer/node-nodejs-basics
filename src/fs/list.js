import { readdir } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path' ;

const list = async () => {
  
  const dirPath = join(dirname(fileURLToPath(import.meta.url)), '/files/');
     
  readdir(dirPath, (err, files) => {
    if (err) {
      console.error('FS operation failed');
      return;
    }
    console.log(files);
  });
  
};

await list();