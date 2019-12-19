var storage = window.localStorage;

$(document).ready(function(){

	// tbody是id名
	$("#tbody").append(storage.data);

	$("#playerA").append(storage.aKey);
	$("#playerB").append(storage.bKey);
	$("#playerC").append(storage.cKey);
	$("#playerD").append(storage.dKey);
	// 修改某一局记录页面的玩家
	$("#text1").append(storage.modify_a);
	$("#text2").append(storage.modify_b);
	$("#text3").append(storage.modify_c);
	$("#text4").append(storage.modify_d);

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
	$("#game_sum").append(storage.game_sum);

	// $("#first_tr").append(storage.data);

	//修改记录界面输入框同步当局分数
	mod_a = storage.getItem('mod_a');
	$("#mod_a").val(mod_a);
	mod_b = storage.getItem('mod_b');
	$("#mod_b").val(mod_b);
	mod_c = storage.getItem('mod_c');
	$("#mod_c").val(mod_c);
	mod_d = storage.getItem('mod_d');
	$("#mod_d").val(mod_d);

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


	// 首页显示最高分玩家
	var arr = [a_sum1,b_sum1,c_sum1,d_sum1]
	arr.sort(function(a,b){
			return b - a
	})
	if(arr[0]==a_sum1){
		max_name = nameA;
	}
	else if (arr[0]==b_sum1) {
		max_name = nameB;
	}
	else if (arr[0]==c_sum1) {
		max_name = nameC;
	}
	else{
		max_name = nameD;
	}
	// console.log(max_name);
	$("#max_name").val(max_name);
	$("#max_name").html("目前得分最高："+max_name);

	// 修改记录界面的局数
	game_index=parseInt(storage.getItem('game_index'));
	$("#game_index").html("局数："+game_index);


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

	// setSum界面输入框同步显示单局总分
	game_sum = storage.getItem('game_sum');
	$('#game_sum').val(game_sum);


	/*删除除第一行外的所有行*/
	$("#delete_all").click(function(){
		// 加一个删除提示框
		if(confirm("确定要删除所有记录吗？")){
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
			// return false;
		}
	});


	/*新增一局的预设按钮*/
	$("#set_sum").click(function(){
		window.location.href='setSum.html';
	});
	/*设置单局总分的保存按钮*/
	$("#confirm_sum").click(function(){
		var game_sum = $("#game_sum").val();
		// 成功保存条件
		if(game_sum >= 0){
			storage.setItem('game_sum',game_sum);
			$("#save_suc").show();
			if ($("#save_suc").is(":visible")) {
			setTimeout(function(){$("#save_suc").hide()},5000);
			}
		}
		// 保存失败情况
		else{
			$("#save_fail").show();
			/*设置5秒后提示消息消失*/
			setTimeout(function(){$("#save_fail").hide()},5000);
		}
	});

	/*新增一局的保存按钮*/
	$("#add_row").click(function(){
		//加一行，var声明变量
		var trows = $("#tbody tr").length + 1;
		//set_a为设置玩家A分数的id
		var set_a = $("#set_a").val();
		var set_b = $("#set_b").val();
		var set_c = $("#set_c").val();
		var set_d = $("#set_d").val();

		game_sum = storage.getItem('game_sum');
		// console.log(game_sum);

		if(set_a == "" && set_b != "" && set_c != "" && set_d != ""){
			set_a = game_sum - set_b -set_c - set_d;
			$("#set_a").val(set_a);
		}
		else if (set_b == "" && set_a != "" && set_c != "" && set_d != "") {
			set_b = game_sum - set_a -set_c - set_d;
			$("#set_b").val(set_b);
		}
		else if (set_c == "" && set_b != "" && set_a != "" && set_d != "") {
			set_c = game_sum - set_a -set_b - set_d;
			$("#set_c").val(set_c);
		}
		else if (set_d == "" && set_b != "" && set_a != "" && set_c != ""){
			set_d = game_sum - set_a - set_b - set_c;
			$("#set_d").val(set_d);
		}

		// tbody部分所有数据
		var old_data = $("#1").parent().parent().html();
		//有数据则保存数据并显示保存成功消息
		if (set_a != "" && set_b != "" && set_c != "" && set_d != "") {
			storage.setItem('a_'+trows,set_a);
    	a_arr[trows] = parseInt(storage.getItem('a_'+trows));
    	a_sum = a_sum + a_arr[trows];
			storage.setItem('sumA',a_sum);//主界面的总分
    	$("#a_sum").html(a_sum);

    	storage.setItem('b_'+trows,set_b);
    	b_arr[trows] = parseInt(storage.getItem('b_'+trows));
    	b_sum = b_sum + b_arr[trows];
			storage.setItem('sumB',b_sum);
    	$("#b_sum").html(b_sum);

    	storage.setItem('c_'+trows,set_c);
    	c_arr[trows] = parseInt(storage.getItem('c_'+trows));
    	c_sum = c_sum + c_arr[trows];
			storage.setItem('sumC',c_sum);
    	$("#c_sum").html(c_sum);

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
			var $this_row = $('<tr class="'+trows+'"><th scope="row" id="'+trows+'" class="left">第'+trows+'局</th><td class="left">'+set_a+'</td><td class="left">'+set_b+'</td><td class="left">'+set_c+'</td><td class="left">'+set_d+'</td><td><button class="delete_c"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button></td></tr>');
			// var $this_row = $('<tr class="'+trows+'" contentEditable = "true"><th scope="row" id="'+trows+'">第'+trows+'局</th><td>'+set_a+'</td><td>'+set_b+'</td><td>'+set_c+'</td><td>'+set_d+'</td><td><button class="delete_c"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button></td></tr>');
			$("#tbody").append($this_row);

			storage.setItem('data',old_data);
			$("#save_suc").show();
			if ($("#save_suc").is(":visible")) {
			setTimeout(function(){$("#save_suc").hide()},5000);
			}
		}
		/*无数据则显示保存失败*/
		else{
			$("#save_fail").show();
			/*设置5秒后提示消息消失*/
			setTimeout(function(){$("#save_fail").hide()},5000);
		}
	});

//保存玩家修改
	$("#save_player").click(function(){
		var player_a = $("#set_playerA").val();
		var player_b = $("#set_playerB").val();
		var player_c = $("#set_playerC").val();
		var player_d = $("#set_playerD").val();
		// 保证玩家id不得为空
		if (player_a.length<=3 && player_b.length<=3 && player_c.length<=3 && player_d.length<=3) {
			storage.setItem('aKey',player_a);
			nameA = storage.getItem('aKey');
			$("#playerA").html(nameA);
			// 修改某局分数中的玩家栏
			var modify_a = "玩家 " + $("#set_playerA").val() + " 的分数";
			storage.setItem('modify_a',modify_a);

			storage.setItem('bKey',player_b);
			nameB = storage.getItem('bKey');
			$("#playerB").html(nameB);
			var modify_b = "玩家 " + $("#set_playerB").val() + " 的分数";
			storage.setItem('modify_b',modify_b);

			storage.setItem('cKey',player_c);
			nameC = storage.getItem('cKey');
			$("#playerC").html(nameC);
			var modify_c = "玩家 " + $("#set_playerC").val() + " 的分数";
			storage.setItem('modify_c',modify_c);

			storage.setItem('dKey',player_d);
			nameD = storage.getItem('dKey');
			$("#playerD").html(nameD);
			var modify_d = "玩家 " + $("#set_playerD").val() + " 的分数";
			storage.setItem('modify_d',modify_d);

			$("#save_suc").show();
			if ($("#save_suc").is(":visible")) {
			setTimeout(function(){$("#save_suc").hide()},5000);
			}
		}
		else{
			$("#save_fail").show();
			setTimeout(function(){$("#save_fail").hide()},5000);
		}
	});


// 历史记录界面，点击表格除了清楚栏的区域，跳转至修改记录界面
$('#tbody').on("click",'.left', function() {
	window.location.href='modify.html';
});

// 历史记录界面删除一局的分数
	$('#tbody').on("click",'.delete_c', function() {
		// 加一个删除提示框
		if(confirm("确定要删除该局分数吗？")){
   		var this_id = $(this).parent().parent().attr("class");

   		a_sum = a_sum - a_arr[this_id];
			storage.setItem('sumA',a_sum);//主界面的总分
			$("#a_sum").html(a_sum);
			document.getElementById("tbody").getElementsByTagName("tr")[this_id-1].childNodes[1].innerHTML = 0;
			storage.setItem('a_'+this_id,0);
			a_arr[this_id] = parseInt(storage.getItem('a_'+this_id));

   		b_sum = b_sum - b_arr[this_id];
			storage.setItem('sumB',b_sum);
   		$("#b_sum").html(b_sum);
			document.getElementById("tbody").getElementsByTagName("tr")[this_id-1].childNodes[2].innerHTML = 0;
			storage.setItem('b_'+this_id,0);
			b_arr[this_id] = parseInt(storage.getItem('b_'+this_id));

   		c_sum = c_sum - c_arr[this_id];
			storage.setItem('sumC',c_sum);
   		$("#c_sum").html(c_sum);
			document.getElementById("tbody").getElementsByTagName("tr")[this_id-1].childNodes[3].innerHTML = 0;
			storage.setItem('c_'+this_id,0);
			c_arr[this_id] = parseInt(storage.getItem('c_'+this_id));

   		d_sum = d_sum - d_arr[this_id];
			storage.setItem('sumD',d_sum);
   		$("#d_sum").html(d_sum);
			document.getElementById("tbody").getElementsByTagName("tr")[this_id-1].childNodes[4].innerHTML = 0;
			storage.setItem('d_'+this_id,0);
			d_arr[this_id] = parseInt(storage.getItem('d_'+this_id));

			// 对局总数变更
			// game_num -= 1;
			// storage.setItem('game_num',game_num);
			// $("#game_num").html(game_num);

   	// 	storage.removeItem("data");
   	// 	$(this).parent().parent().remove();
   		pre_id = this_id-1;
   		if (this_id>1) {
    		$("."+pre_id+" .delete_c").show();
    	}

			// this_id = parseInt(this_id)
			// console.log(this_id+1)
			// console.log(game_num+1);
			// console.log($("#1").parent().attr("class"))
			// console.log($("#"+this_id).parent().attr("class"))
			// for (i=this_id+1;i<=game_num+1;i++){
			// 		console.log($("#"+i).parent().attr("class"))
			// 		$("#"+i).parent().attr("class") -= 1;
			// 		console.log($("#"+i).parent().attr("class"))
			// }
		}
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

// 历史记录页面，若跳转进入修改记录页面，对记录进行修改，并同步局数
	for (i = 1; i < 50; i++) {
 // $('#tbody').on("click",'.left',function(){
		$("."+i).click(function(){
			game_index = $(this).attr('class');
			storage.setItem('game_index',game_index);
			// console.log(game_index);
			// console.log(document.getElementById("tbody").getElementsByTagName("tr")[game_index-1].childNodes[1].innerHTML);
			// console.log(document.getElementById("tbody").getElementsByTagName("th")[game_index-1].innerHTML);
			//mod_a = $(this).attr('class');
			mod_a = document.getElementById("tbody").getElementsByTagName("tr")[game_index-1].childNodes[1].innerHTML;
			mod_b = document.getElementById("tbody").getElementsByTagName("tr")[game_index-1].childNodes[2].innerHTML;
			mod_c = document.getElementById("tbody").getElementsByTagName("tr")[game_index-1].childNodes[3].innerHTML;
			mod_d = document.getElementById("tbody").getElementsByTagName("tr")[game_index-1].childNodes[4].innerHTML;
			//mod_a = this.parentNode.cells[1].childNodes[0].value;
			//mod_a = document.getElementById("tbody").rows(1).cells(1).innerText;
			storage.setItem('mod_a',mod_a);
			storage.setItem('mod_b',mod_b);
			storage.setItem('mod_c',mod_c);
			storage.setItem('mod_d',mod_d);
		});
	 }
	 //修改记录的保存按钮
	 $("#confirm_mod").click(function(){
		 game_index = storage.getItem('game_index');

		 var mod_a = $("#mod_a").val();//读取输入框的分数
		 var mod_b = $("#mod_b").val();//读取输入框的分数
		 var mod_c = $("#mod_c").val();//读取输入框的分数
		 var mod_d = $("#mod_d").val();//读取输入框的分数
		 // 保证输入不为空
		 if(mod_a!="" && mod_b!="" && mod_c!="" && mod_d!=""){
			 a_sum = a_sum - document.getElementById("tbody").getElementsByTagName("tr")[game_index-1].childNodes[1].innerHTML;//总分先减去原单元格的分数
			 document.getElementById("tbody").getElementsByTagName("tr")[game_index-1].childNodes[1].innerHTML = mod_a;
			 storage.setItem('a_'+game_index,mod_a);
			 a_arr[game_index] = parseInt(storage.getItem('a_'+game_index));
			 a_sum = a_sum + a_arr[game_index];//再加上新的修改后分数
			 storage.setItem('sumA',a_sum);//主界面的总分
			 $("#a_sum").html(a_sum);

			 b_sum = b_sum - document.getElementById("tbody").getElementsByTagName("tr")[game_index-1].childNodes[2].innerHTML;//总分先减去原单元格的分数
			 document.getElementById("tbody").getElementsByTagName("tr")[game_index-1].childNodes[2].innerHTML = mod_b;
			 storage.setItem('b_'+game_index,mod_b);
			 b_arr[game_index] = parseInt(storage.getItem('b_'+game_index));
			 b_sum = b_sum + b_arr[game_index];//再加上新的修改后分数
			 storage.setItem('sumB',b_sum);//主界面的总分
			 $("#b_sum").html(b_sum);

			 c_sum = c_sum - document.getElementById("tbody").getElementsByTagName("tr")[game_index-1].childNodes[3].innerHTML;//总分先减去原单元格的分数
			 document.getElementById("tbody").getElementsByTagName("tr")[game_index-1].childNodes[3].innerHTML = mod_c;
			 storage.setItem('c_'+game_index,mod_c);
			 c_arr[game_index] = parseInt(storage.getItem('c_'+game_index));
			 c_sum = c_sum + c_arr[game_index];//再加上新的修改后分数
			 storage.setItem('sumC',c_sum);//主界面的总分
			 $("#c_sum").html(c_sum);

			 d_sum = d_sum - document.getElementById("tbody").getElementsByTagName("tr")[game_index-1].childNodes[4].innerHTML;//总分先减去原单元格的分数
			 document.getElementById("tbody").getElementsByTagName("tr")[game_index-1].childNodes[4].innerHTML = mod_d;
			 storage.setItem('d_'+game_index,mod_d);
			 d_arr[game_index] = parseInt(storage.getItem('d_'+game_index));
			 d_sum = d_sum + d_arr[game_index];//再加上新的修改后分数
			 storage.setItem('sumD',d_sum);//主界面的总分
			 $("#d_sum").html(d_sum);

			 $("#save_suc").show();
			 if ($("#save_suc").is(":visible")) {
			 setTimeout(function(){$("#save_suc").hide()},5000);
		 }}
		 else{
			 $("#save_fail").show();
 			 setTimeout(function(){$("#save_fail").hide()},5000);
		 }
	 });

	/*自动保存*/
	function auto_save() {
		var old_data = $("#1").parent().parent().html();
		//console.log(old_data);
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

});
