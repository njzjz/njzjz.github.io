hexo.on('generateBefore', function () {
  if(process.env.CSS_COMMIT) {
    hexo.theme.config.css = `https://cdn.jsdelivr.net/gh/njzjz/njzjz.github.io@${process.env.CSS_COMMIT}`;
  }
});
