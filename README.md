<!-- markdownlint-disable MD033 -->

# NavigationAPI

导航功能 API

[鸣谢](#鸣谢)

## 前言

这个插件的内容是从 EveryoneWarp 插件独立出来的，目的是想让我还有其他开发者的插件也能对接我的导航功能使用

## 图片

介绍图片来自 EveryoneWarp

![5](https://raw.githubusercontent.com/lgc-LLDev/readme/main/EveryoneWarp/5.png)  
![6](https://raw.githubusercontent.com/lgc-LLDev/readme/main/EveryoneWarp/6.png)

## 使用

### 引入

```jsonc
// manifest.json
{
  // ...
  "dependencies": [
    {
      "name": "NavigationAPI"
    }
  ]
}
```

```js
const newNavigationTask = ll.import('NavAPI_newTask');
const clearNavigationTask = ll.import('NavAPI_clearTask');
const hasNavigationTask = ll.import('NavAPI_hasTask');
```

### 接口定义

其他语言的参数类型参考 [LL 文档](https://docs.litebds.com/zh_CN/Development/ScriptAPI/Ll.html)

```js
/**
 * NavAPI_newTask
 *
 * 新建导航任务
 *
 * warp对象必须包含的项目示例
 * {
 *     "pos": {
 *         "x": 39.43924331665039,
 *         "y": 65.62001037597656,
 *         "z": 92.11305236816406,
 *         "dimid": 0
 *     },
 *     "name": "岩浆池"
 * }
 *
 * @param {String} xuid 玩家Xuid
 * @param {Object} warp warp对象，示例见上
 * @returns {Boolean} 是否成功
 */
function newNavigationTask(xuid, warp) {}

/**
 * NavAPI_clearTask
 *
 * 停止导航任务
 *
 * @param {String} xuid 玩家Xuid
 * @returns {Boolean} 是否成功
 */
function clearNavigationTask(xuid) {}

/**
 * NavAPI_hasTask
 *
 * 获取玩家是否正在导航中
 *
 * @param {String} xuid 玩家Xuid
 * @returns {Boolean} 玩家导航状态 true为正在导航
 */
function hasNavigationTask(xuid) {}
```

### 示例

[EveryoneWrap](https://github.com/lgc-LLDev/EveryoneWarp/blob/master/EveryoneWarp.lls.js)

### 指令

插件提供一个指令`/stopnav`用于停止命令执行者的导航任务

## 安装

```bash
lip install github.com/lgc-LLDev/NavigationAPI
```

## 配置文件

插件没有配置文件

## 鸣谢

感谢 Tech Sky City 服务器腐竹的支持和玩家的试用与反馈！  
TSC 是一个 1.18.2 基岩版的生电服务器  
安装有 Trapdoor，FakePlayer 等插件  
服务器规则原汁原味，死亡掉落、没有传送指令……  
如果你有兴趣想加入他们，点击[这里](https://jq.qq.com/?_wv=1027&k=p2ke7c5F)

## 联系我

QQ：3076823485  
吹水群：[1105946125](https://jq.qq.com/?_wv=1027&k=Z3n1MpEp)  
邮箱：<lgc2333@126.com>

## 赞助

感谢大家的赞助！你们的赞助将是我继续创作的动力！

- [爱发电](https://afdian.net/@lgc2333)

- <details>
    <summary>赞助二维码（点击展开）</summary>
  
  ![讨饭](https://raw.githubusercontents.com/lgc2333/ShigureBotMenu/master/src/imgs/sponsor.png)
  
  </details>

## 更新日志

### 0.2.0

- 接口dimId修改为dimid，适配ll, 方便对接

- 优化actionbar的显示风格，坐标保留整数，统一xyz颜色

### 0.1.2

- 修复坐标换算显示错误的 Bug
- 适配旧版 lxl

### 0.1.1

- 修复了在末地时显示坐标换算的 Bug
- 修复玩家到地方不能结束导航
- 修改了指令 `stopnavigation` -> `stopnav`
