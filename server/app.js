const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const shortid = require("shortid");
const auth = require("./auth.js");
const express_jwt = require("express-jwt");
const response_mock = require("./mock-data.js");

//token발급에서 사용되는 임시비밀번호
const __secret_key = "topsecret";

let answerQue =[];

//jwt토큰유효성검증용 미들웨어
const jwtValidator = express_jwt({
  secret: __secret_key,
	getToken: function (req) {
		if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
			return req.headers.authorization.split(' ')[1];
                 }
		return null;
	  }
});

app.listen(3000, function() {
  console.log("start, express server on port 3000");
});

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

const jsonParser = bodyParser.json();

//routing 시작
//로그인처리, generatorJwt함수를 통해서 jwt token발급
app.post('/api/login', jsonParser,  function(req, res) {
  const user  = req.body.user;
  if(user) {
      const token = auth.generateJwt(user, __secret_key);
      res.json({
          auth: true,
          message: 'Authentication success!',
          token: token
        });
  } else {
      res.json({ "login" : "fail" });
  }
});

app.get("/api/questions", (req, res) => {
  return res.json(response_mock);
});

app.post("/api/questions", jsonParser, function(req, res) {
    //do something..
});


//댓글신규등록
app.post(
  "/api/questions/:questionid/answers",
  jwtValidator,
  jsonParser,
  (req, res, questionid) => {
    const body = req.body;
    if (!body) return res.status(400).send({ error: "data is not found" });
    

    const delayPromise = () => {
      return new Promise(function(resolve, reject){
        setTimeout(function(){
          const latestAnswer = answerQue[questionid].pop();
          const flag = latestAnswer ? "OK" : "ERROR";
          answerQue[questionid] = [];

          resolve({flag, latestAnswer});

        }, 3000)
      });
    }
    
    const addAnswer = async (res) => {
      const response = await delayPromise();
      return res.json(response);
    }
    
    if(!answerQue[questionid]) answerQue[questionid] = [];

    answerQue[questionid].push(body);
    addAnswer(res);
  }
);

//token이 있는지 확인. 실제확인은 jwtValidator 미들웨어에서 확인함
app.post("/api/token-validation", jwtValidator, function(req, res) {
  res.json({
    authResult: true,
    //id: req.payload._id
  });
});


//logging 과정을 출력하는 fake logger역할
app.post("/api/logging", jsonParser, function(req, res) {
    const logType = req.body.logType;
    console.log("[logging]", logType);
    res.json({ loggin: "ok" });
  });
