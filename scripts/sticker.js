const path = require("path");
const fs = require("hexo-fs");
const { npm_url } = require("jsdelivr_url");
const { name, version } = require("sticker-heo/package.json");

const idir = "Sticker-100";
const dir = path.join(path.dirname(require.resolve(name)), idir);
const icons = fs.listDirSync(dir).filter(fn => fn.endsWith(".png"))
  .map(fn => fn.slice(0, -4));

hexo.on('generateBefore', function () {
  hexo.config.waline.emoji = [{
    name: "Heo",
    folder: npm_url(name, version, idir),
    type: "png",
    icon: "我看好你",
    items: icons,
  }];
});
