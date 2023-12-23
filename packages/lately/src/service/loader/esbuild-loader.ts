import { RuleSetRule } from 'webpack';
import { Config } from '../config';
// import { SrcPath, NodeModulesPath } from '../constant';

export const esbuildLoader = (): RuleSetRule[] => {
  return Config.esbuild !== false
    ? [
        {
          test: /\.(ts|tsx|js)$/,
          // include: SrcPath,
          // exclude: NodeModulesPath,
          use: [
            {
              loader: require.resolve('esbuild-loader'),
              options: {
                loader: 'tsx',
                target: 'es2015',
                jsx: 'automatic',
                jsxFactory: 'h',
                jsxFragment: 'Fragment',
                jsxImportSource: `vue`,
              },
            },
          ],
        },
      ]
    : [];
};
