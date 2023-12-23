import { RuleSetRule } from 'webpack';
import { IsDev } from '../env';
import { getVue3Major } from '../utils/get-vue-major';
// import { SrcPath } from '../constant';

export const vueLoader = (): RuleSetRule => ({
  test: /\.vue$/,
  loader: getVue3Major()
    ? require.resolve('vue-loader')
    : require.resolve('@vue/vue-loader-v15'),
  // include: SrcPath,
  options: {
    hotReload: IsDev(),
    extractCSS: !IsDev(),
    // babelParserPlugins: ['jsx', 'classProperties', 'decorators-legacy']
  },
});
