const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const pkg = require('./package.json');
const libraryName = pkg.name;

const env = process.env.NODE_ENV;
const development = env === 'development';
const production = env === 'production';

const entryFolder = 'src';

const config = {
    entry: path.join(__dirname, entryFolder, 'index.js'),
    devtool: development ? 'source-map' : undefined,
    mode: env,
    output: {
        path: __dirname + '/lib',
        filename: development ? `${libraryName}.js` : `${libraryName}.min.js`,
        library: libraryName,
        libraryTarget: 'umd',
        umdNamedDefine: true,
        globalObject: 'this'
    },
    module: {
        rules: [{
            test: /(\.jsx|\.js)$/,
            loader: 'babel-loader',
            include: [path.join(__dirname, entryFolder)]
        },
        {
            enforce: 'pre',
            test: /(\.jsx|\.js)$/,
            loader: 'eslint-loader',
            include: [path.join(__dirname, entryFolder)]
        }
        ]
    },
    resolve: {
        modules: [
            path.resolve('./node_modules'),
            path.join(__dirname, entryFolder)
        ],
        extensions: ['.json', '.js']
    },
    plugins: []
};

if (production) {
    config.plugins.push(
        new UglifyJsPlugin({
            uglifyOptions: {
                warning: "verbose",
                ecma: 6,
                beautify: false,
                compress: false,
                comments: false,
                mangle: false,
                toplevel: false,
                keep_classnames: true,
                keep_fnames: true
            }
        })
    );
}

module.exports = config;
