import { cp, access } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';
const copy = async () => {

  const sourcePath = join(dirname(fileURLToPath(import.meta.url)), '/files/');
  const targetPath = join(dirname(fileURLToPath(import.meta.url)), '/files_copy/');
  const handleError = () => console.error('FS operation failed!');

  access(targetPath, (err) => {
    if (!err) {
      return handleError();
    }
    cp(sourcePath, targetPath, { recursive: true }, (err) => {
      if (err) {
        return handleError();
      }
      console.log('Directory copied successfully!');
    });

  });
 
};

await copy();
