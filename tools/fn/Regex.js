/*
    修饰符:
        i: 执行对大小写不敏感的匹配。
        g: 执行全局匹配（查找所有匹配而非在找到第一个匹配后停止）。
        m: 执行多行匹配。
    元字符： 
    \d: 匹配一个数字字符。等价于 [0-9]。
    \D: 匹配一个非数字字符。等价于 [^0-9]。
    \f: 匹配一个换页符。等价于 \x0c 和 \cL。
    \n: 匹配一个换行符。等价于 \x0a 和 \cJ。
    \r: 匹配一个回车符。等价于 \x0d 和 \cM。
    \s: 匹配任何空白字符，包括空格、制表符、换页符等等。等价于 [ \f\n\r\t\v]。
    \S: 匹配任何非空白字符。等价于 [^ \f\n\r\t\v]。
    \t: 匹配一个制表符。等价于 \x09 和 \cI。
    \v: 匹配一个垂直制表符。等价于 \x0b 和 \cK。
    \w: 匹配字母、数字、下划线。等价于'[A-Za-z0-9_]'。
    \W: 匹配非字母、数字、下划线。等价于 '[^A-Za-z0-9_]'。
    \xn: 匹配 n，其中 n 为十六进制转义值。十六进制转义值必须为确定的两个数字长。
        例: '\x41' 匹配 "A"。'\x041' 则等价于 '\x04' & "1"。正则表达式中可以使用 ASCII 编码。
    \num: 匹配 num，其中 num 是一个正整数。对所获取的匹配的引用。
        例: '(.)\1' 匹配两个连续的相同字符。
    \n: 标识一个八进制转义值或一个向后引用。如果 \n 之前至少 n 个获取的子表达式，则 n 为向后引用。否则，如果 n 为八进制数字 (0-7)，则 n 为一个八进制转义值。
    \nm: 标识一个八进制转义值或一个向后引用。如果 \nm 之前至少有 nm 个获得子表达式，则 nm 为向后引用。如果 \nm 之前至少有 n 个获取，则 n 为一个后跟文字 m 的向后引用。如果前面的条件都不满足，若 n 和 m 均为八进制数字 (0-7)，则 \nm 将匹配八进制转义值 nm
    \nml: 如果 n 为八进制数字 (0-3)，且 m 和 l 均为八进制数字 (0-7)，则匹配八进制转义值 nml
    \un: 匹配 n，其中 n 是一个用四个十六进制数字表示的 Unicode 字符。
        例: \u00A9 匹配版权符号 (?)。
        
    \: 将下一个字符标记为一个特殊字符、或一个原义字符、或一个 向后引用、或一个八进制转义符。
        例:'n' 匹配字符 "n"。'\n' 匹配一个换行符。序列 '\\' 匹配 "\" 而 "\(" 则匹配 "("。
    ^: 匹配输入字符串的开始位置。如果设置了 RegExp 对象的 Multiline 属性，^ 也匹配 '\n' 或 '\r' 之后的位置。
        例： (^a) 就是匹配以字母a开头的字符串
    ^: 还有另个一个作用就是取反，比如[^xyz] 表示匹配的字符串不包含xyz
        例： [^xyz] 表示匹配的字符串不包含xyz
    $: 匹配输入字符串的结束位置。如果设置了RegExp 对象的 Multiline 属性，$ 也匹配 '\n' 或 '\r' 之前的位置。
        例： (b$) 就是匹配以字母b结尾的字符串
    *: 匹配前面的子表达式零次或多次。
        例: zo* 能匹配 "z" 以及 "zoo"。* 等价于{0,}。
    +: 匹配前面的子表达式一次或多次。
        例: 'zo+' 能匹配 "zo" 以及 "zoo"，但不能匹配 "z"。+ 等价于 {1,}。
    ?: 匹配前面的子表达式零次或一次。
        例: "do(es)?" 可以匹配 "do" 或 "does" 。? 等价于 {0,1}。
    ?: 当该字符紧跟在任何一个其他限制符 (*, +, ?, {n}, {n,}, {n,m}) 后面时，匹配模式是非贪婪的。非贪婪模式尽可能少的匹配所搜索的字符串，而默认的贪婪模式则尽可能多的匹配所搜索的字符串。
        例: 对于字符串 "oooo"，'o+?' 将匹配单个 "o"，而 'o+' 将匹配所有 'o'。
    {n}: n 是一个非负整数。匹配确定的 n 次。
        例: 'o{2}' 不能匹配 "Bob" 中的 'o'，但是能匹配 "food" 中的两个 o
    {n,}: n 是一个非负整数。至少匹配n 次。
        例: 'o{2,}' 不能匹配 "Bob" 中的 'o'，但能匹配 "foooood" 中的所有 o。'o{1,}' 等价于 'o+'。'o{0,}' 则等价于 'o*'。
    {n,m}: m 和 n 均为非负整数，其中n <= m。最少匹配 n 次且最多匹配 m 次。
        例: "o{1,3}" 将匹配 "fooooood" 中的前三个 o。'o{0,1}' 等价于 'o?'。请注意在逗号和两个数之间不能有空格。
    .: 匹配除 "\n" 之外的任何单个字符。要匹配包括 '\n' 在内的任何字符，请使用像"(.|\n)"的模式。
    (pattern): 匹配 pattern 并获取这一匹配。所获取的匹配可以从产生的 Matches 集合得到，在VBScript 中使用 SubMatches 集合，在JScript 中则使用 $0…$9 属性。要匹配圆括号字符，请使用 '\(' 或 '\)'
        例："(x)" 将匹配到 "x" 并将按顺序从 $1-$99 排序代替
        例：
            var url = "http://www.qidian.com/BookReader/1017141,20361055.aspx"
            var reg = /(http:\/\/www\.qidian\.com\/BookReader\/)(\d+),(\d+).aspx/gmi
            var rep=url.replace(reg,"$1ShowBook.aspx?bookId=$2&chapterId=$3");
            console.log(rep);
            // -> http://www.qidian.com/BookReader/ShowBook.aspx?bookId=1017141&chapterId=20361055
    (?:pattern)：匹配 pattern 但不获取匹配结果，也就是说这是一个非获取匹配，不进行存储供以后使用。这在使用 "或" 字符 (|) 来组合一个模式的各个部分是很有用。
        例：'industr(?:y|ies) 就是一个比 'industry|industries' 更简略的表达式。
    (?=pattern): 正向肯定预查（look ahead positive assert），在任何匹配pattern的字符串开始处匹配查找字符串。这是一个非获取匹配，也就是说，该匹配不需要获取供以后使用。
        例: "Windows(?=95|98|NT|2000)"能匹配"Windows2000"中的"Windows"，但不能匹配"Windows3.1"中的"Windows"。预查不消耗字符，也就是说，在一个匹配发生后，在最后一次匹配之后立即开始下一次匹配的搜索，而不是从包含预查的字符之后开始。
    (?!pattern): 正向否定预查(negative assert)，在任何不匹配pattern的字符串开始处匹配查找字符串。这是一个非获取匹配，也就是说，该匹配不需要获取供以后使用。
        例: "Windows(?!95|98|NT|2000)"能匹配"Windows3.1"中的"Windows"，但不能匹配"Windows2000"中的"Windows"。预查不消耗字符，也就是说，在一个匹配发生后，在最后一次匹配之后立即开始下一次匹配的搜索，而不是从包含预查的字符之后开始。
    (?<=pattern): 反向(look behind)肯定预查，与正向肯定预查类似，只是方向相反。
        例: "(?<=95|98|NT|2000)Windows"能匹配"2000Windows"中的"Windows"，但不能匹配"3.1Windows"中的"Windows"。
    (?<!pattern): 反向否定预查，与正向否定预查类似，只是方向相反。
        例: "(?<!95|98|NT|2000)Windows"能匹配"3.1Windows"中的"Windows"，但不能匹配"2000Windows"中的"Windows"。
    x|y: 匹配 x 或 y。
        例: 'z|food' 能匹配 "z" 或 "food"。'(z|f)ood' 则匹配 "zood" 或 "food"。
    [xyz]: 字符集合。匹配所包含的任意一个字符。
        例: '[abc]' 可以匹配 "plain" 中的 'a'。
    [^xyz]: 负值字符集合。匹配未包含的任意字符。
        例: '[^abc]' 可以匹配 "plain" 中的'p'、'l'、'i'、'n'。
    [a-z]: 字符范围。匹配指定范围内的任意字符。
        例: '[a-z]' 可以匹配 'a' 到 'z' 范围内的任意小写字母字符。
    [^a-z]: 负值字符范围。匹配任何不在指定范围内的任意字符。
        例: '[^a-z]' 可以匹配任何不在 'a' 到 'z' 范围内的任意字符。
    \b: 匹配一个单词边界，也就是指单词和空格间的位置。
        例: 'er\b' 可以匹配"never" 中的 'er'，但不能匹配 "verb" 中的 'er'。
    \B: 匹配非单词边界。
        例: 'er\B' 能匹配 "verb" 中的 'er'，但不能匹配 "never" 中的 'er'。
    \cx: 匹配由 x 指明的控制字符。
        例: \cM 匹配一个 Control-M 或回车符。x 的值必须为 A-Z 或 a-z 之一。否则，将 c 视为一个原义的 'c' 字符。
    
*/

