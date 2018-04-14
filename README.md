# divides

把一个整数按照指定的数量随机分成一个长度与数量相同的数组，这是整数版的

## 安装

1. node

```
$ npm install divides
```

2. bower

```
$ bower install divides
```

## 使用

```javascript
const divides = require('divides');

// 把100分成10个数，但是不能有等于10的
let arr = divides(100, 10, function(result){
  return !result.some(item => item === 10);
});

// 把-100分成10个数
let arr = divides(-100, 10);

// 把0分成10个数，会返回10个0的数组
let arr = divides(0, 10);
```