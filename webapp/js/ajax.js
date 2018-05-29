function ajax(method, url, data, success) {
  // 初始化ajax
  var xhr = null;
  try {
    xhr = new XMLHttpRequest();
  } catch (e) {
    xhr = new ActiveXObject('Microsoft.XMLHTTP');
  }

  // 判断数据传输方式，来给URL传不同形式的值
  if (method == 'get' && data) {
    url += '?' + data;
  }
  /*
    三个参数的含义
    1、提交方式 Form - method
    2、提交地址 Form - action
    3、是否异步，默认异步（true）
  */
  xhr.open(method, url, true);
  // 判断数据传输方式，来发送不同的数据请求
  if (method == 'get') {
    xhr.send();
  } else {
    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
    xhr.send(data);
  }
  // 监听readystate的变化,判断请求是否成功
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        success && success(xhr.responseText);
      } 
    }
  }
}