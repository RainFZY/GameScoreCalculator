/*求四人的平均得分*/
function sumaver(){
  all = a_sum + b_sum + c_sum + d_sum;
  aver = all/4;
};
setInterval(sumaver,100);

/*画图函数*/
function startdraw(){
  var jasonData = {
    "title": "个人积分",
    "verticaltitle": "积分",
    "horizontaltitle": "",
    "data": [{ "category": "", "datacollection": [{ "title": ""+nameA+"", "amount": ""+a_sum+"" },
    { "title": ""+nameB+"", "amount": ""+b_sum+"" }, { "title": ""+nameC+"", "amount": ""+c_sum+"" },
    { "title": ""+nameD+"", "amount": ""+d_sum+"" }] }]
  };
  // 四个玩家分数和不为0时显示直方图，否则不显示
  if (aver > 0) {
    $("#myCanvas").show();
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    var v = new histogram(ctx,jasonData,aver); // 调用histogram.js中的函数
    v.draw();
  }
  else if (aver == 0) {
    $("#myCanvas").show();
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    var arr = [a_sum,b_sum,c_sum,d_sum]
  	// 将玩家总分从低到高进行排序
  	arr.sort(function(a,b){
  			return a-b;
  	})
    var v = new histogram(ctx,jasonData,(parseInt(-arr[0]/10)+1)*10); // 调用histogram.js中的函数
    v.draw();
  }
  else{
    $("#myCanvas").hide();
  }
};
setInterval(startdraw,100);
