'use strict';

var Px2rpx = require('./lib/px2rpx');
var path = require('path');
var fs = require('fs');

  var px2rpxIns = new Px2rpx({rpxUnit: 2});
  var srcPath = path.join(__dirname, 'test/assets/test.2x.css');
  var srcText = fs.readFileSync(srcPath, {encoding: 'utf8'});

  px2rpxIns.generateRpx(srcText);

