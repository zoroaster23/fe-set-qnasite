import requestHepler from "./RequestHelper.js";

const loginController = {
  successLogin: (result) => {
    document.getElementsByClassName("login-btn")[0].innerText = "환영합니다";

    if(result.token) {
      localStorage.setItem("auth-token", result.token);
    }
  },

  login: function (url, userInfo) {
    requestHepler.fetchRequest(
      url,
      { "Content-Type": "application/json" },
      { user: userInfo },
      this.successLogin,
    );
  },

  validateToken: function (url, userInfo) {
    const token = localStorage.getItem('auth-token');
    if (!token) return;

    requestHepler.fetchRequest(
      url,
      {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
      },
      { user: userInfo},
      this.successLogin,
    );
  }
}

export default loginController;
