const { override, addWebpackAlias, setWebpackPublicPath} = require('customize-cra');
const path = require('path');

const f = json => {
    json.build = {
        assetsPublicPath: "/"
    }
    return json
}

module.exports = override(
    addWebpackAlias({
        'src': path.resolve(__dirname, 'src'),
    }),
    // setWebpackPublicPath("call"),
);
