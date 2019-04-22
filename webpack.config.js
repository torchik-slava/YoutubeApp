const path = require('path');
const htmlPlugin = require('html-webpack-plugin');

module.export={

	context: path.resolve(__dirname, 'src'),

	entry: './index.js',

	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	},

	resolve: {
		extensions: ['.js']
	},

	plugins: [
		new htmlPlugin({
			title: 'WP server'
		})
	],

	watch: false,

	devtool: 'eval'
}