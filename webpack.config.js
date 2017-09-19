module.exports = {
	entry: "./public/App.js",
	output:{
		path: __dirname+"/public",
		filename:"bundle.js"
	},
	module:{
		loaders:[{
			test:/\.js$/,
			exclude: /(node_modules)/,
			loader:"babel-loader",
			query:{
				presets:["es2015","react"]
			}
		},
		{
			test:/\.scss$/,
			loaders:'style-loader!css-loader!sass-loader'
		},
		{
			test:/\.css$/,
			loaders:'style-loader!css-loader'
		}
		]
	},
	watch:true
}
