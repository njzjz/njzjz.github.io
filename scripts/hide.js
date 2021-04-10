const hidden_cat = ['ECNUChemistry', 'Internship'];

hexo.extend.filter.register('before_post_render', function(data){
  if (data.categories.filter(v => hidden_cat.includes(v))){
    data.hidden = true;
  }
  return data;
});
