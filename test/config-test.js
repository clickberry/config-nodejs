process.env.CONFIG_DIR = 'test';
process.env.NODE_ENV = 'development';
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
    it('should return url', function () {
        assert.equal(config.getUrl('path'), 'http://myhost:3000/url_path');
    });
});

describe('GetBool function', function () {
    it('should return true', function () {
        console.log(config.get('true'));
        console.log(config.get('false'));
        assert.equal(config.getBool('true'), true);
    });

    it('should return false', function () {
        assert.equal(config.getBool('false'), false);
    });

    it('should return true from string', function () {
        assert.equal(config.getBool('boolTrue', false), true);
        assert.equal(config.getBool('boolTrue', true), true);
    });

    it('should return false from string', function () {
        assert.equal(config.getBool('boolFalse', true), false);
        assert.equal(config.getBool('boolFalse', false), false);
    });

    it('should rreturn default value from null', function () {
        assert.equal(config.getBool('boolNull', true), true);
        assert.equal(config.getBool('boolNull', false), false);
    });

    it('should return default value from empty', function () {
        assert.equal(config.getBool('boolEmpty', true), true);
        assert.equal(config.getBool('boolEmpty', false), false);
    });

    it('should return default value from any string', function () {
        assert.equal(config.getBool('boolString', true), true);
        assert.equal(config.getBool('boolString', false), false);
    });

    it('should return default value if not exists', function () {
        assert.equal(config.getBool('valNotExist', true), true);
        assert.equal(config.getBool('valNotExist', false), false);
    });
});
