const path = require('path');

module.exports = {
  entry: './dev/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dev'),
  },
  devServer: {
    contentBase: ['./dev'],
  },
};
