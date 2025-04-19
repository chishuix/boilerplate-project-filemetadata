var express = require('express');
var cors = require('cors');
require('dotenv').config()
const multer = require("multer");
const upload = multer({dest: 'uploads/'});

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

/*
2. 您可以提交一个包含文件上传的表单。
3. 表单文件输入字段设置了 name 属性为 upfile 。
4. 当您提交文件时，您将在 JSON 响应中接收到文件 name ， type ，和 size 以字节为单位。
 */
app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  let responseMsg = ({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
  res.json(responseMsg);
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
