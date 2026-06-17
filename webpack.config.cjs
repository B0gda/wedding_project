const path = require('node:path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const publicPath = process.env.PUBLIC_PATH ?? '/';

module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: path.resolve(__dirname, 'src/main.tsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: isProduction ? 'assets/[name].[contenthash:8].js' : 'assets/[name].js',
    publicPath,
    clean: true
  },
  devtool: isProduction ? 'source-map' : 'eval-source-map',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@app': path.resolve(__dirname, 'src/app'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@widgets': path.resolve(__dirname, 'src/widgets'),
      '@features': path.resolve(__dirname, 'src/features'),
      '@entities': path.resolve(__dirname, 'src/entities'),
      '@constants': path.resolve(__dirname, 'src/constants'),
      '@shared': path.resolve(__dirname, 'src/shared')
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: false,
            compilerOptions: {
              noEmit: false
            }
          }
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpe?g|webp|gif|pdf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name].[contenthash:8][ext]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      favicon: path.resolve(__dirname, 'public/favicon.svg'),
      minify: isProduction
    })
  ],
  devServer: {
    host: 'localhost',
    port: 3000,
    allowedHosts: 'all',
    historyApiFallback: true,
    hot: true,
    liveReload: true,
    static: {
      directory: path.resolve(__dirname, 'public'),
      publicPath: '/'
    },
    watchFiles: {
      paths: ['src/**/*', 'public/**/*'],
      options: {
        ignored: /node_modules/
      }
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Authorization'
    },
    client: {
      overlay: {
        errors: true,
        warnings: false,
        runtimeErrors: (error) => error?.message !== 'Script error.'
      },
      reconnect: true,
      webSocketURL: {
        hostname: 'localhost',
        pathname: '/ws',
        port: 3000,
        protocol: 'ws'
      }
    }
  },
  performance: {
    hints: isProduction ? 'warning' : false
  }
};
