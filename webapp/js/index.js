window.onload = function () {
  var list_1 = document.getElementById("list_1");
  var li = list_1.getElementsByTagName("li");
  var return_top = document.getElementById("return_top");
  var door = true;
  var page = 0;
  var arr = ['./json/getPic.json', './json/getPic.json', './json/getPic.json'];
  // 初始化数据
  getList();
  function getList() {
    ajax('get', arr[page], '', function (data) {
      var data = JSON.parse(data);
      for (let i = 0; i < data.length; i++) {
        // 获取最短li标签的索引
        var short_li_index = getShort();
        // 新建标签并加入数据
        var div = document.createElement('div');
        div.className = 'card';
        var img = document.createElement('img');
        img.src = data[i].preview;
        img.className = 'img';
        div.appendChild(img);
        var p = document.createElement('p');
        p.className = 'card-article'
        div.appendChild(p);
        var span_1 = document.createElement('span');
        span_1.className = 'img-title';
        span_1.innerHTML = data[i].title;
        p.appendChild(span_1);
        var span_2 = document.createElement('span');
        span_2.className = 'img-des';
        span_2.innerHTML = data[i].content;
        p.appendChild(span_2);
        var heart_div = document.createElement('div');
        heart_div.className = 'toggle';
        var heart_check = document.createElement('input');
        heart_check.type = 'checkbox';
        heart_check.id = 'i' + page + i;
        heart_div.appendChild(heart_check);
        var heart_lable = document.createElement('label');
        heart_lable.setAttribute('for', 'i' + page + i);
        heart_lable.innerHTML = '❤';
        heart_div.appendChild(heart_lable);
        div.appendChild(heart_div);
        li[short_li_index].appendChild(div);
      }
    });
    door = true;
  }


  // 获取最短的li标签的索引
  function getShort() {
    var index = 0;
    var shortHeight = li[index].offsetHeight;
    for (let i = 0; i < li.length; i++) {
      if (li[i].offsetHeight < shortHeight) {
        index = i;
        shortHeight = li[i].offsetHeight;
      }
    }
    return index;
  }
  // 获取li顶部到页面顶部的距离????????
  function getTop(obj) {
    var dis_top = 0;
    while (obj) {
      dis_top += obj.offsetTop;
      obj = obj.offsetParent;
    }
    return dis_top;
  }

  // 监听滚动条滚动，判断是否需要加载下一页
  window.onscroll = function () {
    var short_li_index = getShort();
    var short_li = li[short_li_index];
    var scrollTop = document.documentElement.scrollTop || document.documentElement.body.scrollTop;
    if (getTop(short_li) + short_li.offsetHeight < document.documentElement.clientHeight + scrollTop) {
      if (door) {
        door = false;
        page++;
        getList();
      }
    }
    // 返回顶部按钮
    if (scrollTop >= screen.height * 2.5) {
      return_top.style.display = "block";
    } else if (scrollTop < screen.height * 2) {
      return_top.style.display = "none";
    }
  }
  return_top.onclick = function () {
    return_top.style.display = "none";
  }
}