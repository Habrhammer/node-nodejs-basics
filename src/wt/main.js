import { Worker } from "worker_threads";
import { fileURLToPath } from "url";
import { dirname } from "path";
import os from "os";

const performCalculations = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const numWorkers = os.cpus().length;
  const workerPromises = [];

  for (let i = 0; i < numWorkers; i++) {
    const workerInput = 10 + i;

    const promise = new Promise((resolve) => {
      const worker = new Worker(`${__dirname}/worker.js`, {
        workerData: workerInput,
      });

      worker.on("message", (result) => {
        resolve({ status: "resolved", data: result });
      });

      worker.on("error", () => {
        resolve({ status: "error", data: null });
      });
    });

    workerPromises.push(promise);
  }

  const results = await Promise.all(workerPromises);
  console.log(results);
};

await performCalculations();