const { minify: compressXml } = require('minify-xml')
const micromatch = require('micromatch')

const match = (paths = [], patterns = [], options = {}) => {
    let input = paths
    if (paths && patterns) {
        if (paths.length && patterns.length) {
            const output = []
            if (typeof patterns === 'string') patterns = [patterns]
            const exclude = patterns.filter((pattern) => pattern.startsWith('!'))
            const include = patterns.filter((pattern) => !pattern.startsWith('!'))
            if (exclude.length) input = micromatch(paths, exclude, options)
            if (include.length) {
                for (const pattern of include) {
                    let { basename } = options
                    basename = basename && !pattern.includes('/')
                    const tmp = micromatch(input, pattern, { ...options, basename })
                    if (tmp.length) output.push(...tmp)
                }
                return [...new Set(output)]
            }
            return input
        }
    }
    return paths
}

function minifyXml() {
    /** https://github.com/curbengh/hexo-yam/blob/ef57b75638e89f5a8d8f3ae6ad822d2678ecfba3/lib/filter.js#L225-L253
     *  MIT License
     */
    const hexo = this
    const options = hexo.config.minifyXml
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

hexo.config.minifyXml = Object.assign({
    enable: true,
    priority: 11,
    verbose: false,
    include: ['*.xml', '!*.min.xml'],
    removeComments: true,
    globOptions: { basename: true }
}, hexo.config.minifyXml)

hexo.extend.filter.register('after_generate', minifyXml, hexo.config.minifyXml.priority)
