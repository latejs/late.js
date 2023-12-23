import { RuleSetRule } from 'webpack';
import { commonCssLoader } from './common-css-loader';
import { Config } from '../config';
// import { SrcPath } from '../constant';

export const sassLoader = (): RuleSetRule => {
  return {
    test: /\.s[ca]ss$/,
    // include: SrcPath,
    // exclude: NodeModulesPath,
    oneOf: [
      {
        resourceQuery: /module/,
        use: [
          ...commonCssLoader(true),
          {
            loader: require.resolve('sass-loader'),
            options: Config.css?.loaderOptions?.sass || {},
          },
        ],
      },
      {
        use: [
          ...commonCssLoader(),
          {
            loader: require.resolve('sass-loader'),
            options: Config.css?.loaderOptions?.sass || {},
          },
        ],
      },
    ],
  };
};
