import { createReadStream } from "fs";
import { createHash } from "crypto";
import { fileURLToPath } from "url";
import { dirname } from "path";

const calculateHash = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  
  const readStream = createReadStream(`${__dirname}/files/fileToCalculateHashFor.txt`); 
  const hash = createHash("sha256");

  readStream.on("data", (chunk) => {
    hash.update(chunk);
  });

  readStream.on("end", () => {
    console.log(hash.digest("hex"));
  });

};

await calculateHash();
