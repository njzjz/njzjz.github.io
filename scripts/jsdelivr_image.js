//const { version } = require("hexo-theme-next/package.json");
const { gh_url } = require("jsdelivr_url");
hexo.on('generateBefore', function () {
  //hexo.theme.config.images = `https://cdn.jsdelivr.net/npm/hexo-theme-next@${version}/source/images`;
  hexo.theme.config.images = hexo.theme.config.css = gh_url("njzjz", "njzjz.github.io", "6260d041079b671b933964297271cfecdcb905d6", "").slice(0, -1);
});

hexo.extend.filter.register('after_generate', () => {	
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
