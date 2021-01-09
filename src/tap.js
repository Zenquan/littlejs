//定义一个tap事件
let tap = (dom, callback) => {
    if (!dom || typeof dom != 'object') {
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
        if (!isMove && (Date.now() - time) < 150) {
            callback && callback(e);
        }

        //重置参数
        isMove = false;
        time = 0;
    });

}

export default tap;
