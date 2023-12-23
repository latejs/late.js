import { type Configuration } from 'webpack';
import { vueLoader } from './loader/vue-loader';
import { vueLoaderPlugin } from './plugins/vue-loader-plugin';
import { babelLoader } from './loader/babel-loader';
import { esbuildLoader } from './loader/esbuild-loader';
import { lessLoader } from './loader/less-loader';
import { sassLoader } from './loader/sass-loader';
import { cssLoader } from './loader/css-loader';
import { assetLoader } from './loader/asset-loader';
import { definePlugin } from './plugins/define-plugin';
import { htmlWebpackPlugin } from './plugins/html-webpack-plugin';
import { webpackBarPlugin } from './plugins/webapck-bar-plugin';
import { getEnv } from './env';
import { entry } from './entry';
import { output } from './output';
import { Config } from './config';

export const baseConfig = (): Configuration => {
  const commonLoaders = [
    sassLoader(),
    lessLoader(),
    cssLoader(),
    ...assetLoader(),
  ];
  const changesEsbuiladLoaders =
    Config.esbuild === false ? [babelLoader()] : esbuildLoader();

  return {
    entry: entry(),
    output: output(),
    // target: 'web',
    stats: 'errors-only',
    infrastructureLogging: {
      level: 'error',
    },
    resolve: Config.resolve,
    module: {
      rules: [vueLoader(), ...changesEsbuiladLoaders!, ...commonLoaders],
    },
    plugins: [
      ...Config.plugins!,
      webpackBarPlugin(),
      definePlugin(),
      vueLoaderPlugin(),
      ...htmlWebpackPlugin(),
    ].filter((item) => item),
  };
};
