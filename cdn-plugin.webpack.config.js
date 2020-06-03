import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExternalModule from 'webpack/lib/ExternalModule';
var is_debug = true
var log = console.log

const jsonConfURL = "https://api.cdnjs.com/libraries/monaco-editor/0.20.0?fields=files"
const prefix = "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.20.0/"
const jsonConf = [
    "min/vs/base/browser/ui/codiconLabel/codicon/codicon.ttf",
    "min/vs/base/worker/workerMain.js",
    "min/vs/base/worker/workerMain.min.js",
    "min/vs/base/worker/workerMain.min.js.map",
    // "min/vs/basic-languages/abap/abap.js",
    // "min/vs/basic-languages/abap/abap.min.js",
    // "min/vs/basic-languages/abap/abap.min.js.map",
    // "min/vs/basic-languages/apex/apex.js",
    // "min/vs/basic-languages/apex/apex.min.js",
    // "min/vs/basic-languages/apex/apex.min.js.map",
    // "min/vs/basic-languages/azcli/azcli.js",
    // "min/vs/basic-languages/azcli/azcli.min.js",
    // "min/vs/basic-languages/azcli/azcli.min.js.map",
    // "min/vs/basic-languages/bat/bat.js",
    // "min/vs/basic-languages/bat/bat.min.js",
    // "min/vs/basic-languages/bat/bat.min.js.map",
    // "min/vs/basic-languages/cameligo/cameligo.js",
    // "min/vs/basic-languages/cameligo/cameligo.min.js",
    // "min/vs/basic-languages/cameligo/cameligo.min.js.map",
    // "min/vs/basic-languages/clojure/clojure.js",
    // "min/vs/basic-languages/clojure/clojure.min.js",
    // "min/vs/basic-languages/clojure/clojure.min.js.map",
    // "min/vs/basic-languages/coffee/coffee.js",
    // "min/vs/basic-languages/coffee/coffee.min.js",
    // "min/vs/basic-languages/coffee/coffee.min.js.map",
    // "min/vs/basic-languages/cpp/cpp.js",
    // "min/vs/basic-languages/cpp/cpp.min.js",
    // "min/vs/basic-languages/cpp/cpp.min.js.map",
    // "min/vs/basic-languages/csharp/csharp.js",
    // "min/vs/basic-languages/csharp/csharp.min.js",
    // "min/vs/basic-languages/csharp/csharp.min.js.map",
    // "min/vs/basic-languages/csp/csp.js",
    // "min/vs/basic-languages/csp/csp.min.js",
    // "min/vs/basic-languages/csp/csp.min.js.map",
    // "min/vs/basic-languages/css/css.js",
    // "min/vs/basic-languages/css/css.min.js",
    // "min/vs/basic-languages/css/css.min.js.map",
    // "min/vs/basic-languages/dockerfile/dockerfile.js",
    // "min/vs/basic-languages/dockerfile/dockerfile.min.js",
    // "min/vs/basic-languages/dockerfile/dockerfile.min.js.map",
    // "min/vs/basic-languages/fsharp/fsharp.js",
    // "min/vs/basic-languages/fsharp/fsharp.min.js",
    // "min/vs/basic-languages/fsharp/fsharp.min.js.map",
    // "min/vs/basic-languages/go/go.js",
    // "min/vs/basic-languages/go/go.min.js",
    // "min/vs/basic-languages/go/go.min.js.map",
    // "min/vs/basic-languages/graphql/graphql.js",
    // "min/vs/basic-languages/graphql/graphql.min.js",
    // "min/vs/basic-languages/graphql/graphql.min.js.map",
    // "min/vs/basic-languages/handlebars/handlebars.js",
    // "min/vs/basic-languages/handlebars/handlebars.min.js",
    // "min/vs/basic-languages/handlebars/handlebars.min.js.map",
    // "min/vs/basic-languages/html/html.js",
    // "min/vs/basic-languages/html/html.min.js",
    // "min/vs/basic-languages/html/html.min.js.map",
    // "min/vs/basic-languages/ini/ini.js",
    // "min/vs/basic-languages/ini/ini.min.js",
    // "min/vs/basic-languages/ini/ini.min.js.map",
    // "min/vs/basic-languages/java/java.js",
    // "min/vs/basic-languages/java/java.min.js",
    // "min/vs/basic-languages/java/java.min.js.map",
    // "min/vs/basic-languages/javascript/javascript.js",
    // "min/vs/basic-languages/javascript/javascript.min.js",
    // "min/vs/basic-languages/javascript/javascript.min.js.map",
    // "min/vs/basic-languages/kotlin/kotlin.js",
    // "min/vs/basic-languages/kotlin/kotlin.min.js",
    // "min/vs/basic-languages/kotlin/kotlin.min.js.map",
    // "min/vs/basic-languages/less/less.js",
    // "min/vs/basic-languages/less/less.min.js",
    // "min/vs/basic-languages/less/less.min.js.map",
    // "min/vs/basic-languages/lua/lua.js",
    // "min/vs/basic-languages/lua/lua.min.js",
    // "min/vs/basic-languages/lua/lua.min.js.map",
    // "min/vs/basic-languages/markdown/markdown.js",
    // "min/vs/basic-languages/markdown/markdown.min.js",
    // "min/vs/basic-languages/markdown/markdown.min.js.map",
    // "min/vs/basic-languages/mips/mips.js",
    // "min/vs/basic-languages/mips/mips.min.js",
    // "min/vs/basic-languages/mips/mips.min.js.map",
    // "min/vs/basic-languages/msdax/msdax.js",
    // "min/vs/basic-languages/msdax/msdax.min.js",
    // "min/vs/basic-languages/msdax/msdax.min.js.map",
    // "min/vs/basic-languages/mysql/mysql.js",
    // "min/vs/basic-languages/mysql/mysql.min.js",
    // "min/vs/basic-languages/mysql/mysql.min.js.map",
    // "min/vs/basic-languages/objective-c/objective-c.js",
    // "min/vs/basic-languages/objective-c/objective-c.min.js",
    // "min/vs/basic-languages/objective-c/objective-c.min.js.map",
    // "min/vs/basic-languages/pascal/pascal.js",
    // "min/vs/basic-languages/pascal/pascal.min.js",
    // "min/vs/basic-languages/pascal/pascal.min.js.map",
    // "min/vs/basic-languages/pascaligo/pascaligo.js",
    // "min/vs/basic-languages/pascaligo/pascaligo.min.js",
    // "min/vs/basic-languages/pascaligo/pascaligo.min.js.map",
    // "min/vs/basic-languages/perl/perl.js",
    // "min/vs/basic-languages/perl/perl.min.js",
    // "min/vs/basic-languages/perl/perl.min.js.map",
    // "min/vs/basic-languages/pgsql/pgsql.js",
    // "min/vs/basic-languages/pgsql/pgsql.min.js",
    // "min/vs/basic-languages/pgsql/pgsql.min.js.map",
    // "min/vs/basic-languages/php/php.js",
    // "min/vs/basic-languages/php/php.min.js",
    // "min/vs/basic-languages/php/php.min.js.map",
    // "min/vs/basic-languages/postiats/postiats.js",
    // "min/vs/basic-languages/postiats/postiats.min.js",
    // "min/vs/basic-languages/postiats/postiats.min.js.map",
    // "min/vs/basic-languages/powerquery/powerquery.js",
    // "min/vs/basic-languages/powerquery/powerquery.min.js",
    // "min/vs/basic-languages/powerquery/powerquery.min.js.map",
    // "min/vs/basic-languages/powershell/powershell.js",
    // "min/vs/basic-languages/powershell/powershell.min.js",
    // "min/vs/basic-languages/powershell/powershell.min.js.map",
    // "min/vs/basic-languages/pug/pug.js",
    // "min/vs/basic-languages/pug/pug.min.js",
    // "min/vs/basic-languages/pug/pug.min.js.map",
    "min/vs/basic-languages/python/python.js",
    "min/vs/basic-languages/python/python.min.js",
    "min/vs/basic-languages/python/python.min.js.map",
    // "min/vs/basic-languages/r/r.js",
    // "min/vs/basic-languages/r/r.min.js",
    // "min/vs/basic-languages/r/r.min.js.map",
    // "min/vs/basic-languages/razor/razor.js",
    // "min/vs/basic-languages/razor/razor.min.js",
    // "min/vs/basic-languages/razor/razor.min.js.map",
    // "min/vs/basic-languages/redis/redis.js",
    // "min/vs/basic-languages/redis/redis.min.js",
    // "min/vs/basic-languages/redis/redis.min.js.map",
    // "min/vs/basic-languages/redshift/redshift.js",
    // "min/vs/basic-languages/redshift/redshift.min.js",
    // "min/vs/basic-languages/redshift/redshift.min.js.map",
    // "min/vs/basic-languages/restructuredtext/restructuredtext.js",
    // "min/vs/basic-languages/restructuredtext/restructuredtext.min.js",
    // "min/vs/basic-languages/restructuredtext/restructuredtext.min.js.map",
    // "min/vs/basic-languages/ruby/ruby.js",
    // "min/vs/basic-languages/ruby/ruby.min.js",
    // "min/vs/basic-languages/ruby/ruby.min.js.map",
    // "min/vs/basic-languages/rust/rust.js",
    // "min/vs/basic-languages/rust/rust.min.js",
    // "min/vs/basic-languages/rust/rust.min.js.map",
    // "min/vs/basic-languages/sb/sb.js",
    // "min/vs/basic-languages/sb/sb.min.js",
    // "min/vs/basic-languages/sb/sb.min.js.map",
    // "min/vs/basic-languages/scheme/scheme.js",
    // "min/vs/basic-languages/scheme/scheme.min.js",
    // "min/vs/basic-languages/scheme/scheme.min.js.map",
    // "min/vs/basic-languages/scss/scss.js",
    // "min/vs/basic-languages/scss/scss.min.js",
    // "min/vs/basic-languages/scss/scss.min.js.map",
    // "min/vs/basic-languages/shell/shell.js",
    // "min/vs/basic-languages/shell/shell.min.js",
    // "min/vs/basic-languages/shell/shell.min.js.map",
    // "min/vs/basic-languages/solidity/solidity.js",
    // "min/vs/basic-languages/solidity/solidity.min.js",
    // "min/vs/basic-languages/solidity/solidity.min.js.map",
    // "min/vs/basic-languages/sophia/sophia.js",
    // "min/vs/basic-languages/sophia/sophia.min.js",
    // "min/vs/basic-languages/sophia/sophia.min.js.map",
    // "min/vs/basic-languages/sql/sql.js",
    // "min/vs/basic-languages/sql/sql.min.js",
    // "min/vs/basic-languages/sql/sql.min.js.map",
    // "min/vs/basic-languages/st/st.js",
    // "min/vs/basic-languages/st/st.min.js",
    // "min/vs/basic-languages/st/st.min.js.map",
    // "min/vs/basic-languages/swift/swift.js",
    // "min/vs/basic-languages/swift/swift.min.js",
    // "min/vs/basic-languages/swift/swift.min.js.map",
    // "min/vs/basic-languages/tcl/tcl.js",
    // "min/vs/basic-languages/tcl/tcl.min.js",
    // "min/vs/basic-languages/tcl/tcl.min.js.map",
    // "min/vs/basic-languages/twig/twig.js",
    // "min/vs/basic-languages/twig/twig.min.js",
    // "min/vs/basic-languages/twig/twig.min.js.map",
    // "min/vs/basic-languages/typescript/typescript.js",
    // "min/vs/basic-languages/typescript/typescript.min.js",
    // "min/vs/basic-languages/typescript/typescript.min.js.map",
    // "min/vs/basic-languages/vb/vb.js",
    // "min/vs/basic-languages/vb/vb.min.js",
    // "min/vs/basic-languages/vb/vb.min.js.map",
    // "min/vs/basic-languages/xml/xml.js",
    // "min/vs/basic-languages/xml/xml.min.js",
    // "min/vs/basic-languages/xml/xml.min.js.map",
    // "min/vs/basic-languages/yaml/yaml.js",
    // "min/vs/basic-languages/yaml/yaml.min.js",
    // "min/vs/basic-languages/yaml/yaml.min.js.map",
    "min/vs/editor/editor.main.css",
    "min/vs/editor/editor.main.js",
    "min/vs/editor/editor.main.min.css",
    "min/vs/editor/editor.main.min.css.map",
    "min/vs/editor/editor.main.min.js",
    "min/vs/editor/editor.main.min.js.map",
    // "min/vs/editor/editor.main.nls.de.js",
    // "min/vs/editor/editor.main.nls.de.min.js",
    // "min/vs/editor/editor.main.nls.de.min.js.map",
    // "min/vs/editor/editor.main.nls.es.js",
    // "min/vs/editor/editor.main.nls.es.min.js",
    // "min/vs/editor/editor.main.nls.es.min.js.map",
    // "min/vs/editor/editor.main.nls.fr.js",
    // "min/vs/editor/editor.main.nls.fr.min.js",
    // "min/vs/editor/editor.main.nls.fr.min.js.map",
    // "min/vs/editor/editor.main.nls.it.js",
    // "min/vs/editor/editor.main.nls.it.min.js",
    // "min/vs/editor/editor.main.nls.it.min.js.map",
    // "min/vs/editor/editor.main.nls.ja.js",
    // "min/vs/editor/editor.main.nls.ja.min.js",
    // "min/vs/editor/editor.main.nls.ja.min.js.map",
    // "min/vs/editor/editor.main.nls.js",
    // "min/vs/editor/editor.main.nls.ko.js",
    // "min/vs/editor/editor.main.nls.ko.min.js",
    // "min/vs/editor/editor.main.nls.ko.min.js.map",
    // "min/vs/editor/editor.main.nls.min.js",
    // "min/vs/editor/editor.main.nls.min.js.map",
    // "min/vs/editor/editor.main.nls.ru.js",
    // "min/vs/editor/editor.main.nls.ru.min.js",
    // "min/vs/editor/editor.main.nls.ru.min.js.map",
    "min/vs/editor/editor.main.nls.zh-cn.js",
    "min/vs/editor/editor.main.nls.zh-cn.min.js",
    "min/vs/editor/editor.main.nls.zh-cn.min.js.map",
    // "min/vs/editor/editor.main.nls.zh-tw.js",
    // "min/vs/editor/editor.main.nls.zh-tw.min.js",
    // "min/vs/editor/editor.main.nls.zh-tw.min.js.map",
    "min/vs/language/css/cssMode.js",
    "min/vs/language/css/cssMode.min.js",
    "min/vs/language/css/cssMode.min.js.map",
    "min/vs/language/css/cssWorker.js",
    "min/vs/language/css/cssWorker.min.js",
    "min/vs/language/css/cssWorker.min.js.map",
    "min/vs/language/html/htmlMode.js",
    "min/vs/language/html/htmlMode.min.js",
    "min/vs/language/html/htmlMode.min.js.map",
    "min/vs/language/html/htmlWorker.js",
    "min/vs/language/html/htmlWorker.min.js",
    "min/vs/language/html/htmlWorker.min.js.map",
    "min/vs/language/json/jsonMode.js",
    "min/vs/language/json/jsonMode.min.js",
    "min/vs/language/json/jsonMode.min.js.map",
    "min/vs/language/json/jsonWorker.js",
    "min/vs/language/json/jsonWorker.min.js",
    "min/vs/language/json/jsonWorker.min.js.map",
    "min/vs/language/typescript/tsMode.js",
    "min/vs/language/typescript/tsMode.min.js",
    "min/vs/language/typescript/tsMode.min.js.map",
    "min/vs/language/typescript/tsWorker.js",
    "min/vs/language/typescript/tsWorker.min.js",
    "min/vs/language/typescript/tsWorker.min.js.map",
    "min/vs/loader.js",
    "min/vs/loader.min.js",
    "min/vs/loader.min.js.map"
].filter(i=>i.match(/.*(\.min\.js)$/))