// 方法：
//compile(regexp,modifier): 在脚本执行过程中编译正则表达式
/*
    regexp: 正则表达式
    modifier: 规定匹配的类型。"g" 用于全局匹配，"i" 用于区分大小写，"gi" 用于全局区分大小写的匹配。
*/
var compileStr = "Every man in the world! Every woman on earth!";
var compilePatt = /man/g;
var compilePatt1 = /(wo)?man/g;
compilePatt1.compile(compilePatt1)
var compileStrEle1 = compileStr.replace(compilePatt, "person");
var compileStrEle2 = compileStr.replace(compilePatt1, "person");
console.log(compileStrEle1) // -> Every person in the world! Every woperson on earth!
console.log(compileStrEle2) // -> Every person in the world! Every person on earth!



// exec(string): 用于检索字符串中的正则表达式的匹配。如果字符串中有匹配的值返回该匹配值，否则返回 null。
var execStr = "Hello world!";
var execPatt = /Hello/g;
var execStrEle = execPatt.exec(execStr);
console.log(execStrEle) // -> Hello


// test(string): 用于检测一个字符串是否匹配某个模式.如果字符串中有匹配的值返回 true ，否则返回 false
var testStr = "Hello world!";
var testPatt = /Hello/g;
var testPatt2 = /Helloaaa/g;
var testStrEle = testPatt.test(testStr);
var testStrEle2 = testPatt2.test(testStr);
console.log(testStrEle) // -> true
console.log(testStrEle2) // -> false



