import { merge } from 'webpack-merge';
import common from './webpack.torben.common.js';

export default merge(common, {
  mode: "production",
  devtool: "source-map"
});