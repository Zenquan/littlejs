## 目的
学了几个月js，就在此做个重构，以做总结与提升。因为这个库比较基础，也没什么技术含量，故名Little。
[库文件github地址](https://github.com/Jomsou/demo-blog/tree/master/personalib/Little.js)
## 功能
一般的简单普通页面都用到以下功能库：
1、运动框架（轮播图、按钮渐显渐隐）；
2、选项卡；
3、用ajax实现前后端分离；
4、设置、获取或者删除cookie；
5、支持异步方法之一generator的使用。
## 测试
[库测试](http://jomsou.me/demo-blog/personalib/Little.js/index.html)
## 使用
for example:
在body结束标签结束前引入Little.js
```
<script src="src/Little.js"></script>
```
然后使用函数
```
var ex = new Little('div1');
 ex.startMove(this, {'opacity': 100});
```