const { minify: compressXml } = require('minify-xml')

function minifyXml() {
    /** https://github.com/curbengh/hexo-yam/blob/ef57b75638e89f5a8d8f3ae6ad822d2678ecfba3/lib/filter.js#L225-L253
     *  MIT License
     */
    const hexo = this
    const options = hexo.config.minify.xml
    if (options.enable === false) return

    const { route } = hexo
    const routeList = route.list()
    const { globOptions, include, verbose } = options

    return Promise.all((match(routeList, include, globOptions)).map((path) => {
        return new Promise((resolve, reject) => {
            const assetPath = route.get(path)
            let assetTxt = ''
            assetPath.on('data', (chunk) => (assetTxt += chunk))
            assetPath.on('end', () => {
                if (assetTxt.length) {
                    try {
                        const result = compressXml(assetTxt, { ...options })
                        if (verbose) logFn.call(this, assetTxt, result, path, 'xml')
                        resolve(route.set(path, result))
                    } catch (err) {
                        reject(new Error(`Path: ${path}\n${err}`))
                    }
                }
                resolve()
            })
        })
    }))
}

hexo.config.minify.xml = Object.assign({
    enable: true,
    priority: 11,
    verbose: false,
    include: ['*.xml', '!*.min.xml'],
    removeComments: true,
    globOptions: { basename: true }
}, hexo.config.minify.xml)

hexo.extend.filter.register('after_generate', minifyXml, hexo.config.minify.xml.priority)