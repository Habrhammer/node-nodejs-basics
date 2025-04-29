import { access, createReadStream, createWriteStream, unlink } from "fs";
import { createGzip } from "zlib";
import { fileURLToPath } from "url";
import { dirname } from "path";

const compress = () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const inputFile = `${__dirname}/files/fileToCompress.txt`;
  const outputFile = `${__dirname}/files/archive.gz`;

  access(inputFile, (accessErr) => {
    if (accessErr) {
      console.error(`File does not exist or cannot be accessed: ${accessErr.message}`);
      return;
    }

    const readStream = createReadStream(inputFile);
    const writeStream = createWriteStream(outputFile);
    const gzip = createGzip();

    readStream.on("error", (err) => {
      console.error(`Error reading the file: ${err.message}`);
    });

    readStream
      .pipe(gzip)
      .pipe(writeStream)
      .on("finish", () => {
        console.log(`File was compressed successfully`);
        unlink(inputFile, (unlinkErr) => {
          if (unlinkErr) {
            console.error(unlinkErr.message);
          } else {
            console.log(`Original file deleted successfully`);
          }
        });
      });
  });
};

compress();