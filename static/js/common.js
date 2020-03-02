$(function(){
	$('table').on('click','a',function(e){
	e.preventDefault();
	var url = $(this).attr('href'),title = $(this).text();
	if($(this).hasClass('confirm')){
		layer.confirm('您确定要进行'+title+'操作吗？',{},function(){
			layer.alert('此处写处理逻辑');
		});
	}else{
		layer.open({
			  type: 2,
			  title: title,
			  shadeClose: true,
			  shade: 0.8,
			  area: ['50%', '60%'],
			  content: url
		})
	}
   });
})
