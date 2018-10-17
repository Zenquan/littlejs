// rollup.config.js

var babel = require('rollup-plugin-babel');
var common = require('./rollup.js');

export default {
    input: 'tools/index.js',
    output: {
        file: 'dist/fn/index.js',
        format: 'cjs',
        // 如果不同时使用 export 与 export default 可打开legacy
        // legacy: true,
        banner: common.banner,
    },
    plugins: [
        babel({
            runtimeHelpers: true,
            exclude: 'node_modules/**'
        })
    ]
};
