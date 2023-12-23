import { RuleSetRule } from 'webpack';
import { IsDev } from '../env';
import { Config } from '../config';
// import { SrcPath } from '../constant';

export const assetLoader = (): RuleSetRule[] => {
  return [
    {
      test: /\.(png|jpeg|jpg|gif|webm)$/,
      type: 'asset',
      // include: SrcPath,
      // exclude: NodeModulesPath,
      parser: {
        dataUrlCondition: {
          maxSize: 2 * 1024,
        },
      },
      generator: {
        filename: IsDev()
          ? `${Config.assetsDir}image/[name][ext]`
          : `${Config.assetsDir}image/[name][contenthash:8][ext]`,
      },
    },
    {
      test: /\.svg$/,
      type: 'asset/resource',
      generator: {
        filename: IsDev()
          ? `${Config.assetsDir}image/[name][ext]`
          : `${Config.assetsDir}image/[name][contenthash:8][ext]`,
      },
      // include: SrcPath,
      // exclude: NodeModulesPath,
    },
    // {
    //   test: /\.html$/i,
    //   // include: SrcPath,
    //   loader: require.resolve("html-loader"),
    //   // options: {
    //   //   esModule: false,
    //   // },
    // },
    {
      test: /\.txt/,
      // include: SrcPath,
      type: 'asset/source',
    },
    {
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aa)$/,
      type: 'asset/resource',
      // include: SrcPath,
      // exclude: NodeModulesPath,
      parser: {
        dataUrlCondition: {
          maxSize: 2 * 1024,
        },
      },
      generator: {
        filename: IsDev()
          ? `${Config.assetsDir}media/[name][ext]`
          : `${Config.assetsDir}media/[name][contenthash:8][ext]`,
      },
    },
    {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      type: 'asset',
      // include: SrcPath,
      // exclude: NodeModulesPath,
      parser: {
        dataUrlCondition: {
          maxSize: 10 * 1024,
        },
      },
      generator: {
        filename: IsDev()
          ? `${Config.assetsDir}font/[name][ext]`
          : `${Config.assetsDir}font/[name][contenthash:8][ext]`,
      },
    },
  ];
};
