import { VueLoaderPlugin as VueLoaderPluginV15 } from '@vue/vue-loader-v15';
import {VueLoaderPlugin} from 'vue-loader';
import { getVue3Major } from '../utils/get-vue-major';

export const vueLoaderPlugin = () => {
  return getVue3Major()
  ? new (require('vue-loader').VueLoaderPlugin)()
  : new (require('@vue/vue-loader-v15').VueLoaderPlugin)()
};
