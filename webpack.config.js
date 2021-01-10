const path = require('path');

module.exports = {
  entry: ['./src/js/index.js', './src/js/main.js'],
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: 'bundle.js',
  },
  mode: 'development',
  // mode: 'production',
  watch: true,
  watchOptions: {
    ignored: ['node_modules/**'],
  },
};
