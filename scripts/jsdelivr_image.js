const { version } = require("hexo-theme-next/package.json");
hexo.on('generateBefore', function () {
  hexo.theme.config.images = `https://cdn.jsdelivr.net/npm/hexo-theme-next@${version}/source/images`;
});
