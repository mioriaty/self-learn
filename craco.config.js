const webpack = require('webpack');

module.exports = {
  style: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },
  webpack: {
    plugins: {
      add: [
        new webpack.DefinePlugin({
          process: { env: {} }
        })
      ]
    },
    loaders: [
      {
        test: /\.mp3$/,
        loader: 'file-loader',
      },
    ]
  }
};
