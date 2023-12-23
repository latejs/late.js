import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

export const bundleAnalyzerPlugin = () => {
  return new BundleAnalyzerPlugin({
    analyzerMode: 'disabled',
    generateStatsFile: true,
  });
};
