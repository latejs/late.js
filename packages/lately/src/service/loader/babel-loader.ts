import { RuleSetRule } from 'webpack';
// import { SrcPath, NodeModulesPath } from '../constant';

export const babelLoader = (): RuleSetRule => ({
  test: /\.(ts|tsx|js|jsx)$/,
  // include: SrcPath,
  // exclude: NodeModulesPath,
  loader: require.resolve('babel-loader'),
  // options: {
  //   compact: false,
  // },
});
