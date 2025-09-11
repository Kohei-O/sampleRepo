//問題用に描画するスクリプト
function draw1(a) {
    "use strict";
    //フォームから受け取った数を直接扱うとおかしくなるようだ。特に1つ目。eval()しておく。
    var c_width = document.getElementById(a + "_mycanvas").width;
    var xmin = eval(document.getElementById(a + "_xmin").value);
    var xmax = eval(document.getElementById(a + "_xmax").value);
    var ymin = eval(document.getElementById(a + "_ymin").value);
    var ymax = eval(document.getElementById(a + "_ymax").value);
    var xstart1 = eval(document.getElementById(a + "_xstart1").value);
    var xend1 = eval(document.getElementById(a + "_xend1").value);
    var xstart2 = eval(document.getElementById(a + "_xstart2").value);
    var xend2 = eval(document.getElementById(a + "_xend2").value);
    var xstart3 = eval(document.getElementById(a + "_xstart3").value);
    var xend3 = eval(document.getElementById(a + "_xend3").value);
    var lx = xmax - xmin;
    var ly = ymax - ymin;
    var dx = lx / c_width;
    //座標をピクセル単位の座標に直す
    function transx(x) {
        return (x - xmin) * c_width / lx;
    }
    function transy(y) {
        return (ymax - y) * c_width / ly;
    }
    //フォームy から文字列を読み込んで関数の式とする
    var y1 = document.getElementById(a + "_y1").value;
    var y2 = document.getElementById(a + "_y2").value;
    var y3 = document.getElementById(a + "_y3").value;
    //グラフ y1 の描画
    var context = document.getElementById(a + "_mycanvas").getContext('2d');
    context.clearRect(0, 0, c_width, c_width);
    context.beginPath();
    var x = xstart1;
    context.moveTo(transx(xstart1), transy(eval(y1)));
    var i;
    for (i = 0; i <= c_width; i++) {
        x = xmin + i * dx;
        if (x >= xstart1 && x <= xend1) {
            context.lineTo(transx(x), transy(eval(y1)));
        }
    }
    context.stroke();
//グラフ y2 の描画
    context.beginPath();
    x = xstart2;
    context.moveTo(transx(xstart2), transy(eval(y2)));
    for (i = 0; i <= c_width; i++) {
        x = xmin + i * dx;
        if (x >= xstart2 && x <= xend2) {
            context.lineTo(transx(x), transy(eval(y2)));
        }
    }
    context.stroke();
//グラフ y3 の描画
    context.beginPath();
    x = xstart3;
    context.moveTo(transx(xstart3), transy(eval(y3)));
    for (i = 0; i <= c_width; i++) {
        x = xmin + i * dx;
        if (x >= xstart3 && x <= xend3) {
            context.lineTo(transx(x), transy(eval(y3)));
        }
    }
    context.stroke();
//座標軸、目盛りの描画
//「座標軸あり」の場合のみ軸の描画を行う。
	if (!document.getElementsByName("scaleAxis_" + a)[2].checked) {
		context.beginPath();
		context.moveTo(transx(xmin), transy(0));
		context.lineTo(transx(xmax), transy(0));
		context.stroke();
		context.beginPath();
		context.moveTo(transx(0), transy(ymin));
		context.lineTo(transx(0), transy(ymax));
		context.stroke();
	//さらに「目盛りあり」の場合には以下も行う
		if (document.getElementsByName("scaleAxis_" + a)[0].checked) {
			for (i = Math.floor(xmin + 1); i <= Math.ceil(xmax - 1); i++) {
				context.strokeRect(transx(i), transy(0) - 5, 1, 10);
				context.font = "bold 10pt sans-serif";
				context.textAlign = "center";
				context.textBaseline = "top";
				context.fillText(i, transx(i), transy(0) + 10);
			}
			for (i = Math.floor(ymin + 1); i <= Math.ceil(ymax - 1); i++) {
				if (i !== 0) {
					context.strokeRect(transx(0) - 5, transy(i), 10, 1);
					context.font = "bold 10pt sans-serif";
					context.textAlign = "right";
					context.textBaseline = "middle";
					context.fillText(i, transx(0) - 8, transy(i));
				}
			}
		}
	}
}
//canvas要素 a_mycanvasに b 番目の文字列を描画する
function putstr(a, b) {
    "use strict";
    var c_width = document.getElementById(a + "_mycanvas").width;
    var xmin = eval(document.getElementById(a + "_xmin").value);
    var xmax = eval(document.getElementById(a + "_xmax").value);
    var ymin = eval(document.getElementById(a + "_ymin").value);
    var ymax = eval(document.getElementById(a + "_ymax").value);
    var lx = xmax - xmin;
    var ly = ymax - ymin;//
//value は文字列もちゃんと返す
    var str = document.getElementById(b + "_str" + a).value;
    var x = eval(document.getElementById("x" + b + "_str" + a).value);
    var y = eval(document.getElementById("y" + b + "_str" + a).value);
    var context = document.getElementById(a+"_mycanvas").getContext('2d');
    context.font = "15pt sans-serif";
    context.textAlign = "left";
//文字列が 'null'でないときに限り描画する
//if(str != 'null'){
     context.fillText(str, transx(x), transy(y));
//}
     function transx(x) {
        return (x - xmin) * c_width / lx;
     }
     function transy(y){
         return (ymax - y) * c_width / ly;
     }
 }
