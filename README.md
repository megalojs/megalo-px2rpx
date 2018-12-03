# px2rpx

According to one stylesheet, generate rpx version.

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Downloads][downloads-image]][downloads-url]

[npm-image]: https://img.shields.io/npm/v/@megalo/px2rpx.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@megalo/px2rpx
[travis-image]: https://img.shields.io/travis/megalojs/megalo-px2rpx.svg?style=flat-square
[travis-url]: https://travis-ci.org/megalojs/megalo-px2rpx
[coveralls-image]: https://img.shields.io/coveralls/megalojs/megalo-px2rpx.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/megalojs/megalo-px2rpx
[downloads-image]: http://img.shields.io/npm/dm/@megalo/px2rpx.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/@megalo/px2rpx


## Usage

The raw stylesheet only contains @2x style, and if you

* don't intend to transform the original value, eg: 1px border, add `/*no*/` after the declaration

**Attention: Dealing with SASS or LESS, only `/*...*/` comment can be used, in order to have the comments persisted**


### API

```
var Px2rpx = require('@megalojs/px2rpx');
var px2rpxIns = new Px2rpx({
  {rpxUnit: 0.5}
});
var originCssText = '...';
var newCssText = px2rpxIns.generateRpx(originCssText); // generate rpx version stylesheet
```

### Example

#### Pre processing:

One raw stylesheet: `test.css`

```
.selector {
  width: 350px;
  height: 60px; 
  font-size: 20px; 
  border: 1px solid #ddd; /*no*/
}
```

#### After processing:

Rpx version: `test.debug.css`

```
.selector {
  width: 750rpx;
  height: 120rpx;
  font-size: 40rpx;
  border: 1px solid #ddd;
}
```

## Technical proposal

comment hook + css parser

## Change Log

### 0.0.1

* forked from [songsiqi/px2rem](https://github.com/songsiqi/px2rem) and rename px2rpx

## License

MIT
