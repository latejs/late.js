// import pkg from '../package.json';
// import checkNodeVersion from './utils/check-node-version';
import { initCli } from './cli';
import { defineConfig, UserConfig } from './service/config';
import { PagesConfig } from './service/config/types';
import mergeConfig from 'merge';

// 获取允许的noe版本
// const requiredVersion = pkg.engines.node;
// 检查node版本
initCli();
// checkNodeVersion(requiredVersion, '@latelyjs/lately').then(() => {
//   // 初始化脚手架
//   initCli();
// });

export { defineConfig, UserConfig, PagesConfig, mergeConfig };
