var storage = window.localStorage;

$(document).ready(function(){
	// tbody是id名
	$("#tbody").append(storage.data);

	$("#playerA").append(storage.aKey);
	$("#playerB").append(storage.bKey);
	$("#playerC").append(storage.cKey);
	$("#playerD").append(storage.dKey);

	//玩家设置界面的输入框同步显示玩家id
	nameA = storage.getItem('aKey');
	$('#set_playerA').val(nameA);
	nameB = storage.getItem('bKey');
	$('#set_playerB').val(nameB);
	nameC = storage.getItem('cKey');
	$('#set_playerC').val(nameC);
	nameD = storage.getItem('dKey');
	$('#set_playerD').val(nameD);

// 主界面的总分
	$("#a_sum1").append(storage.sumA);
	$("#b_sum1").append(storage.sumB);
	$("#c_sum1").append(storage.sumC);
	$("#d_sum1").append(storage.sumD);
	$("#game_num").append(storage.game_num);
	// $("#first_tr").append(storage.data);

	var a_arr = new Array();
	var b_arr = new Array();
	var c_arr = new Array();
	var d_arr = new Array();

	a_sum = 0;
	b_sum = 0;
	c_sum = 0;
	d_sum = 0;
	a_arr.length = 50;


// 主界面的总分
	a_sum1 = parseInt(storage.getItem('sumA'));
	b_sum1 = parseInt(storage.getItem('sumB'));
	c_sum1 = parseInt(storage.getItem('sumC'));
	d_sum1 = parseInt(storage.getItem('sumD'));
	game_num = parseInt(storage.getItem('game_num'));




	/*将localStorage的值赋给数组*/
	var trows = $("#tbody tr").length + 1;

	for (var i = 1; i < game_num+50; i++) {
		/*storage.setItem('a_'+i,0);
		storage.setItem('b_'+i,0);
		storage.setItem('c_'+i,0);
		storage.setItem('d_'+i,0);*/
		//storage.getItem('a_'+i);
		//storage.getItem('b_'+i);
		//storage.getItem('c_'+i);
		//storage.getItem('d_'+i);

		a_arr[i]= parseInt(storage.getItem('a_'+i));
		b_arr[i]= parseInt(storage.getItem('b_'+i));
		c_arr[i]= parseInt(storage.getItem('c_'+i));
		d_arr[i]= parseInt(storage.getItem('d_'+i));

	}
	a_sum = parseInt(storage.getItem('sumA'));
	b_sum = parseInt(storage.getItem('sumB'));
	c_sum = parseInt(storage.getItem('sumC'));
	d_sum = parseInt(storage.getItem('sumD'));


	/*显示总分*/
	// html()意思是显示其html内容
	$("#a_sum").html(a_sum);
	$("#b_sum").html(b_sum);
	$("#c_sum").html(c_sum);
	$("#d_sum").html(d_sum);
	$("game_num").html(game_num);


	/*删除除第一行外的所有行*/
	$("#delete_all").click(function(){
		for (var i = 1; i < a_arr.length; i++) {
 			storage.removeItem('a_'+i);
 			storage.removeItem('b_'+i);
 			storage.removeItem('c_'+i);
 			storage.removeItem('d_'+i);
 		}
 		a_sum = 0;
		b_sum = 0;
		c_sum = 0;
		d_sum = 0;
		game_num = 0;
 		$("#a_sum").html(a_sum);
		$("#b_sum").html(b_sum);
		$("#c_sum").html(c_sum);
		$("#d_sum").html(d_sum);
		$("#game_num").html(game_num);
		$("tbody  tr:not(:first)").remove();

		storage.removeItem("data");
		storage.setItem('sumA',a_sum);//主界面的总分
		storage.setItem('sumB',b_sum);//主界面的总分
		storage.setItem('sumC',c_sum);//主界面的总分
		storage.setItem('sumD',d_sum);//主界面的总分
		storage.setItem('game_num',game_num);
		return false;
	});


	/*加一局按钮*/
	$("#add_row").click(function(){
		//加一行，var声明变量
		var trows = $("#tbody tr").length + 1;
		//set_a为设置玩家A分数的id
		var set_a = $("#set_a").val();
    	storage.setItem('a_'+trows,set_a);
    	a_arr[trows] = parseInt(storage.getItem('a_'+trows));
    	a_sum = a_sum + a_arr[trows];
			storage.setItem('sumA',a_sum);//主界面的总分
    	$("#a_sum").html(a_sum);

    	var set_b = $("#set_b").val();
    	storage.setItem('b_'+trows,set_b);
    	b_arr[trows] = parseInt(storage.getItem('b_'+trows));
    	b_sum = b_sum + b_arr[trows];
			storage.setItem('sumB',b_sum);
    	$("#b_sum").html(b_sum);

    	var set_c = $("#set_c").val();
    	storage.setItem('c_'+trows,set_c);
    	c_arr[trows] = parseInt(storage.getItem('c_'+trows));
    	c_sum = c_sum + c_arr[trows];
			storage.setItem('sumC',c_sum);
    	$("#c_sum").html(c_sum);

    	var set_d = $("#set_d").val();
    	storage.setItem('d_'+trows,set_d);
    	d_arr[trows] = parseInt(storage.getItem('d_'+trows));
    	d_sum = d_sum + d_arr[trows];
			storage.setItem('sumD',d_sum);
		$("#d_sum").html(d_sum);
		//游戏局数
		game_num += 1;
		storage.setItem('game_num',game_num);
		$("#game_num").html(game_num);

		// append，加上这行
		var $this_row = $('<tr class="'+trows+'"><th scope="row" id="'+trows+'">第'+trows+'局</th><td>'+set_a+'</td><td>'+set_b+'</td><td>'+set_c+'</td><td>'+set_d+'</td><td><button class="delete_c"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button></td></tr>');
		$("#tbody").append($this_row);
	});

//保存玩家修改
	$("#save_player").click(function(){
		var player_a = $("#set_playerA").val();
		storage.setItem('aKey',player_a);
		nameA = storage.getItem('aKey');
		$("#playerA").html(nameA);


		var player_b = $("#set_playerB").val();
		storage.setItem('bKey',player_b);
		nameB = storage.getItem('bKey');
		$("#playerB").html(nameB);

		var player_c = $("#set_playerC").val();
		storage.setItem('cKey',player_c);
		nameC = storage.getItem('cKey');
		$("#playerC").html(nameC);

		var player_d = $("#set_playerD").val();
		storage.setItem('dKey',player_d);
		nameD = storage.getItem('dKey');
		$("#playerD").html(nameD);
	});


	/*删除此行*/
	$('#tbody').on("click",'.delete_c', function() {

   		var this_id = $(this).parent().parent().attr("class");
   		a_sum = a_sum - a_arr[this_id];
			storage.setItem('sumA',a_sum);//主界面的总分
   		a_arr[this_id] = 0;
   		storage.setItem('a_'+this_id,0);
   		$("#a_sum").html(a_sum);

   		b_sum = b_sum - b_arr[this_id];
			storage.setItem('sumB',b_sum);
   		b_arr[this_id] = 0;
   		storage.setItem('b_'+this_id,0);
   		$("#b_sum").html(b_sum);

   		c_sum = c_sum - c_arr[this_id];
			storage.setItem('sumC',c_sum);
   		c_arr[this_id] = 0;
   		storage.setItem('c_'+this_id,0);
   		$("#c_sum").html(c_sum);

   		d_sum = d_sum - d_arr[this_id];
			storage.setItem('sumD',d_sum);
   		d_arr[this_id] = 0;
   		storage.setItem('d_'+this_id,0);
   		$("#d_sum").html(d_sum);

			game_num -= 1;
			storage.setItem('game_num',game_num);
			$("#game_num").html(game_num);

   		storage.removeItem("data");
   		$(this).parent().parent().remove();
   		pre_id = this_id-1;
   		if (this_id>1) {
    		$("."+pre_id+" .delete_c").show();
    	}
	});


	/*保存按钮*/
	$("#save").click(function() {
		var old_data = $("#1").parent().parent().html();
		/*有数据则保存数据并显示保存成功消息*/
		if (old_data != undefined) {
			storage.setItem('data',old_data);
			$("#save_suc").show();
			if ($("#save_suc").is(":visible")) {
			setTimeout(function(){$("#save_suc").hide()},5000);
			}
		}
		/*无数据则显示保存失败*/
		else{
			$("#save_fail").show();
			setTimeout(function(){$("#save_fail").hide()},5000);
		}
		/*设置5秒后提示消息消失*/

	});
	// 跳转进入新增一局界面
	$("#add_data").click(function(){
		window.location.href='add.html';
	});

	$("#set_player").click(function(){
		window.location.href='setPlayer.html';
	});

	$("#back").click(function(){
		window.location.href='index.html';
	});

	$("#view_history").click(function(){
		window.location.href='viewHistory.html';
	});



	/*自动保存*/
	function auto_save() {
		var old_data = $("#1").parent().parent().html();
		/*有数据则保存数据*/
		if (old_data != undefined) {
			storage.setItem('data',old_data);
		}
	}
	setInterval(auto_save,100);

	/*求四人的平均得分*/
	function sumaver(){
		all = a_sum + b_sum + c_sum + d_sum;
		aver = all/4;
	};
	setInterval(sumaver,100);




/*
	storage.setItem("b",0);
	$("#add").click(function add(){
 		if(!storage.getItem("a")){storage.setItem("a",0);}
 		storage.setItem('a',parseInt(storage.getItem('a'))+1);
 		$("#a_value").html(storage.a);
	});

	$("#del").click(function add(){
		storage.b = 0;
		$('#b_value').html(storage.b);
	});
	$('#set_b').bind('input propertychange', function() {
    $('#b_value').html($(this).val());
    storage.b = $('#b_value').html();
	});

*/
});
