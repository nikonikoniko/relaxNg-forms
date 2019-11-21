const path = require('path');

module.exports = {
  entry: './demo/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'demo'),
  },
  devServer: {
    contentBase: ['./demo'],
    writeToDisk: true,
  },
};
