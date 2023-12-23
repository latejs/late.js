import { RuleSetRule } from 'webpack';
import { commonCssLoader } from './common-css-loader';
// import { SrcPath } from '../constant';

export const cssLoader = (): RuleSetRule => ({
  test: /\.css$/,
  // include: SrcPath,
  // exclude: NodeModulesPath,
  use: [...commonCssLoader()],
});
