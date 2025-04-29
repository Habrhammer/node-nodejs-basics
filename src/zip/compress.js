import { createReadStream, createWriteStream } from "fs";
import { createGzip } from "zlib";
import { fileURLToPath } from "url";
import { dirname } from "path";

const compress = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const inputFile = `${__dirname}/files/fileToCompress.txt`;
  const outputFile = `${__dirname}/files/archive.gz`;

  const readStream = createReadStream(inputFile);
  const writeStream = createWriteStream(outputFile);
  const gzip = createGzip();

  readStream
    .pipe(gzip)
    .pipe(writeStream)
    .on("finish", () => {
      console.log(`File was compressed successfully`);
    });
};

await compress();