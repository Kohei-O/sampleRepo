function unitVector(vecX){
    // vecX を単位ベクトルに伸縮して返す関数
    var abs = Math.sqrt(vecX[0] * vecX[0] + vecX[1] * vecX[1] + vecX[2] * vecX[2]);
    var vecY = [0, 0, 0];
    vecY[0] = vecX[0] / abs;
    vecY[1] = vecX[1] / abs;
    vecY[2] = vecX[2] / abs;
    return vecY;
}   
function vectorProduct(vecX, vecY){
    // vecX と　vecY　の外積を返す関数
    var x = vecX[1] * vecY[2] - vecX[2] * vecY[1];
    var y = vecX[2] * vecY[0] - vecX[0] * vecY[2];
    var z = vecX[0] * vecY[1] - vecX[1] * vecY[0];
    return [x, y, z];
}
function scalarProduct(vecX, vecY){
    // vecX と　vecY　の内積を返す関数
    return vecX[0] * vecY[0] + vecX[1] * vecY[1] + vecX[2] * vecY[2];
}
function castShadow(vecA, vecP){
    //vecP を A を光源として vecA に垂直な原点を通る平面に射影する(円錐状)
    var absVecA2 = vecA[0] * vecA[0] + vecA[1] * vecA[1] + vecA[2] * vecA[2];
    var spVecAVecP = vecA[0] * vecP[0]+vecA[1] * vecP[1] + vecA[2] * vecP[2];
    var vecR = [0, 0, 0];
    vecR[0] = vecP[0] - spVecAVecP * vecA[0] /　absVecA2;
    vecR[1] = vecP[1] - spVecAVecP * vecA[1] /　absVecA2;
    vecR[2] = vecP[2] - spVecAVecP * vecA[2] /　absVecA2;
    var vecQ = [0, 0, 0];
    vecQ[0] = absVecA2 * vecR[0] /(absVecA2 - spVecAVecP);
    vecQ[1] = absVecA2 * vecR[1] /(absVecA2 - spVecAVecP); 
    vecQ[2] = absVecA2 * vecR[2] /(absVecA2 - spVecAVecP); 
    return vecQ;
}   
function getZahyou3d(vecA, vecP){
    var x = 0;
    var y = 0;
    var vecE1 = [0, 0, 0];
    var vecE2 = [0, 0, 0];
    var vecQ = [0, 0, 0];
    var vecZ = [0, 0, 1];
    vecQ = castShadow(vecA, vecP);
    if (vecA[0] === 0 && vecA[1] === 0) {
        vecE1 = [0, 1, 0];
        vecE2 = [1, 0, 0];
    } else {
        vecE1 = unitVector(castShadow(vecA, vecZ));
        vecE2 = unitVector(vectorProduct(vecE1, vecA));
    }
    x = scalarProduct(vecQ, vecE2);
    y = scalarProduct(vecQ, vecE1);
    return [x, y];
}   
function getZahyou3dNew(vecP){
    //vecA はグローバル変数
    var absVecA2 = scalarProduct(vecA, vecA);
    var spVecAVecP = scalarProduct(vecA, vecP);
    var vecR = [0, 0, 0];
    vecR[0] = vecP[0] - spVecAVecP * vecA[0] /　absVecA2;
    vecR[1] = vecP[1] - spVecAVecP * vecA[1] /　absVecA2;
    vecR[2] = vecP[2] - spVecAVecP * vecA[2] /　absVecA2;
    var vecQ = [0, 0, 0];
    vecQ[0] = absVecA2 * vecR[0] /(absVecA2 - spVecAVecP);
    vecQ[1] = absVecA2 * vecR[1] /(absVecA2 - spVecAVecP); 
    vecQ[2] = absVecA2 * vecR[2] /(absVecA2 - spVecAVecP); 
    var vecE1 = [0, 0, 0];
    var vecE2 = [0, 0, 0];
    var vecZ = [0, 0, 1];
    if (vecA[0] === 0 && vecA[1] === 0) {
        vecE1 = [0, 1, 0];
        vecE2 = [1, 0, 0];
    } else {
        vecE1 = unitVector(castShadow(vecA, vecZ));
        vecE2 = unitVector(vectorProduct(vecE1, vecA));
    }
    var x = scalarProduct(vecQ, vecE2);
    var y = scalarProduct(vecQ, vecE1);
    return [x, y];
}   
function visible(args){
    //面をなす頂点を与えたとき、それが見える場合は塗り、輪郭線を引く関数
    //args.points は各面をなす頂点の配列の配列。外から見たときの反時計回りに記述。
    //args.width は太さ
    //args.color は線の色
    //args.paint は塗る色
    //args.lineDash
    'use strict';
    var points = [];
    var i;
    var n = args.points.length;
    //var viewFrom = args.viewFrom;
    var paint = '';
    if (typeof(args.paint) !== 'string') {
        paint ='lightgray'
    }
    for ( i = 0; i <= n - 1; i++){//仮想の空間座標を,仮想の平面射影座標に変換
        points[i] = getZahyou3dNew(args.points[i])
    }
    if (n >= 3){//点が３つ以上の時に行う
        var pointA = args.points[0];
        var pointB = args.points[1];
        var pointC = args.points[2];
        var vector1 = [0, 0, 0];
        var vector2 = [0, 0, 0];
        vector1[0] = pointA[0] - pointB[0];
        vector1[1] = pointA[1] - pointB[1];
        vector1[2] = pointA[2] - pointB[2];
        vector2[0] = pointC[0] - pointB[0];
        vector2[1] = pointC[1] - pointB[1];
        vector2[2] = pointC[2] - pointB[2];
        var normalVector = vectorProduct(vector1, vector2);
        var temp = scalarProduct(vecA, normalVector);
        if (temp <= 0){
            drawLine({
                between : points,
                width : 1,
                color : args.color,
                lineDash : args.lineDash,
                polygon : paint
            })
        } 
    }
}   
function invisible(args){
    //面をなす頂点を与えたとき、それが見えない場合にのみ輪郭線（点線）を引く関数
    //args.points は各面をなす頂点の配列の配列。外から見たときの反時計回りに記述。
    //args.width は太さ
    //args.color は線の色
    //args.paint は塗る色
    //args.lineDash
    'use strict';
    var points = [];
    var i;
    var n = args.points.length;
    //var viewFrom = args.viewFrom;
    var paint = '';
    if (typeof(args.paint) !== 'string') {
        paint ='lightgray'
    }
    for ( i = 0; i <= n - 1; i++){//仮想の空間座標を,仮想の平面射影座標に変換
        points[i] = getZahyou3dNew(args.points[i])
    }   
    if (n >= 3){//点が３つ以上の時に行う
        var pointA = args.points[0];
        var pointB = args.points[1];
        var pointC = args.points[2];
        var vector1 = [0, 0, 0];
        var vector2 = [0, 0, 0];
        vector1[0] = pointA[0] - pointB[0];
        vector1[1] = pointA[1] - pointB[1];
        vector1[2] = pointA[2] - pointB[2];
        vector2[0] = pointC[0] - pointB[0];
        vector2[1] = pointC[1] - pointB[1];
        vector2[2] = pointC[2] - pointB[2];
        var normalVector = vectorProduct(vector1, vector2);
        var temp = scalarProduct(vecA, normalVector);
        if (temp > 0){
            drawLine({
                between : points,
                width : 1,
                color : args.color,
                lineDash : 4,
                polygon : true  
            })
        }
    }
}   
var vecA = [0, 0, 0];
var myCanvas = document.getElementById("myCanvas");
var canvasWidth = myCanvas.width;
var canvasHeight = myCanvas.height;
var ctx = myCanvas.getContext('2d');
var baseFont = "20px serif";
var baseColor = 'black';
var baseLineWidth = 1;
ctx.font = baseFont;
var a = 0;
setInterval("drawPicture()", 60);
function drawPicture(){
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = 'black';
    start = [-8, -8];
    end = [8, 8]; 
    var k=6;
    var h=20;
     var r = 3;
    vecA = [k * Math.cos(a * Math.PI /30),k * Math.sin(a * Math.PI /30) , h];
    var c72 = Math.cos(Math.PI * 72 / 180);
    var s72 = Math.sin(Math.PI * 72 / 180);
    var c36 = Math.cos(Math.PI * 36 / 180);
    var s36 = Math.sin(Math.PI * 36 / 180);
    var pointA=[1 * r, 0, 0];
    var pointB= [c72 * r, s72 * r,0];
    var pointC=[-c36 * r, s36 * r,0];
    var pointD=[-c36 * r,-s36 * r,0];
    var pointE=[c72 * r, -s72 * r,0];
    var alpha = (Math.sqrt(5)+1)/2;
    var pointF=[alpha * r,0,1 * r];
    var pointH=[alpha*c72 * r, alpha*s72 * r,1 * r];
    var pointJ=[-alpha*c36 * r, alpha*s36 * r,1 * r];
    var pointL=[-alpha*c36 * r,-alpha*s36 * r,1 * r];
    var pointN=[alpha*c72 * r,-alpha*s72 * r,1 * r];
    var pointG=[alpha*c36 * r,alpha*s36 * r, alpha * r];
    var pointI=[-alpha*c72 * r, alpha*s72 * r,alpha * r];
    var pointK=[-alpha * r,0,alpha * r];
    var pointM=[-alpha*c72 * r,-alpha*s72 * r,alpha * r];
    var pointO=[alpha*c36 * r,-alpha*s36 * r,alpha * r];
    var pointP=[-1 * r,0,(alpha+1) * r];
    var pointQ=[-c72 * r,-s72 * r,(alpha+1) * r];
    var pointR=[c36 * r,-s36 * r,(alpha+1) * r];
    var pointS=[c36 * r,s36 * r,(alpha+1) * r];
    var pointT=[-c72 * r,s72 * r,(alpha+1) * r];
    var plain =[];
    plain[0]=[pointS, pointT, pointP, pointQ,pointR];
    plain[1]=[pointS, pointG, pointH, pointI,pointT];
    plain[2]=[pointS, pointR, pointO, pointF,pointG];
    plain[3]=[pointQ, pointM, pointN, pointO,pointR];
    plain[4]=[pointQ, pointP, pointK, pointL,pointM];
    plain[5]=[pointP, pointT, pointI, pointJ,pointK];
    plain[6]=[pointA, pointE, pointD, pointC,pointB];
    plain[7]=[pointB, pointH, pointG, pointF,pointA];
    plain[8]=[pointA, pointF, pointO, pointN,pointE];
    plain[9]=[pointE, pointN, pointM, pointL,pointD];
    plain[10]=[pointC, pointD, pointL, pointK,pointJ];
    plain[11]=[pointB, pointC, pointJ, pointI,pointH];
    var q;
    for (q = 0; q <= 11; q++){
        visible({
            points:plain[q]
        })
    }
    for (q = 0; q <= 11; q++){
        invisible({
            points:plain[q]
        })
    }
    a = a + 1;
}   