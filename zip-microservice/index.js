const express = require("express");
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");

app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
   res.header(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization, Content-Length, X-Requested-With, x-access-token, Cache-Control',
   );

   if (req.method === 'OPTIONS') {
      res.sendStatus(200);
   } else {
      next();
   }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post("/", (req, res) => {
  try {
    const { specialID } = req.body;

    console.log(req.body);
    console.log(specialID)

    if (!specialID) { 
      res.writeHead(400, { "Content-Type": "text/plain" });
      return res.end("specialID needs to be specified");
    }

    const specialIDsMap = {
      one: 1,
      "22": 2,
      "33threee": 3
    };
    const targetFile = specialIDsMap[specialID];
    const filePath = `./zips/${targetFile}.zip`;
    const fileName = "test-file.zip";

    fs.exists(filePath, exists => {
      if (exists) {
        res.writeHead(200, {
          "Content-Type": "application/octet-stream",
          "Content-Disposition": "attachment; filename=" + fileName
        });
        fs.createReadStream(filePath).pipe(res);
      } else {
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end("ERROR File does not exist");
      }
    });
  } catch (err) {
    console.log(err);
  }
});

app.listen(5001);
