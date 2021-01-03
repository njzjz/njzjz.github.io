hexo.extend.filter.register('after_render:html', function(str, data){  
  // lazyload
  str = str.replace('class="site-author-image"', 'class="site-author-image" loading="lazy"');
  str = str.replace('alt="Creative Commons"', 'alt="Creative Commons" loading="lazy"');
  return str;
});
