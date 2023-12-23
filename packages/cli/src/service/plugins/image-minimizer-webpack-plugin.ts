import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin';
import { Config } from '../config';

export const imageMinimizerPlugin = () => {
  return (
    Config.imageMinimizer &&
    new ImageMinimizerPlugin({
      minimizer: {
        implementation: ImageMinimizerPlugin.squooshMinify,
        options: {
          encodeOptions: {
            mozjpeg: {
              // That setting might be close to lossless, but it’s not guaranteed
              // https://github.com/GoogleChromeLabs/squoosh/issues/85
              quality: 100,
            },
            webp: {
              lossless: 1,
            },
            avif: {
              // https://github.com/GoogleChromeLabs/squoosh/blob/dev/codecs/avif/enc/README.md
              cqLevel: 0,
            },
          },
        },
      },
    })
  );
};
