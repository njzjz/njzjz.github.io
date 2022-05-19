const { npm_url } = require("unpkg_url");
const { name, version } = require("sticker-heo/package.json");

const idir = "Sticker-100";

hexo.on('generateBefore', function () {
  hexo.config.waline.emoji = [npm_url(name, version, idir)];
});
