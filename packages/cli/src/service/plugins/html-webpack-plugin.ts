import HtmlWebpackPlugin from 'html-webpack-plugin';
import { Config } from '../config';
import { getEnv } from '../env';
import { mulitPages } from '../utils/mulit-pages';

export const htmlWebpackPlugin = () => {
 
  return Config.pages &&
    Object.keys(Config.pages).length &&
    mulitPages().plugins?.length && !getEnv()?.target
    ? mulitPages().plugins?.map((option) => {
        return new HtmlWebpackPlugin(option);
      })
    : !getEnv()?.target
      ? [
          new HtmlWebpackPlugin({
            filename: Config.indexPath,
            template: Config.htmlTemplatePath,
            templateParameters: {
              BASE_URL: Config.publicPath,
              ...getEnv(),
            },
            inject: true,
            minify: true,
          }),
        ]
      : [];
};
