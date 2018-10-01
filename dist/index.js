/*!
 * littlejs 0.2.3 (https://github.com/zenquan/littlejs)
 * API https: //github.com/zenquan/littlejs/blob/master/doc/api.md
 * Copyright 2017-2018 zenquan. All Rights Reserved
 * Licensed under MIT(https: //github.com/zenquan/littlejs/blob/master/LICENSE)
 */

'use strict';

/*------------------------ajax.js--------------------------*/
var ajax = function ajax(method, url, data, success) {
    //1.创建服务
    var xhr = null;
    try {
        xhr = new XMLHttpRequest();
    } catch (error) {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    //2.判断提交方法，get方法url数据处理
    if (method == 'get' && data) {
        url += '?' + data;
    }
    //3.打开服务
    xhr.open(method, url, true);
    //4.发送服务
    if (method == 'get') {
        xhr.send();
    } else {
        xhr.setRequestHeader('content-type', 'appliction/x-www-form-urlencoded');
        xhr.send(data);
    }
    //5.接收响应
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                success && success(xhr.responseText);
            } else {
                alert(xhr.status);
            }
        }
    };
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*------------------------getStyle--------------------------*/
//获取非行间样式
var getStyle = function getStyle(obj, name) {
    if (obj.currentStyle) {
        //IE
        return obj.currentStyle[name];
    } else {
        //FF、Chrome
        return getComputedStyle(obj, false)[name];
    }
};
/*定义一个事件 过渡结束事件*/
var transitionEnd = function transitionEnd(dom, callback) {
    //1.给谁加事件
    //2.事件触发后处理什么业务
    if (!dom || (typeof dom === 'undefined' ? 'undefined' : _typeof(dom)) != 'object') {
        //没dom的时候或者不是一个对象的时候 程序停止
        return false;
    }
    dom.addEventListener('transitionEnd', function () {
        callback && callback();
    });
    dom.addEventListener('webkitTransitionEnd', function () {
        callback && callback();
    });
};

/*------------------------move--------------------------*/
//完美运动框架
var move = function move(obj, json, fnEnd) {
    clearInterval(obj.timer);

    function moveTo() {
        var bStop = true; //假设：所有值都已经到了

        for (var attr in json) {
            var cur = 0;

            if (attr == 'opacity') {
                cur = Math.round(parseFloat(getStyle(obj, attr)) * 100);
            } else {
                cur = parseInt(getStyle(obj, attr));
            }

            var speed = (json[attr] - cur) / 6;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

            if (cur != json[attr]) bStop = false;

            if (attr == 'opacity') {
                obj.style.filter = 'alpha(opacity:' + (cur + speed) + ')';
                obj.style.opacity = (cur + speed) / 100;
            } else {
                obj.style[attr] = cur + speed + 'px';
            }
        }

        if (bStop) {
            clearInterval(obj.timer);

            if (fnEnd) fnEnd();
        }
    }
    obj.timer = setInterval(moveTo, 30);
};

var _typeof$1 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//定义一个tap事件
var tap = function tap(dom, callback) {
    if (!dom || (typeof dom === 'undefined' ? 'undefined' : _typeof$1(dom)) != 'object') {
        //没dom的时候或者不是一个对象的时候 程序停止
        return false;
    }

    var isMove = false; //是否滑动过
    var time = 0; //刚刚触摸屏幕的事件  touchstart的触发事件

    dom.addEventListener('touchstart', function () {
        //记录触发这个事件的时间
        time = Date.now(); //时间戳 毫秒
    });
    dom.addEventListener('touchmove', function () {
        isMove = true;
    });
    window.addEventListener('touchend', function (e) {
        //1.没有滑动过
        //2.响应事件在150ms以内   要求比click要响应快
        if (!isMove && Date.now() - time < 150) {
            callback && callback(e);
        }

        //重置参数
        isMove = false;
        time = 0;
    });
};

/*--------------------generator's runner---------------------*/
/*
使用实例：runner(function *(){
  let data1=yield $.ajax({url: xxx, dataType: 'json'});
  let data2=yield $.ajax({url: xxx, dataType: 'json'});
  let data3=yield $.ajax({url: xxx, dataType: 'json'});
  console.log(data1, data2, data3);
});
注意要引进jq
*/
var runner = function runner(_gen) {
    return new Promise(function (resolve, reject) {
        var gen = _gen();

        _next();

        function _next(_last_res) {
            var res = gen.next(_last_res);

            if (!res.done) {
                var obj = res.value;

                if (obj.then) {
                    obj.then(function (res) {
                        _next(res);
                    }, function (err) {
                        reject(err);
                    });
                } else if (typeof obj == 'function') {
                    if (obj.constructor.toString().startsWith('function GeneratorFunction()')) {
                        runner(obj).then(function (res) {
                            return _next(res);
                        }, reject);
                    } else {
                        _next(obj());
                    }
                } else {
                    _next(obj);
                }
            } else {
                resolve(res.value);
            }
        }
    });
};

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var little = function () {
    function little() {
        _classCallCheck(this, little);
    }

    _createClass(little, [{
        key: 'attribute',
        value: function attribute(id, btn, div, fn) {
            /*------------------------attribute--------------------------*/
            var oDiv = document.getElementById(id);
            this.aBtn = oDiv.getElementsByTagName(btn);
            this.aDiv = oDiv.getElementsByTagName(div);

            var _this = this;
            for (var i = 0; i < this.aBtn.length; i++) {
                this.aBtn[i].index = i;
                this.aBtn[i].addEventListener('click', function () {
                    _this.fn(id, this);
                }, false);
            }
        }
        /*-----------------------addEventHandler---------------------------*/

    }, {
        key: 'addEventHandler',
        value: function addEventHandler(elm, type, handler) {
            if (elm.addEventListener) {
                return elm.addEventListener(type, handler, false);
            } else if (elm.attachEvent) {
                return elm.attachEvent('on' + type, handler);
            } else {
                return elm['on' + type] = handler;
            }
        }
    }, {
        key: 'move',
        value: function move$$1(obj, json, fnEnd) {
            return new move(obj, json, fnEnd);
        }
    }, {
        key: 'tap',
        value: function tap$$1(dom, callback) {
            return new tap(dom, callback);
        }
    }, {
        key: 'transitionEnd',
        value: function transitionEnd$$1(dom, callback) {
            return new transitionEnd(dom, callback);
        }
        /*------------------------cookie--------------------------*/
        /* 设置cookie */

    }, {
        key: 'setCookie',
        value: function setCookie(name, value, iDay) {
            var oDate = new Date();
            oDate.setDate(oDate.getDate() + iDay);

            document.cookie = name + '=' + value + ';expires=' + oDate;
        }
        /* 获取cookie */

    }, {
        key: 'getCookie',
        value: function getCookie(name) {
            var arr = document.cookie.split('; ');

            for (var i = 0; i < arr.length; i++) {
                var arr2 = arr[i].split('=');

                if (arr2[0] == name) {
                    return arr2[1];
                }
            }

            return '';
        }
        /* 删除cookie */

    }, {
        key: 'removeCookie',
        value: function removeCookie(name) {
            setCookie(name, 1, -1);
        }
    }, {
        key: 'ajax',
        value: function ajax$$1(method, url, data, success) {
            return new ajax(method, url, data, success);
        }
    }, {
        key: 'runner',
        value: function runner$$1(_gen) {
            return new runner(_gen);
        }
    }]);

    return little;
}();
