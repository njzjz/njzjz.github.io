const path = require("path");
const fs = require("hexo-fs");
const { npm_url } = require("jsdelivr_url");
const { name, version } = require("sticker-heo/package.json");

const idir = "Sticker-100";
const dir = path.join(path.dirname(require.resolve(name)), idir);
var icons = {}
fs.listDirSync(dir).filter(fn => fn.endsWith(".png"))
  .map(fn => fn.slice(0, -4)).forEach(fn => {
  icons[`heo_${fn}`] = `${fn}.png`;
});

hexo.on('generateBefore', function () {
  hexo.config.waline.emojiCDN = npm_url(name, version, idr + '/');
  hexo.config.waline.emojiMaps = icons;
});

