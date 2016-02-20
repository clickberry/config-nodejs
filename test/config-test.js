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

describe('GetArray function', function () {
    it('should return array', function () {
        assert.ok(config.getArray('array') instanceof Array);
        assert.ok(config.getArray('arrayNotExist') instanceof Array);
    });

    it('should return empty array', function () {
        assert.equal(config.getArray('numberVal').length, 0);
        assert.equal(config.getArray('arrayNotExist').length, 0);
        assert.equal(config.getArray('boolVal').length, 0);
    });

    it('should return array with values', function () {
        var array=config.getArray('array');
        assert.equal(array[0], '1');
        assert.equal(array[1], '2');
        assert.equal(array[2], '3');
    });

    it('should split values', function () {
        var array=config.getArray('splitingVal', ':');
        assert.equal(array[0], 'a');
        assert.equal(array[1], 'b');
        assert.equal(array[2], 'c');
    });
});