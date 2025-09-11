"use strict";

const margin = 5;
const canvasWidth = 400;
const canvasHeight = 400;
const start = [0, 0];
const end = [300, 300];

drawLine([1, "あ"]);

function drawLine(args){
	//折れ線を描く関数
	// ctx は canvas要素への参照。関数の呼び出し時点で定義済みであるグローバル変数。
	//args.between は折れ線の節[x,y](仮想座標)を要素とする配列
	//args.width は線の太さ(px)
    //args.color　は色。指定がない時は'black' とする
    //args.lineDash 破線にする場合の間隔
    //args.polygon は閉じて多角形にする
	'use strict';

    try{
         let a = getZahyou(args);

         console.log(a);
    
    } catch(e){



        console.log(e.message);
    }
}


function getZahyou(point) {
    'use strict';

    //canvas 要素上の実の座標を返す関数
    //start は左下の端点の仮想座標[x,y]。関数の呼び出し時点で定義済みであるグローバル変数。
    //end ほ右上の端点の仮想座標[x,y]。その時点で定義済みであるグローバル変数。
    //point は変換したい点の仮想座標[x,y]
    
    
    if (Array.isArray(point) === false){

        //引数が配列でないときのエラー処理
        throw new Error("【getZahyou】点は配列 [x座標, y座標] で指定してください");
    
    } else if (point.length !== 2){

        //引数が配列でないときのエラー処理
        throw new Error("【getZahyou】点は配列 [x座標, y座標] で指定してください");

    } else if (typeof point[0] !== "number" || typeof point[1] !== "number"){

        //要素が数値でないときのエラー処理 
        throw new Error("【getZahyou】点の座標は数値で指定してください");

    } else {
        
        const x = margin + (canvasWidth - margin * 2) * (point[0] - start[0]) / (end[0] - start[0]);
        
        const y = margin + (canvasHeight - margin * 2) * (end[1] - point[1]) / (end[1] - start[1]);
        
        return [x, y];
    }
    
}
