import { RuleSetRule } from 'webpack';
import { commonCssLoader } from './common-css-loader';
import { Config } from '../config';
// import { SrcPath } from '../constant';

export const lessLoader = (): RuleSetRule => {
  return {
    test: /\.less$/i,
    // include: SrcPath,
    // exclude: NodeModulesPath,
    oneOf: [
      {
        resourceQuery: /module/,
        use: [
          ...commonCssLoader(true),
          {
            loader: require.resolve('less-loader'),
            options: Config.css?.loaderOptions?.less || {},
          },
        ],
      },
      {
        use: [
          ...commonCssLoader(),
          {
            loader: require.resolve('less-loader'),
            options: Config.css?.loaderOptions?.less || {},
          },
        ],
      },
    ],
  };
};
