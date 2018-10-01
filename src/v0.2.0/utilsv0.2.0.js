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

export {
    getStyle,
    getClass
}
