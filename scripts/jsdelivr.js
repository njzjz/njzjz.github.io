const crypto = require('crypto');
const { npm_url, gh_url } = require("jsdelivr_url");
const { name: next_name, version: next_version } = require("hexo-theme-next/package.json");
const { name: icon_name, version: icon_version } = require("@njzjz/icons/package.json");

hexo.extend.filter.register('after_generate', () => {
  // remove all images
  hexo.route.list().filter(path.startsWith("images/")).forEach(path => {
    hexo.route.remove(path);
  });
});

hexo.on('generateBefore', function () {
  hexo.theme.config.images = npm_url(next_name, next_version, 'source/images');

  hexo.theme.config.vendors.nprogress_js = npm_url('nprogress', '0.2.0', 'nprogress.min.js');
  hexo.theme.config.vendors.nprogress_css = npm_url('nprogress', '0.2.0', 'nprogress.min.css');
  if (process.env.CSS_COMMIT) {
    hexo.config.assets_prefix = gh_url("njzjz", "njzjz.github.io", process.env.CSS_COMMIT, "");
    hexo.theme.config.css = gh_url("njzjz", "njzjz.github.io", process.env.CSS_COMMIT, "css");
  }

  // icons
  const avatar_url = npm_url(icon_name, icon_version, "njzjz/avatar.jpg");
  hexo.theme.config.avatar.url = avatar_url;
  hexo.theme.config.favicon.small = avatar_url;
  hexo.theme.config.favicon.medium = avatar_url;
  hexo.theme.config.favicon.apple_touch_icon = avatar_url;
  hexo.theme.config.favicon.safari_pinned_tab = avatar_url;
  hexo.theme.config.reward = {
    wechatpay: npm_url(icon_name, icon_version, "njzjz/wechatpay.svg"),
    alipay: npm_url(icon_name, icon_version, "njzjz/alipay.svg"),
  };
});

hexo.extend.filter.register('after_generate', function (data) {
  const hexo = this;
  const reg = /<link(.*?) href="(.*?)\/main.css">/gi;
  return new Promise((resolve, reject) => {
    // read css and get md5
    const html = hexo.route.get("css/main.css");
    let cssContent = "";
    html.on('data', (chunk) => (cssContent += chunk));
    html.on('end', () => {
      const css_hash = crypto.createHash('md5').update(cssContent).digest('hex');
      const new_css_path = `css/${css_hash}.css`;
      hexo.route.remove('css/main.css');
      hexo.route.set(new_css_path, cssContent);
      resolve(css_hash);
    });
  }).then((css_hash) => {
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
