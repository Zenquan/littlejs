/*--------------------generator's runner---------------------*/
/*
使用实例：runner(function *(){
  let data1=yield $.ajax({url: xxx, dataType: 'json'});
  let data2=yield $.ajax({url: xxx, dataType: 'json'});
  let data3=yield $.ajax({url: xxx, dataType: 'json'});
  console.log(data1, data2, data3);
});
注意要引进jq
*/
let runner = function (_gen) {
    return new Promise((resolve, reject) => {
        var gen = _gen();

        _next();

        function _next(_last_res) {
            var res = gen.next(_last_res);

            if (!res.done) {
                var obj = res.value;

                if (obj.then) {
                    obj.then((res) => {
                        _next(res);
                    }, (err) => {
                        reject(err);
                    });
                } else if (typeof obj == 'function') {
                    if (obj.constructor.toString().startsWith('function GeneratorFunction()')) {
                        runner(obj).then(res => _next(res), reject);
                    } else {
                        _next(obj());
                    }
                } else {
                    _next(obj);
                }
            } else {
                resolve(res.value);
            }
        }
    });
}

export default runner;