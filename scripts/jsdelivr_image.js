//const { version } = require("hexo-theme-next/package.json");
hexo.on('generateBefore', function () {
  //hexo.theme.config.images = `https://cdn.jsdelivr.net/npm/hexo-theme-next@${version}/source/images`;
  hexo.theme.config.images = "https://cdn.jsdelivr.net/gh/njzjz/njzjz.github.io@3baecb0cb48d7dacd769a04a33a6c88dc9eb2425";
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
