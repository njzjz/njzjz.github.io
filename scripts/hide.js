const hidden_cat = ['ECNUChemistry', 'Internship'];

hexo.extend.filter.register('before_post_render', function(data){
  if (data.categories && data.categories.filter(v => hidden_cat.includes(v.name)).length){
    data.hidden = true;
  }
  return data;
});
