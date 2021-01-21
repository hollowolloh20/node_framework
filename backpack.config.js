const path = require('path');

module.exports = {
  webpack: (config, options, webpack) => {
    config.entry.main = ['./index.ts'];

    config.resolve = {
      extensions: ['.ts', '.js', '.json'],
    };

    config.module.rules.push({
      test: /\.ts$/,
      loader: 'awesome-typescript-loader',
    });

    config.module.rules.push({
      test: /\.js|\.ts$/,
      exclude: /node_modules/,
      loader: 'eslint-loader',
    });

    config.resolve.alias = {
      '~': path.resolve(__dirname, './'),
    };

    return config;
  },
};
