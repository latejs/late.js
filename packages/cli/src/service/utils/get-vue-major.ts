import getPkg from '../../utils/get-pkg';

export const getVue3Major = (): boolean => {
  const pkg = getPkg();
  const vueVersion = pkg.dependencies.vue;
  return vueVersion.startsWith('3.') || vueVersion.startsWith('^3.');
};
