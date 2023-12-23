import path from 'path';
import { Options } from 'html-webpack-plugin';
import { type Configuration } from 'webpack';
import getCwd from '../../utils/get-cwd';
import { Config } from '../config';
import { getEnv } from '../env';
import { HtmlTemplatePath } from '../constant';

interface MulitiPages {
  entry: Configuration['entry'];
  plugins: Options[];
}
// 多入口文件配置
export const mulitPages = (): MulitiPages => {
  const mulitiConfig: MulitiPages = {
    entry: {},
    plugins: [],
  };
  const pages = Config.pages;
  if (pages && Object.keys(pages).length) {
    Object.keys(pages)?.map?.((key) => {
      const item = pages[key];
      const name = path.parse(item.entry!)?.name;
      mulitiConfig.entry = {
        [name]: getCwd(item.entry),
      };
      mulitiConfig.plugins = [];
      mulitiConfig.plugins.push({
        filename: `${item.filename || 'index.html'}`,
        template: `${item.template ? getCwd(item.template) : HtmlTemplatePath}`,
        inject: true,
        // chunks: item.chunks || ['vendors', 'common', 'runtime'],
        chunks: ['vendors', 'common', name],
        chunksSortMode: 'manual',
        templateParameters: {
          BASE_URL: Config.publicPath,
          ...getEnv(),
        },
      });
    });
  }
  return mulitiConfig;
};
