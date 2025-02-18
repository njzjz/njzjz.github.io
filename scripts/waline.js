const { version } = require("@waline/client/package.json");


hexo.on('generateBefore', function () {
  hexo.config.waline.libUrl = `https://cdn.jsdelivr.net/npm/@waline/client@${version}/dist/waline.umd.min.js`;
  hexo.config.waline.cssUrl = `https://cdn.jsdelivr.net/npm/@waline/client@${version}/dist/waline.min.css`;
});
