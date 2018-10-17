class Type {
  //是否字符串
  isString(arg: any): boolean {
    return Object.prototype.toString.call(arg).slice(8, -1) === "String";
  }
  //是否数字
  isNumber(arg: any): boolean {
    return Object.prototype.toString.call(arg).slice(8, -1) === "Number";
  }
  //是否boolean
  isBoolean(arg: any): boolean {
    return Object.prototype.toString.call(arg).slice(8, -1) === "Boolean";
  }
  //是否函数
  isFunction(arg: any): boolean {
    return Object.prototype.toString.call(arg).slice(8, -1) === "Function";
  }
  //是否为null
  isNull(arg: any): boolean {
    return Object.prototype.toString.call(arg).slice(8, -1) === "Null";
  }
  //是否undefined
  isUndefined(arg: any): boolean {
    return Object.prototype.toString.call(arg).slice(8, -1) === "Undefined";
  }
  //是否对象
  isObj(arg: any): boolean {
    return Object.prototype.toString.call(arg).slice(8, -1) === "Object";
  }
  //是否数组
  isArray(arg: any): boolean {
    return Object.prototype.toString.call(arg).slice(8, -1) === "Array";
  }
  //是否时间
  isDate(arg: any): boolean {
    return Object.prototype.toString.call(arg).slice(8, -1) === "Date";
  }
  //是否正则
  isRegExp(arg: any): boolean {
    return Object.prototype.toString.call(arg).slice(8, -1) === "RegExp";
  }
  //是否错误对象
  isError(arg: any): boolean {
    return Object.prototype.toString.call(arg).slice(8, -1) === "Error";
  }
  //是否Symbol
  isSymbol(arg: any): boolean {
    return Object.prototype.toString.call(arg).slice(8, -1) === "Symbol";
  }
  //是否Promise对象
  isPromise(arg: any): boolean {
    return Object.prototype.toString.call(arg).slice(8, -1) === "Promise";
  }
  //是否Set对象
  isSet(arg: any): boolean {
    return Object.prototype.toString.call(arg).slice(8, -1) === "Set";
  }
  //是否为假
  isFalse(arg: any): boolean {
    if (
      arg == "" ||
      arg == undefined ||
      arg == 0 ||
      arg == null ||
      arg == "null" ||
      arg == "undefined" ||
      arg == false ||
      arg == NaN
    )
      return true;
    return false;
  }
  //是否为正
  isTrue(arg: any): boolean {
    return !this.isFalse(arg);
  }
  //是否为IOS
  isIOS(): boolean {
    let u: string = navigator.userAgent;
    if (u.indexOf("Linux") > -1 || u.indexOf("Android") > -1) {
      return false;
    } else if (u.indexOf("iPad") > -1) {
      return false;
    } else if (u.indexOf("window phone") > -1) {
      return false;
    } else if (u.indexOf("iphone")) {
      return true;
    } else {
      return false;
    }
  }
  //是否为PC端
  isPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = [
      "Android",
      "iPhone",
      "SymbianOS",
      "Windows Phone",
      "iPad",
      "iPod"
    ];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > 0) {
        flag = false;
        break;
      }
    }
    return flag;
  }
  //是什么浏览器类型
  browserType() {
    //取得浏览器的userAgent字符串
    var userAgent = navigator.userAgent;
    //判断是否Opera浏览器
    var isOpera = userAgent.indexOf("Opera") > -1;
    //判断是否IE浏览器
    var isIE =
      userAgent.indexOf("compatible") > -1 &&
      userAgent.indexOf("MSIE") > -1 &&
      !isOpera;
    var isIE11 =
      userAgent.indexOf("Trident") > -1 && userAgent.indexOf("rv:11.0") > -1;
    //判断是否IE的Edge浏览器
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE;
    //判断是否Firefox浏览器
    var isFF = userAgent.indexOf("Firefox") > -1;
    //判断是否Safari浏览器
    var isSafari =
      userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1;
    //判断Chrome浏览器
    var isChrome =
      userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1;

    if (isIE) {
      var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
      reIE.test(userAgent);
      var fIEVersion = parseFloat(RegExp["$1"]);
      if (fIEVersion == 7) return "IE7";
      else if (fIEVersion == 8) return "IE8";
      else if (fIEVersion == 9) return "IE9";
      else if (fIEVersion == 10) return "IE10";
      else return "IE7以下"; //IE版本过低
    }
    if (isIE11) return "IE11";
    if (isEdge) return "Edge";
    if (isFF) return "FF";
    if (isOpera) return "Opera";
    if (isSafari) return "Safari";
    if (isChrome) return "Chrome";
  }

  // 严格的身份证校验
  isCardID(sId: string) {
    if (!/(^\d{15}$)|(^\d{17}(\d|X|x)$)/.test(sId)) {
      alert("你输入的身份证长度或格式错误");
      return false;
    }
    //身份证城市
    var aCity: object = {
      11: "北京",
      12: "天津",
      13: "河北",
      14: "山西",
      15: "内蒙古",
      21: "辽宁",
      22: "吉林",
      23: "黑龙江",
      31: "上海",
      32: "江苏",
      33: "浙江",
      34: "安徽",
      35: "福建",
      36: "江西",
      37: "山东",
      41: "河南",
      42: "湖北",
      43: "湖南",
      44: "广东",
      45: "广西",
      46: "海南",
      50: "重庆",
      51: "四川",
      52: "贵州",
      53: "云南",
      54: "西藏",
      61: "陕西",
      62: "甘肃",
      63: "青海",
      64: "宁夏",
      65: "新疆",
      71: "台湾",
      81: "香港",
      82: "澳门",
      91: "国外"
    };
    if (!aCity[parseInt(sId.substr(0, 2))]) {
      alert("你的身份证地区非法");
      return false;
    }

    // 出生日期验证
    var sBirthday: string = (
        sId.substr(6, 4) +
        "-" +
        Number(sId.substr(10, 2)) +
        "-" +
        Number(sId.substr(12, 2))
      ).replace(/-/g, "/"),
      d = new Date(sBirthday);
    if (
      sBirthday !=
      d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate()
    ) {
      alert("身份证上的出生日期非法");
      return false;
    }

    // 身份证号码校验
    var sum = 0,
      weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],
      codes = "10X98765432";
    for (var i = 0; i < sId.length - 1; i++) {
      sum += Number(sId[i]) * weights[i];
    }
    var last = codes[sum % 11]; //计算出来的最后一位身份证号码
    if (sId[sId.length - 1] != last) {
      alert("你输入的身份证号非法");
      return false;
    }

    return true;
  }
}

export default Type;
