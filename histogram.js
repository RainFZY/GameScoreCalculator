/***************************************
//ctx: Canvas 2D context
//data: json 数据
//yInterval: Y轴一刻度的数值
****************************************/
function histogram(ctx, data, yInterval) {

    this.ctx = ctx;

    //Json数据
    this.data = data;

    //Y轴一刻度的数值
    this.yInterval = yInterval;
};


histogram.prototype.draw = function () {


    //柱状图标题
     var title = this.data.title;

    //Y轴标题
     var verticaltitle = this.data.verticaltitle;

    //X轴标题
     var horizontaltitle = this.data.horizontaltitle;

    //柱状图颜色
    var colors = ["#50a8fa", "#FFCC00"];


    var dataarray = this.data.data;
    var dataCollection;
    var metaData;

    var maxamount = 0;
    var categoryCount = dataarray.length;
    var dataCount = dataarray[0].datacollection.length;

    //找出最大的数值，以便绘制Y轴的刻度。
    for (var i = 0; i < dataarray.length; i++) {

        dataCollection = dataarray[i].datacollection;
        for (var j = 0; j < dataCollection.length; j++) {

            metaData = dataCollection[j];
            maxamount = (new Number(metaData.amount) > maxamount) ? metaData.amount : maxamount;
        }
    }
maxnum = maxamount;
// console.log(maxamount);

    //动态设置 canvas 的尺寸
   this.ctx.canvas.height = Math.ceil(maxamount / this.yInterval) * 50 + 120;    //120 is for the chart title.
    this.ctx.canvas.width = categoryCount * dataCount * 30 + dataCount*30  + 50;  //150 is for right side index


    var vbar = new verticalbar(this.ctx, maxamount, this.yInterval);
    var hbar = new horizontalbar(this.ctx, categoryCount, dataCount);

    //绘制 x 轴和 y 轴
    vbar.draw();
    hbar.draw();

    //绘制标题
    this.ctx.font = "bold 16px Arial";
    this.ctx.textAlign = "center";
    this.ctx.fillText(title, this.ctx.canvas.width/2,25);

    //绘制Y轴标题
    this.ctx.font = "12px Arial";
    this.ctx.textAlign = "center";
    this.ctx.fillText(verticaltitle, 50, 40);

    //绘制X轴标题
    this.ctx.font = "12px Arial";
    this.ctx.fillText(horizontaltitle, this.ctx.canvas.width - 47, this.ctx.canvas.height - 46);

    //绘制柱
    this.ctx.lineWidth = 25;
    var x = 80;
    var y = this.ctx.canvas.clientHeight;

    for (var i = 0; i < dataarray.length; i++) {

        dataCollection = dataarray[i].datacollection;
        this.ctx.beginPath();
        this.ctx.strokeStyle = colors[i];

        for (var j = 0; j < dataCollection.length; j++) {
            // console.log(dataCollection[j].amount);
            metaData = dataCollection[j];
            // console.log(metaData.amount);
            this.ctx.moveTo(x, y - 50 -1);
            this.ctx.lineTo(x, y - 50 - 1 - (metaData.amount / vbar.interval) * 50 + 1); //change here
            this.ctx.stroke();

            //绘制柱的高度
            // metaData.amount += 0;
            this.ctx.font = "10px Arial";this.ctx.textAlign = "start";
            this.ctx.fillText(metaData.amount, x - 5, y - 50 - 1 - (metaData.amount / vbar.interval) * 50); // change here

            //绘制柱的标题
            this.ctx.font = "12px Arial";
            this.ctx.fillText(metaData.title, x-12 , y - 30);

            x += (categoryCount * 30 + 30);
        }

        x = 80 + 30 * (i + 1);

    }

    /*绘制右上角的标识器
    this.ctx.lineWidth = 15;
    for (var i = 0; i < dataarray.length; i++) {

        this.ctx.beginPath();
        this.ctx.strokeStyle = colors[i];
        this.ctx.moveTo(this.ctx.canvas.width-80, 50+i*17);
        this.ctx.lineTo(this.ctx.canvas.width - 65, 50 + i * 17);
        this.ctx.font = "12px Arial";
        this.ctx.textAlign = "left";
        this.ctx.fillText(dataarray[i].category, this.ctx.canvas.width - 60, 50 + i * 17+4);
        this.ctx.stroke();
    }*/

}


 /***************************************
//X轴
//ctx: Canvas 2D context
//categoryCount: 数据的分类
//dataCount: 每一分类的数据样本数
****************************************/
function horizontalbar(ctx, categoryCount, dataCount) {

    this.ctx = ctx;
    this.categoryCount = categoryCount;
    this.dataCount = dataCount;
};

horizontalbar.prototype.draw = function () {

    //计算X轴的长度
    var width = this.categoryCount * this.dataCount * 30 + this.dataCount*30;

    //绘制X轴
    this.ctx.beginPath();
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = "#999999";
    this.ctx.moveTo(50, this.ctx.canvas.clientHeight - 50);
    this.ctx.lineTo(50+width, this.ctx.canvas.clientHeight - 50);
    this.ctx.stroke();

};


/***************************************
//Y轴
//ctx: Canvas 2D context
//maxAmount: 数据的最大值
//interval: 每一刻度代表的数值
****************************************/
function verticalbar(ctx, maxAmount, interval) {

    this.ctx = ctx;
    this.maxAmount = maxAmount;
    this.interval = interval;
};

verticalbar.prototype.draw = function () {

    //计算需要绘制几个刻度
    var segmentcount = Math.ceil(this.maxAmount / this.interval);

    //Y轴的高度
    var height = segmentcount * 50;

    //绘制Y轴
    this.ctx.beginPath();
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = "#999999";
    this.ctx.moveTo(50, this.ctx.canvas.clientHeight - 50);
    this.ctx.lineTo(50, this.ctx.canvas.clientHeight - 50 - height - 20);
    this.ctx.stroke();

    //绘制刻度数
    this.ctx.font = "12px Arial";
    this.ctx.textAlign = "end";
    this.ctx.fillText("0", 40, this.ctx.canvas.clientHeight - 50);
    for (var j = 1; j < segmentcount + 1; j++) {

        this.ctx.fillText(this.interval * j, 40, this.ctx.canvas.clientHeight - 20 - (j - 1) * 50 - 70);
    }

};
