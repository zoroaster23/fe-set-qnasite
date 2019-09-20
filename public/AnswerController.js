import requestHepler from "./RequestHelper.js";

const AnswerController = {
  getLoadingAnswerTpl() {
    let template = document.createElement('UL');

    template.innerHTML = 
      `<li class="answer-list loading" ">
        Loading.....
      </li>`;

    return template.innerHTML;
  },

  makeAnswerTemplate: ({ content, date, name }) => {
    let template = document.createElement('DIV');
    template.innerHTML =
      `<li class="answer-list">
          <p class="answer-content">${content}</p>
          <div class="answer-profile">
            <span class="answer-writer">${name} | </span>
            <span class="answer-date">${date.substring(0, 10)}</span>
          </div>
        </li>`;
    return template.innerHTML;
  },

  addAnswer: async function (submitButton, userInfo, baseUrl) {
    const parentLi = submitButton.closest(".qna");
    const answerList = parentLi.children[2];
    const textArea = submitButton.parentNode.firstElementChild[0];

    let questionId = parentLi.getAttribute("_questionid");
    let url = `${baseUrl}/${questionId}/answers`;

    const reqBody = {
      content: textArea.value,
      date: new Date(),
      name: userInfo.name
    }

    textArea.value = "";

    if(!answerList.lastElementChild.classList.contains("loading")) {
      answerList.innerHTML += this.getLoadingAnswerTpl();
    }

    try {
      const result = await requestHepler.asyncRequest(url, reqBody);
      
      if (result.flag !== "OK") return;

      answerList.lastElementChild.remove();
      answerList.innerHTML += this.makeAnswerTemplate(result.latestAnswer);

    } catch (errorStatus) {
      answerList.lastElementChild.remove();

      switch (errorStatus) {
        case 401:
          alert("회원 인증에 실패하였습니다.");
          break;

        case 404:
          alert("서버에 접속할 수 없습니다.");
          break;

        case 500:
          alert("데이터 처리 중 문제가 발생했습니다.");
          break;

        default:
          break;
      }
    }
  }
};

export default AnswerController;