hexo.extend.filter.register('after_generate', () => {	
    hexo.route.remove('js/schemes/muse.js');
    hexo.route.remove('js/next-boot.js');
    hexo.route.remove('js/utils.js');
    hexo.route.remove('js/local-search.js');
    hexo.route.remove('js/bookmark.js');
});
