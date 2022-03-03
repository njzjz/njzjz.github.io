const crypto = require('crypto');
const { npm_url, gh_url } = require("jsdelivr_url");
const { name: next_name, version: next_version } = require("hexo-theme-next/package.json");
const { name: icon_name, version: icon_version } = require("@njzjz/icons/package.json");

hexo.extend.filter.register('after_generate', () => {
  // remove all images
  hexo.route.list().filter(path => path.startsWith("images/")).forEach(path => {
    hexo.route.remove(path);
  });
});

hexo.on('generateBefore', function () {
  hexo.theme.config.images = npm_url(next_name, next_version, 'source/images');

  hexo.theme.config.vendors.nprogress_js = npm_url('nprogress', '0.2.0', 'nprogress.min.js');
  hexo.theme.config.vendors.nprogress_css = npm_url('nprogress', '0.2.0', 'nprogress.min.css');
  if (process.env.CSS_COMMIT) {
    hexo.config.assets_prefix = gh_url("njzjz", "njzjz.github.io", process.env.CSS_COMMIT, "");
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

