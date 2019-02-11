function getproxy(){
	var query = new AV.Query('proxy')
	query.ascending('index');
	query.find().then(function (todos) {
	for (var i = 0; i < todos.length; i++) {
		var todo = todos[i]
		var name = todo.get('name')||""
		var url = todo.get('url')||""
		var description = todo.get('description')||""
		addproxy(name,url,description)
	}
  });
}
function addproxy(name,url,description){
	var html='<h2>'+name+'</h2>'+
			'<h4>'+description+'</h4>'+
			'<div id="'+url+'" class="qrcode" style="margin:15px;"></div>'+
			'<input value="'+url+'" readonly><button class="copy" data-clipboard-text="'+url+'">复制</button><br/>'
	$('#ss').append(html)
	new QRCode(document.getElementById(url),url)
}
function showproxys(){
	$("#signin").hide()
	getproxy()
}
$(function(){
	var APP_ID = 'W2AwYK0mhsY56HOMW1dIeOJB-9Nh9j0Va';
	var APP_KEY = '6xwoF5tlOnCXSfimwhqeTWzj';

	AV.init({
	  appId: APP_ID,
	  appKey: APP_KEY
	});
	$("#login").submit(function(e){
		AV.User.logIn("visitor",$("#passwd").val()).then(function (loggedInUser) {
			showproxys()
		}, function (error) {
			$("#error").html("密码错误！")
		});
		return false
	});
	if(AV.User.current())showproxys()
	new ClipboardJS('.copy');
});
