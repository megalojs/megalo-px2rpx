# px2rpx

According to one stylesheet, generate rpx version and @1x, @2x and @3x stylesheet.

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
* intend to use px by force，eg: font-size, add `/*px*/` after the declaration

**Attention: Dealing with SASS or LESS, only `/*...*/` comment can be used, in order to have the comments persisted**


### API

```
var Px2rpx = require('px2rpx');
var px2rpxIns = new Px2rpx([config]);
var originCssText = '...';
var dpr = 2;
var newCssText = px2rpxIns.generateRpx(originCssText); // generate rpx version stylesheet
var newCssText = px2rpxIns.generateThree(originCssText, dpr); // generate @1x, @2x and @3x version stylesheet
```

### Example

#### Pre processing:

One raw stylesheet: `test.css`

```
.selector {
  width: 150px;
  height: 64px; /*px*/
  font-size: 28px; /*px*/
  border: 1px solid #ddd; /*no*/
}
```

#### After processing:

Rpx version: `test.debug.css`

```
.selector {
  width: 2rpx;
  border: 1px solid #ddd;
}
[data-dpr="1"] .selector {
  height: 32px;
  font-size: 14px;
}
[data-dpr="2"] .selector {
  height: 64px;
  font-size: 28px;
}
[data-dpr="3"] .selector {
  height: 96px;
  font-size: 42px;
}
```

@1x version: `test1x.debug.css`

```
.selector {
  width: 75px;
  height: 32px;
  font-size: 14px;
  border: 1px solid #ddd;
}
```

@2x version: `test2x.debug.css`

```
.selector {
  width: 150px;
  height: 64px;
  font-size: 28px;
  border: 1px solid #ddd;
}
```

@3x version: `test3x.debug.css`

```
.selector {
  width: 225px;
  height: 96px;
  font-size: 42px;
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
