// import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
// import { RootPath, TsConfigPath } from '../constant';
// import { Config } from '../config';
// import { type ForkTsCheckerWebpackPluginOptions } from 'fork-ts-checker-webpack-plugin/lib/ForkTsCheckerWebpackPluginOptions';

// export const forkTsCheckerWebpackPlugin = () => {
//   return (
//     Config.tsCheck !== false &&
//     new ForkTsCheckerWebpackPlugin({
//       typescript: {
//         memoryLimit: 4096,
//         configFile: TsConfigPath,
//         context: RootPath,
//         extensions: {
//           vue: {
//             enabled: true,
//             compiler: '@vue/compiler-sfc',
//           },
//         },
//       },
//       ...(Config.tsCheck as ForkTsCheckerWebpackPluginOptions),
//     })
//   );
// };
