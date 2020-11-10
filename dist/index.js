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

var ABS = Math.abs;
var isTarget = function isTarget(obj, selector) {
    while (obj != undefined && obj != null && obj.tagName.toUpperCase() != 'BODY') {
        if (obj.matches(selector)) {
            return obj;
        }
        obj = obj.parentNode;
    }
    return null;
};
var calcLen = function calcLen(v) {
    return Math.sqrt(v.x * v.x + v.y * v.y);
};
var calcAngle = function calcAngle(a, b) {
    var l = calcLen(a) * calcLen(b),
        cosValue = void 0,
        angle = void 0;
    if (l) {
        cosValue = (a.x * b.x + a.y * b.y) / l;
        angle = Math.acos(Math.min(cosValue, 1));
        angle = a.x * b.y - b.x * a.y > 0 ? -angle : angle;
        return angle * 180 / Math.PI;
    }
    return 0;
};

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var gesture = function () {
    function gesture(target, selector) {
        _classCallCheck(this, gesture);

        this.target = target instanceof HTMLElement ? target : typeof target === "string" ? document.querySelector(target) : null;
        if (!this.target) return;
        this.selector = selector;
        this._init();
        this.pretouch = {};
        this.handles = {};
        this.preVector = {
            x: null,
            y: null
        };
        this.distance = 30;
        this._touch = this._touch.bind(this);
        this._move = this._move.bind(this);
        this._end = this._end.bind(this);
        this._cancel = this._cancel.bind(this);
        this.target.addEventListener('touchstart', this._touch, false);
        this.target.addEventListener('touchmove', this._move, false);
        this.target.addEventListener('touchend', this._end, false);
        this.target.addEventListener('touchcancel', this._cancel, false);
    }

    _createClass(gesture, [{
        key: '_touch',
        value: function _touch(e) {
            this.e = e.target;
            var point = e.touches ? e.touches[0] : e;
            var now = Date.now();
            this.touch.startX = point.pageX;
            this.touch.startY = point.pageY;
            this.touch.startTime = now;
            this.longTapTimeout && clearTimeout(this.longTapTimeout);
            this.tapTimeout && clearTimeout(this.tapTimeout);
            this.doubleTap = false;
            this._emit('touch', e);
            if (e.touches.length > 1) {
                var point2 = e.touches[1];
                this.preVector = {
                    x: point2.pageX - this.touch.startX,
                    y: point2.pageY - this.touch.startY
                };
                this.startDistance = calcLen(this.preVector);
                this._emit('multitouch', e);
            } else {
                var self = this;
                this.longTapTimeout = setTimeout(function () {
                    self._emit('longtap', e);
                    self.doubleTap = false;
                    e.preventDefault();
                }, ~~this.longtapTime || 800);
                this.doubleTap = this.pretouch.time && now - this.pretouch.time < 300 && ABS(this.touch.startX - this.pretouch.startX) < 30 && ABS(this.touch.startY - this.pretouch.startY) < 30 && ABS(this.touch.startTime - this.pretouch.time) < 300;
                this.pretouch = { //reserve the last touch
                    startX: this.touch.startX,
                    startY: this.touch.startY,
                    time: this.touch.startTime
                };
            }
        }
    }, {
        key: '_move',
        value: function _move(e) {
            var point = e.touches ? e.touches[0] : e;
            this._emit('move', e);
            if (e.touches.length > 1) {
                //multi touch
                var point2 = e.touches[1];
                var v = {
                    x: point2.pageX - point.pageX,
                    y: point2.pageY - point.pageY
                };
                this._emit('multimove', e);
                if (this.preVector.x !== null) {
                    if (this.startDistance) {
                        this.params.zoom = calcLen(v) / this.startDistance;
                        this._emit('pinch', e);
                    }
                    this.params.angle = calcAngle(v, this.preVector);
                    this._emit('rotate', e);
                }
                this.preVector.x = v.x;
                this.preVector.y = v.y;
            } else {
                var diffX = point.pageX - this.touch.startX,
                    diffY = point.pageY - this.touch.startY;
                this.params.diffY = diffY;
                this.params.diffX = diffX;
                if (this.movetouch.x) {
                    this.params.deltaX = point.pageX - this.movetouch.x;
                    this.params.deltaY = point.pageY - this.movetouch.y;
                } else {
                    this.params.deltaX = this.params.deltaY = 0;
                }
                if (ABS(diffX) > 30 || ABS(diffY) > 30) {
                    this.longTapTimeout && clearTimeout(this.longTapTimeout);
                    this.tapTimeout && clearTimeout(this.tapTimeout);
                    this.doubleTap = false;
                }
                this._emit('slide', e);
                this.movetouch.x = point.pageX;
                this.movetouch.y = point.pageY;
            }
            if (e.touches.length > 1) {
                e.preventDefault();
            }
        }
    }, {
        key: '_end',
        value: function _end(e) {
            this.longTapTimeout && clearTimeout(this.longTapTimeout);
            var timestamp = Date.now();
            var deltaX = ~~((this.movetouch.x || 0) - this.touch.startX),
                deltaY = ~~((this.movetouch.y || 0) - this.touch.startY);
            this._emit('end', e);
            if (this.movetouch.x && (ABS(deltaX) > this.distance || this.movetouch.y !== null && ABS(deltaY) > this.distance)) {
                //swipe happened
                if (ABS(deltaX) < ABS(deltaY)) {
                    //swipeup and swipedown,but it generally used as a scrolling window
                    if (deltaY < 0) {
                        this._emit('swipeUp', e);
                        this.params.direction = 'up';
                    } else {
                        this._emit('swipeDown', e);
                        this.params.direction = 'down';
                    }
                } else {
                    if (deltaX < 0) {
                        this._emit('swipeLeft', e);
                        this.params.direction = 'left';
                    } else {
                        this._emit('swipeRight', e);
                        this.params.direction = 'right';
                    }
                }
                this._emit('swipe', e);
                this._emit("finish", e);
            } else {
                self = this;
                if (!this.doubleTap && timestamp - this.touch.startTime < 300) {
                    this.tapTimeout = setTimeout(function () {
                        self._emit('tap', e);
                        self._emit("finish", e);
                    }, 300);
                } else if (this.doubleTap) {
                    this._emit('dbtap', e);
                    this.tapTimeout && clearTimeout(this.tapTimeout);
                    this._emit("finish", e);
                } else {
                    this._emit("finish", e);
                }
            }
            this._init();
            this.preVector = {
                x: 0,
                y: 0
            };
        }
    }, {
        key: '_cancel',
        value: function _cancel(e) {
            this._emit('cancel', e);
            this._end();
        }
    }, {
        key: '_emit',
        value: function _emit(type, e) {
            !this.handles[type] && (this.handles[type] = []);
            var currentTarget = isTarget(this.e, this.selector);
            if (currentTarget || !this.selector) {
                this.selector && (this.params.selector = currentTarget);
                for (var i = 0, len = this.handles[type].length; i < len; i++) {
                    typeof this.handles[type][i] === 'function' && this.handles[type][i](e, this.params);
                }
            }
            return true;
        }
    }, {
        key: 'on',
        value: function on(type, callback) {
            !this.handles[type] && (this.handles[type] = []);
            this.handles[type].push(callback);
            return this;
        }
    }, {
        key: 'off',
        value: function off(type) {
            this.handles[type] = [];
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            this.longTapTimeout && clearTimeout(this.longTapTimeout);
            this.tapTimeout && clearTimeout(this.tapTimeout);
            this.target.removeEventListener('touchstart', this._touch);
            this.target.removeEventListener('touchmove', this._move);
            this.target.removeEventListener('touchend', this._end);
            this.target.removeEventListener('touchcancel', this._cancel);
            this.params = this.handles = this.movetouch = this.pretouch = this.touch = this.longTapTimeout = null;
            return false;
        }
    }, {
        key: 'set',
        value: function set(obj) {
            for (var i in obj) {
                if (i === 'distance') this.distance = ~~obj[i];
                if (i === 'longtapTime') this.longtapTime = Math.max(500, ~~obj[i]);
            }
            return this;
        }
    }, {
        key: '_init',
        value: function _init() {
            this.touch = {};
            this.movetouch = {};
            this.params = {
                zoom: 1,
                deltaX: 0,
                deltaY: 0,
                diffX: 0,
                diffY: 0,
                angle: 0,
                direction: ''
            };
        }
    }]);

    return gesture;
}();

var _createClass$1 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var little = function () {
    function little() {
        _classCallCheck$1(this, little);

        this.elements = [];
    }

    _createClass$1(little, [{
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
    }, {
        key: 'gesture',
        value: function gesture$$1(target, selector) {
            return new gesture(target, selector);
        }
        //extend函数

    }, {
        key: 'extend',
        value: function extend(name, fn) {
            this.elements[name] = fn;
        }
    }]);

    return little;
}();

var l = function l() {
    return new little();
};

l();
