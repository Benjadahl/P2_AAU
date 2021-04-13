import { merge } from 'webpack-merge';
import common from './webpack.torben.common.js';

export default merge(common, {
  mode: "development",
  devtool: "eval-cheap-module-source-map"
});