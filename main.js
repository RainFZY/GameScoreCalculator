var storage = window.localStorage;

$(document).ready(function(){

	var sizing3 = document.getElementById("sizing-addon3");
	var sizing4 = document.getElementById("sizing-addon4");
	var setC = document.getElementById("set_c");
	var setD = document.getElementById("set_d");
	var set_playerC = document.getElementById("set_playerC");
	var set_playerD = document.getElementById("set_playerD");
	var text3 = document.getElementById("text3");
	var text4 = document.getElementById("text4");
	var modC = document.getElementById("mod_c");
	var modD = document.getElementById("mod_d");
	
	if(storage.getItem('displayC')==null){
		var displayC = 1;
	}
	else{
		var displayC=storage.getItem('displayC');
	}

	if(storage.getItem('displayD')==null){
		var displayD = 1;
	}
	else{
		var displayD=storage.getItem('displayD');
	}

	if(displayC == 0){
		storage.setItem('cKey','');
		$("#playerC").html('');
		$("#set_playerC").val('');
		$("#c_sum").html('');
		$("#set_c").val(0);
		$("#mod_c").val(0);
		
		if(sizing3 != null){sizing3.style.display="none";}
		if(setC != null){setC.style.display="none";}
		if(set_playerC != null){set_playerC.style.display="none";}
		if(text3 != null){text3.style.display="none";}
		if(modC != null){modC.style.display="none";}
	}
	if(displayD == 0){
		storage.setItem('dKey','');
		$("#playerD").html('');
		$("#set_playerD").val('');
		$("#d_sum").html('');
		$("#set_d").val(0);
		$("#mod_d").val(0);
		
		if(sizing4 != null){sizing4.style.display="none";}
		if(setD != null){setD.style.display="none";}
		if(set_playerD != null){set_playerD.style.display="none";}
		if(text4 != null){text4.style.display="none";}
		if(modD != null){modD.style.display="none";}
	}

	$("#tbody").append(storage.data);
	// 设置玩家界面的玩家id
	$("#playerA").append(storage.aKey);
	$("#playerB").append(storage.bKey);
	$("#playerC").append(storage.cKey);
	$("#playerD").append(storage.dKey);
	// 修改记录界面左列：玩家 xx 的分数
	$("#text1").append(storage.modify_a);
	$("#text2").append(storage.modify_b);
	$("#text3").append(storage.modify_c);
	$("#text4").append(storage.modify_d);
	//玩家设置界面的输入框同步显示玩家id
	// 若没有任何记录，初始化
	if(storage.getItem('aKey')==null){
		nameA = '';
	}
	else{
		nameA = storage.getItem('aKey');
		$('#set_playerA').val(nameA);
	}

	if(storage.getItem('bKey')==null){
		nameB = '';
	}
	else{
		nameB = storage.getItem('bKey');
		$('#set_playerB').val(nameB);
	}

	if(storage.getItem('cKey')==null){
		nameC = '';
	}
	else{
		nameC = storage.getItem('cKey');
		$('#set_playerC').val(nameC);
	}

	if(storage.getItem('dKey')==null){
		nameD = '';
	}
	else{
		nameD = storage.getItem('dKey');
		$('#set_playerD').val(nameD);
	}


	// 修改记录界面输入框同步当局分数
	mod_a = storage.getItem('mod_a');
	$("#mod_a").val(mod_a);
	mod_b = storage.getItem('mod_b');
	$("#mod_b").val(mod_b);
	mod_c = storage.getItem('mod_c');
	$("#mod_c").val(mod_c);
	mod_d = storage.getItem('mod_d');
	$("#mod_d").val(mod_d);
	// 玩家各局得分列表
	var a_arr = new Array();
	var b_arr = new Array();
	var c_arr = new Array();
	var d_arr = new Array();
	// storage.removeItem('sumA');
	// console.log(a_sum);
	// console.log(storage.getItem('sumA'));
	if(storage.getItem('sumA')==null){
		a_sum = 0;
	}
	else{
		a_sum = parseInt(storage.getItem('sumA'));
	}

	if(storage.getItem('sumB')==null){
		b_sum = 0;
	}
	else{
		b_sum = parseInt(storage.getItem('sumB'));
	}

	if(storage.getItem('sumC')==null){
		c_sum = 0;
	}
	else if(displayC==0){
		c_sum = '';
	}
	else{
		c_sum = parseInt(storage.getItem('sumC'));
	}

	if(storage.getItem('sumD')==null){
		d_sum = 0;
	}
	else if(displayD==0){
		d_sum = '';
	}
	else{
		d_sum = parseInt(storage.getItem('sumD'));
	}
	$("#a_sum").append(storage.sumA);
	$("#b_sum").append(storage.sumB);
	$("#c_sum").append(storage.sumC);
	$("#d_sum").append(storage.sumD);

	/*显示总分*/
	// html()意思是显示其html内容
	$("#a_sum").html(a_sum);
	$("#b_sum").html(b_sum);
	$("#c_sum").html(c_sum);
	$("#d_sum").html(d_sum);
	// a_sum = 0;
	// b_sum = 0;
	// c_sum = 0;
	// d_sum = 0;


	a_arr.length = 50;


	if(storage.getItem('game_num')==null){
		game_num = 0;
		storage.setItem('game_num',0);
	}
	else{
		game_num = parseInt(storage.getItem('game_num'));
	}

	if(storage.getItem('game_sum')==null){
		game_sum = 0;
		storage.setItem('game_sum',0);
	}
	else{
		game_sum = parseInt(storage.getItem('game_sum'));
	}
	// 主界面的总共进行局数
	$("#game_num").append(storage.game_num);
	// 预设界面的
	$("#game_sum").append(storage.game_sum);

	$("game_num").html(game_num);

	// setSum界面输入框同步显示单局总分
	game_sum = storage.getItem('game_sum');
	$('#game_sum').val(game_sum);

	// 首页显示最高分玩家
	var arr = [a_sum,b_sum,c_sum,d_sum]
	// 将玩家总分从高到低进行排序
	arr.sort(function(a,b){
		return b - a
	})
	// console.log(arr)
	// 首页目前最高得分玩家
	var max_name = '';
	if(arr[0]==a_sum){
		max_name = max_name + nameA + ' ';
	}
	if (arr[0]==b_sum) {
		max_name = max_name + nameB + ' ';
	}
	if (arr[0]==c_sum) {
		max_name = max_name + nameC + ' ';
	}
	if (arr[0]==d_sum){
		max_name = max_name + nameD + ' ';
	}
	// console.log(max_name);
	$("#max_name").val(max_name);
	$("#max_name").html("目前得分最高："+max_name);
	// 修改记录界面的局数
	game_index=parseInt(storage.getItem('game_index'));
	$("#game_index").html("局数："+game_index);

	// 总行数
	var trows = $("#tbody tr").length + 1;
	// 将localStorage保存的值赋给数组
	for (var i = 1; i < game_num+50; i++) {
		a_arr[i]= parseInt(storage.getItem('a_'+i));
		b_arr[i]= parseInt(storage.getItem('b_'+i));
		c_arr[i]= parseInt(storage.getItem('c_'+i));
		d_arr[i]= parseInt(storage.getItem('d_'+i));
	}


	// 删除所有记录按钮
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
			storage.setItem('sumA',a_sum);
			storage.setItem('sumB',b_sum);
			storage.setItem('sumC',c_sum);
			storage.setItem('sumD',d_sum);
			storage.setItem('game_num',game_num);
			// return false;
		}
	});


	// 设置单局总分的保存按钮
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

	// 新增一局的保存按钮
	$("#add_row").click(function(){
		var trows = $("#tbody tr").length + 1;
		var set_a = $("#set_a").val();
		var set_b = $("#set_b").val();
		var set_c = $("#set_c").val();
		var set_d = $("#set_d").val();
		var displayC = storage.getItem('displayC');
		var displayD = storage.getItem('displayD');
		game_sum = storage.getItem('game_sum');
		// 输入了三个分数，根据预设总分自动填补第四个分数
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
		if (set_a != "" && set_b != "" && set_c != "" && set_d != "") {
			set_a = parseInt(set_a);
			set_b = parseInt(set_b);
			set_c = parseInt(set_c);
			set_d = parseInt(set_d);
			// 输入的四个分数之和不等于预设的总分值的情况
			if(set_a + set_b + set_c + set_d != game_sum){
				$("#sum_incorrect").show();
				/*设置5秒后提示消息消失*/
				setTimeout(function(){$("#sum_incorrect").hide()},5000);
			}
			// 符合保存条件的情况
			else{
				storage.setItem('a_'+trows,set_a);
				a_arr[trows] = parseInt(storage.getItem('a_'+trows));
				a_sum = a_sum + a_arr[trows];
				storage.setItem('sumA',a_sum);
				$("#a_sum").html(a_sum);

				storage.setItem('b_'+trows,set_b);
				b_arr[trows] = parseInt(storage.getItem('b_'+trows));
				b_sum = b_sum + b_arr[trows];
				storage.setItem('sumB',b_sum);
				$("#b_sum").html(b_sum);
				
				if(displayC==1){
					storage.setItem('c_'+trows,set_c);
					c_arr[trows] = parseInt(storage.getItem('c_'+trows));
					c_sum = c_sum + c_arr[trows];
					storage.setItem('sumC',c_sum);
					$("#c_sum").html(c_sum);
				}

				if(displayD==1){
					storage.setItem('d_'+trows,set_d);
					d_arr[trows] = parseInt(storage.getItem('d_'+trows));
					d_sum = d_sum + d_arr[trows];
					storage.setItem('sumD',d_sum);
					$("#d_sum").html(d_sum);
				}

				//游戏局数
				game_num += 1;
				storage.setItem('game_num',game_num);
				$("#game_num").html(game_num);
				// append，加上这行
				var $this_row = $('<tr class="'+trows+'">\
				<th scope="row" id="'+trows+'" class="left">第'+trows+'局</th>\
				<td class="left">'+set_a+'</td><td class="left">'+set_b+'</td>\
				<td class="left">'+set_c+'</td><td class="left">'+set_d+'</td>\
				<td><button class="delete_c">\
				<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>\
				</button></td></tr>');
				$("#tbody").append($this_row);

				storage.setItem('data',old_data);
				$("#save_suc").show();
				if ($("#save_suc").is(":visible")) {
				setTimeout(function(){$("#save_suc").hide()},5000);
				}
			}
		}
		// 输入不足三个分数，显示“请至少输入三个分数！”
		else{
			$("#save_fail").show();
			setTimeout(function(){$("#save_fail").hide()},5000);
		}
	});

	// 新增一局的清空按钮
	$("#clear").click(function(){
		$("#set_a").val('');
		$("#set_b").val('');
		if(displayC==0 && displayD==0){
			$("#set_c").val(0);
			$("#set_d").val(0);
		}
		else if(displayC==1 && displayD==0){
			$("#set_c").val('');
			$("#set_d").val(0);
		}
		else{
			$("#set_c").val('');
			$("#set_d").val('');
		}
	});

	// 玩家设置→预设按钮→选择玩家人数按钮
	$("#set_2players").click(function(){
		storage.setItem('displayC',0);
		storage.setItem('displayD',0);
		// 显示成功设置
		$("#save_suc").show();
		if ($("#save_suc").is(":visible")) {
			setTimeout(function(){$("#save_suc").hide()},5000);
		}
	});
	$("#set_3players").click(function(){
		storage.setItem('displayC',1);
		storage.setItem('displayD',0);
		// 显示成功设置
		$("#save_suc").show();
		if ($("#save_suc").is(":visible")) {
			setTimeout(function(){$("#save_suc").hide()},5000);
		}
	});
	$("#set_4players").click(function(){
		storage.setItem('displayC',1);
		storage.setItem('displayD',1);
		// 显示成功设置
		$("#save_suc").show();
		if ($("#save_suc").is(":visible")) {
			setTimeout(function(){$("#save_suc").hide()},5000);
		}
	});


	// 玩家设置的保存按钮
	$("#save_player").click(function(){
		var player_a = $("#set_playerA").val();
		var player_b = $("#set_playerB").val();
		var player_c = $("#set_playerC").val();
		var player_d = $("#set_playerD").val();
		// 保证玩家id不超过三个字符
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


	// 历史记录界面删除一局的分数
	$('#tbody').on("click",'.delete_c', function() {
		// 加一个删除提示框
		if(confirm("确定要删除该局分数吗？")){
			var this_id = $(this).parent().parent().attr("class");

			a_sum = a_sum - a_arr[this_id];
			storage.setItem('sumA',a_sum);
			$("#a_sum").html(a_sum);
			document.getElementById("tbody").getElementsByTagName("tr")[this_id-1].childNodes[3].innerHTML = 0;
			storage.setItem('a_'+this_id,0);
			a_arr[this_id] = parseInt(storage.getItem('a_'+this_id));

			b_sum = b_sum - b_arr[this_id];
			storage.setItem('sumB',b_sum);
			$("#b_sum").html(b_sum);
			document.getElementById("tbody").getElementsByTagName("tr")[this_id-1].childNodes[4].innerHTML = 0;
			storage.setItem('b_'+this_id,0);
			b_arr[this_id] = parseInt(storage.getItem('b_'+this_id));

			c_sum = c_sum - c_arr[this_id];
			storage.setItem('sumC',c_sum);
			$("#c_sum").html(c_sum);
			document.getElementById("tbody").getElementsByTagName("tr")[this_id-1].childNodes[6].innerHTML = 0;
			storage.setItem('c_'+this_id,0);
			c_arr[this_id] = parseInt(storage.getItem('c_'+this_id));

			d_sum = d_sum - d_arr[this_id];
			storage.setItem('sumD',d_sum);
			$("#d_sum").html(d_sum);
			document.getElementById("tbody").getElementsByTagName("tr")[this_id-1].childNodes[7].innerHTML = 0;
			storage.setItem('d_'+this_id,0);
			d_arr[this_id] = parseInt(storage.getItem('d_'+this_id));

			pre_id = this_id-1;
			if (this_id>1) {
				$("."+pre_id+" .delete_c").show();
			}
		}
	});


	// 跳转进入新增一局界面
	$("#add_data").click(function(){
		window.location.href='add.html';
	});
	// 跳转进入设置玩家界面
	$("#set_player").click(function(){
		window.location.href='setPlayer.html';
	});
	// 跳转回首页
	$("#back").click(function(){
		window.location.href='index.html';
	});
	// 跳转至查看历史界面
	$("#view_history").click(function(){
		window.location.href='viewHistory.html';
	});
	// 历史记录界面，点击表格除了清楚栏的区域，跳转至修改记录界面
	$('#tbody').on("click",'.left', function() {
		window.location.href='modify.html';
	});
	// 新增一局的预设按钮
	$("#set_sum").click(function(){
		window.location.href='setSum.html';
	});
	// 设置玩家的预设按钮
	$("#set_player_num").click(function(){
		window.location.href='setPlayerNum.html';
	});

	// 历史记录页面，若跳转进入修改记录页面，对记录进行修改，并同步局数
	for (i = 1; i < 50; i++) {
		$("."+i).click(function(){
			game_index = $(this).attr('class');
			storage.setItem('game_index',game_index);
			// console.log(game_index);
			mod_a = document.getElementById("tbody").getElementsByTagName("tr")[game_index-1].childNodes[3].innerHTML;
			mod_b = document.getElementById("tbody").getElementsByTagName("tr")[game_index-1].childNodes[4].innerHTML;
			mod_c = document.getElementById("tbody").getElementsByTagName("tr")[game_index-1].childNodes[6].innerHTML;
			mod_d = document.getElementById("tbody").getElementsByTagName("tr")[game_index-1].childNodes[7].innerHTML;
			// console.log(mod_a);
			// console.log(mod_c);
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
			 a_sum = a_sum - document.getElementById("tbody").getElementsByTagName("tr")[game_index-1].childNodes[3].innerHTML;//总分先减去原单元格的分数
			 document.getElementById("tbody").getElementsByTagName("tr")[game_index-1].childNodes[3].innerHTML = mod_a;
			 storage.setItem('a_'+game_index,mod_a);
			 a_arr[game_index] = parseInt(storage.getItem('a_'+game_index));
			 a_sum = a_sum + a_arr[game_index];//再加上新的修改后分数
			 storage.setItem('sumA',a_sum);
			 $("#a_sum").html(a_sum);

			 b_sum = b_sum - document.getElementById("tbody").getElementsByTagName("tr")[game_index-1].childNodes[4].innerHTML;//总分先减去原单元格的分数
			 document.getElementById("tbody").getElementsByTagName("tr")[game_index-1].childNodes[4].innerHTML = mod_b;
			 storage.setItem('b_'+game_index,mod_b);
			 b_arr[game_index] = parseInt(storage.getItem('b_'+game_index));
			 b_sum = b_sum + b_arr[game_index];//再加上新的修改后分数
			 storage.setItem('sumB',b_sum);
			 $("#b_sum").html(b_sum);

			 c_sum = c_sum - document.getElementById("tbody").getElementsByTagName("tr")[game_index-1].childNodes[6].innerHTML;//总分先减去原单元格的分数
			 document.getElementById("tbody").getElementsByTagName("tr")[game_index-1].childNodes[6].innerHTML = mod_c;
			 storage.setItem('c_'+game_index,mod_c);
			 c_arr[game_index] = parseInt(storage.getItem('c_'+game_index));
			 c_sum = c_sum + c_arr[game_index];//再加上新的修改后分数
			 storage.setItem('sumC',c_sum);
			 $("#c_sum").html(c_sum);

			 d_sum = d_sum - document.getElementById("tbody").getElementsByTagName("tr")[game_index-1].childNodes[7].innerHTML;//总分先减去原单元格的分数
			 document.getElementById("tbody").getElementsByTagName("tr")[game_index-1].childNodes[7].innerHTML = mod_d;
			 storage.setItem('d_'+game_index,mod_d);
			 d_arr[game_index] = parseInt(storage.getItem('d_'+game_index));
			 d_sum = d_sum + d_arr[game_index];//再加上新的修改后分数
			 storage.setItem('sumD',d_sum);
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

	// 自动保存
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
