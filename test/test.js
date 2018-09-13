var expect = require('expect.js');

var little = require('../dist/index.js');

describe('单元测试', function() {
    this.timeout(1000);

    describe('功能1', function() {
        it('相等', function() {
            expect(little.name).to.equal('little');
        });
    });

    describe('功能2', function() {
        it('不相等', function() {
            expect(little.name).not.to.equal(1);
        });
    });
});
