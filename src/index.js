/*
 * @Author: Quinn
 * @Date: 2021-04-16 10:37:30
 * @LastEditTime: 2021-04-16 14:46:52
 * @LastEditors: quinn
 * @Description: 用于插入js到html
 * https://zhuanlan.zhihu.com/p/142010380
 */
class QuinnPlugin {
    constructor(options = {}) {
        this.options = {
            // dist 模块路径
            assetsPath: 'index.html',
            jsList: [
                // {
                //     type: 'none',
                //     src: '',
                //     content: '',
                // }
            ],
            ...options
        }
    }
    // 接收一个complier对象参数,这个参数是webpack工作中最核心的对象,其中包含了此次构建的所有配置信息,我们也是通过这个对象注册钩子函数
    apply(compiler) {
        let assetsPath = this.options.assetsPath
        let jsList = this.options.jsList
        // 钩子函数： 输出 asset 到 output 目录之前执行
        // 注册自定义插件钩子到生成资源到 output 目录之前，拿到compilation对象（编译好的stream）
        compiler.hooks.emit.tap("QuinnPlugin", compilation => {
            // 构建产物 模块路径对象
            let assets = compilation.assets
            // 判断是否有目标模块路径 assetsPath
            if (assets.hasOwnProperty(assetsPath)) {
                // .source()是获取构建产物的文本
                // .assets中包含构建产物的文件名
                let content = assets[assetsPath].source();
                jsList.map(item => {
                    let jsType = ['async', 'defer'].indexOf(item.type) != -1 ? ` ${item.type}` : '';
                    let jsSrc = item.src ? ` src="${item.src}"` : '';
                    let jsCon = item.content ? item.content : '';
                    let str = '<script' + jsType + jsSrc + '>' + jsCon + '</script>';
                    content = content.replace('</body>', `${str}</body>`)
                })
                compilation.assets[assetsPath] = {
                    source: () => content,
                    size: () => content.length
                }
            }
        })
    }
}
module.exports = QuinnPlugin;