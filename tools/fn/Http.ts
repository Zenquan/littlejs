/**
 * ajax({
 *  method: 'GET',
 *  url: 'http://www.demo.com/api',
 *  async: true,
 *  dataType: 'json',
 *  data: '',
 *  success: funtion(data) {
 *
 *  },
 *  error: function(err) {
 *  }
 * })
 */

let Ajax = req => {
  let initVals = {
    method: (req.method || "GET").toUpperCase(),
    url: req.url || "",
    async: req.async || true,
    dataType: req.dataType || "json",
    data: req.data || "",
    success: data => {},
    error: err => {}
  };

  let paramsFormat = obj => {
    let str = "";
    for (let i in obj) {
      str += i + "=" + obj[i] + "&";
    }

    return str
      .split("")
      .slice(0, -1)
      .join("");
  };

  let xhr = new XMLHttpRequest();

  if (initVals.method === "GET") {
    xhr.open(
      initVals.method,
      initVals.url + paramsFormat(initVals.data),
      initVals.async
    );
    xhr.send();
  } else {
    xhr.open(initVals.method, initVals.url, initVals.async);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(initVals.data);
  }
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 304)) {
      switch (initVals.dataType) {
        case "json":
          var json = JSON.parse(xhr.responseText);
          initVals.success(json);
          break;
        case "xml":
          initVals.success(xhr.responseXML);
          break;
        default:
          initVals.success(xhr.responseText);
          break;
      }
    }
  };

  xhr.onerror = function(err) {
    initVals.error(err);
  };
};
