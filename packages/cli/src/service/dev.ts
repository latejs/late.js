import { Configuration } from 'webpack';
import { merge } from 'webpack-merge';
import { baseConfig } from './base';
import { eslintPlugin } from './plugins/eslint-plugin';
// import { forkTsCheckerWebpackPlugin } from './plugins/fork-ts-checker-webpack-plugin';
// import { Config} from './config';

const config = (): Configuration => ({
  mode: 'development',
  devtool: 'eval-source-map',
  cache: {
    type: 'memory',
  },
  // module: {
  //   noParse: /vue|pinia|vue-router|lodash/,
  // },
  // experiments: {
  //   lazyCompilation: true
  // },
  // experiments: {
  //   lazyCompilation: {
  //     entries: false, // 设置是否对 entry 启动按需编译特性；
  //     imports: true, // 设置是否对异步模块启动按需编译特性
  //   },
  // },
  plugins: [eslintPlugin()].filter(
    (item) => item,
  ),
});
export const devConfig = (): Configuration => {
  return merge(baseConfig(), config());
};
