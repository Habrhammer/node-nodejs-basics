import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { join } from 'node:path';
import { unlink } from 'node:fs';



const remove = async () => {
  const filePath = join(dirname(fileURLToPath(import.meta.url)), '/files/fileToRemove.txt');

  unlink(filePath, (err) => {
    if (err) {
      console.error('FS operation failed');
      return;
    }
    console.log('File removed successfully!');

  });
};

await remove();