const config = [
    "min/vs/loader.js"
]
// var currentOpts = {}
// function HtmlWebpackCdnPlugin(options) {
//     this.is_active = options ? true : false
//     log(options)
// }

const moduleRegex = /^((?:@[a-z0-9][\w-.]+\/)?[a-z0-9][\w-.]*)/;

class MyPlugin {
    apply (compiler) {

        compiler.hooks.normalModuleFactory.tap('MyPlugin', normalModuleFactory => {
            normalModuleFactory.hooks.factory.tap('MyPlugin', factory => async (data, cb) => {
                const modulePath = data.dependencies[0].request;
                const contextPath = data.context;
                if (!moduleRegex.test(modulePath)) {
                    return factory(data, cb);
                }

                if (modulePath == "monaco-editor") {
                    log("modulePath, contextPath ::::::::::::", modulePath, contextPath)
                    cb(null, new ExternalModule("monaco-editor", 'var', modulePath))
                    return true
                    // factory(data, cb)
                }else{
                    return factory(data, cb)
                }
            })
        })

        compiler.hooks.compilation.tap('MyPlugin', compilation => {
            
            compilation.plugin('optimize-tree', function (chunks, modules, callback) {
                modules.forEach(function(module) {
                    // log("module.build, module.rawRequest ::::::::::::", module.n, module.rawRequest)
                })
                callback()
            }.bind(this))
        //     HtmlWebpackPlugin.getHooks(compilation).alterAssetTags.tapAsync(
        //         'CDN inject', (data, cb) => {
        //             for (let i in jsonConf) {
        //                 const scriptObj = {
        //                     tagName: 'script',
        //                     voidTag: false,
        //                     attributes: { defer: false, src: prefix+jsonConf[i] }
        //                 }
        //                 data.assetTags.scripts.push(scriptObj)

        //             }
        //             // console.log(data.assetTags.scripts)

        //             // log(data, cb)
        //             // cb(null, new ExternalModule(varName, 'var', modulePath));
        //             cb()
        //         }
        //     )
        })
    }
}
// }
// HtmlWebpackCdnPlugin.prototype.apply = function(compiler) {

