const {merge} = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const commonConfig = require('./webpack.common.js');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('./../package.json');

const devConfig = {
  mode: 'development',
  devServer: {
    port: 8081,
    historyApiFallback: {
        index: '/index.html',
    }
  },
  plugins: [
    new ModuleFederationPlugin({
        name: 'marketing',
        filename: 'remoteEntry.js',
        exposes: {
            './MarketingApp': './src/bootstrap', // this MarketingApp is the name that we will use in the container to import the marketing app. The path is the path to the bootstrap file in the marketing app.
        },
        shared: packageJson.dependencies, //this is to share the dependencies between the container and the marketing app. This is to avoid having multiple versions of react and react-dom in the same app.
    }),
    new HtmlWebpackPlugin({
        template: './public/index.html',
    })
  ]
}

module.exports = merge(commonConfig, devConfig); //the devConfig overrides anything in commonConfig.