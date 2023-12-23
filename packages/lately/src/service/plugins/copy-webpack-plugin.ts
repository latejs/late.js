// import path from 'path';
import CopyPlugin from 'copy-webpack-plugin';
import { Config } from '../config';
// import { mulitPages } from '../utils/mulit-pages';
// import { getEnv } from '../env';

const publicCopyIgnore = ['**/.DS_Store','**/.html'];

export const copyWebpackPlugin = () => {
  // if (
  //   Config.pages &&
  //   Object.keys(Config.pages).length &&
  //   mulitPages().plugins?.length &&
  //   !getEnv()?.target
  // ) {
  //   mulitPages().plugins.forEach((item) => {
  //     publicCopyIgnore.push(path.resolve(item.template!).replace(/\\/g, '/'));
  //   });
  // } else {
  //   publicCopyIgnore.push(
  //     path.resolve(Config.htmlTemplatePath!).replace(/\\/g, '/'),
  //   );
  // }
  return new CopyPlugin({
    patterns: [
      {
        from: Config.staticDir!,
        noErrorOnMissing: true,
        toType: 'dir',
        globOptions: {
          ignore: publicCopyIgnore,
        },
        force: true,
        to: Config.outputDir,
        info: { minimized: true },
      },
    ],
  });
};
