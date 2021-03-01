const { npm_url, gh_url } = require("jsdelivr_url");

hexo.extend.filter.register('after_generate', () => {
  hexo.route.remove('js/schemes/muse.js');
  hexo.route.remove('js/next-boot.js');
  hexo.route.remove('js/utils.js');
  hexo.route.remove('js/local-search.js');
  hexo.route.remove('js/bookmark.js');
});

hexo.on('generateBefore', function () {
  hexo.theme.config.vendors.nprogress_js = npm_url('nprogress', '0.2.0', 'nprogress.min.js');
  hexo.theme.config.vendors.nprogress_css = npm_url('nprogress', '0.2.0', 'nprogress.min.css');
  if (process.env.CSS_COMMIT) {
    hexo.config.assets_prefix = gh_url("njzjz", "njzjz.github.io", "master", "");
  }
});
