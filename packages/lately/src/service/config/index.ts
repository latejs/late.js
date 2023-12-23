import fs from 'fs';
import mergeObj from 'merge';
import { Configuration } from 'webpack';
import { resolveConfig } from './resolve-config';
import { UserConfig } from './types';
import {
  DistPath,
  HtmlTemplatePath,
  SrcPath,
  AssetsPath,
  StaticDir,
} from '../constant';
import getCwd from '../../utils/get-cwd';
import { genHistoryApiFallbackRewrites } from './utils';

export const Config: UserConfig = {
  // project deployment base
  publicPath: '/',

  // where to output built files
  outputDir: DistPath,

  // html template
  htmlTemplatePath: HtmlTemplatePath,

  plugins: [],

  // where to put static assets (js/css/img/font/...)
  assetsDir: '',

  staticDir: StaticDir,

  // filename for index.html (relative to outputDir)
  indexPath: 'index.html',

  // whether filename will contain hash part
  filenameHashing: true,

  // sourceMap for production build?
  productionSourceMap: false,

  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores

  // multi-page config
  pages: undefined,

  // 开启gizp
  gzip: false,

  // 开启图片压缩
  imageMinimizer: true,

  css: {
    extract: 'default',
    sourceMap: false,
    loaderOptions: {},
  },

  resolve: {
    alias: {
      'assets': AssetsPath,
      '@': SrcPath,
    },
    extensions: [
      '.ts',
      '.tsx',
      '.json',
      '.js',
      '.jsx',
      '.vue',
      '.sass',
      '.scss',
      '.less',
      '.css',
    ],
  },

  // whether to use eslint-loader
  lintOnSave: false,

  devServer: {},
  configureWebpack: {},

  esbuild: {},

  eslint: {},

  tsCheck: {},
};

export const readConfig = () => {
  const ConfigFiles = [
    'lately.config.js',
    'lately.config.mjs',
    'lately.config.ts',
    'lately.config.cjs',
    'lately.config.mts',
    'lately.config.cts',
  ];

  let resolvedPath = null;
  for (const filename of ConfigFiles) {
    const filePath = getCwd(filename);
    if (!fs.existsSync(filePath)) continue;
    resolvedPath = filePath;
    break;
  }
  if (resolvedPath) {
    resolveConfig(resolvedPath);
  }
};

export const updateWebpackConfig = (config: Configuration) => {
  // 合并webpack配置
  mergeObj(Config.configureWebpack, config);
};

export const updateDevServer = (config: Configuration['devServer']) => {
  mergeObj(Config.devServer, {
    static: {
      directory: Config.staticDir,
      publicPath: Config.publicPath,
      watch: true,
    },
    historyApiFallback: {
      disableDotRule: true,
      htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
      rewrites: genHistoryApiFallbackRewrites(Config.publicPath, Config.pages),
    },
    compress: true,
    port: 3000,
    hot: true,
    host: '0.0.0.0',
    client: {
      logging: 'none',
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    devMiddleware: {
      stats: {
        all: false,
        errors: true,
        warnings: true,
      },
    },
    setupExitSignals: true,
    ...config,
  });
};

export const updateConfig = (config: UserConfig) => {
  const { configureWebpack = {}, devServer, ...restConfig } = config || {};
  // 合并基本配置
  mergeObj(Config, { ...restConfig });
  // 合并开发服务器
  updateDevServer(devServer);
  // 合并webpack配置
  updateWebpackConfig(configureWebpack);
};

export const defineConfig = (userConfig: UserConfig) => {
  return userConfig;
};

export { UserConfig };
