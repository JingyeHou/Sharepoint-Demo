const express = require("express");
const app = express();
const PORT = 8080;
const axios = require("axios");
var cors = require("cors");
const path = require("path");
const qs = require("qs");

app.use(cors());

const body = {
  grant_type: "client_credentials",
  client_id:
    "22ce29a2-62a1-471d-8055-947370aef352@27a2dfb3-84a9-410b-aa95-d545d793423d",
  client_secret: "JUb9YqZCaGBOXjS0MDub26LobefATVdAY2vSwLUgTjU=",
  resource:
    "00000003-0000-0ff1-ce00-000000000000/jingjackhou.sharepoint.com@27a2dfb3-84a9-410b-aa95-d545d793423d",
};

app.use(express.static(path.join(__dirname, "client", "build")));

app.post("/27a2dfb3-84a9-410b-aa95-d545d793423d/tokens/OAuth/2", (req, res) => {
  console.log("req");
  axios({
    method: "post",
    url: `https://accounts.accesscontrol.windows.net/27a2dfb3-84a9-410b-aa95-d545d793423d/tokens/OAuth/2`,
    headers: {
      Accept: "application/json;odate=verbose",
      "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    data: qs.stringify(body),
  }).then(({ data }) => {
    console.log(
      `https://accounts.accesscontrol.windows.net/27a2dfb3-84a9-410b-aa95-d545d793423d/tokens/OAuth/2`,
      data
    );
    res.json(data);
    // setToken(data.access_token);
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
