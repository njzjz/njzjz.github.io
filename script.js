/**
* Reference:
* https://github.com/lzuliuyun/hexo-image-cdn/blob/ab6ed9f0b8108dd7ed8d6bcd387824c5df1fcc50/index.js#L5-L16
*/

hexo.extend.filter.register('before_post_render', function(data){
      var reg = /!\[(.*)\]\((.*)\)/g;
      data.cover && !data.cover.match(/http/g) && (data.cover = 'https://img.njzjz.win/?url=' + data.cover);
      data.content = data.content.replace(reg, '![$1](https://img.njzjz.win/?url=$2)');
      return data;
});
