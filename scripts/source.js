hexo.extend.injector.register('head_end', () => {
	return `<style>.post-body .note.info.zhihu:not(.no-icon)::before {content: "\f63f";}</style>`;
	//return css('https://cdn.jsdelivr.net/npm/aplayer@1.10.1/dist/APlayer.min.css');
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
	var cls = source;
	var platform = "";
	var link = id;
	if (source == "zhihu"){
		platform = "知乎";
		link = "https://zhuanlan.zhihu.com/p/" + id;
	}
	return `<div class="note info ${cls}">本文${datestring}发表于${platform}，<a href="${link}">查看原文</a></div>`;
});