//   compiler.plugin("compilation", function(compilation) {
//   	var link_map = {}
// 	compilation.plugin('optimize-tree', function (chunks, modules, callback) {
// 		modules.forEach(function(module) {
//             log(module.build, module.rawRequest)
			// if (module.build && module.rawRequest && /^cdn-loader\?/.test(module.rawRequest) && typeof module.loaders == 'object') {
			// 	var link_cfg_str = module._source.source().split("\n").shift()
			// 	var errReg = / invalid /
			// 	if (module.chunks && !errReg.test(link_cfg_str)) {
			// 		var link_cfg = JSON.parse(link_cfg_str.replace(/(^[\/\(]\*?)|([\*\)\/]{1,2}\/$)/g,''))
					
			// 		var link = [currentOpts.cdn[link_cfg.type], link_cfg.name, link_cfg.version, link_cfg.file + link_cfg.ext + "." + link_cfg.type].join('/')

			// 		module.chunks.forEach(function (chunk) {
			// 			if ( currentOpts.filter.length == 0 || currentOpts.filter.indexOf(chunk.name) == -1 || currentOpts.include.indexOf(chunk.name)) {
			// 				link_map[chunk.name] || (link_map[chunk.name] = [])
			// 				link_map[chunk.name].push(link)
			// 			}
			// 		})
			// 	}
			// }
	// 	})
	// 	callback()
	// }.bind(this))
    // HtmlWebpackPlugin.getHooks(compilation).alterAssetTags.tapAsync(
    //     'CDN inject', (data, cb) => {
    //         log(data, cb)
    //     }
    // )
    // compilation.plugin('html-webpack-plugin-before-html-generation', function(htmlPluginData, callback) {
        
    	// for (var chunkName in htmlPluginData.assets.chunks) {
    	// 	if (!link_map[chunkName])
    	// 		continue
    	// 	for (var i = link_map[chunkName].length - 1; i >= 0; i--) {
    	// 		if (/\.js$/.test(link_map[chunkName][i])) {
    	// 			htmlPluginData.assets.js.unshift(link_map[chunkName][i])
    	// 		} else {
    	// 			htmlPluginData.assets.css.unshift(link_map[chunkName][i])
    	// 		}
    	// 	}

    	// }
        // callback(null, htmlPluginData);
    //     callback()
    // });
//   })

// }

export default MyPlugin