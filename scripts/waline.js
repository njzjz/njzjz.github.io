const { version } = require("@waline/client/package.json");


hexo.on('generateBefore', function () {
  hexo.config.waline.libUrl = `https://cdnjs.cloudflare.com/ajax/libs/waline/${version}/waline.js`;
  hexo.config.waline.cssUrl = `https://cdnjs.cloudflare.com/ajax/libs/waline/${version}/waline.min.css`;
});
