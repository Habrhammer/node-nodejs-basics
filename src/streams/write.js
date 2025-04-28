import { createWriteStream } from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const write = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const writeStream = createWriteStream(`${__dirname}/files/fileToWrite.txt`, { encoding: 'utf8' });
  
  process.stdin.pipe(writeStream);
  
  writeStream.on('error', err => {
    console.error(err.message);
  });
  
};

await write();