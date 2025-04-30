import { spawn } from "child_process";
import { fileURLToPath } from "url";
import { dirname } from "path";

const spawnChildProcess = async (args) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  spawn("node", [`${__dirname}/files/script.js`, ...args], {
    stdio: [process.stdin, process.stdout, process.stderr],
  });
};

spawnChildProcess(["arg1", "arg2"]);
