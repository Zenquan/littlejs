/**
 * Created by zenquan on 2018.10.01
 */
var ex = new little();
/*
 * 1.自动轮播  定时器  无缝衔接  动画结束瞬间定位
 * 2.点需要随着轮播的滚动改变对应的点  改变当前样式  当前图片的索引
 * 3.手指滑动的时候让轮播图滑动   touch事件  记录坐标轴的改变 改变轮播图的定位（位移css3）
 * 4.当滑动的距离不超过一定的距离的时候  需要吸附回去  过渡的形式去做
 * 5.当滑动超过了一定的距离  需要 跳到 下一张或者上一张  （滑动的方向） 一定的距离（屏幕的三分之一）
 * */
//轮播图大盒子
let banner = document.querySelector('.banner');
let bannerInitArgs = {
    imageCount: 5, //页面中用来轮播的图片有5张不同的
    //图片的宽度
    width: banner.offsetWidth,
    //图片盒子
    imageBox: banner.querySelector('ul:first-child'),
    //点盒子
    pointBox: banner.querySelector('ul:last-child'),

}
//所有的点
let points = bannerInitArgs.pointBox.querySelectorAll('li');
let Transition = {
    //公用方法
    //加过渡
    addTransition() {
        bannerInitArgs.imageBox.style.transition = "all 0.3s";
        bannerInitArgs.imageBox.style.webkitTransition = "all 0.3s"; /*做兼容*/
    },
    //清除过渡
    removeTransition() {
        bannerInitArgs.imageBox.style.transition = "none";
        bannerInitArgs.imageBox.style.webkitTransition = "none";
    },
    //定位
    setTranslateX(translateX) {
        bannerInitArgs.imageBox.style.transform = "translateX(" + translateX + "px)";
        bannerInitArgs.imageBox.style.webkitTransform = "translateX(" + translateX + "px)";
    }

}
//功能实现
//自动轮播  定时器  无缝衔接  动画结束瞬间定位
var index = 1;
var timer = setInterval(function () {
    index++; //自动轮播到下一张
    //改变定位  动画的形式去改变  transition transform translate
    Transition.addTransition(); //加过渡动画
    Transition.setTranslateX(-index * bannerInitArgs.width); //定位
}, 3000);

//等过渡结束之后来做无缝衔接
ex.transitionEnd(bannerInitArgs.imageBox, function () {
    //处理事件结束后的业务逻辑
    if (index > bannerInitArgs.imageCount) {
        index = 1;
    } else if (index <= 0) {
        index = bannerInitArgs.imageCount;
    }
    Transition.removeTransition(); //清除过渡
    Transition.setTranslateX(-index * bannerInitArgs.width); //定位
    setPoint(); //设置底部显示当前图片对应的圆角
});

//改变当前样式  当前图片的索引
var setPoint = function () {
    //清除上一次的now
    for (var i = 0; i < points.length; i++) {
        points[i].className = " ";
    }
    //给图片对应的点加上样式
    points[index - 1].className = "now";
}

/*
 手指滑动的时候让轮播图滑动   touch事件  记录坐标轴的改变 改变轮播图的定位（位移css3）
 当滑动的距离不超过一定的距离的时候  需要吸附回去  过渡的形式去做
 当滑动超过了一定的距离  需要 跳到 下一张或者上一张  （滑动的方向） 一定的距离（屏幕的三分之一）
 */
//touch事件
var startX = 0; //记录起始  刚刚触摸的点的位置 x的坐标
var moveX = 0; //滑动的时候x的位置
var distanceX = 0; //滑动的距离
var isMove = false; //是否滑动过

bannerInitArgs.imageBox.addEventListener('touchstart', function (e) {
    clearInterval(timer); //清除定时器
    startX = e.touches[0].clientX; //记录起始X
});

bannerInitArgs.imageBox.addEventListener('touchmove', function (e) {
    moveX = e.touches[0].clientX; //滑动时候的X
    distanceX = moveX - startX; //计算移动的距离
    //计算当前定位  -index*width+distanceX
    Transition.removeTransition(); //清除过渡
    Transition.setTranslateX(-index * bannerInitArgs.width + distanceX); //实时的定位
    isMove = true; //证明滑动过
});

//在模拟器上模拟的滑动会有问题 丢失的情况  最后在模拟器的时候用window
bannerInitArgs.imageBox.addEventListener('touchend', function (e) {
    // 滑动超过 1/3 即为滑动有效，否则即为无效，则吸附回去
    if (isMove && Math.abs(distanceX) > bannerInitArgs.width / 3) {
        //5.当滑动超过了一定的距离  需要 跳到 下一张或者上一张  （滑动的方向）*/
        if (distanceX > 0) { //上一张
            index--;
        } else { //下一张
            index++;
        }
    }
    Transition.addTransition(); //加过渡动画
    Transition.setTranslateX(-index * bannerInitArgs.width); //定位

    if (index > bannerInitArgs.imageCount) {
        index = 1;
    } else if (index <= 0) {
        index = bannerInitArgs.imageCount;
    }
    setPoint();

    //重置参数
    startX = 0;
    moveX = 0;
    distanceX = 0;
    isMove = false;
    //加定时器
    clearInterval(timer); //严谨 再清除一次定时器
    timer = setInterval(function () {
        index++; //自动轮播到下一张
        Transition.addTransition(); //加过渡动画
        Transition.setTranslateX(-index * bannerInitArgs.width); //定位
    }, 3000);
});
