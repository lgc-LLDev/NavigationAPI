/* global ll mc Format PermType */
// LiteLoaderScript Dev Helper
/// <reference path="../HelperLib/src/index.d.ts"/>

const pluginName = 'NavigationAPI';
const exportNamespace = 'NavAPI';
const tasks = new Map();
const { Red, Green, Aqua, White, LightPurple, Clear, MinecoinGold } = Format;

/**
 * @typedef {Object} FloatPosObject
 * @property {number} x
 * @property {number} y
 * @property {number} z
 * @property {number} dimId
 */
/**
 * @typedef {Object} Warp
 * @property {FloatPosObject} pos
 * @property {string} name
 */

/**
 * @param {FloatPosObject} pos
 * @returns {string}
 */
function formatPos(pos) {
  const { x, y, z, dimId } = pos;
  const dim = (() => {
    switch (dimId) {
      case 0:
        return '主世界';
      case 1:
        return '地狱';
      case 2:
        return '末地';
      default:
        return '未知';
    }
  })();
  return (
    `${White}${x.toFixed(0)}, ` +
    `${y.toFixed(0)}, ` +
    `${z.toFixed(0)}, ` +
    `${LightPurple}${dim}`
  );
}

/**
 * 停止导航任务
 *
 * @param {string} xuid 玩家Xuid
 * @returns {boolean} 是否成功
 */
function clearNavigationTask(xuid) {
  const pl = mc.getPlayer(xuid);
  const taskId = tasks.get(xuid);

  if (!taskId) {
    pl.tell(`${Red}没有导航进行中`);
    return false;
  }

  clearInterval(taskId);
  tasks.delete(xuid);
  pl.tell(`${Green}本次导航完成~欢迎下次使用~`, 5);
  return true;
}

/**
 * 获取玩家是否正在导航中
 *
 * @param {string} xuid 玩家Xuid
 * @returns {boolean} 玩家导航状态 true为正在导航
 */
function hasNavigationTask(xuid) {
  return !!tasks.get(xuid); // to boolean
}

/**
 * 新建导航任务
 *
 * @param {string} xuid 玩家Xuid
 * @param {Warp} warp warp对象
 * @returns {boolean} 是否成功
 */
function newNavigationTask(xuid, warp) {
  const tmpPl = mc.getPlayer(xuid);

  /**
   * @param {number} x
   * @param {number} z
   * @returns {string}
   */
  function formatXZPos(x, z) {
    return `${Green}${x.toFixed()}, ~, ${z.toFixed()}`;
  }

  if (hasNavigationTask(xuid)) {
    tmpPl.tell(`${Red}已有导航正在进行中，请先结束`);
    return false;
  }

  function task() {
    const pl = mc.getPlayer(xuid);
    const {
      pos: { x, y, z, dimid: dimId },
    } = pl;
    const { pos, name } = warp;
    const { x: dx, y: dy, z: dz, dimId: dDim } = pos;
    const distance = Math.sqrt(
      (x - dx) * (x - dx) + (y - dy) * (y - dy) + (z - dz) * (z - dz)
    );

    let msg =
      `${Green}${name}${Clear} | ` +
      `${MinecoinGold}目标位置: ${formatPos(pos)}${Clear} | `;
    if (dimId !== dDim) {
      msg += (() => {
        if (dimId === 2 || dDim === 2) return `${Red}维度不匹配`;
        if (dDim === 1)
          // warp点在地狱
          return `${MinecoinGold}主世界坐标: ${formatXZPos(dx * 8, dz * 8)}`;
        if (dDim === 0)
          // warp点在主世界
          return `${MinecoinGold}地狱坐标: ${formatXZPos(dx / 8, dz / 8)}`;
        return `${Red}非法导航`;
      })();
    } else {
      if (distance <= 3) {
        clearNavigationTask(pl.xuid);
        return;
      }

      msg +=
        `${MinecoinGold}距离 ${Green}${distance.toFixed(2)} ` +
        `${MinecoinGold}方块`;
    }
    pl.tell(msg, 5);
  }

  tmpPl.tell(`${Green}开始为您导航~`);
  tmpPl.tell(`${Green}开始为您导航~`, 5);
  const taskId = setInterval(task, 500);
  tasks.set(xuid, taskId);
  return true;
}

mc.listen('onLeft', (pl) => clearNavigationTask(pl.xuid));

mc.listen('onServerStarted', () => {
  const cmd = mc.newCommand('stopnav', '停止导航', PermType.Any);

  cmd.setCallback((_, origin, out) => {
    if (!origin.player) {
      out.error(
        '该指令只能由玩家执行，请使用execute命令模拟目标玩家执行该指令'
      );
      return false;
    }
    return clearNavigationTask(origin.player.xuid);
  });

  cmd.overload();
  cmd.setup();
});

ll.exports(newNavigationTask, `${exportNamespace}_newTask`);
ll.exports(clearNavigationTask, `${exportNamespace}_clearTask`);
ll.exports(hasNavigationTask, `${exportNamespace}_hasTask`);

ll.registerPlugin(pluginName, '导航API', [0, 1, 4], {
  Author: 'student_2333',
  License: 'Apache-2.0',
});