//canavas 要素 a_mycanvas に b=A or B or C の折れ線 を描画するスクリプト
function draw2(a, b) {
    var c_width = document.getElementById(a + "_mycanvas").width ;
    var xmin = eval(document.getElementById(a + "_xmin").value);
    var xmax = eval(document.getElementById(a + "_xmax").value);
    var ymin = eval(document.getElementById(a + "_ymin").value);
    var ymax = eval(document.getElementById(a + "_ymax").value);
    var lx = xmax-xmin;
    var ly = ymax-ymin;//
//alert("line"+a+b)
    var myarray = document.getElementsByName("line" + a + b + "[]");   
//alert(myarray[0].value);
    var x1 = myarray[0].value;
    var y1 = myarray[1].value;
    var zahyou = [{x:myarray[2].value, y:myarray[3].value}
        , {x:myarray[4].value,y:myarray[5].value}
        , {x:myarray[6].value,y:myarray[7].value}
        , {x:myarray[8].value,y:myarray[9].value}];
    var context = document.getElementById(a+"_mycanvas").getContext('2d');
    context.beginPath();
    context.moveTo(transx(eval(x1)), transy(eval(y1)));
	var i;
    for (i in zahyou) {
        if (zahyou[i]['x']!=null && zahyou[i]['y'] != null) {
            context.lineTo(transx(eval(zahyou[i]['x'])), transy(eval(zahyou[i]['y'])));
        }
    }
    context.stroke();
    function transx(x){
        return (x - xmin) * c_width / lx;
    }
    function transy(y){
        return (ymax - y) * c_width / ly;
    }
}
//canavas 要素 a_mycanvas に b=A or B or C の破線 を描画するスクリプト
function draw4(a, b) {
	'use strict';
    var c_width = document.getElementById(a + "_mycanvas").width ;
    var xmin = eval(document.getElementById(a + "_xmin").value);
    var xmax = eval(document.getElementById(a + "_xmax").value);
    var ymin = eval(document.getElementById(a + "_ymin").value);
    var ymax = eval(document.getElementById(a + "_ymax").value);
    var lx = xmax-xmin;
    var ly = ymax-ymin;//
//alert("dotline" + a + b);
    var myarray = document.getElementsByName("dotline" + a + b + "[]");   
//alert(myarray[0].value);
    var x1 = myarray[0].value;
    var y1 = myarray[1].value;
    var zahyou = [{x:myarray[2].value, y:myarray[3].value}
        , {x:myarray[4].value,y:myarray[5].value}
        , {x:myarray[6].value,y:myarray[7].value}
        , {x:myarray[8].value,y:myarray[9].value}];
    var context = document.getElementById(a + "_mycanvas").getContext('2d');
    context.beginPath();
	context.setLineDash([5,5]);//点線のスタイル指定
    context.moveTo(transx(eval(x1)), transy(eval(y1)));   
    var i_end = zahyou.length - 1;
	var i;
	for (i = 0; i <= i_end; i++) {
        if (zahyou[i]['x']!=null && zahyou[i]['y'] != null) {
            context.lineTo(transx(eval(zahyou[i]['x'])), transy(eval(zahyou[i]['y'])));
        }
    }
    context.stroke();
	context.setLineDash([]);//点線のスタイルを元に戻し実線とする
    function transx(x){
        return (x - xmin) * c_width / lx;
    }
    function transy(y){
        return (ymax - y) * c_width / ly;
    }
}
//a_mycavas に円弧 z を描画するスクリプトc
function draw3(a, z){
    var c_width = document.getElementById(a + "_mycanvas").width ;
    var xmin = eval(document.getElementById(a + "_xmin").value);
    var xmax = eval(document.getElementById(a + "_xmax").value);
    var ymin = eval(document.getElementById(a + "_ymin").value);
    var ymax = eval(document.getElementById(a + "_ymax").value);
    var lx = xmax - xmin;
    var ly = ymax - ymin;
    var temp = document.getElementsByName('m'+ a + "_circle" + z + "[]")[0].value;
    var center_x = transx(temp);
   // alert(center_x);
    temp = document.getElementsByName('m'+a + "_circle" + z + "[]")[1].value;
    var center_y = transy(temp);
    //alert(center_y);
    temp = document.getElementsByName('m'+a + "_circle" + z + "[]")[2].value;
    var radius = temp * c_width / lx;
   // alert(radius);
    temp = document.getElementsByName('m'+a + "_circle" + z + "[]")[3].value;
    var startAngle =  Math.PI * (360 - temp) / 180;
    //alert(startAngle);
     temp = document.getElementsByName('m'+a + "_circle" + z + "[]")[4].value;
    var endAngle = Math.PI * (360 - temp) / 180;
    //alert(endAngle);
    if (document.getElementsByName('m'+a + "_clock"+z)[0].checked) {
    var clock = true;
    } else {
     var clock = false;   
    }
    //alert(clock);
    var context = document.getElementById(a+"_mycanvas").getContext('2d');
    context.beginPath();
    context.arc(center_x, center_y, radius, startAngle, endAngle, clock);
    context.stroke();
    function transx(x){
        return (x - xmin) * c_width / lx;
    }
    function transy(y){
        return (ymax - y) * c_width / ly;
    }
}
function draw5(a, z){
    var c_width = document.getElementById(a + "_mycanvas").width ;
    var xmin = eval(document.getElementById(a + "_xmin").value);
    var xmax = eval(document.getElementById(a + "_xmax").value);
    var ymin = eval(document.getElementById(a + "_ymin").value);
    var ymax = eval(document.getElementById(a + "_ymax").value);
    var lx = xmax - xmin;
    var ly = ymax - ymin;
    var temp = document.getElementsByName(a + "_circle" + z + "[]")[0].value;
    var center_x = transx(temp);
   // alert(center_x);
    temp = document.getElementsByName(a + "_circle" + z + "[]")[1].value;
    var center_y = transy(temp);
    //alert(center_y);
    temp = document.getElementsByName(a + "_circle" + z + "[]")[2].value;
    var radius = temp * c_width / lx;
   // alert(radius);
    temp = document.getElementsByName(a + "_circle" + z + "[]")[3].value;
    var startAngle =  Math.PI * (360 - temp) / 180;
    //alert(startAngle);
     temp = document.getElementsByName(a + "_circle" + z + "[]")[4].value;
    var endAngle = Math.PI * (360 - temp) / 180;
    //alert(endAngle);
    if (document.getElementsByName(a + "_clock"+z)[0].checked) {
    var clock = true;
    } else {
     var clock = false;   
    }
    //alert(clock);
    var context = document.getElementById(a+"_mycanvas").getContext('2d');
    context.beginPath();
    context.arc(center_x, center_y, radius, startAngle, endAngle, clock);
    context.stroke();
    function transx(x){
        return (x - xmin) * c_width / lx;
    }
    function transy(y){
        return (ymax - y) * c_width / ly;
    }
} 
function drawing() {
	'use strict';
	var a;
	for (a = 1; a <= 4; a++) {
		draw1(a);
		putstr(a,1);
		putstr(a,2);
		putstr(a,3);
		putstr(a,4);
		putstr(a,5);
		putstr(a,6);
		draw2(a,'A');
		draw2(a,'B');
		draw2(a,'C');
		draw3(a,"A");
		draw3(a,"B");
		draw3(a,"C");
		draw4(a,'A');
		draw4(a,'B');
		draw4(a,'C');
	}	
	var b;
	a = '';
	for (b = 1; b <= 4; b++) {
		a = 'k' + b;
		//alert(a);
		draw1(a);
		putstr(a,1);
		putstr(a,2);
		putstr(a,3);
		putstr(a,4);
		putstr(a,5);
		putstr(a,6);
		draw2(a,'A');
		draw2(a,'B');
		draw2(a,'C');
		draw4(a,'A');
		draw4(a,'B');
		draw4(a,'C');
		draw5(a,"A");
		draw5(a,"B");
		draw5(a,"C");
	}	
}
document.forms[0].onchange = drawing;