const {
    join
} = require("path")
const path = require("path")

const CleanWebpackPlugin = require("clean-webpack-plugin")
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const rootfolder = __dirname;
const distfolder = join(rootfolder, "dist/");
const nodeModulesFolder = path.resolve(rootfolder + "/node_modules/");

module.exports = {
    devtool: 'source-map',
    entry: {
        "index.bundle": "./index.js"
    },
    output: {
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',
        path: distfolder,
        publicPath: "/dist/",
    },
    optimization: {
        removeEmptyChunks: true,
        runtimeChunk: false,
        splitChunks: {
            cacheGroups: {
                bundle: {
                    chunks: 'initial',
                    name: 'bundle',
                    priority: -20,
                    reuseExistingChunk: true
                },
                vendor: {
                    chunks: 'initial',
                    name: 'vendor',
                    priority: -10,
                    test: /node_modules\/(.*)\.js/
                }
            }
        }
    },

    plugins: [
     
        new UglifyJsPlugin({ // https://github.com/webpack-contrib/uglifyjs-webpack-plugin
            sourceMap: false,
            uglifyOptions: {
                ecma: 5,
                warnings: true
            }
        }),
      
        new CleanWebpackPlugin(distfolder)
    ],

    resolve: {
        extensions: [".ts", ".js", ".txt", ".json", ".css", ".less", ".scss", ".saas"],
    },
    module: {
        rules: [{
                test: /\.txt$/,
                use: 'raw-loader'
            }           
        ]
    }
}