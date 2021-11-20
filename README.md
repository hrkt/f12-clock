# f12-Clock

A Zen-styled programmer's clock in the HTML comments.

Humor matters.

![GIF Animation](./doc/f12-clock.gif)

## Demo site

[Demo site](http://hrkt.github.io/f12-clock/)

## features

- f12-clock run in "F12" developers console via HTML comment
- No dependency to other modules

## Usage

### HTML

1. import f12-clock.js (*1)
2. add id to the tag use choose

```
<!DOCTYPE html>
<html id="f12-clock">
  <head><title>f12-clock - Press F12 to show it</title></head>
  <body>
    <script src="./dist/f12-clock.js"></script>
  </body>
</html>

```

(*1)...

1. use npm https://www.npmjs.com/package/f12-clock

```
npm i f12-clock --save-dev 
```

2. copy file from girhub 

```
dist/f12-clock.js

or

dist/f12-clock-min.js
```

## Tested on

|OS|Browser|Status|
|--|--|--|
|Windows|Firefox 94|✅|
|Windows|Chrome 96.0|✅|
|macOS|Safari 15.0|✅|


## Future work

- support for options
- support for emoji

## LICENSE

MIT

## CI

![GitHub Actions](https://github.com/hrkt/f12-clock/actions/workflows/node.js.yml/badge.svg)
