'use strict';

var assert = require('assert');
var Px2rpx = require('../lib/px2rpx');
var path = require('path');
var fs = require('fs');

describe('should work with @x375 origin css file', function () {
  var px2rpxIns = new Px2rpx({rpxUnit: 0.5});
  var srcPath = path.join(__dirname, 'assets/test.css');
  var srcText = fs.readFileSync(srcPath, {encoding: 'utf8'});

  it('[default] should output right rpx file', function () {
    var expectedPath = path.join(__dirname, 'output/default.rpx.css');
    var outputText = px2rpxIns.generateRpx(srcText);
    assert.equal(outputText, fs.readFileSync(expectedPath, {encoding: 'utf8'}));
  });
});

describe('should work with @x750 origin css file', function () {
  var px2rpxIns = new Px2rpx(/*{rpxUnit: 1}*/);
  var srcPath = path.join(__dirname, 'assets/test.2x.css');
  var srcText = fs.readFileSync(srcPath, {encoding: 'utf8'});

  it('[default] should output right rpx file', function () {
    var expectedPath = path.join(__dirname, 'output/default.rpx.css');
    var outputText = px2rpxIns.generateRpx(srcText);
    assert.equal(outputText, fs.readFileSync(expectedPath, {encoding: 'utf8'}));
  });
});

describe('should work with @x1125 origin css file', function () {
  var px2rpxIns = new Px2rpx({rpxUnit: 1.5});
  var srcPath = path.join(__dirname, 'assets/test.3x.css');
  var srcText = fs.readFileSync(srcPath, {encoding: 'utf8'});

  it('[default] should output right rpx file', function () {
    var expectedPath = path.join(__dirname, 'output/default.rpx.css');
    var outputText = px2rpxIns.generateRpx(srcText);
    assert.equal(outputText, fs.readFileSync(expectedPath, {encoding: 'utf8'}));
  });
});
