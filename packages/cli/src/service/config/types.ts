import { type Configuration } from 'webpack';
import { type Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { type LoaderOptions } from 'esbuild-loader';
import { type ESLintOptions } from 'eslint-webpack-plugin/types/options';
import { type ForkTsCheckerWebpackPluginOptions } from 'fork-ts-checker-webpack-plugin/lib/ForkTsCheckerWebpackPluginOptions';

interface LoaderOptionsCss {
  css?: object;
  style?: object;
  less?: object;
  sass?: object;
  postcss?: object;
}
interface CssConfig {
  extract?: boolean | 'default';
  requireModuleExtension?: boolean;
  sourceMap?: boolean;
  loaderOptions?: LoaderOptionsCss;
}

interface PageConfigItem {
  // page 的入口
  entry?: string;
  // 模板来源
  template?: string;
  // 在 dist/index.html 的输出
  filename?: string;
  // 当使用 title 选项时，
  // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
  title?: string;
  // 在这个页面中包含的块，默认情况下会包含
  // 提取出来的通用 chunk 和 vendor chunk。
  chunks?: string[];
}

export type PagesConfig = Record<string, PageConfigItem>;

export interface UserConfig {
  publicPath?: string;
  htmlTemplatePath?: string;
  outputDir?: string;
  assetsDir?: string;
  plugins?: Configuration['plugins'];
  staticDir?: string;
  indexPath?: string;
  filenameHashing?: boolean;
  productionSourceMap?: boolean;
  pages?: PagesConfig;
  css?: CssConfig;
  resolve?: Configuration['resolve'];
  gzip?: boolean;
  imageMinimizer?: boolean;
  lintOnSave?: boolean;
  devServer?: DevServerConfiguration;
  configureWebpack?: Configuration;
  esbuild?: boolean | LoaderOptions;
  eslint?: boolean | ESLintOptions;
  tsCheck?: boolean | ForkTsCheckerWebpackPluginOptions;
}
