process.env.CONFIG_DIR = 'test';
var config = require('..');
var assert = require('assert');

describe('Get from development.json function', function () {
    it('should return value', function () {
        assert.equal(config.get('testVal'), 'value');
    });
});

describe('Get from default.json', function () {
    it('should return value', function () {
        assert.equal(config.get('defaultVal'), 'default');
    });
});

describe('GetInt function', function () {
    console.log(config.getUrl('path'));
    it('should return number', function () {
        assert.equal(typeof config.getInt('intVal'), 'number');
    });

    it('should return default 123', function () {
        assert.equal(config.getInt('valNotExist', 123), 123);
    });

    it('should return default 0', function () {
        assert.equal(config.getInt('valNotExist'), 0);
    });
});

describe('GetUrl function', function () {
    console.log(config.getUrl('path'));
    it('should return url', function () {
        assert.equal(config.getUrl('path'), 'http://myhost:3000/url_path');
    });
});
