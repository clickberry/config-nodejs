var config = require('nconf');
var path = require('path');
var appRoot = require('app-root-path');

var configDir = process.env.CONFIG_DIR || 'config';
var configFileDir = path.join(appRoot.path, configDir);

var configName = process.env.NODE_ENV ? process.env.NODE_ENV + '.json' : null;

config.argv()
    .env('_')
    .file('default', {file: path.join(configFileDir, 'default.json')})

if (configName) {
    config.file({file: path.join(configFileDir, configName)});
}


if (get('node:env') === 'development') {
    console.warn('ENVIRONMENT set to "development" mode.');
}

function get(param) {
    return config.get(param.toUpperCase()) || config.get(param);
}

function getInt(param, defValue) {
    var value = get(param);
    return parseInt(value) || defValue || 0;
}

function getBool(param, defValue) {
    defValue = !!defValue;
    var value = get(param);
    if (typeof (value) == 'string') {
        return value ? value.toString().toLowerCase() == 'true' : defValue;
    } else if (typeof (value) == 'boolean') {
        return value;
    }

    return defValue;
}

function getUrl(param) {
    var url = get('protocol') + '://' + get('host:name');
    var hostName = get('host:port') == 80 ? url : url + ':' + get('host:port');
    var pathUrl = get(param);
    return hostName + pathUrl;
}

exports.get = get;
exports.getInt = getInt;
exports.getBool = getBool;
exports.getUrl = getUrl;