/*!
 * littlejs 0.2.0 (https://github.com/zenquan/littlejs)
 * API https: //github.com/zenquan/littlejs/blob/master/doc/api.md
 * Copyright 2017-2018 zenquan. All Rights Reserved
 * Licensed under MIT(https: //github.com/zenquan/littlejs/blob/master/LICENSE)
 */

/*------------------------getStyle--------------------------*/

/*------------------------ajax.js--------------------------*/

/*------------------------move--------------------------*/

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var little = function () {
    function little(id) {
        _classCallCheck(this, little);

        /*------------------------attribute--------------------------*/
        var oDiv = document.getElementById(id);
        this.aBtn = oDiv.getElementsByTagName('input');
        this.aDiv = oDiv.getElementsByTagName('div');

        var _this = this;
        for (var i = 0; i < this.aBtn.length; i++) {
            this.aBtn[i].index = i;
            this.aBtn[i].addEventListener('click', function () {
                _this.tabSwitch(this);
            }, false);
        }
    }
    /*-----------------------addEventHandler---------------------------*/


    _createClass(little, [{
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
        /*-----------------------tabSwitch---------------------------*/

    }, {
        key: 'tabSwitch',
        value: function tabSwitch(oBtn) {
            for (var i = 0; i < this.aBtn.length; i++) {
                this.aBtn[i].className = '';
                this.aDiv[i].style.display = 'none';
            }
            oBtn.className = 'active';
            this.aDiv[oBtn.index].style.display = 'block';
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

    }, {
        key: 'runner',
        value: function (_runner) {
            function runner(_x) {
                return _runner.apply(this, arguments);
            }

            runner.toString = function () {
                return _runner.toString();
            };

            return runner;
        }(function (_gen) {
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
        })
    }]);

    return little;
}();
