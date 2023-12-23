import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { RuleSetUseItem } from 'webpack';
import { IsDev } from '../env';
import { Config } from '../config';

export const commonCssLoader = (
  isModule: boolean = false,
): RuleSetUseItem[] => {
  const modulesOptions = isModule
    ? {
        esModule: true,
        modules: {
          localIdentName: '[name]__[local]--[hash:base64:5]',
        },
        ...Config.css?.loaderOptions?.css,
      }
    : {
        ...Config.css?.loaderOptions?.css,
      };

  return [
    typeof Config.css?.extract === 'boolean' && Config.css?.extract
      ? MiniCssExtractPlugin.loader
      : IsDev()
        ? {
            loader: require.resolve('style-loader'),
            options: Config.css?.loaderOptions?.style || {},
          }
        : MiniCssExtractPlugin.loader,

    {
      loader: require.resolve('css-loader'),
      options: modulesOptions,
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        postcssOptions: {
          plugins: [['postcss-preset-env', 'autoprefixer']],
        },
        ...Config.css?.loaderOptions?.postcss
      }
    },
  ];
};
