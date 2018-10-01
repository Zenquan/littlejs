/*------------------------getStyle--------------------------*/
//获取非行间样式
let getStyle = function (obj, name) {
    if (obj.currentStyle) {
        //IE
        return obj.currentStyle[name];
    } else {
        //FF、Chrome
        return getComputedStyle(obj, false)[name];
    }
};
/*------------------------getClass--------------------------*/
//获取类名class
let getClass = function (oParent, sClass) {
    var aEle = oParent.getElementsByTagName('*');
    var aResult = [];

    for (var i = 0; i < aEle.length; i++) {
        if (aEle[i].className == sClass) {
            aResult.push(aEle[i]);
        }
    }

    return aResult;
};
/*定义一个事件 过渡结束事件*/
let transitionEnd = function (dom, callback) {
    //1.给谁加事件
    //2.事件触发后处理什么业务
    if (!dom || typeof dom != 'object') {
        //没dom的时候或者不是一个对象的时候 程序停止
        return false;
    }
    dom.addEventListener('transitionEnd', function () {
        callback && callback();
    });
    dom.addEventListener('webkitTransitionEnd', function () {
        callback && callback();
    });
}

export {
    getStyle,
    getClass,
    transitionEnd
}
