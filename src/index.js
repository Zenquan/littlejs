import { ajax } from './http'
import move from './move'
import tap from './tap'
import {
    transitionEnd
} from './utils'

class little {
    constructor() {
    }
    /*-----------------------addEventHandler---------------------------*/
    addEventHandler(elm, type, handler) {
        if (elm.addEventListener) {
            return elm.addEventListener(type, handler, false);
        } else if (elm.attachEvent) {
            return elm.attachEvent('on' + type, handler);
        } else {
            return elm['on' + type] = handler;
        }
    }
    move(obj, json, fnEnd) {
        return new move(obj, json, fnEnd);
    }
    tap(dom, callback) {
        return new tap(dom, callback);
    }
    transitionEnd(dom, callback) {
        return new transitionEnd(dom, callback);
    }
    /*------------------------cookie--------------------------*/
    /* 设置cookie */
    setCookie(name, value, iDay) {
        var oDate = new Date();
        oDate.setDate(oDate.getDate() + iDay);

        document.cookie = name + '=' + value + ';expires=' + oDate;
    }
    /* 获取cookie */
    getCookie(name) {
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
    removeCookie(name) {
        setCookie(name, 1, -1);
    }
    ajax(method, url, data, success) {
        return new ajax(method, url, data, success);
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
    runner(_gen) {
        return new Promise((resolve, reject) => {
            var gen = _gen();

            _next();

            function _next(_last_res) {
                var res = gen.next(_last_res);

                if (!res.done) {
                    var obj = res.value;

                    if (obj.then) {
                        obj.then((res) => {
                            _next(res);
                        }, (err) => {
                            reject(err);
                        });
                    } else if (typeof obj == 'function') {
                        if (obj.constructor.toString().startsWith('function GeneratorFunction()')) {
                            runner(obj).then(res => _next(res), reject);
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
    }
}
