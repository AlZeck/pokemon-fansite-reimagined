const cors = require('cors');
const express = require('express');
const next = require('next');

// parse env variables
require('dotenv').config();

require("./helpers/db/mongodb.js")();

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;


(async () => {
  try {
    await app.prepare();
    const server = express();

    // Configure middlewares
    server.use(cors());
    server.use(express.json());

    server.use('/api', require('./routes/api'));

    server.all("*", (req, res) => {
      return handle(req, res);
    });


    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();