const cluster = require("cluster");
const server = require("./server");

// change web concurrency depdneing on server
let WORKERS = process.env.WEB_CONCURRENCY || 1;

if (cluster.isMaster) {
  for (var i = 0; i < WORKERS; i++) {
    cluster.fork();
  }

  cluster.on("online", (worker) => {});
  cluster.on("exit", (worker) => {
    cluster.fork();
  });
} else {
  server(cluster.worker.process.pid);
}
