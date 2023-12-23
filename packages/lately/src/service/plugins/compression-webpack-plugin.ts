import CompressionPlugin from 'compression-webpack-plugin';
import { Config } from '../config';

export const compressionPlugin = () => {
  return (
    Config.gzip &&
    new CompressionPlugin({
      test: /\.(js|css)$/, // 需要压缩的文件类型
      algorithm: 'gzip', // 压缩算法
      filename: '[path][base].gz',
      threshold: 1024, // 只有大于1KB的文件才会被压缩
      minRatio: 0.8, // 只有压缩率大于0.8的文件才会被保留
    })
  );
};
