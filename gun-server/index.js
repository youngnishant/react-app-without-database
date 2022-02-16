const express = require("express");
const Gun = require("gun");
const app = express();
app.use(Gun.serve);

const port = 4000;

const server = app.listen(port, () => {
  console.log("Server is running at" + port);
});

Gun({ web: server });
