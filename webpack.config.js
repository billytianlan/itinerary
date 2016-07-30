module.exports = {
  entry: [
    '/client/components/index.jsx'
  ],
  output: {
    path: '/public',
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
