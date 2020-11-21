if(process.env.CSS_COMMIT) {
  hexo.on('generateBefore', function () {
    hexo.theme.config.css = `https://cdn.jsdelivr.net/gh/njzjz/njzjz.github.io@${process.env.CSS_COMMIT}`;
  });

  hexo.extend.filter.register('after_generate', () => {	
    hexo.route.remove('css/main.css');
  });
}
