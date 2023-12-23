import { Configuration } from 'webpack';
import { DistPath } from '../constant';
import { IsDev } from '../env';
import { Config } from '../config';

export const output = (): Configuration['output'] => {
  return {
    filename: Config.filenameHashing
      ? IsDev()
        ? `${Config.assetsDir}js/[name].js`
        : `${Config.assetsDir}js/[name].[contenthash:8].js`
      : `${Config.assetsDir}js/[name].js`,
    path: Config.outputDir || DistPath,
    publicPath: Config.publicPath,
    pathinfo: false,
    clean: IsDev() ? false : true,
  };
};