// match(regexp): 可在字符串内检索指定的值，或找到一个或多个正则表达式的匹配。如果没有找到任何匹配的文本， match() 将返回 null。否则，它将返回一个数组，其中存放了与它找到的匹配文本有关的信息。
var matchStr = "The rain in SPAIN stays mainly in the plain";
var matchEle = matchStr.match(/ain/gi);
console.log(matchEle)
    // -> ["ain", "AIN", "ain", "ain"]

 /* 常见正则表达式汇总*/

// let posInteger =  / ^ [1 - 9]\ d * $ /; //匹配正整数
// let negInteger = / ^ -[1 - 9]\ d * $ /; //匹配负整数
// let integer = / ^ - ? [1 - 9]\ d * $ /; //匹配整数
// let nonNegInteger = / ^ [1 - 9]\ d * | 0 $ /; //匹配非负整数（正整数 + 0）
// let nonPosInteger = /^ -[1 - 9]\d *| 0$ /;　//匹配非正整数（负整数 + 0）
//                 /^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$/　　  //匹配正浮点数
//                 /^ -([1 - 9]\d *\.\d *| 0\.\d * [1 - 9]\d *) $ /　 //匹配负浮点数
//                     /^-?([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0)$/　 //匹配浮点数
//                     /^ [1 - 9]\d *\.\d *| 0\.\d * [1 - 9]\d *| 0 ?\.0 +| 0$ /　　   //匹配非负浮点数（正浮点数 + 0）
//                         /^(-([1-9]\d*\.\d*|0\.\d*[1-9]\d*))|0?\.0+|0$/　//匹配非正浮点数（负浮点数 + 0）
//                         /^ [A - Za - z] + $ /　　    // 由26个英文字母组成的字符串 
//                         /^[A-Z]+$/　　       // 由26个英文字母的大写组成的字符串 
//                         /^ [a - z] + $ /　　       // 由26个英文字母的小写组成的字符串 
//                         /^[A-Za-z0-9]+$/　　 // 由数字和26个英文字母组成的字符串 
//                         /^\w + $ /              // 由数字、26个英文字母或者下划线组成的字符串 
//                             /^[\x00-\xff]+$/     // 匹配所有单字节长度的字符组成的字符串  
//                             /^ [^\x00 -\xff] + $ /    // 匹配所有双字节长度的字符组成的字符串
//                             /[^\x00-\xff]+/      // 字符串是否含有双字节字
//                             / n[s | ] * r /           // 匹配空行的正则 
//                             /(^s*)|(s*$)/        // 匹配首尾空格的正则
//                             /^ [a - zA - Z0 -9_]{ 1,} $ / // 所有包含一个以上的字母、数字或下划线的字符串
//                                 /[^\"\']/            // 除了双引号(")和单引号(')之外的所有字符
let checkStr = function (str, type) {
    switch (type) {
        case 'phone': //手机号码
            return /^1[3|4|5|7|8][0-9]{9}$/.test(str);
        case 'tel': //座机
            return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
        case 'card': //身份证
            return /^\d{15}|\d{18}$/.test(str);
        case 'pwd': //密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线
            return /^[a-zA-Z]\w{5,17}$/.test(str)
        case 'postal': //邮政编码
            return /[1-9]\d{5}(?!\d)/.test(str);
        case 'QQ': //QQ号
            return /^[1-9][0-9]{4,9}$/.test(str);
        case 'email': //邮箱
            return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
        case 'money': //金额(小数点2位)
            return /^\d*(?:\.\d{0,2})?$/.test(str);
        case 'URL': //网址
            return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(str)
        case 'IP': //IP
            return /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/.test(str);
        case 'date': //日期时间
            return /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2})(?:\:\d{2}|:(\d{2}):(\d{2}))$/.test(str) || /^(\d{4})\-(\d{2})\-(\d{2})$/.test(str)
        case 'number': //数字
            return /^[0-9]$/.test(str);
        case 'english': //英文
            return /^[a-zA-Z]+$/.test(str);
        case 'chinese': //中文
            return /^[\u4E00-\u9FA5]+$/.test(str);
        case 'lower': //小写
            return /^[a-z]+$/.test(str);
        case 'upper': //大写
            return /^[A-Z]+$/.test(str);
        case 'HTML': //HTML标记
            return /<("[^"]*"|'[^']*'|[^'">])*>/.test(str);
        default:
            return true;
    }
}

export default checkStr;