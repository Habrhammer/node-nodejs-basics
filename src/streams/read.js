import { createReadStream } from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const read = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const readStream = createReadStream(`${__dirname}/files/fileToRead.txt`, {
    encoding: "utf8",
  });

  readStream.pipe(process.stdout);

  readStream.on("end", () => {
    console.log("\n");
  });

  readStream.on("error", (err) => {
    console.error(err.message);
  });
};

await read();
