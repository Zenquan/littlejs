/**
 * Created by zenquan on 2018/09/15.
 */

/*
 * 1.自动轮播  定时器  无缝衔接  动画结束瞬间定位
 * 2.点需要随着轮播的滚动改变对应的点  改变当前样式  当前图片的索引
 * 3.手指滑动的时候让轮播图滑动   touch事件  记录坐标轴的改变 改变轮播图的定位（位移css3）
 * 4.当滑动的距离不超过一定的距离的时候  需要吸附回去  过渡的形式去做
 * 5.当滑动超过了一定的距离  需要 跳到 下一张或者上一张  （滑动的方向） 一定的距离（屏幕的三分之一）
 * */
//公用方法
var util = {
    _: args => document.querySelector(args),
    //加过渡
    addTransition: function () {
        CarouselArgs.imageBox.style.transition = "all 0.3s";
        CarouselArgs.imageBox.style.webkitTransition = "all 0.3s"; /*做兼容*/
    },
    //清除过渡
    removeTransition: function () {
        CarouselArgs.imageBox.style.transition = "none";
        CarouselArgs.imageBox.style.webkitTransition = "none";
    },
    //定位
    setTranslateX: function (translateX) {
        CarouselArgs.imageBox.style.transform = "translateX(" + translateX + "px)";
        CarouselArgs.imageBox.style.webkitTransform = "translateX(" + translateX + "px)";
    }
}
//轮播图属性参数
let CarouselArgs = {
    imageCount: 5, //页面中用来轮播的图片有5张不同的
    //轮播图大盒子
    banner: util._('.banner'),
    //图片的宽度
    imgWidth: util._('.banner').offsetWidth,
    //图片盒子
    imageBox: util._('.banner').querySelector('ul:first-child'),
    //点盒子
    pointBox: util._('.banner').querySelector('ul:last-child'),
    //自动轮播  定时器  无缝衔接  动画结束瞬间定位
    index: 1,
    timer: setInterval(function () {
        this.index++; //自动轮播到下一张
        //改变定位  动画的形式去改变  transition transform translate
        util.addTransition(); //加过渡动画
        util.setTranslateX(-this.index * this.imgWidth); //定位
    }, 3000)
}
//所有的点
let points = CarouselArgs.pointBox.querySelectorAll('li');

//功能实现
/*
 手指滑动的时候让轮播图滑动   touch事件  记录坐标轴的改变 改变轮播图的定位（位移css3）
 当滑动的距离不超过一定的距离的时候  需要吸附回去  过渡的形式去做
 当滑动超过了一定的距离  需要 跳到 下一张或者上一张  （滑动的方向） 一定的距离（屏幕的三分之一）
 */
//touch事件
let touchArgs = {
    startX: 0, //记录起始  刚刚触摸的点的位置 x的坐标
    moveX: 0, //滑动的时候x的位置
    distanceX: 0, //滑动的距离
    isMove: false //是否滑动过
}
let CarouselFunction = {
    //改变当前样式  当前图片的索引
    setPoint: function () {
        //清除上一次的now
        for (var i = 0; i < points.length; i++) {
            points[i].className = " ";
        }
        //给图片对应的点加上样式
        points[CarouselArgs.index - 1].className = "now";
    },
    //重置参数
    resetTouch: function (params) {
        touchArgs.startX = 0;
        touchArgs.moveX = 0;
        touchArgs.distanceX = 0;
        touchArgs.isMove = false;
        //加定时器
        clearInterval(CarouselArgs.timer); //严谨 再清除一次定时器
        CarouselArgs.timer;
    }
}
let touchFunction = function (id) {
    if (id === 'touchstart'){
        CarouselArgs.imageBox.addEventListener(id, function (e) {
            clearInterval(CarouselArgs.timer); //清除定时器
            touchArgs.startX = e.touches[0].clientX; //记录起始X
        });
    } else if (id ==='touchmove') {
        CarouselArgs.imageBox.addEventListener(id, function (e) {
            touchArgs.moveX = e.touches[0].clientX; //滑动时候的X
            touchArgs.distanceX = touchArgs.moveX - touchArgs.startX; //计算移动的距离
            //计算当前定位  -CarouselArgs.index*width+touchArgs.distanceX
            util.removeTransition(); //清除过渡
            util.setTranslateX(-CarouselArgs.index * CarouselArgs.width + touchArgs.distanceX); //实时的定位
            touchArgs.isMove = true; //证明滑动过
        });
    } else if (id === 'touchend'){
        //在模拟器上模拟的滑动会有问题 丢失的情况  最后在模拟器的时候用window
        CarouselArgs.imageBox.addEventListener(id, function (e) {
            // 滑动超过 1/3 即为滑动有效，否则即为无效，则吸附回去
            if (touchArgs.isMove && Math.abs(touchArgs.distanceX) > CarouselArgs.imgWidth / 3) {
                //5.当滑动超过了一定的距离  需要 跳到 下一张或者上一张  （滑动的方向）*/
                if (touchArgs.distanceX > 0) { //上一张
                    CarouselArgs.index--;
                } else { //下一张
                    CarouselArgs.index++;
                }
            }
            util.addTransition(); //加过渡动画
            util.setTranslateX(-CarouselArgs.index * CarouselArgs.imgWidth); //定位

            if (CarouselArgs.index > CarouselArgs.imageCount) {
                CarouselArgs.index = 1;
            } else if (CarouselArgs.index <= 0) {
                CarouselArgs.index = CarouselArgs.imageCount;
            }
            CarouselFunction.resetTouch();
        })
    }
}
touchFunction('touchstart');
touchFunction('touchmove');
touchFunction('touchend');

//等过渡结束之后来做无缝衔接
utils.transitionEnd(CarouselArgs.imageBox, function () {
    //处理事件结束后的业务逻辑
    if (CarouselArgs.index > CarouselArgs.imageCount) {
        CarouselArgs.index = 1;
    } else if (CarouselArgs.index <= 0) {
        CarouselArgs.index = CarouselArgs.imageCount;
    }
    util.removeTransition(); //清除过渡
    util.setTranslateX(-CarouselArgs.index * CarouselArgs.imgWidth); //定位
    CarouselFunction.setPoint(); //设置底部显示当前图片对应的圆角
});
CarouselFunction.setPoint();
CarouselFunction.resetTouch();