 var path=require('path');
 var config = {
   entry: './main.js',
	
   output: {
      path:'./',
      publicPath: '/',
      filename: 'index.js',
      // publicPath:'http://localhost:7777/'
   },
	
   devServer: {
      inline: true,
      port: 7777,
      host: '0.0.0.0' 
   },

   module: {
      loaders: [ 
      {
         test: /\.jsx?$/,
         exclude: /node_modules/,
         loader: 'babel',
         query: {
            presets: ['es2015', 'react']
         } 
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.less$/, loader: 'style!css!less' },
      { test: /\.(jpg|png)$/, loader: "url" }
      ]
   }
	
}

module.exports = config;