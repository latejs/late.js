import path from 'path';
import ESLintPlugin from 'eslint-webpack-plugin';
import { RootPath, SrcPath, NodeModulesPath } from '../constant';
import { Config } from '../config';
import { ESLintOptions } from 'eslint-webpack-plugin/types/options';

export const eslintPlugin = () => {
  return (
    Config.eslint !== false &&
    new ESLintPlugin({
      // @ts-ignore
      fix: Config.lintOnSave!,
      context: RootPath,
      lintDirtyModulesOnly: true,
      extensions: ['.vue', '.ts', '.tsx', '.js', '.jsx'],
      cache: false,
      exclude: NodeModulesPath,
      // files: [
      //   path.resolve(SrcPath, '/**/*.js'),
      //   path.resolve(SrcPath, '/**/*.ts'),
      //   path.resolve(SrcPath, '/**/*.tsx'),
      //   path.resolve(SrcPath, '/**/*.vue'),
      // ],
      ...(Config.eslint as ESLintOptions),
    })
  );
};
