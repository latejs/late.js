import webpack from 'webpack';
import { getEnv } from '../env';

export const definePlugin = () => {
  return new webpack.DefinePlugin({
    // '__VUE_OPTIONS_API__': true,
    // '__VUE_PROD_DEVTOOLS__': false,
    'process.env': JSON.stringify(getEnv()),
    'import.meta.env': JSON.stringify(getEnv())
  });
};
