import answerController from "./AnswerController.js";
import loginController from "./LoginController.js";

const URL = {
  INIT: "http://localhost:3000/api/questions",
  LOGIN: "http://localhost:3000/api/login",
  VALIDATION: "http://localhost:3000/api/token-validation"
};

const USER_INFO = {
  name: "USER",
  _id: "tempUser"
}

//util
const $ = document.querySelector.bind(document);

function getAnswerTemplate(answers) {
  return answers.reduce((html, { content, name, date }) => {
    return (
      html +
      `
        <li class="answer-list" ">
            <p class="answer-content">${content}</p>
            <div class="answer-profile">
                <span class="answer-writer">${name} | </span>
                <span class="answer-date">${date}</span>
            </div>
        </li>`
    );
  }, ``);
}


function getQnATemplate(data) {
  return data.list.reduce((html, { title, question, questionId, answers }) => {
    return (
      html +
      ` <li class="qna" _questionId=${+questionId}>
        <div class="qna-title">
            <h2>${title}</h2>
        </div>
        <div class="question">
            <p> ${question}</p>
        </div>
        <ul class="answer">${getAnswerTemplate(answers)}</ul>
        <div class="answer-form">
            <form method="POST">
                <textarea name="answer-content" class="answer-content-textarea" cols="30" rows="2" placeholder="새로운답변.."></textarea>
            </form>
            <button class="comment-submit">등록</button>
        </div>
    </li>`
    );
  }, ``);
}

//fetch 요청후에 renderQnA를 활용해서 화면 렌더링을 할 수 있음
function renderQnA(data) {
  const target = $(".qna-wrap");
  const resultHTML = getQnATemplate(data);
  target.innerHTML = resultHTML;
}

document.addEventListener("DOMContentLoaded", () => {
  fetch(URL.INIT)
    .then(res => res.json())
    .then(result => renderQnA(result));

  loginController.validateToken(URL.VALIDATION, USER_INFO);

  document.addEventListener("click", (event)=> {
    const className = event.target.className;
    
    switch (className) {
      case "login-btn":
        loginController.login(URL.LOGIN, USER_INFO);
        break;
    
      case "comment-submit":
        answerController.addAnswer(event.target, USER_INFO, URL.INIT);  
      default:
        break;
    }
  });  
});
