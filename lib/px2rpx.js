'use strict';

var css = require('css');
var extend = require('extend');

var defaultConfig = {
  rpxUnit: 1,            // rpx unit value (default: 1)
  rpxPrecision: 6,        // rpx value precision (default: 6)
  keepComment: 'no'       // no transform value comment (default: `no`)
};

var pxRegExp = /\b(\d+(\.\d+)?)px\b/;

function Px2rpx(options) {
  this.config = {};
  extend(this.config, defaultConfig, options);
}

// generate rpx version stylesheet
Px2rpx.prototype.generateRpx = function (cssText) {
  var self = this;
  var config = self.config;
  var astObj = css.parse(cssText);

  function processRules(rules) { // FIXME: keyframes do not support `force px` comment
    for (var i = 0; i < rules.length; i++) {
      var rule = rules[i];
      if (rule.type === 'media') {
        processRules(rule.rules); // recursive invocation while dealing with media queries
        continue;
      } else if (rule.type === 'keyframes') {
        processRules(rule.keyframes); // recursive invocation while dealing with keyframes
        continue;
      } else if (rule.type !== 'rule' && rule.type !== 'keyframe') {
        continue;
      }

      var declarations = rule.declarations;
      for (var j = 0; j < declarations.length; j++) {
        var declaration = declarations[j];
        // need transform: declaration && has 'px'
        if (declaration.type === 'declaration' && pxRegExp.test(declaration.value)) {
          var nextDeclaration = declarations[j + 1];
          if (nextDeclaration && nextDeclaration.type === 'comment') { // next next declaration is comment
            if (nextDeclaration.comment.trim() === config.keepComment) { // no transform
              declarations.splice(j + 1, 1); // delete corresponding comment
              continue;
            } else {
              declaration.value = self._getCalcValue('rpx', declaration.value); // common transform
            }
          } else {
            declaration.value = self._getCalcValue('rpx', declaration.value); // common transform
          }
        }
      }

      // if the origin rule has no declarations, delete it
      if (!rules[i].declarations.length) {
        rules.splice(i, 1);
        i--;
      }
    }
  }

  processRules(astObj.stylesheet.rules);

  return css.stringify(astObj);
};

// get calculated value of px or rpx
Px2rpx.prototype._getCalcValue = function (type, value) {
  var config = this.config;
  var pxGlobalRegExp = new RegExp(pxRegExp.source, 'g');

  function getValue(val) {
    val = parseFloat(val.toFixed(config.rpxPrecision)); // control decimal precision of the calculated value
    return val == 0 ? val : val + type;
  }

  return value.replace(pxGlobalRegExp, function ($0, $1) {
    return getValue($1 / config.rpxUnit);
  });
};

module.exports = Px2rpx;
