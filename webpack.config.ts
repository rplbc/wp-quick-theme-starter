import path from 'path'
import { type Configuration } from 'webpack'
import 'webpack-dev-server'
import { devServerConfig, moduleConfig, pluginsConfig } from './config'

const cleanCopyPath = path.join(__dirname, '../quick-clean')

const config = (env: any): Configuration => {
  const { WEBPACK_SERVE: isDevServer, clean } = env || {}

  return {
    entry: {
      main: './src/ts/main.ts',
      ...(isDevServer
        ? {
            dev: './src/ts/dev.ts',
            'editor-styles': './src/ts/editor-dev.ts',
          }
        : {
            styles: './src/scss/main.scss',
            'editor-styles': './src/scss/editor.scss',
          }),
    },
    mode: isDevServer ? 'development' : 'production',
    devtool: clean ? false : isDevServer ? 'eval' : 'source-map',
    cache: {
      type: 'filesystem',
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    output: {
      filename: 'js/[name].js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
    ...devServerConfig,
    ...moduleConfig(isDevServer),
    ...pluginsConfig(isDevServer, clean, cleanCopyPath),
  }
}

export default config
