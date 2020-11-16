hexo.on('generateBefore', function () {
  if(process.env.VERCEL_GITHUB_COMMIT_REF == "hexo") {
    hexo.theme.config.css = "https://cdn.jsdelivr.net/gh/njzjz/njzjz.github.io@master/css";
  }
});
