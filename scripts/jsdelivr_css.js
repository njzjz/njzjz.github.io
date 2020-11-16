const http = require('http');
hexo.extend.filter.register('after_generate', function(){
  // obtain all.css
  var data = hexo.route.get('all/all.css');
  var cssdata = ""; 
  var gitdata = "";
  data.on('data', (chunk) => { cssdata += chunk; });
  const request = http.get("https://raw.githubusercontent.com/njzjz/njzjz.github.io/master/css/main.css", function(res) {
    res.on('data', (chunk) => { gitdata += chunk; });
  });
  // compare
  if(cssdata == gitdata){
    // get all html files
    const routeList = hexo.route.list();
    hexo.log.debug("same!")
    //return Promise.all(routeList.filter(path => path.endsWith('.html')).map(path => {
    //  const html = route.get(path);
    //}));
  }
});
