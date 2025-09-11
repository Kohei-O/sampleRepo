// canvas への参照などを獲得
var mc = document.getElementById("myCanvas");
var ctx = mc.getContext("2d");
var mcw = mc.width;
var mch = mc.height;

//点の半径を定義
var r = 5;

//角記号の半径
var ar = 20;

//点の初期設定．グローバル変数.
var p = [];
p[0]=[mcw * 3 / 4, mch / 2];
p[1]=[mcw / 2, mch / 2];
p[2]=[mcw / 2, mch * 3 / 4];

// マウス操作時の各動作を設定
mc.onmousedown = mdown;
mc.onmouseup = mup;
mc.onmousemove = mmove;

//点を獲得状態を表すグローバル変数．3は何も獲得していない状態
var pn = 3;

//ページ開始時の描画
rewrite();

//マウスダウン時の処理
function mdown(event){

    //クリックした場所を取得．canvas要素内の相対座標
    var down = [event.offsetX, event.offsetY];

    //点P0, P1, P2 のどれかの上をクリックした場合は pn をその添字に変更
    for (var i = 0; i <= 2; i++) {
        var temp = (down[0] - p[i][0]) * (down[0] - p[i][0]) + (down[1] - p[i][1]) * (down[1] - p[i][1]);
        var distance = Math.sqrt(temp);
        if (distance <= r) {
            pn = i;
        }
    }   
}
//マウスアップ時の処理．pn=3にして点を取得していない状態に戻す
function mup(){
    pn = 3;
}
//マウス移動時の処理
function mmove(event){

///pn = 0 or 1or 2 のとき描画を更新する 
  if (pn !== 3){
      p[pn] = [event.offsetX, event.offsetY];
      rewrite();
    }
}

//描画する関数
function rewrite(){
    
    //白い長方形を重ねて以前の描画をクリアする
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, mcw, mch);

    //以降の色は水色
    ctx.fillStyle = 'royalblue';
    ctx.strokeStyle = 'royalblue';

    // 頂点に丸をつける
    for (var i = 0; i <= 2; i++){
       ctx.beginPath();
       ctx.arc(p[i][0], p[i][1], r, 0, 2 * Math.PI);
       ctx.fill();
    }

    //折れ線で結ぶ
    ctx.beginPath();
    ctx.moveTo(p[0][0], p[0][1]);
    ctx.lineTo(p[1][0], p[1][1]);
    ctx.lineTo(p[2][0], p[2][1]);
    ctx.stroke();

    //角記号や角度に関する処理
    var vec1 = [p[0][0] - p[1][0], p[0][1] - p[1][1]];
    var vec2 = [p[2][0] - p[1][0], p[2][1] - p[1][1]];
    var angle1 = angl(vec1);
    var angle2 = angl(vec2);
    ctx.beginPath();
    ctx.arc(p[1][0], p[1][1], ar, angle1, angle2, false);
    ctx.stroke();
    
    if (angle2 >= angle1) {
        var string = (angle2- angle1) / Math.PI * 180;
        var angle3 = (angle1 + angle2) / 2;
        
    } else {
        string = (2 * Math.PI + angle2 -angle1) / Math.PI * 180;
        angle3 = (angle1 + angle2) / 2 + Math.PI;
    }
        var stringX = p[1][0] + 2 * ar * Math.cos(angle3);//2は文字列の位置調整
        var stringY = p[1][1] + 2 * ar * Math.sin(angle3);
        ctx.font = "20px serif";

        //文字の色だけ黒にする
        ctx.fillStyle = 'black';
        ctx.fillText(Math.floor(string) + "°", stringX, stringY);
}
//ベクトルを与えたとき，横軸正方向からの回転角(0 から2pi)を返す関数
function angl(vec){
    if (vec[0] === 0 && vec[1] > 0){
        var theta = Math.PI / 2;
    } else if(vec[0] === 0 && vec[1] <= 0){
        theta = 3 * Math.PI / 2;
    } else {
        var m = vec[1] / vec[0];
        if (vec[0] > 0 && vec[1] >= 0) {
            theta = Math.atan(m);
        } else if (vec[0] > 0 && vec[1] < 0){
            theta = Math.atan(m); + 2 * Math.PI;
        } else {
            theta = Math.atan(m) + Math.PI;
        }
    }
    return theta;
}