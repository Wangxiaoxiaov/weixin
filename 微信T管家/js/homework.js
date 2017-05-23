$(function () {
	//模拟数据库
	var json = [{"user":"张三","xingbie":"男","age":"18","study":"高中"},
		{"user":"李四","xingbie":"男","age":"20","study":"大专"},
		{"user":"青衣","xingbie":"女","age":"19","study":"本科"},
		{"user":"令狐雪岚","xingbie":"女","age":"18","study":"本科"}];
	//创建表格函数
	createTable(json);
	function createTable(json) {
		var $trs = $('.table#opera_table tr');
		for (var j =0 ;j < $trs.length; j++) {
			if (j != 0 ) {
				$($trs[j]).remove();
			}
		}
		for (var i = 0; i < json.length; i++) {
			$('.table#opera_table tr:last-child').after($('<tr><td>' + json[i].user + '</td><td>' + json[i].xingbie + '</td><td>' + json[i].age + '</td><td>' + json[i].study + '</td><td><a href="javascript:;" class="col-xs-6">修改</a><a href="javascript:;" class="col-xs-6">删除</a></td></tr>'));
		}
		//主界面删除操作
		$('table.table tr td a.col-xs-6:nth-child(2)').each(function (i) {
			$(this).bind('click',function () {
				json.splice(i,1);
				createTable(json);
			});
		});	
		//主界面修改操作
		$('table.table tr td a.col-xs-6:nth-child(1)').each(function (i) {
			$(this).bind("click",function () {				
			    //修改信息界面‘确认更改’函数调用
			   sureSubmit("change",i);	
			});
		});	
	};
	
	//确认修改或者确认添加函数
	function sureSubmit(flag,num) {
		$('#index_panel').addClass('hidden');
		$('#add_or_change').removeClass('hidden');
		if (flag == "change") {
			clearVal();
			$('#user').val(json[num].user);
			$('#xingbie').val(json[num].xingbie);
			$('#age').val(json[num].age);
			$('#study').val(json[num].study);
			$('button[type="submit"].btn').one("click",function (){
				json[num].user = $('#user').val();
				json[num].xingbie = $('#xingbie').val();
				json[num].age = $('#age').val();
				json[num].study = $('#study').val();
				createTable(json);
				$('#index_panel').removeClass('hidden');
				$('#add_or_change').addClass('hidden');	
				clearVal();
			});	
		} 
		if(flag == "add") {
			clearVal();
			$('#add_or_change .panel-heading h2').text('添加人员');
			$('#add_or_change .panel-heading footer.text-right code').text('添加');
			$('button[type="submit"].btn').text('确认添加');
			$('button[type="submit"].btn').one("click",function (){
				var obj = {};
				obj.user = $('#user').val();
				obj.xingbie = $('#xingbie').val();
				obj.age = $('#age').val();
				obj.study = $('#study').val();
				console.log(obj);
				json.push(obj);
				createTable(json);
				$('#index_panel').removeClass('hidden');
				$('#add_or_change').addClass('hidden');	
				clearVal();
				$('#add_or_change .panel-heading h2').text('修改信息');
				$('#add_or_change .panel-heading footer.text-right code').text('修改');
				$('button[type="submit"].btn').text('确认更改');
			});
		}		
	}
	//修改信息或者增加界面重置事件
	$('button[type="reset"].btn').click(function () {
		clearVal();
	});
	//主界面添加操作
	$('a#add').bind("click",function () {
		//添加人员界面‘确认更改’函数调用
		sureSubmit("add");
	});
	//清除添加或者修改界面文本内容函数
	function clearVal() {
		$('#user').val('');
		$('#xingbie').val('');
		$('#age').val('');
		$('#study').val('');
	}
	});