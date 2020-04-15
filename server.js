const express = require("express");
const helmet = require("helmet");

const SchemeRouter = require("./schemes/scheme-router.js");

const server = express();

server.use(express.json());
server.use(helmet());

server.use("/api/schemes", SchemeRouter);

server.get("/", (req, res) => {
  res.send("Server up and running");
});

module.exports = server;
