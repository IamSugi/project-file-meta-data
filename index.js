var express = require("express");
var cors = require("cors");
require("dotenv").config();
const multer = require("multer");
const fs = require("fs");

const uploadDirectory = "uploads/";
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

var app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  var fileName = req.file.filename;
  var fileSize = req.file.size;
  var fileType = req.file.mimetype;
  res.status(200).json({ name: fileName, type: fileType, size: fileSize });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
