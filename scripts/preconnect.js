hexo.extend.injector.register('head_end', `<link rel="dns-prefetch" href="https://comment.njzjz.win" crossorigin>`);
hexo.extend.injector.register('head_end', `<link rel="dns-prefetch" href="https://www.google-analytics.com">`);

hexo.extend.filter.register('theme_inject', injects => {

  injects.head.raw('waline', `<link rel="dns-prefetch" href="1">`, {}, {});

});
