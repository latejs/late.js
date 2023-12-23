import { Configuration } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import TerserWebpackPlugin from 'terser-webpack-plugin';
import JsonMinimizerPlugin from 'json-minimizer-webpack-plugin';
import { EsbuildPlugin } from 'esbuild-loader';
import { merge } from 'webpack-merge';
import { CustomStatsPlugin } from './plugins/custom-stats-plugin';
import { compressionPlugin } from './plugins/compression-webpack-plugin';
// import { imageMinimizerPlugin } from './plugins/image-minimizer-webpack-plugin';
import { copyWebpackPlugin } from './plugins/copy-webpack-plugin';
import { baseConfig } from './base';
import { IsDev, getEnv } from './env';
import { Config } from './config';

const config = (): Configuration => {
  const changeEsbuildMini =
    Config.esbuild === false
      ? !getEnv().watch
        ? [
            new CssMinimizerPlugin(),
            new TerserWebpackPlugin({
              parallel: true,
              extractComments: false,
              terserOptions: {
                compress: IsDev()
                  ? {}
                  : {
                      drop_console: true,
                      drop_debugger: true,
                      pure_funcs: ['console.log'],
                    },
              },
              // minify: TerserWebpackPlugin.swcMinify
            }),
          ]
        : []
      : [
          new EsbuildPlugin({
            treeShaking: true,
            keepNames: true,
            legalComments: 'none',
            css: true,
          }),
        ];

  return {
    mode: 'production',
    devtool: Config.productionSourceMap ? 'eval-source-map' : false,
    optimization: {
      minimize: true,
      minimizer: [
        ...changeEsbuildMini,
        new JsonMinimizerPlugin(),
        // imageMinimizerPlugin(),
      ],
    },
    cache: {
      type: 'filesystem',
      allowCollectingMemory: true,
    },
    plugins: [
      !getEnv().target ? copyWebpackPlugin() : undefined,
      new MiniCssExtractPlugin(
        !getEnv().target
          ? {
              filename: Config.filenameHashing
                ? `${Config.assetsDir}css/[name].[contenthash:8].css`
                : `${Config.assetsDir}css/[name].css`,
            }
          : {
              filename: `${Config.assetsDir}${getEnv().name}.min.css`,
            },
      ),
      new CustomStatsPlugin(),
      compressionPlugin(),
    ].filter((item) => item),
  };
};
export const buildConfig = (): Configuration => {
  return merge(baseConfig(), config());
};
