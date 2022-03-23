// /* eslint-disable */
// const withLess = require('@zeit/next-less');
// const lessToJS = require('less-vars-to-js');
// const fs = require('fs');
// const path = require('path');

// // Where your antd-custom.less file lives
// const themeVariables = lessToJS(
//     fs.readFileSync(path.resolve(__dirname, './assets/antd-custom.less'), 'utf8'),
// );

// module.exports = withLess({
//     lessLoaderOptions: {
//         javascriptEnabled: true,
//         modifyVars: themeVariables, // make your antd custom effective
//     },
//     webpack5: false,
//     webpack: (config, { isServer }) => {
//         if (isServer) {
//             const antStyles = /antd\/.*?\/style.*?/;
//             const origExternals = [...config.externals];
//             config.externals = [
//                 (context, request, callback) => {
//                     if (request.match(antStyles)) return callback();
//                     if (typeof origExternals[0] === 'function') {
//                         origExternals[0](context, request, callback);
//                     } else {
//                         callback();
//                     }
//                 },
//                 ...(typeof origExternals[0] === 'function' ? [] : origExternals),
//             ];

//             config.module.rules.unshift({
//                 test: antStyles,
//                 use: 'null-loader',
//             });
//         }
//         return config;
//     },
// });

const withSass = require('@zeit/next-sass');
const withLess = require('@zeit/next-less');
const withCSS = require('@zeit/next-css');

const isProd = process.env.NODE_ENV === 'production';

// fix: prevents error when .less files are required by node
if (typeof require !== 'undefined') {
    require.extensions['.less'] = (file) => {};
}

module.exports = withCSS({
    webpack5: false,
    reactStrictMode: false,
    cssModules: true,
    cssLoaderOptions: {
        importLoaders: 1,
        localIdentName: '[local]___[hash:base64:5]',
    },
    ...withLess(
        withSass({
            lessLoaderOptions: {
                javascriptEnabled: true,
            },
        }),
    ),
});
