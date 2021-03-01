const { gh_url } = require("jsdelivr_url");
if (process.env.CSS_COMMIT) {
  hexo.on('generateBefore', function () {
    hexo.theme.config.css = gh_url("njzjz", "njzjz.github.io", process.env.CSS_COMMIT, "").slice(0, -1);
  });

  if (!process.env.DO_NOT_REMOVE_CSS) {
    hexo.extend.filter.register('after_generate', () => {
      hexo.route.remove('css/main.css');
    });
  }
}
