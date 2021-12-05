'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const webpack = require('webpack')

function resolve(dir) {
	return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
	test: /\.(js|vue)$/,
	loader: 'eslint-loader',
	enforce: 'pre',
	include: [resolve('src'), resolve('test')],
	options: {
		formatter: require('eslint-friendly-formatter'),
		emitWarning: !config.dev.showEslintErrorsInOverlay
	}
})

module.exports = {
	plugins: [
		new webpack.ProvidePlugin({
			'window.Quill': 'quill/dist/quill.js',
			'Quill': 'quill/dist/quill.js'
		})
	],
	context: path.resolve(__dirname, '../'),
	entry: {
		app: './src/main.js'
	},
	output: {
		path: config.build.assetsRoot,
		filename: '[name].js',
		publicPath: process.env.NODE_ENV === 'production' ?
			config.build.assetsPublicPath :
			config.dev.assetsPublicPath
	},
	resolve: {
		extensions: ['.js', '.vue', '.json'],
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
			'@': resolve('src'),
			'view': resolve('src/view'),
			'users': resolve('server/users'),
			'components': resolve('src/components'),
			'assets': resolve('src/assets'),
			// Package each language's worker and give these filenames in `getWorkerUrl`
			"editor.worker": 'monaco-editor/esm/vs/editor/editor.worker.js',
			"json.worker": 'monaco-editor/esm/vs/language/json/json.worker',
			"css.worker": 'monaco-editor/esm/vs/language/css/css.worker',
			"html.worker": 'monaco-editor/esm/vs/language/html/html.worker',
			"ts.worker": 'monaco-editor/esm/vs/language/typescript/ts.worker',
		}
	},
	module: {
		//解决Critical dependency: require function is used in a way in which dependencies cannot be statically extracted的问题
		//unknownContextCritical : false,
		//解决the request of a dependency is an expression
		exprContextCritical: false,
		rules: [
			...(config.dev.useEslint ? [createLintingRule()] : []),
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: vueLoaderConfig
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: utils.assetsPath('img/[name].[hash:7].[ext]')
				}
			},
			{
				test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: utils.assetsPath('media/[name].[hash:7].[ext]')
				}
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
				}
			}
		]
	},
	node: {
		// prevent webpack from injecting useless setImmediate polyfill because Vue
		// source contains it (although only uses it if it's native).
		setImmediate: false,
		// prevent webpack from injecting mocks to Node native modules
		// that does not make sense for the client
		dgram: 'empty',
		fs: 'empty',
		net: 'empty',
		tls: 'empty',
		child_process: 'empty'
	}
}