var express = require("express");
var app = express();
var router = express.Router();
var fs = require("fs");
var client_id = "클라이언트 아이디";
var client_secret = "시크릿 아이디";
var request = require("request");
const multer = require('multer');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded( {extended : false } ));

const path = require('path');
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/');
    },
    filename: function (req, file, cb) {
      cb(null, new Date().valueOf() + path.extname(file.originalname));
    }
  }),
});

//router
router.get('/', function(req,res) {
  res.render('new');
})

router.post("/face2", upload.single('image'), async function (req, res) {
  const pathpath = req.file.path;
  // form config
var api_url = "https://openapi.naver.com/v1/vision/celebrity"; // 유명인 인식
var api_url2 = "https://openapi.naver.com/v1/vision/face"; // 얼굴 감지

var _formData = {
  image: "image",
  image: fs.createReadStream(req.file.path),
};
var options = {
  url: api_url,
  formData: _formData,
  headers: {
    "X-Naver-Client-Id": client_id,
    "X-Naver-Client-Secret": client_secret,
  },
};
var options2 = {
  url: api_url2,
  formData: _formData,
  headers: {
    "X-Naver-Client-Id": client_id,
    "X-Naver-Client-Secret": client_secret,
  },
};
  const [one, two] = await Promise.all([celebrity(options), recognition(options2)]);
  res.render('index', {imagepath : pathpath.slice(7), data : JSON.stringify(one), data2 : JSON.stringify(two)})
});


//fucntion
celebrity = (options) => {
  return new Promise((resolve, reject) => {
    request.post(options, function (error, response, result) {
      if (!error && response.statusCode == 200) {
        const a = JSON.parse(result);
        resolve(a);
      } else {
        console.log(error);
      }
    });
  });
}
recognition = (options2) => {
  return new Promise((resolve, reject) => {
    request.post(options2, function (error2, response2, result2) {
      if (!error2 && response2.statusCode == 200) {
        const b = JSON.parse(result2);
        resolve(b);
      } else {
        console.log(error2);
      }
    });
  });
}

module.exports = router;