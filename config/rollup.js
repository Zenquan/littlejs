var pkg = require('../package.json');

// 兼容 jslib-base 和 @yanhaijing/jslib-base 
var name = pkg.name.split('/').pop();
var version = pkg.version;

var banner = 
`/*!
 * littlejs ${version} (https://github.com/zenquan/littlejs)
 * API https: //github.com/zenquan/littlejs/blob/master/doc/api.md
 * Copyright 2017-${(new Date).getFullYear()} zenquan. All Rights Reserved
 * Licensed under MIT(https: //github.com/zenquan/littlejs/blob/master/LICENSE)
 */
`;

exports.name = name;
exports.banner = banner;
