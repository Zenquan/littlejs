import { ajax } from './http'
import move from './move'
import tap from './tap'
import {
    transitionEnd
} from './utils'
import runner from './runner'

import gesture from './mobile-event/index';

class little {
    constructor() {
    }
    attribute(id, btn, div, fn) {
         /*------------------------attribute--------------------------*/
         let oDiv = document.getElementById(id);
         this.aBtn = oDiv.getElementsByTagName(btn);
         this.aDiv = oDiv.getElementsByTagName(div);

         let _this = this;
         for (let i = 0; i < this.aBtn.length; i++) {
             this.aBtn[i].index = i;
             this.aBtn[i].addEventListener('click', function () {
                 _this.fn(id, this);
             }, false)
         }
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
    runner(_gen) {
        return new runner(_gen);
    }
    gesture(target, selector) {
        return new gesture(target, selector);
    }
}
