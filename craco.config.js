module.exports = {
    webpack: {
        configure: (webpackConfig, {env, paths}) => {
            return {
                ...webpackConfig,
                entry: {
                    main: [env === 'development' &&
                    require.resolve('react-dev-utils/webpackHotDevClient'),paths.appIndexJs].filter(Boolean),
                    content: './src/chrome/content.js',
                    background: './src/chrome/background.js',
                    highlighter:'./src/highlighter/highlighter.js',
                    "@webcomponents/custom-elements/custom-elements.min": './node_modules/@webcomponents/custom-elements/custom-elements.min.js'
                },
                output: {
                    ...webpackConfig.output,
                    filename: 'static/js/[name].js',
                },
                optimization: {
                    ...webpackConfig.optimization,
                    runtimeChunk: false,
                }
            }
        },
    }
}