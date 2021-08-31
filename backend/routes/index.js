var express = require("express");
var router = express.Router();
const app = express();
const path = require("path");

app.use(
  express.static(path.join(__dirname, "webviewer-react-sample", "build"))
);

module.exports = router;
