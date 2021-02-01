hexo.extend.filter.register('after_render:html', function(str, data){  
  // lazyload
  str = str.replace('class="site-author-image"', 'class="site-author-image" loading="lazy"');
  str = str.replace('alt="Creative Commons"', 'alt="Creative Commons" loading="lazy"');

  // Accessibility
  str = str.replace('class="back-to-top"', 'class="back-to-top" aria-label="Back to top"');
  str = str.replace('class="lang-select"', 'class="lang-select" aria-label="Language select"');

  return str;
});
