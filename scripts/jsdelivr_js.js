hexo.extend.filter.register('after_generate', () => {	
    hexo.route.remove('js/schemes/muse.js');
    hexo.route.remove('js/next-boot.js');
    hexo.route.remove('js/utils.js');
    hexo.route.remove('js/local-search.js');
    hexo.route.remove('js/bookmark.js');
});

// .js -> .min.js
function use_min_js(str, package, old_path, new_path){
  var old_url = new RegExp(`https://cdn.jsdelivr.net/npm/${package}@(([\s\S])*?)/${old_path}`, "g");
  var new_url = `https://cdn.jsdelivr.net/npm/${package}@$1/${new_path}`;
  return str.replace(old_url, new_url)
}

hexo.extend.filter.register('after_render:html', function(str, data){
  str = use_min_js(str, 'hexo-theme-next', 'source/js/local-search.js', 'source/js/local-search.min.js');
  return str;
});
