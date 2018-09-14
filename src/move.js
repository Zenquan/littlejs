/*------------------------move--------------------------*/
//完美运动框架
let move = function(obj, json, fnEnd) {
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

            if (cur != json[attr])
                bStop = false;

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
}

export default move;