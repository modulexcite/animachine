'use strict';

var EventEmitter = require('events').EventEmitter;
var inherits = require('inherits');
var WebStorageman = require('./storages/WebStorageman');
var decorDialog = require('./decorDialog');

function Warehouseeman(opt) {

    EventEmitter.call(this);

    decorDialog(this);

    opt = opt || {};

    this._storages = [];
    this.addStorage(new WebStorageman());
    this.addStorage({icon: 'hdd'});
    this.addStorage({icon: 'git'});
    this.addStorage({icon: 'evernote'});
    this.addStorage({icon: 'dropbox'});

    this.selecteStorage(this._storages[0]);
}

inherits(Warehouseeman, EventEmitter);
var p = Warehouseeman.prototype;

p.addStorage = function (storage) {

    this._storages.push(storage);
    this.emit('changeStorages');
};

p.selecteStorage = function (storage) {

    this._currStorage = storage;
};

p.save = function (name, data, path) {

    return this._currStorage.save(name, data, path);
};

p.load = function (name, path   ) {

    return this._currStorage.load(name, path);
};

p.mkdir = function (path) {

    return this._currStorage.mkdir(path);
};

p.dir = function (path) {

    return this._currStorage.dir(path);
};

module.exports = Warehouseeman;
