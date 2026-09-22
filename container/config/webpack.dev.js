const {merge} = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common.js');
const packageJson = require('./../package.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const devConfig = {
  mode: 'development',
  devServer: {
    port: 8080,
    historyApiFallback: {
        index: 'index.html',
    }
  },
  plugins: [
    new ModuleFederationPlugin({
        name: 'container',
        remotes: {
            marketing: 'marketing@http://localhost:8081/remoteEntry.js', //should match up with the name: 'marketing' and the port match up with thw devserver port in the marketing webpack config.
        },
        shared: packageJson.dependencies, //this is to share the dependencies between the container and the marketing app. This is to avoid having multiple versions of react and react-dom in the same app.
    }),
  ],
};

module.exports = merge(commonConfig, devConfig); //the devConfig overrides anything in commonConfig.