import { access, unlink, createReadStream, createWriteStream } from 'fs';
import { createGunzip } from 'zlib';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const decompress = () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const inputFile = `${__dirname}/files/archive.gz`;
  const outputFile = `${__dirname}/files/fileToCompress.txt`;

  access(inputFile, (err) => {
    if (err) {
      if (err.code === 'ENOENT') {
        console.error(`Error: Archive file "${inputFile}" does not exist.`);
      } else {
        console.error(`Error: ${err.message}`);
      }
      return;
    }

    const readStream = createReadStream(inputFile);
    const writeStream = createWriteStream(outputFile);
    const gunzip = createGunzip();

    readStream
      .pipe(gunzip)
      .pipe(writeStream)
      .on('finish', () => {
        console.log(`File was decompressed successfully`);

        unlink(inputFile, (unlinkErr) => {
          if (unlinkErr) {
            console.error(`Error removing archive: ${unlinkErr.message}`);
          } else {
            console.log(`Archive removed successfully`);
          }
        });
      })
      .on('error', (streamErr) => {
        console.error(`Error: ${streamErr.message}`);
      });
  });
};

decompress();
