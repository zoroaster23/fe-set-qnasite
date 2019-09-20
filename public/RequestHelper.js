const requestHepler = {
  fetchRequest: (url, headers, body, successCallBack) => {
    fetch(url, { method: 'POST', headers, body: JSON.stringify(body) })
      .then(res => res.json())
      .then(result => successCallBack(result))
      .catch(function (error) {
        console.log('Request failed', error)
      });
  },

  asyncRequest: (url, body) => {
    return new Promise(function (resolve, reject) {
      let req = new XMLHttpRequest();
      req.open("POST", url);
      req.setRequestHeader('Content-Type', 'application/json');
      req.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('auth-token')}`);

      req.onreadystatechange = function () {
        if (req.status !== 200) {
          reject(req.status);
        }
      };

      req.addEventListener("load", function() {
        let htData = JSON.parse(req.responseText);
        if(typeof htData !== "object") reject("wrong data");
        else resolve(htData);
      });

      req.send(JSON.stringify(body));
    });

  }
};

export default requestHepler;