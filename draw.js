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
    "data": [{ "category": "", "datacollection": [{ "title": "  A", "amount": ""+a_sum+"" }, { "title": "  B", "amount": ""+b_sum+"" }, { "title": "  C", "amount": ""+c_sum+"" }, { "title": "  D", "amount": ""+d_sum+"" }] }]
  };
  // 四个玩家分数和不为0时显示直方图，否则不显示
  if (aver != 0) {
    $("#myCanvas").show();
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    var v = new histogram(ctx,jasonData,aver);
    v.draw();
  }
  else{
    $("#myCanvas").hide();
  }
};
setInterval(startdraw,100);
