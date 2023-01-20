const path = require("path");
const express = require("express");
const fileUpload = require("express-fileupload");
const Routes = require("./routes");
const http = require("http");
const cookieParser = require("cookie-parser");

require("dotenv").config();

async function server(pid) {
  try {
    const app = express();
    app.use(cookieParser());
    app.use(express.json({ extended: false }));
    app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: path.join(__dirname, "/tmp"),
      })
    );
    const httpServer = http.createServer(app);
    const PORT = process.env.PORT;

    Routes(app);
    await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
    console.log(`🚀 Server ready at http://localhost:${PORT}`, pid);
    return { app };
  } catch (error) {
    console.log(error, "Server Error");
  }
}

module.exports = server;
