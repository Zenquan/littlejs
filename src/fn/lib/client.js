let client = function () {
    //判断：如果浏览器支持window.innerWidth，直接用这个方法。不支持再用其他两个方法
    if (window.innerWidth) {
        return {
            "width": window.innerWidth,
            "height": window.innerHeight
        };
    } else if (document.compatMode === "CSS1Compat") {
        return {
            "width": document.documentElement.clientWidth,
            "height": document.documentElement.clientHeight
        };
    } else {
        return {
            "width": document.body.clientWidth,
            "height": document.body.clientHeight
        };
    }
}

module.exports = client;