hexo.extend.injector.register('head_end', () => {
	const css = hexo.extend.helper.get('css').bind(hexo);
	return css('/css/source.css');
});

function datestr(y, m, d){
	datesting = "";
	if (y){
		datesting += "于"+ y.toString() + "年";
		if (m){
			datesting += m.toString() +"月";
			if (d){
				datesting += d.toString() +"日";
			}
		}
	}
	return datesting;
}


hexo.extend.tag.register('source', function(args){
	var source = args[0];
	var id = args[1];
	datestring = datestr(args[2], args[3], args[4]);
	if (source == "zhihu"){
		var cls = "info zhihu"; 
		var platform = "知乎专栏";
		var link = "https://zhuanlan.zhihu.com/p/" + id;
	}else if( source == "wechat"){
		var cls = "success wechat"; 
		var platform = "微信公众号";
		var link = "https://mp.weixin.qq.com/s/" + id;
	}
	return `<div class="note ${cls}">本文${datestring}发表于${platform}，<a href="${link}">查看原文</a></div>`;
});
