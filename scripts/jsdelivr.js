const crypto = require('crypto');
const { npm_url, gh_url } = require("jsdelivr_url");
//const { version } = require("hexo-theme-next/package.json");

hexo.extend.filter.register('after_generate', () => {
  // remove scripts
  hexo.route.remove('js/schemes/muse.js');
  hexo.route.remove('js/next-boot.js');
  hexo.route.remove('js/utils.js');
  hexo.route.remove('js/local-search.js');
  hexo.route.remove('js/bookmark.js');

  // remove images
  hexo.route.remove('images/apple-touch-icon-next.png');
  hexo.route.remove('images/avatar.gif');
  hexo.route.remove('images/cc-by-nc-nd.svg');
  hexo.route.remove('images/cc-by-nc-sa.svg');
  hexo.route.remove('images/cc-by-nc.svg');
  hexo.route.remove('images/cc-by-nd.svg');
  hexo.route.remove('images/cc-by-sa.svg');
  hexo.route.remove('images/cc-by.svg');
  hexo.route.remove('images/cc-zero.svg');
  hexo.route.remove('images/favicon-16x16-next.png');
  hexo.route.remove('images/favicon-32x32-next.png');
  hexo.route.remove('images/logo-algolia-nebula-blue-full.svg');
  hexo.route.remove('images/logo.svg');
});

hexo.on('generateBefore', function () {
  //hexo.theme.config.images = `https://cdn.jsdelivr.net/npm/hexo-theme-next@${version}/source/images`;
  hexo.theme.config.images = gh_url("njzjz", "njzjz.github.io", "6260d041079b671b933964297271cfecdcb905d6", "").slice(0, -1);

  hexo.theme.config.vendors.nprogress_js = npm_url('nprogress', '0.2.0', 'nprogress.min.js');
  hexo.theme.config.vendors.nprogress_css = npm_url('nprogress', '0.2.0', 'nprogress.min.css');
  if (process.env.CSS_COMMIT) {
    hexo.config.assets_prefix = gh_url("njzjz", "njzjz.github.io", process.env.CSS_COMMIT, "");
    hexo.theme.config.css = gh_url("njzjz", "njzjz.github.io", process.env.CSS_COMMIT, "css");
  }
});

hexo.extend.filter.register('after_generate', function (data) {
  const hexo = this;
  const reg = /<link(.*?) href="(.*?)\/main.css">/gi;
  // read css and get md5
  const html = hexo.route.get("css/main.css");
  let cssContent = "";
  html.on('data', (chunk) => (cssContent += chunk));
  html.on('end', () => {
    const css_hash = crypto.createHash('md5').update(cssContent).digest('hex');
    const new_css_path = `css/${css_hash}.css`;
    hexo.route.remove('css/main.css');
    hexo.route.set(new_css_path, cssContent);
    return Promise.all(hexo.route.list().filter(path => path.endsWith('.html')).map(path => {
      return new Promise((resolve, reject) => {
        const html = hexo.route.get(path);
        let htmlContent = "";
        html.on('data', (chunk) => (htmlContent += chunk));
        html.on('end', () => {
          hexo.route.set(path, htmlContent.replace(reg, function (str, p1, p2) {
            return str.replace("main.css", `${css_hash}.css`);
          }));
        });
        resolve();
      });
    }));
  });
});
