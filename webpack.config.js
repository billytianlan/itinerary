module.exports = {
  entry: [
    __dirname + '/client/src/components/index.jsx'
  ],
  output: {
    path: __dirname + '/client',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015']
      }
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
  // devServer: {
  //   historyApiFallback: true,
  //   contentBase: './'
  // }
};
