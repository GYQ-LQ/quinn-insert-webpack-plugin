<!--
 * @Author: Quinn
 * @Date: 2021-04-16 14:45:48
 * @LastEditTime: 2021-04-16 15:02:23
 * @LastEditors: quinn
 * @Description:  
-->

# quinn-insert-webpack-plugin

### 1、简介（Introduction）

Quinn 个人的 webpack 插件，用于插入 js 到 html

用途：对打包后的文件输出到 dist 过程中，对 dist 内目标 html 文件插入自定义的 js

### 2、安装（Install）

``` bash
npm i quinn-insert-webpack-plugin --save-dev
```

### 3、用法（Usage）

* 参数

``` js
{
    // dist 模块路径
    assetsPath: 'index.html',
    jsList: [{
        // 可取值：defer/async
        type: '',
        // script的src属性
        src: '',
        // script内的代码块
        content: '',
    }],
    ...options
}
```

### 4、示例说明（Example）

* 示例：

``` js
const QuinnInsertWebpackPlugin = require('quinn-insert-webpack-plugin');

new QuinnInsertWebpackPlugin({
    // dist 文件路径
    assetsPath: 'system.html',
    jsList: [{
        type: 'async',
        src: 'https://www.cnd.com/SJL9D66HYGW.js'
    }, {
        content: `console.log("This is quinn-insert-webpack-plugin");`
    }]
}),
```

插入后的伪代码：

``` html
<html>

<head>
    <meta charset="utf-8">
    <title>quinn-insert-webpack-plugin</title>
</head>

<body>
    <div id="app"></div>
    <script async src="https://www.cnd.com/SJL9D66HYGW.js"></script>
    <script>
        console.log("This is quinn-insert-webpack-plugin");
    </script>
</body>

</html>
```
