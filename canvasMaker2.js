/**
 * 仮想座標 [x, y] をキャンバス上の実座標に変換して返す関数。追加
 *
 * @param {number[]} point - 変換したい点の仮想座標 [x座標, y座標]。
 * @description グローバル変数 start（左下の端点の仮想座標）, end（右上の端点の仮想座標）, margin, canvasWidth, canvasHeight を利用します。
 * @returns {number[]} キャンバス上の実座標 [x, y]。
 * @throws {Error} 引数が配列でない場合、配列の長さが2でない場合、要素が数値でない場合にエラーを投げます。
 *
 */
function getZahyou(point) {
    'use strict';

    if (Array.isArray(point) === false){

        //引数が配列でないときのエラー処理
        throw new Error("点は配列 [x座標, y座標] で指定してください");

    } else if (point.length !== 2){

        //引数が配列でないときのエラー処理
        throw new Error("点は配列 [x座標, y座標] で指定してください");

    } else if (typeof point[0] !== "number" || typeof point[1] !== "number"){

        //要素が数値でないときのエラー処理 
        throw new Error("点の座標は数値で指定してください");

    }
    
    const x = margin + (canvasWidth - margin * 2) * (point[0] - start[0]) / (end[0] - start[0]);
    
    const y = margin + (canvasHeight - margin * 2) * (end[1] - point[1]) / (end[1] - start[1]);
    
    return [x, y];

}
/**
 * キャンバス上の実座標から仮想座標を返す関数。追加
 *
 * @param {number[]} point - 変換したい点の canvas 上の実座標 [x座標, y座標]。
 * @description グローバル変数 start（左下の端点の仮想座標）, end（右上の端点の仮想座標）, margin, canvasWidth, canvasHeight を利用します。
 * @returns {number[]} 仮想座標 [x, y]。
 * @throws {Error} 引数が配列でない場合、配列の長さが2でない場合、要素が数値でない場合にエラーを投げます。
 *
 */
function getZahyouInverse(point) {
    'use strict';

     if (Array.isArray(point) === false){

        //引数が配列でないときのエラー処理
        throw new Error("点は配列 [x座標, y座標] で指定してください");

    } else if (point.length !== 2){

        //引数が配列でないときのエラー処理
        throw new Error("点は配列 [x座標, y座標] で指定してください");

    } else if (typeof point[0] !== "number" || typeof point[1] !== "number"){

        //要素が数値でないときのエラー処理 
        throw new Error("点の座標は数値で指定してください");

    }

    const x = start[0] + (point[0] - margin) * (end[0] - start[0]) / (canvasWidth - margin * 2);
	
    const y = end[1] - (point[1] - margin) * (end[1] - start[1]) / (canvasHeight- margin * 2);
	
    return [x, y];

}

/**
 * @param {Object} [options={}] - 描画オプション。
 * @param {string} [options.font=baseFont] - 描画に使うフォント（例: "20px serif"）。
 * @param {string} [options.color=baseColor] - 描画色（文字・線・円・ボックスの色）。
 * @param {number[]} [options.move=[0,0]] - 表示位置のオフセット [x, y]（単位は現在フォントの 'x' の幅）。
 * @param {string} options.string - 描画する文字列（必須）。
 * @param {number} [options.width=baseLineWidth] - 線の太さ（px）。
 * @param {boolean} [options.box] - true: 白背景の枠＋枠線、false: 塗りつぶしの枠。
 * @param {boolean} [options.circle] - true: 白背景の円＋枠線、false: 塗りつぶしの円。
 * @param {boolean} [options.arrow=false] - true のとき文字列上に矢印を描画。
 * @param {number[]} options.at - 描画する仮想座標 [x, y]（必須）。
 * @param {boolean} [options.vector=false] - 互換性用フラグ（arrow と同様の動作）。
 *
 * @description 文字列を描画します。文字を四角や丸で囲んだり，矢印をつけることもできます。グローバル変数 baseFont, baseColor, baseLineWidth, ctx を利用します。内部で getZahyou, getZahyouInverse, drawArrow, baseCFL を呼び出します。
 *
 * @throws {Error} 引数の型や必須項目(at, string)が不正な場合に例外を投げます。
 * @returns {undefined}
 */
function putString(
    {
        font = baseFont,
        color = baseColor,
        move = [0, 0],
        string = undefined,
        width = baseLineWidth,
        box = undefined,
        circle = undefined,
        arrow = false,
        at = undefined,
        //広報互換性のための処理
        vector = false
    } = {}
){
 
    //string の入力が文字列でない時
    if (typeof string !== "string"){

        throw new Error('【putString】 string に"文字列"を代入してください')
	
        // at に入力がない時
    } else  if (at === undefined) {

        throw new Error("【putString】 atに座標を代入してください")

        // at が配列でない場合か要素が1つ以下の場合
    } else if ( Array.isArray(at) === false || at.length <= 1) {

        throw new Error("【putString】 at には配列 [x座標, y座標] を代入してください")

        //atの要素に数値でないものが入っている場合
    } else if ( typeof at[0] !== 'number' || typeof at[1] !== 'number'){

        throw new Error("【putString】 at には配列 [x座標(数値), y座標(数値)] を代入してください")
    
        //font が適切な文字列でない時の処理
    } else if (typeof font !== 'string') {

        throw new Error('【putString】 font にはフォント名（文字列）を代入してください。 "20px serif" など')

    } else if (typeof color !== 'string') {

        throw new Error('【putString】 color には色名（文字列）を代入してください。"green" や "#EE11FF"など')
	
        // move が配列でない場合か要素が1つ以下の場合
    } else if ( Array.isArray(move) === false || move.length <= 1 ) {

        throw new Error("【putString】 move には配列 [x方向の移動量, y方向の移動量] を代入してください")

    } else if ( typeof move[0] !== 'number' || typeof move[1] !== 'number'){

        throw new Error("【putString】 move には配列 [数値, 数値] を代入してください")
    
        // numberが数値でないまたは0以下の時
    } else if (typeof width !== 'number' || width <= 0){

        throw new Error('【putString】width には正の数値を代入してください')

        // box が入力されていて true/false でない時
    } else if ( box !== undefined && typeof box !== 'boolean') {

        throw new Error('【putString】box には true か false を代入してください')
        
        // circle が入力されていて true/false でない時
    } else if ( circle !== undefined && typeof circle !== 'boolean') {

        throw new Error('【putString】circle には true か false を代入してください')

        // arrow がtrue/false でない時
    } else if (typeof arrow !== 'boolean') {

        throw new Error('【putString】arrow には true か false を代入してください')

    }

    //そのコマンドで描画されるフォント x の幅を moveの単位あたりの長さとする
	const unitLength = ctx.measureText('x').width;
    
    const moveX = unitLength * move[0];
    
    const moveY = - unitLength * move[1];

    const zahyou = getZahyou(at);
   
    const pixelAdjust = 5;

    ctx.font = font;
  
    ctx.lineWidth = width;
        
    // circle が true の時
    if(circle === true) {

        ctx.beginPath();
        
        const stringWidth = ctx.measureText(string).width;

        const  stringHeight = ctx.measureText('w').width;

        ctx.arc(zahyou[0]+ moveX + stringWidth / 2, zahyou[1] + moveY - stringHeight / 2,  pixelAdjust + stringWidth / 2 , 0, 2 * Math.PI);

        ctx.fillStyle = 'white';
        
        ctx.fill();
        
        ctx.strokeStyle = color;
        
        ctx.stroke();
        
        ctx.fillStyle = color;
        
        ctx.fillText(string, zahyou[0]+ moveX, zahyou[1] + moveY);

    // circle が false の時
    } else if (circle === false) {

        ctx.beginPath();
        
        const stringWidth = ctx.measureText(string).width;
        
        const stringHeight = ctx.measureText('w').width;
        
        ctx.arc(zahyou[0]+ moveX + stringWidth / 2, zahyou[1] + moveY - stringHeight / 2,  pixelAdjust + stringWidth / 2 , 0, 2 * Math.PI);
        
        ctx.fillStyle = color;
        
        ctx.fill();
        
        ctx.fillStyle = 'white';
        
        ctx.fillText(string, zahyou[0]+ moveX, zahyou[1] + moveY);
    
        // box が true の時
    } else if (box === true) {

        const boxWidth = ctx.measureText(args.string).width;
        
        const boxHeight = ctx.measureText('w').width;
        
        ctx.fillStyle = 'white';
        
        ctx.fillRect(zahyou[0]+ moveX - pixelAdjust, zahyou[1] + moveY- boxHeight -pixelAdjust, boxWidth + 2 * pixelAdjust, boxHeight + 2 * pixelAdjust);
        
        ctx.strokeStyle = color;
        
        ctx.strokeRect(zahyou[0]+ moveX - pixelAdjust, zahyou[1] + moveY- boxHeight -pixelAdjust, boxWidth + 2 * pixelAdjust, boxHeight + 2 * pixelAdjust);
        
        ctx.fillStyle = color;

        ctx.fillText(string, zahyou[0]+ moveX, zahyou[1] + moveY);

        // box が false の時
    }  else if (box === false) {

        const boxWidth = ctx.measureText(args.string).width;

        const boxHeight = ctx.measureText('w').width;
        
        ctx.fillStyle = color;
        
        ctx.fillRect(zahyou[0]+ moveX - pixelAdjust, zahyou[1] + moveY- boxHeight -pixelAdjust, boxWidth + 2 * pixelAdjust, boxHeight + 2 * pixelAdjust);
        
        ctx.fillStyle = 'white';
        
        ctx.fillText(string, zahyou[0]+ moveX, zahyou[1] + moveY);

        //arrow が true のとき，または，旧バージョンで vector がtrueのとき
    } else if (arrow === true || vector === true) {

        ctx.fillStyle = color;

        ctx.fillText(string, zahyou[0]+ moveX, zahyou[1] + moveY); 
        
        const pixelAdjustX = 2;
        
        const pixelAdjustY = 3;
        
        const headSize = 7;
        
        const vectorLength = ctx.measureText(string).width;
        
        const vectorHeight = ctx.measureText('w').width;
        
        const vectorStart = [zahyou[0] + moveX - pixelAdjustX, zahyou[1]+ moveY - vectorHeight - pixelAdjustY];
        
        const vectorEnd = [zahyou[0] + moveX + vectorLength + pixelAdjustX, zahyou[1] + moveY - vectorHeight - pixelAdjustY];
        
        const idealVectorStart = getZahyouInverse(vectorStart);
        
        const idealVectorEnd = getZahyouInverse(vectorEnd);
        
        drawArrow(
            {
                from : idealVectorStart,
                to : idealVectorEnd,
                size : headSize,
                color : color,
                width : width
            }
        );
    
        //他の場合のとき
    } else {
    
        ctx.fillStyle = color;
    
        ctx.fillText(string, zahyou[0]+ moveX, zahyou[1] + moveY); 
    
    }
    
    baseCFL();

}

/**
 * 仮想座標の配列から折れ線または多角形をキャンバス上に描画する関数。
 * @description グローバル変数 ctx, baseLineWidth, baseColor, baseCFL, getZahyou を利用します。
 * @returns {undefined} なし（undefined）
 * @param {Object} args - 描画オプションをまとめたオブジェクト。
 * @param {number[][]} args.between - 折れ線の各頂点の仮想座標 [x, y] の配列。
 * @param {number} [args.width=baseLineWidth] - 線の太さ（px）。
 * @param {string} [args.color=baseColor] - 線の色。
 * @param {number} [args.lineDash] - 破線にする場合の間隔（px）。
 * @param {boolean|string} [args.polygon=false] - true:閉じて多角形, false:折れ線, 色名:多角形で塗りつぶし。
 *
 * @throws {Error} 引数の型や値が不正な場合にエラーを投げます。
 *
 * 
 */
function drawLine(
    
    //折れ線を描く関数
	//ctx は canvas要素への参照。関数の呼び出し時点で定義済みであるグローバル変数。
	//args.between は折れ線の節[x,y](仮想座標)を要素とする配列
	//args.width は線の太さ(px)
    //args.color　は色。指定がない時はbaseColor とする
    //args.lineDash 破線にする場合の間隔
    //args.polygon は閉じて多角形にする，色の指定がある場合，多角形にした上で色をつける

    {
    between,
    width = baseLineWidth,
    color = baseColor,
    lineDash = undefined,
    polygon = false
    } = {}

){
    // between が配列でないときのエラー処理
    if (Array.isArray(between) === false){

        throw new Error("【drawLine】between には点（配列）を要素とする配列を指定してください");

    // betweenのはじめの要素が点でないときのエラー処理
    } else if (Array.isArray(between[0]) === false) {
        
        throw new Error("【drawLine】between には点（配列）を要素とする配列を指定してください");

    // between が配列であるが，その要素が2つ未満のときのエラー処理
    } else if (between.length < 2){

        throw new Error("【drawLine】between には2つ以上の点（配列）を指定してください");
    
    // widthが数値でないときのエラー処理
    } else if (typeof width !== "number"){

        throw new Error("【drawLine】width は数値で指定してください");

    // widthが0未満のときのエラー処理
    } else if (width < 0){

        throw new Error("【drawLine】width は0以上の値を指定してください");

    // lineDash が undefined でなく，数値でないときのエラー処理
    } else if (lineDash !== undefined && typeof lineDash !== "number"){

        throw new Error("【drawLine】lineDash は数値で指定してください");

    // lineDash が undefined でなく，0以下のときのエラー処理
    } else if (lineDash !== undefined && lineDash <= 0){

        throw new Error("lineDash は0より大きい値を指定してください");

    } else if(typeof color !== "string"){

        throw new Error('【drawLine】color は色名(文字列)で指定してください。"green" や "#EE11FF" など');

    } else if(polygon !== false && polygon !== true && typeof polygon !== "string"){

        throw new Error('【drawLine】polygon は true か false か色名(文字列)で指定してください。"green" や "#EE11FF" など');

    }

    ctx.lineWidth = width;
        
    ctx.strokeStyle = color;

    if (lineDash === undefined){//波線の指定がない場合
        
        ctx.setLineDash([]);//線種を実線に指定
    
    } else {//線種を破線にする場合の間隔の指定

        ctx.setLineDash([lineDash, lineDash]);
        
    }
    
    ctx.beginPath();

    ctx.moveTo(getZahyou(between[0])[0], getZahyou(between[0])[1]);

    var i = 1;
    
    var mLength = between.length;
    
    for (i = 1; i <= mLength - 1; i++) {
        
        ctx.lineTo(getZahyou(between[i])[0], getZahyou(between[i])[1]);
    
    }

    ctx.stroke();
    
    if (polygon === true){
    
        ctx.closePath();
    
        ctx.stroke();
    
    } else if (typeof(polygon) === "string") {
    
        ctx.closePath();
    
        ctx.stroke();
    
        ctx.fillStyle = polygon;
    
        ctx.fill();
    
    }
    
    baseCFL();

}

/**
 * @description 指定した点からx軸、y軸への垂線を描画します。垂線の足に文字列を表示することもできます。グローバル変数 baseLineWidth, baseColor, baseFont, ctx, getZahyou, getZahyouInverse, drawLine, putString, baseCFL を利用します。
 * @param {object} options - 描画オプションを指定するオブジェクト。
 * @param {number[]} options.from - 垂線を描画する元の点の座標 [x, y]。必須です。
 * @param {number|false} [options.lineDash=3] - 線の破線の間隔。falseを指定すると実線になります。
 * @param {number} [options.width=baseLineWidth] - 線の太さ。
 * @param {string} [options.color=baseColor] - 線とテキストの色。
 * @param {'xy'|'x'|'y'} [options.to='xy'] - 垂線を描画する軸を指定します。'x'はx軸へ、'y'はy軸へ、'xy'は両方へ描画します。
 * @param {string} [options.stringX=''] - x軸上の足に表示する文字列。
 * @param {string} [options.stringY=''] - y軸上の足に表示する文字列。
 * @param {number[]} [options.stringXmove=[0, 0]] - x軸上の文字列の位置を調整するための [dx, dy]。
 * @param {number[]} [options.stringYmove=[0, 0]] - y軸上の文字列の位置を調整するための [dx, dy]。
 * @param {string} [options.font=baseFont] - 文字列のフォントスタイル。
 * @throws {Error} from が [x, y] 形式の配列でない場合にエラーをスローします。
 * @throws {Error} lineDash が正の数または false でない場合にエラーをスローします。
 * @throws {Error} width が正の数でない場合にエラーをスローします。
 * @throws {Error} to が 'xy', 'x', 'y' のいずれでもない場合にエラーをスローします。
 * @throws {Error} stringX または stringY が文字列でない場合にエラーをスローします。
 * @throws {Error} font が文字列でない場合にエラーをスローします。
 * @throws {Error} color が文字列でない場合にエラーをスローします。
 * @returns {undefined} なし
 */
function drawAxisFoot(
    {
        from = undefined,
        lineDash = 3,
        width = baseLineWidth,
        color = baseColor,
        to = 'xy',
        stringX = '',
        stringY = '',
        stringXmove = [0, 0],
        stringYmove = [0, 0],
        font = baseFont
    } = {}
){
    if (Array.isArray(from) === false || from.length <= 1 || typeof from[0] !== 'number' || typeof from[1] !== 'number') {

        throw new Error('【drawAxisFoot】from には配列 [x座標, y座標] を代入してください');

        // lineDash が「false か正の数」でないとき
    } else if ( lineDash !== false && (typeof lineDash !== "number" || lineDash <= 0 ) ) {

        throw new Error("【drawAxisFoot】lineDash には 0 より大きい値か false（このとき実線）を指定してください");

        //width に正の数値でないものが代入されたとき
    } else if (typeof width !== 'number' || width <=0 ){

        throw new Error('【drawAxisFoot】width には正の数値を代入してください');

        //to が 'xy' でも 'x' でも'y'でないとき
    } else if (to !== 'xy' && to !== 'x' && to !== 'y'){

        throw new Error('【drawAxisFoot】to には "xy" か "x" か "y" を代入してください');

        //stringX が文字列でないとき
    } else if (typeof stringX !== 'string'){

        throw new Error('【drawAxisFoot】stringX には文字列を代入してください');
    
        //stringY が文字列でないとき
    } else if (typeof stringY !== 'string'){

        throw new Error('【drawAxisFoot】stringY には文字列を代入してください');
    
    } else if (typeof font !== 'string') {

        throw new Error('【drawAxisFoot】font にはフォント名（文字列）を代入してください。 "20px serif" など');

    } else if (typeof color !== 'string') {

        throw new Error('【drawAxisFoot】color には色名（文字列）を代入してください。 "green" や "#EE11FF" など');

    }
  
    const hootX = [from[0], 0];
    
    const hootY = [0, from[1]];
    
    let inputPoints = [0, 0];

    if (to === 'x'){
        
        inputPoints = [hootX, from];

    } else if (to === 'y'){

        inputPoints = [hootY, from];
    
    } else {
    
        inputPoints = [hootX, from, hootY];
    
    }
    
    //lineDash が false のとき実線
	if ( lineDash === false ) {
		drawLine(
            {
                between: inputPoints,
                color : color,
                width : width
            }
        );
    } else {
        drawLine(
            {
                between: inputPoints,
                color : color,
                width : width,
                lineDash : lineDash
            }
        );
    }
    // stringX が空文字でないとき
    if (stringX !== '') {
        putString(
            {
                at : hootX,
                string : stringX,
                font : font,
                color : color,
                move : stringXmove
            }
        );
    }
    // stringY が空文字でないとき
    if ( stringY !== '') {
        putString(
            {
                at : hootY,
                string : stringY,
                font : font,
                color : color,
                move : stringYmove
            }
        );
    }
    baseCFL();
}

function drawAxisHoot(args){
    drawAxisFoot(args);
}
function drawArrow(args){
	'use strict';
	// 矢印を描く関数
	//ctx はキャンバス要素への参照。関数の呼び出し時点で定義済みであるグローバル変数。
	//args.from は始点の仮想座標[x,y]
	//args.to は終点の仮想座標[x,y]
	//args.size は矢印の先端(正三角)の一辺の長さ(px)。既定値は 10 (px)
	//args.width は線の太さ
    //args.color　は色
    //args.lineDash は破線の間隔 (px)
    var arrowStart = getZahyou(args.from);
    var arrowGoal = getZahyou(args.to);
    if (args.color === undefined) {
        ctx.strokeStyle = baseColor;//'black';
        ctx.fillStyle = baseColor;//'black';
    } else {
        ctx.strokeStyle = args.color;
        ctx.fillStyle = args.color;
    }
    if (args.size === undefined) {
        var size = 10;
    } else {
        size = args.size;
    }
    if (args.width === undefined) {
        ctx.lineWidth = baseLineWidth;
    } else {
        ctx.lineWidth = args.width;
    }
    if (args.lineDash === undefined){
    ctx.setLineDash([100, 0]);//線種を実線に指定
    } else {
        ctx.setLineDash([args.lineDash, args.lineDash]);//線種を破線にする
    }
	var dx = arrowGoal[0] - arrowStart[0];
	var dy = arrowGoal[1] - arrowStart[1];
	var angle = Math.atan2(dy, dx);
	var rightX = arrowGoal[0] - size * Math.cos(angle - Math.PI / 6);
	var rightY = arrowGoal[1] - size * Math.sin(angle - Math.PI / 6);
	var leftX = arrowGoal[0] - size * Math.cos(angle + Math.PI / 6);
	var leftY = arrowGoal[1] - size * Math.sin(angle + Math.PI / 6);
	ctx.beginPath();
	ctx.moveTo(arrowStart[0], arrowStart[1]);
	ctx.lineTo(arrowGoal[0], arrowGoal[1]);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(arrowGoal[0], arrowGoal[1]);
	ctx.lineTo(rightX, rightY);
	ctx.lineTo(leftX, leftY);
	ctx.fill();
  	baseCFL();
}
function drawAxis(args) {
    'use strict';
    //タテヨコの座標軸を描画する関数
    //args.type は縦か横軸のみのとき。種類x,yのいずれか
    //args.xLabel は横軸の名前(文字列)。既定値は'x'
     //args.yLabel は縦軸の名前(文字列)。既定値は'y'
    //args.noOrigin はオプション。true のときは原点を描画しない
    //console.log(canvasWidth);
    if (args === undefined){//args が未入力の場合は空のオブジェクトにする
        args = {};
    }
    var xAxisStart = [start[0], 0];
    var xAxisGoal =  [end[0], 0];
    var yAxisStart = [0, start[1]];
    var yAxisGoal = [0, end[1]];
    var xLabelPosition = getZahyou(xAxisGoal);
    var yLabelPosition = getZahyou(yAxisGoal);
	//ラベルのサイズとして, その時点での文字「x」の幅を取得
    //その分の1.5倍だけ軸(矢印)の終点から負の方向にずらす
    //フォントは その時点でのbaseFontに指定
    ctx.font = baseFont;
    var labelAdjust = ctx.measureText('x').width * 1.5;
    if (args.xLabel === undefined) {
        args.xLabel = 'x';
    }
    if(args.yLabel === undefined){
        args.yLabel = 'y';
    }
    if (args.type === undefined){
        drawArrow({
            from:xAxisStart,
            to:xAxisGoal,
        });
        drawArrow({
            from:yAxisStart,
            to:yAxisGoal,
        });
        ctx.fillText(args.xLabel, xLabelPosition[0]- labelAdjust, xLabelPosition[1] + labelAdjust);
        ctx.fillText(args.yLabel, yLabelPosition[0]- labelAdjust, yLabelPosition[1]+ labelAdjust);
    } else if (args.type ==='x'){
        drawArrow({
            from:xAxisStart,
            to:xAxisGoal,
        });
         ctx.fillText(args.xLabel, xLabelPosition[0]- labelAdjust, xLabelPosition[1] + labelAdjust);
    } else if (args.type ==='y'){
        drawArrow({
            from:yAxisStart,
            to:yAxisGoal,
        });
        ctx.fillText(args.yLabel, yLabelPosition[0]- labelAdjust, yLabelPosition[1]+ labelAdjust);
    }
    //オプションにnoOrigin:trueがあるときだけ原点の描画をしない
    if (args.noOrigin !== true) {
             ctx.fillText('O', yLabelPosition[0]- labelAdjust, xLabelPosition[1] + labelAdjust);
        singlePointMark({at:[0,0]})
        } 
        baseCFL();
}
function drawEnko(args){
    'use strict';
    //円弧を描く関数
    //args.center は中心の仮想座標[x,y]
    //args.radius は仮想半径
    //args.width は線の太さ
    //args.clock は回転の方向。'clock' は時計回り, 省略だと反時計回り。 
    //args.startAngle は開始角。三時の方向からの回転角[rad](時計回り)
    //args.endAngle は終了角。三時の方向からの回転角[rad](時計回り)
    //args.colorは色。//色の指定がない場合は黒とする
	//args.ougi　がtrue の場合中心と結んで閉じる
	//args.paint に色指定がある場合は,その色で塗り潰す
    //args.LineDash は破線にする場合の間隔
    //if (isNaN(args.startAngle) || isNaN(args.endAngle)) {
        //args.startAngle,args.endAngle の一方でも数値でない場合は全円をえがく。undefinedの場合も同様
        // nullは undefinded に該当せず 数値0 として扱われるようだ
	//	args.startAngle = 0;
      //  args.endAngle = 7; //7ラジアンは360°より大きいので一周
    //}
	if (args.startAngle === undefined){
		var startAngle = 0;
	} else {
		var startAngle = Math.PI * args.startAngle / 180; 
	}
	if (args.endAngle === undefined){
		var endAngle = 2 * Math.PI;
	} else {
		var endAngle = Math.PI * args.endAngle / 180; 
	}
    if (args.color === undefined) {
        ctx.strokeStyle = baseColor;
    } else {
         ctx.strokeStyle = args.color;    
    }
    if (args.width === undefined){
        ctx.lineWidth = baseLineWidth;
    } else {
        ctx.lineWidth = args.width;
    }
	if (args.lineDash === undefined){
		ctx.setLineDash([100, 0]);//線種を実線に指定
	} else {
          ctx.setLineDash([args.lineDash, args.lineDash]);//線種を破線にする
    }
	var center = getZahyou(args.center);
    var radius = args.radius * (canvasWidth - margin * 2)/ (end[0] - start[0]);//半径はx方向の縮尺を基に定める
    ctx.beginPath();
	  if (args.clock === true) {
        ctx.arc(center[0], center[1], radius, -startAngle, -endAngle);
    } else {
        ctx.arc(center[0], center[1], radius, -startAngle, -endAngle, true); 
    }
	
	if (args.ougi === true){
		ctx.lineTo(center[0], center[1]);
		ctx.closePath();
	}
	ctx.fillStyle = baseColor;
	if(args.paint){
		ctx.closePath();
		ctx.fillStyle = args.paint;
		ctx.fill();
	}
	ctx.stroke(); 
 	baseCFL();
}
function drawHenko(args){
    'use strict';
//辺孤を描く関数
//ctx はcanvas 要素のコンテクストへの参照。関数の呼び出し時点で定義済みであるグローバル変数。
//args.from は始点[x1,y_1]
//args.to は終点[x2,y2]
//args.angle は線分から円弧への回転角(0〜180°, 90°を除く)既定値は30とする
//args.width は線の太さ
//args.color は色を文字列で指定。指定がない場合は黒とする
//args.lineDash
//args.arrow
//args.arrowSize    
    var inputColor;
    if (args.color === undefined) {
        inputColor = baseColor;
//        ctx.strokeStyle = baseColor;
  //      ctx.fillStyle = baseColor;
    } else {
        inputColor = args.color;
     //   ctx.strokeStyle = args.color;
    //    ctx.fillStyle = args.color;
    }
    if (args.width === undefined){
        ctx.lineWidth = baseLineWidth;
    } else {
        ctx.lineWidth = args.width;
    }
     if (args.lineDash === undefined){
         ctx.setLineDash([100, 0]);//線種を実線に指定
    } else {
        ctx.setLineDash([args.lineDash, args.lineDash]);//線種を破線にする
    }
    if (args.angle === undefined){
         var theta = Math.PI /6;
    } else {
        theta = Math.PI * args.angle / 180;
    } 
    if(args.font === undefined){// フォントの指定がない場合は既定値のbaseFontとする
            ctx.font = baseFont;
        } else {
            ctx.font = args.font;
        }
    
    if (args.clock === true){//args.clock が true のときだけスタートゴールを逆転
        var henkoGoal = getZahyou(args.from);
        var henkoStart = getZahyou(args.to);
    } else {
         henkoStart = getZahyou(args.from);
         henkoGoal = getZahyou(args.to);
    }
    var xAdd = henkoGoal[0] + henkoStart[0];
    var xSub = henkoGoal[0] - henkoStart[0];
    var yAdd = henkoGoal[1] + henkoStart[1];
    var ySub = henkoGoal[1] - henkoStart[1];
    var sgLength = Math.sqrt((xSub * xSub) + (ySub * ySub));//線分の長さ
    var radius = sgLength * 0.5 / Math.sin(theta);
    var midX = xAdd * 0.5 - ySub * 0.5 * Math.tan(theta);  //arcTo()の制御点の作成
    var midY = yAdd * 0.5 + xSub  * 0.5 * Math.tan(theta);
    ctx.beginPath();
    ctx.moveTo(henkoStart[0], henkoStart[1]);
    ctx.arcTo(midX, midY, henkoGoal[0], henkoGoal[1], radius);
    ctx.strokeStyle = inputColor;
    ctx.stroke();
    //
    var arrowSize;
    var angle1;
    var angle2;
    if (args.arrowSize === undefined){
        arrowSize = 10;
    } else {
        arrowSize = args.arrowSize;
    }
    var vectorA = [0, 0];
    var vectorB = [0, 0];
    var k = 0;
    var l = 0;
    var point1 = [0, 0];
    var point2 = [0, 0];
    var abs = Math.sqrt(xSub * xSub + ySub * ySub);
    if (args.arrow === true){
        if (args.clock === true) {
            k =  theta - Math.PI / 6;
            l =  theta + Math.PI / 6;
            vectorA[0] =  xSub * Math.cos(k) - ySub * Math.sin(k);
            vectorA[1] =  xSub * Math.sin(k) + ySub * Math.cos(k);
            vectorB[0] =  xSub * Math.cos(l) - ySub * Math.sin(l);
            vectorB[1] = xSub * Math.sin(l) + ySub * Math.cos(l);
            point1[0] = henkoStart[0] + arrowSize / abs * vectorA[0];
            point1[1] = henkoStart[1] + arrowSize / abs * vectorA[1];
            point2[0] = henkoStart[0] + arrowSize / abs * vectorB[0];
            point2[1] = henkoStart[1] + arrowSize / abs * vectorB[1];
            ctx.beginPath();
            ctx.moveTo(henkoStart[0], henkoStart[1]);
            ctx.lineTo(point1[0], point1[1]);
            ctx.lineTo(point2[0], point2[1]);
            ctx.closePath();
            ctx.fillStyle = inputColor;
            ctx.fill();
        } else {
            k = - theta + Math.PI / 6;
            l = - theta - Math.PI / 6;
            vectorA[0] = - xSub * Math.cos(k) + ySub * Math.sin(k);
            vectorA[1] = - xSub * Math.sin(k) - ySub * Math.cos(k);
            vectorB[0] = - xSub * Math.cos(l) + ySub * Math.sin(l);
            vectorB[1] = - xSub * Math.sin(l) - ySub * Math.cos(l);
            point1[0] = henkoGoal[0] + arrowSize / abs * vectorA[0];
            point1[1] = henkoGoal[1] + arrowSize / abs * vectorA[1];
            point2[0] = henkoGoal[0] + arrowSize / abs * vectorB[0];
            point2[1] = henkoGoal[1] + arrowSize / abs * vectorB[1];
            ctx.beginPath();
            ctx.moveTo(henkoGoal[0], henkoGoal[1]);
            ctx.lineTo(point1[0], point1[1]);
            ctx.lineTo(point2[0], point2[1]);
            ctx.closePath();
            ctx.fillStyle = inputColor;
            ctx.fill();
        }
    }
    //
    if (typeof(args.string) === 'string') {//args.string が文字列の場合
        var vectorSP = [0, 0];
        vectorSP[0] = (xSub * Math.cos(theta/2) - ySub * Math.sin(theta/2)) / (2    * Math.cos(theta/2));
        vectorSP[1] = (xSub * Math.sin(theta/2) + ySub * Math.cos(theta/2)) / (2    * Math.cos(theta/2));
        var fontSize = ctx.measureText('2').width;
        var moveX;
        var moveY;
        if (Array.isArray(args.move) === true){
            moveX = args.move[0] * fontSize;
            moveY = args.move[1] * fontSize;
        } else {
            moveX = 0;
            moveY = 0;
        }
        var pointP = [henkoStart[0] + vectorSP[0]+ moveX, henkoStart[1] +       vectorSP[1] - moveY];
        var stringWidth = ctx.measureText(args.string).width;;
        var stringHeight = ctx.measureText('w').width;
        var boxWidth = ctx.measureText(args.string).width;
        var boxHeight = ctx.measureText('w').width;
        var pixelAdjust = 5;
        if(args.circle === true) {
            ctx.beginPath();
            ctx.arc(pointP[0]+ stringWidth / 2, pointP[1] - stringHeight / 2,  pixelAdjust + stringWidth / 2 , 0, 2 * Math.PI);
            ctx.setLineDash([100, 0]);//線種を実線に指定
            ctx.fillStyle = 'white';
            ctx.fill();
            ctx.strokeStyle = inputColor;
            ctx.stroke();
            ctx.fillStyle = inputColor;
            ctx.fillText(args.string, pointP[0], pointP[1]);
        } else if (args.circle === false) {
            ctx.beginPath();
            ctx.arc(pointP[0] + stringWidth / 2, pointP[1] - stringHeight / 2,  pixelAdjust + stringWidth / 2 , 0, 2 * Math.PI);
            ctx.fillStyle = inputColor;
            ctx.fill();
            ctx.fillStyle = 'white';
            ctx.fillText(args.string, pointP[0], pointP[1]);
        } else if (args.box === true) {
            ctx.setLineDash([100, 0]);//線種を実線に指定
            ctx.fillStyle = 'white';
            ctx.fillRect(pointP[0] - pixelAdjust, pointP[1]-     boxHeight -pixelAdjust, boxWidth + 2 * pixelAdjust, boxHeight + 2 * pixelAdjust);
            ctx.strokeStyle = inputColor;
            ctx.strokeRect(pointP[0] - pixelAdjust, pointP[1]- boxHeight -pixelAdjust, boxWidth + 2 * pixelAdjust, boxHeight + 2 * pixelAdjust);
            ctx.fillStyle = inputColor;
            ctx.fillText(args.string, pointP[0], pointP[1]);
        }   else if (args.box === false) {
            ctx.fillStyle = inputColor;
            ctx.fillRect(pointP[0]- pixelAdjust, pointP[1]- boxHeight -pixelAdjust, boxWidth + 2 * pixelAdjust, boxHeight + 2 * pixelAdjust);
            ctx.fillStyle = 'white';
            ctx.fillText(args.string,pointP[0], pointP[1]);
        } else {
            ctx.fillStyle = 'white';
            ctx.fillRect(pointP[0] - pixelAdjust, pointP[1] - boxHeight -pixelAdjust, boxWidth + 2 * pixelAdjust, boxHeight + 2 * pixelAdjust);
            ctx.fillStyle = inputColor;
            ctx.fillText(args.string, pointP[0], pointP[1]);
        }
    }
    if (args.number >= 1){
        henkoSegmentMark(args);
    }
    baseCFL();
}
function henkoSegmentMark(args) {
    'use strict';
    //辺弧記号に等辺記号をつける子関数
    var xSub;
    var ySub;
    if (args.clock === true) {
        xSub = args.from[0] - args.to[0];
        ySub = args.from[1] - args.to[1];
    } else {
        xSub = args.to[0] - args.from[0];
        ySub = args.to[1] - args.from[1];
    }
    var sgLength = Math.sqrt(xSub * xSub + ySub * ySub);
    var theta = 0;
    if (args.angle === undefined){
        theta = Math.PI / 6;
    } else {
        theta = Math.PI * args.angle / 180; 
    }
    var radius = 0.5 * sgLength / Math.sin(theta);
    var Qx = args.from[0] + 0.5 * Math.tan(0.5 * theta) * (-xSub * Math.sin(theta) + ySub * Math.cos(theta)) /Math.cos(theta);
    var Qy = args.from[1] + 0.5 * Math.tan(0.5 * theta) * (-xSub * Math.cos(theta)- ySub * Math.sin(theta)) / Math.cos(theta);
     var Rx = args.to[0] + 0.5 * Math.tan(0.5 * theta) * (xSub * Math.sin(theta) + ySub * Math.cos(theta))/ Math.cos(theta);
    var Ry = args.to[1] + 0.5 * Math.tan(0.5 * theta) * (-xSub * Math.cos(theta)+ ySub * Math.sin(theta))/ Math.cos(theta);
    segmentMark({
        between:[[Qx, Qy], [Rx, Ry]],
        number : args.number,
        size : args.size,
        interval : args.interval,
        width : args.width,
        color : args.color
    });
    baseCFL();
}
function angleMark(args){
    'use strict';
    //args.points[0],points[1], points[2] の角記号を描く関数。既定値はこの順に半時計周り
    //円弧の半径。standardRadius= 10 を 基準としてそれを args.radius 倍する
    //args.clock がtrue　だと逆まわりの円弧
    //args.arrow がtrueのとき矢印にする。そのサイズ(px)が args.size
    //args.bar
    //args.barSize,
    //arggs.barNumber
    var standardRadius = 10;
      if(args.width === undefined){
        ctx.lineWidth = baseLineWidth;
    } else {
        ctx.lineWidth = args.width;
    }
        if (args.color === undefined) {
        ctx.strokeStyle = baseColor;
        ctx.fillStyle = 'lightgray';
    } else {
        ctx.strokeStyle = args.color;
        ctx.fillStyle = args.color;
    }
    if (args.radius === undefined){
        var radius = standardRadius;
    } else {
        radius = standardRadius * args.radius;
    }
    if (args.size === undefined) {
        var size = 10;
    } else {
        size = args.size;
    }
    if (args.barSize === undefined) {
        var barSize = 8;
    } else {
        barSize = args.barSize;
    }
    var n = 1; // 円弧の個数の既定値
     if (!isNaN(args.number)){//args.number が数値の場合
         var n = Math.floor(args.number);//小数を切り下げて円弧の個数 n とする
    }
    var pointStart = getZahyou(args.points[2]);
    var pointCenter = getZahyou(args.points[1]);
    var pointGoal = getZahyou(args.points[0]); 
    var startAngle = Math.atan2(pointStart[1] - pointCenter[1], pointStart[0]-pointCenter[0]);
    var goalAngle = Math.atan2(pointGoal[1] - pointCenter[1], pointGoal[0] - pointCenter[0]);
    if (args.paint === true){
        ctx.beginPath();
        ctx.moveTo(pointCenter[0], pointCenter[1]);
            if (args.clock === true){
                ctx.arc(pointCenter[0], pointCenter[1], radius, startAngle, goalAngle, true);
            } else {
                ctx.arc(pointCenter[0], pointCenter[1], radius, startAngle, goalAngle);
            }
        ctx.fill();
    } else {
        var i;
        for (i = 1; i <= n; i++){
            ctx.beginPath();
             if (args.clock === true){
                ctx.arc(pointCenter[0], pointCenter[1], (0.7 + 0.3 * i)*radius, startAngle, goalAngle, true);
            } else {
                ctx.arc(pointCenter[0], pointCenter[1], (0.7 + 0.3 * i)*radius, startAngle, goalAngle);
            }
            ctx.stroke();
        }
    }
    var barNumber;
    var theta = 5 / 180 * Math.PI;//等角記号の間隔の角度は5°
    if (args.barNumber === undefined){
        barNumber = 1;
    } else {
        barNumber = args.barNumber;
    }
    var averageAngle = 0;
    var barStart = [0,0];
    var barEnd = [0,0];
    var k;
    var alpha;
    if (args.bar !== undefined){
        if (args.bar === true){
            averageAngle = (startAngle + goalAngle)/2 ;
        } else if (args.bar === false){
            averageAngle = (startAngle + goalAngle)/2 + Math.PI;
        }
        ctx.beginPath();
        for (k = 1; k <= barNumber; k++){
            alpha = averageAngle + theta / 2 *(- barNumber + 2 * k - 1);
            barStart[0] = pointCenter[0] + (radius - barSize/2) * Math.cos(alpha);
            barStart[1] = pointCenter[1] + (radius - barSize/2) * Math.sin(alpha);
            barEnd[0] = pointCenter[0] + (radius + barSize/2) * Math.cos(alpha);
            barEnd[1] = pointCenter[1] + (radius + barSize/2) * Math.sin(alpha);
            ctx.moveTo(barStart[0], barStart[1]);
            ctx.lineTo(barEnd[0], barEnd[1]);
        }
        ctx.stroke();
    } else {    
    }
    if (args.arrow === true) {
        var sita1;
        var sita2;
        var arrowTop = [0, 0];
        var arrowBottom1 = [0, 0];
        var arrowBottom2 = [0, 0];
        var centerToTop =[0, 0];
        arrowTop[0] = pointCenter[0] + radius * Math.cos(startAngle);
        arrowTop[1] = pointCenter[1] + radius * Math.sin(startAngle);
        centerToTop[0] = pointCenter[0] - arrowTop[0];
        centerToTop[1] = pointCenter[1] - arrowTop[1];
             if (args.clock === true){
                sita1 =  Math.PI /3;
                sita2 =  2* Math.PI /3;
                 
            } else {
                sita1 = - Math.PI /3;
                sita2 = - 2* Math.PI /3;
            }
        arrowBottom1[0] = arrowTop[0] + size /radius * (centerToTop[0] * Math.cos(sita1) -   centerToTop[1] * Math.sin(sita1));
        arrowBottom1[1] = arrowTop[1] + size/radius * (centerToTop[0] * Math.sin(sita1) +centerToTop[1] * Math.cos(sita1));
        arrowBottom2[0] = arrowTop[0] + size/radius * (centerToTop[0] * Math.cos(sita2) -centerToTop[1] * Math.sin(sita2));
        arrowBottom2[1] = arrowTop[1] + size/radius * (centerToTop[0] * Math.sin(sita2) +centerToTop[1] * Math.cos(sita2));
       // alert([arrowTop[0], arrowTop[1],arrowBottom1[0],arrowBottom1[1],arrowBottom2[0],arrowBottom2[1]]);
        ctx.beginPath();
        ctx.moveTo(arrowTop[0], arrowTop[1]);
        ctx.lineTo(arrowBottom1[0], arrowBottom1[1]);
        ctx.lineTo(arrowBottom2[0], arrowBottom2[1]);
        ctx.closePath();
        if (args.color === undefined) {
            ctx.fillStyle = baseColor;
        } else {
            ctx.fillStyle = args.color;
        }
        ctx.fill();
    }
    if (typeof(args.string) === 'string') {
        putString({
            at : args.points[1],
            string : args.string,
            color : args.color,
            font : args.font,
            move : args.move
        })
    }
	baseCFL();
}
function singlePointMark(args){
    'use strict';
    //args.at　は点を打ちたい仮想座標[x,y];
    //standardPixel = 2 に対し args.size をかけた半径とする
    //args.paint
    //args.color
    //args.open が true のとき色が baseColor の円弧で、内部を白(塗りつぶし)とする
    //白丸の際の円弧の太さは standardWidth = 2(px)にたいし
    //standardWidth * args.width とする
    var point = getZahyou(args.at);
    var standardWidth = 2;
    var standardPixel = 2;
    if(args.size === undefined){
        var radius = standardPixel;
    } else {
        radius = standardPixel * args.size;
    }
    if (args.color === undefined) {
        ctx.strokeStyle = baseColor;
         ctx.fillStyle = baseColor;
    } else {
        ctx.strokeStyle = args.color;
        ctx.fillStyle = args.color;
    }
    if (args.width === undefined) {
        ctx.lineWidth = standardWidth;
    } else {
        ctx.lineWidth = standardWidth * args.width;
    }
    //if (args.paint === undefined){
//         ctx.fillStyle = baseColor;
  //  } else {
//        ctx.fillStyle = args.paint;
//    }
    ctx.beginPath();
    ctx.arc(point[0], point[1],radius, 0, 2*Math.PI);
    ctx.stroke();
    if (args.open === true) {
      ctx.fillStyle ='white';
    }
    ctx.fill();
	baseCFL();
    }
function verticalMark(args){//AA, BB, lengthRate, clock){
    'use strict';
    //args.at において
    //args.to へ向かう線分に対する直角記号をつける
    //args.size はオプション。standardSize = 10 にsizeをかけた長さを対角線の長さとする
    //args.clock はオプション。省略の場合は半時計まわり。true の場合は時計回りにつける。
    //args.width;
    //args.color;
    var standardSize = 10;
    if(args.width === undefined){
        ctx.lineWidth = baseLineWidth;
    } else {
        ctx.lineWidth = args.width;
    }
    if (args.color === undefined) {
        ctx.strokeStyle = baseColor;
    } else {
        ctx.strokeStyle = args.color;
    }
    if(args.size === undefined){
        var size = 1;
    } else{
        size = args.size;
    }
    var pointA = getZahyou(args.at);
    var pointB = getZahyou(args.to);
    var vectorAB = [pointB[0] - pointA[0], pointB[1] - pointA[1]];
    if (args.clock === true){    
        var vectorAC = [-vectorAB[1], vectorAB[0]];
    } else {
       vectorAC = [vectorAB[1], -vectorAB[0]]; 
    }
    var vectorAD = [vectorAB[0]+vectorAC[0], vectorAB[1]+ vectorAC[1]];
    var length = size * standardSize /(Math.sqrt(vectorAD[0] * vectorAD[0] + vectorAD[1] * vectorAD[1]));
    var newPointA =[ pointA[0]+ length * vectorAB[0], pointA[1]+ length * vectorAB[1]];
    var newPointC =[ pointA[0]+ length * vectorAC[0], pointA[1]+ length * vectorAC[1]];
    var newPointD =[ pointA[0]+ length * vectorAD[0], pointA[1]+ length * vectorAD[1]];
    ctx.beginPath();
    ctx.moveTo(newPointA[0], newPointA[1]);
    ctx.lineTo(newPointD[0], newPointD[1]);
    ctx.lineTo(newPointC[0], newPointC[1]);
    ctx.stroke();
	baseCFL();
}
function xPaint(args){//func1, func2, idealXmin, idealXmax, color) {
	'use strict';
	// curve1 から　curve2 にはさまれた領域を 仮想座標　xMmin からxMaxの間で塗りつぶす
	//xMin の既定値は start[0]
	//xMax の既定値は goal[0]
	//color は塗りつぶしの色。指定がない場合は 'lightgray'
	if (args.color === undefined){
		ctx.strokeStyle = 'lightgray';
	} else {
		ctx.strokeStyle = args.color;
	}
	if (args.xMin === undefined){
		args.xMin = start[0];
	}
	if (args.xMax === undefined){
        args.xMax = end[0];
	}
    if (!isNaN(args.func1)) {//args.func1 が数値の場合は arags.func1 は引数によらず args.func2 を返すとする
		var func1 = function(x) {
			return args.func1;
		}
		} else {
			func1 = args.func1;	
		}
	if (!isNaN(args.func2)) {//args.func2 が数値の場合は func2 は引数によらず args.func2を返すとする
		var func2 = function(x) {
			return args.func2;
		}
		} else {
			func2 = args.func2;
    } 
	var xMin = Math.ceil(getZahyou([args.xMin, 0])[0]);//左端の実座標を獲得。小数点は切り上げ
	var xMax = Math.floor(getZahyou([args.xMax, 0])[0]);//右端の実座標を獲得。小数点は切り下げ
	var x = 0;//各種初期化
	var top = [0, 0];
	var bottom = [0, 0];
	var idealX = 0;
	ctx.beginPath();
	ctx.lineWidth = 1;//塗りつぶしに用いる線の太さは常に1px とする
	for (x = xMin; x <= xMax; x++) {
		idealX = getZahyouInverse([x, 0])[0];
		top = getZahyou([idealX, func1(idealX)]);
		bottom = getZahyou([idealX, func2(idealX)]);
		ctx.moveTo(top[0], top[1]);
		ctx.lineTo(bottom[0],bottom[1]);
	}
		ctx.stroke();
		baseCFL();
}
function yPaint(args){
	'use strict';
	// func1 から　func2 にはさまれた領域を 仮想座標　yMin からyMaxの間で塗りつぶす
	//yMin の既定値は start[1]
	//yMax の既定値は end[1]
	//color は塗りつぶしの色。指定がない場合は 'lightgray'
	if (args.color === undefined){
		ctx.strokeStyle = 'lightgray';
	} else {
		ctx.strokeStyle = args.color;
	}
	if (args.yMin === undefined){
		args.yMin = start[1];
	}
	if (args.yMax === undefined){
		args.yMax = end[1];
	}
    if (!isNaN(args.func1)) {//args.func1 が数値の場合は arags.func1 は引数によらず args.func1 を返すとする
		var func1 = function(y) {
			return args.func1;
		}
		} else {
			func1 = args.func1;	
		}
	if (!isNaN(args.func2)) {//args.func2 が数値の場合は func2 は引数によらず args.func2を返すとする
		var func2 = function(y) {
			return args.func2;
		}
		} else {
			func2 = args.func2;
    } 
	var yMax = Math.floor(getZahyou([0, args.yMin])[1]);//下端の実座標を獲得。小数点は切り下げ
	var yMin = Math.ceil(getZahyou([0, args.yMax])[1]);//上端の実座標を獲得。小数点は切り上げ
	var y = 0;//各種初期化
	var top = [0, 0];
	var bottom = [0, 0];
	var idealY = 0;
	ctx.beginPath();
	ctx.lineWidth = 1;//塗りつぶしに用いる線の太さは常に1px とする
	for (y = yMin; y <= yMax; y++) {
		idealY = getZahyouInverse([0, y])[1];
		top = getZahyou([func1(idealY), idealY]);
		bottom = getZahyou([func2(idealY), idealY]);
		ctx.moveTo(top[0], top[1]);
		ctx.lineTo(bottom[0],bottom[1]);
	}
		ctx.stroke();
		baseCFL();
}
function drawGraph(args){
    'use strict';
    //args.func
    //args.xMin
    //args.xMax
    //args.width
    //args.color
    //args.lineDash
    if (!isNaN(args.func)) {//args.func が数値の場合は args.func は引数によらず args.func を返すとする
        var func = function(x) {
            return args.func;
        }
        } else {
            func = args.func;	
        }
    if (args.xMin === undefined){
		args.xMin = start[0];
	}
	if (args.xMax === undefined){
        args.xMax = end[0];
	}
    if(args.width === undefined){
        ctx.lineWidth = baseLineWidth;
    } else {
        ctx.lineWidth = args.width;
    }
    if (args.color === undefined){
		ctx.strokeStyle = baseColor;
	} else {
		ctx.strokeStyle = args.color;
	}
    if (args.lineDash === undefined){
         ctx.setLineDash([100, 0]);//線種を実線に指定
    } else {
        ctx.setLineDash([args.lineDash, args.lineDash]);//線種を破線にする
    }
    var xMin = Math.ceil(getZahyou([args.xMin, 0])[0]);//左端の実座標を獲得。小数点は切り上げ
	var xMax = Math.floor(getZahyou([args.xMax, 0])[0]);//右端の実座標を獲得。小数点は切り下げ
	var x = 0;//各種初期化
	var idealX = 0;
    var point =[0, 0];
	ctx.beginPath();
	for (x = xMin; x <= xMax; x++) {
		idealX = getZahyouInverse([x, 0])[0];
		point = getZahyou([idealX, func(idealX)]);
		ctx.lineTo(point[0], point[1]);
	}
		ctx.stroke();
		baseCFL();
}
function drawGraphY(args){
    'use strict';
    //args.func
    //args.yMin
    //args.yMax
    //args.width
    //args.color
    //args.lineDash
    if (!isNaN(args.func)) {//args.func が数値の場合は args.func は引数によらず args.func を返すとする
        var func = function(y) {
            return args.func;
        }
        } else {
            func = args.func;	
        }
    if (args.yMin === undefined){
		args.yMin = start[1];
	}
	if (args.yMax === undefined){
        args.yMax = end[1];
	}
    if(args.width === undefined){
        ctx.lineWidth = baseLineWidth;
    } else {
        ctx.lineWidth = args.width;
    }
    if (args.color === undefined){
		ctx.strokeStyle = baseColor;
	} else {
		ctx.strokeStyle = args.color;
	}
    if (args.lineDash === undefined){
         ctx.setLineDash([100, 0]);//線種を実線に指定
    } else {
        ctx.setLineDash([args.lineDash, args.lineDash]);//線種を破線にする
    }
    var yMin = Math.ceil(getZahyou([0, args.yMax])[1]);//上端の実座標を獲得。小数点は切り上げ
	var yMax = Math.floor(getZahyou([0, args.yMin])[1]);//下端の実座標を獲得。小数点は切り下げ
	var y = 0;//各種初期化
	var idealY = 0;
    var point =[0, 0];
	ctx.beginPath();
	for (y = yMin; y <= yMax; y++) {
		idealY = getZahyouInverse([0, y])[1];
		point = getZahyou([func(idealY), idealY]);
		ctx.lineTo(point[0], point[1]);
	}
		ctx.stroke();
		baseCFL();
}
function segmentMark(args){
    //args.between
    //args.number
    //args.interval
    if(args.width === undefined){
        ctx.lineWidth = baseLineWidth;
    } else {
        ctx.lineWidth = args.width;
    }
    if (args.color === undefined) {
        ctx.strokeStyle = baseColor;
    } else {
        ctx.strokeStyle = args.color;
    } if(args.size === undefined){
        var inputSize = 1;
    } else{
        inputSize = args.size; 
}
    if(args.number === undefined){
        args.number = 1;
    }
    if (!isNaN(args.number)){//args.number が数値の場合
     var n = Math.floor(args.number);//等辺記号の個数
    }
    if (!isNaN(args.interval)){//args.interval が数値のとき
        var interval = args.interval;
    } else {
        interval = 1;
    }
    var middle = bunten(
    {between:[
        args.between[0], args.between[1]
        ],
    rate:[1, 1]
    });
    var i;
    var lx = args.between[1][0] - args.between[0][0];
    var ly = args.between[1][1] - args.between[0][1];
    var l = Math.sqrt(lx * lx + ly * ly);
    var dx = (args.between[1][0] - args.between[0][0]) /(l * canvasWidth);
    var dy = (args.between[1][1] - args.between[0][1]) /(l * canvasWidth);
    var point = [0,0];
    for (i = 1; i <= n ;i++){
        point = [middle[0] + (i - 0.5*n - 0.5) * interval * dx * 50,
                 middle[1] + (i - 0.5*n - 0.5) * interval * dy * 50];//500は長さの調節
        segmentMarkChild({
        at: point ,
        to: args.between[1],
        size: inputSize
    });
    }
     baseCFL();
}
function segmentMarkChild(args){
    //segmentMark 関数のための子関数 verticalMark の改変 
 //args.at において
    //args.to へ向かう線分に垂直な線分をつける
    //args.size はオプション。standardSize = 5 にsizeをかけた長さを対角線の長さの半分とする
    var standardSize = 5;
    var size = args.size;
    var pointA = getZahyou(args.at);
    var pointB = getZahyou(args.to);
    var vectorAB = [pointB[0] - pointA[0], pointB[1] - pointA[1]];  
    var vectorAC = [-vectorAB[1], vectorAB[0]];
    var length = size * standardSize /(Math.sqrt(vectorAC[0] * vectorAC[0] + vectorAC[1] * vectorAC[1]));
    var newPointC =[ pointA[0]+ length * vectorAC[0], pointA[1]+ length * vectorAC[1]];
    var newPointD =[ pointA[0]- length * vectorAC[0], pointA[1]- length * vectorAC[1]];
    ctx.beginPath();
    ctx.moveTo(newPointD[0], newPointD[1]);
    ctx.lineTo(newPointC[0], newPointC[1]);
    ctx.stroke();
    }
function heikouMark(args){
     //args.between
    //args.number
    //args.interval
    //args.direction
    if(args.width === undefined){
        ctx.lineWidth = baseLineWidth;
    } else {
        ctx.lineWidth = args.width;
    }
    if (args.color === undefined) {
        ctx.strokeStyle = baseColor;
    } else {
        ctx.strokeStyle = args.color;
    } if(args.size === undefined){
        var inputSize = 1;
    } else{
        inputSize = args.size; 
}
    if(args.number === undefined){
        args.number = 1;
    }
    if (!isNaN(args.number)){//args.number が数値の場合
        var n = Math.floor(args.number);//等辺記号の個数
    }
    if (!isNaN(args.interval)){//args.interval が数値のとき
        var interval = args.interval;
    } else {
        interval = 1;
    }
    if (args.direction === false){
        var inputDirection = false;
    } else {
        inputDirection = true;
    }
    var middle = bunten(
    {between:[
        args.between[0], args.between[1]
        ],
    rate:[1, 1]
    });
    var i;
    var lx = args.between[1][0] - args.between[0][0];
    var ly = args.between[1][1] - args.between[0][1];
    var l = Math.sqrt(lx * lx + ly * ly);
    var dx = (args.between[1][0] - args.between[0][0]) /(l * canvasWidth);
    var dy = (args.between[1][1] - args.between[0][1]) /(l * canvasWidth);
    var point = [0,0];
    for (i = 1; i <= n ;i++){
        point = [middle[0] + (i - 0.5*n - 0.5) * interval * dx * 50,
                 middle[1] + (i - 0.5*n - 0.5) * interval * dy * 50];//50は長さの調節
        heikouMarkChild({
        at: point ,
        to: args.between[1],
        size: inputSize,
        direction : inputDirection
    });
    }
     baseCFL();
}
function heikouMarkChild(args){
    //segmentMark 関数のための子関数 verticalMark の改変 
 //args.at において
    //args.to へ向かう線分に垂直な線分をつける
    //args.size はオプション。standardSize = 5 にsizeをかけた長さを対角線の長さの半分とする
    var standardSize = 5;
    var size = args.size;
    var pointA = getZahyou(args.at);
    var pointB = getZahyou(args.to);
    var vectorAB = [pointB[0] - pointA[0], pointB[1] - pointA[1]];  
    var vectorAF = [-vectorAB[1], vectorAB[0]];
    var length = size * standardSize /(Math.sqrt(vectorAB[0] * vectorAB[0] + vectorAB[1] * vectorAB[1]));
    var newPointC = [0,0];
    if (args.direction === false){
        newPointC =[ pointA[0] - length * vectorAB[0], pointA[1] - length * vectorAB[1]]; 
    } else {
        newPointC =[ pointA[0] + length * vectorAB[0], pointA[1] + length * vectorAB[1]];
    }
    var newPointD =[ pointA[0] + length * vectorAF[0] / Math.sqrt(3), pointA[1] + length * vectorAF[1] / Math.sqrt(3)];
    var newPointE =[ pointA[0] - length * vectorAF[0] / Math.sqrt(3), pointA[1] - length * vectorAF[1] / Math.sqrt(3)];
    ctx.beginPath();
    ctx.moveTo(newPointE[0], newPointE[1]);
    ctx.lineTo(newPointC[0], newPointC[1]);
    ctx.lineTo(newPointD[0], newPointD[1]);
    ctx.stroke();
    }
function bunten(args){
    'use strict';
    //args.betweenの仮想座標2つの配列
    //args.rate　rate[0]:rate[1] の分点となる
    var x = (args.rate[1] * args.between[0][0] + args.rate[0] * args.between[1][0] )/(args.rate[0] + args.rate[1]);
    var y = (args.rate[1] * args.between[0][1] + args.rate[0] * args.between[1][1] )/(args.rate[0] + args.rate[1]);
    return [x, y];
}
function drawGraphR(args) {//極表示された関数のグラフを描く関数
   // 'use strict';
    //args.func [rad]
    //args.start [rad]
    //args.end
    if (args.width === undefined) {
        ctx.lineWidth = baseLineWidth;
    } else {
        ctx.lineWidth = args.width;
    }
    if (args.color === undefined) {
        ctx.strokeStyle = baseColor;
    } else {
        ctx.strokeStyle = args.color;
    }
    if (args.lineDash === undefined) {
        ctx.setLineDash([100, 0]);//線種を実線に指定
    } else {
        ctx.setLineDash([args.lineDash, args.lineDash]);//線種を破線にする
    }
    if (args.pole === undefined) {
        args.pole = [0, 0];
    }
    var startDegree = args.start * 180 / Math.PI;
    var endDegree = args.end * 180 / Math.PI;
    var nStart = Math.ceil(startDegree * 10);//度数を10倍して0.1°ずつプロットする変数n
    var nEnd = Math.floor(endDegree * 10);
    var n = 0;
    var t = 0;
    var inputRadius = 0;
    var point = [0, 0];
    ctx.beginPath();
    var func = args.func;
    for (n = nStart; n <= nEnd; n++) {
        t = n * Math.PI / 1800;
        inputRadius = func(t);
        idealPoint = polar({
            radius: inputRadius,
            radian: t,
            pole: args.pole
        });
        point = getZahyou(idealPoint);
        if (n === nStart) {
            ctx.moveTo(point[0], point[1]);
        } else {
            ctx.lineTo(point[0], point[1]);
        }
    }
    ctx.stroke();
    baseCFL();
}
function polar(args) {
    'use strict';
    //args.radius
    //args.degree
    //args.radian
    //args.pole
    var inputRadian = 0;
    if (args.radian === undefined) {
        inputRadian = args.degree * Math.PI / 180;
    } else {
        inputRadian = args.radian;
    }
    if (args.pole === undefined) {
        args.pole = [0, 0];
    }
    var idealX = args.pole[0] + args.radius * Math.cos(inputRadian);
    var idealY = args.pole[1] + args.radius * Math.sin(inputRadian);
    return [idealX, idealY];
}
function pointMark(args){
    'use strict';
    //args.points = [
    //    [点の座標,'文字列', [moveX, moveY]],[ ]
    //]]
    //standardPixel = 2 に対し args.size をかけた半径とする
    //args.paint
    //args.color
    //args.open が true のとき色が baseColor の円弧で、内部を白(塗りつぶし)とする
    //白丸の際の円弧の太さは standardWidth = 2(px)にたいし
    //standardWidth * args.width とする
    var standardWidth = 2;
    var standardPixel = 2;
    if(args.size === undefined){
        var radius = standardPixel;
    } else {
        radius = standardPixel * args.size;
    }
    if (args.color === undefined) {
        ctx.strokeStyle = baseColor;
        ctx.fillStyle = baseColor;
        var inputColor = baseColor;
    } else {
        ctx.strokeStyle = args.color;
        ctx.fillStyle = args.color;
        var inputColor = args.color;
    }
    if (args.width === undefined) {
        ctx.lineWidth = standardWidth;
    } else {
        ctx.lineWidth = standardWidth * args.width;
    }
    if(args.font === undefined){// フォントの指定がない場合は既定値のbaseFontとする
            ctx.font = baseFont;
        } else {
            ctx.font = args.font;
        }
     var unitLength = ctx.measureText('x').width;//そのコマンド描画されるでのフォントx の幅をMove の単位長さとする
    var n = args.points.length;
    var i = 0;
    var idealPoint = [0, 0];
    var point = [0, 0];
    var element = [];
    var move = [0, 0];
    var moveX = 0;
    var moveY = 0;
    for (i = 0; i <= n - 1;i++) {
        element = args.points[i];
        idealPoint = element[0];
        point = getZahyou(idealPoint);
        ctx.beginPath();
        ctx.arc(point[0], point[1],radius, 0, 2*Math.PI);
        ctx.stroke();
        if (args.open === true) {
            ctx.fillStyle ='white';
        }
        ctx.fill();
        ctx.fillStyle = inputColor;
        if ( typeof(element[1]) === 'string') {
            if (element[2] === undefined){
                move = [0, 0];
            } else {
                move = element[2];
            }   
            moveX = unitLength * move[0];
            moveY = - unitLength * move[1];
            ctx.fillText(element[1], point[0] + moveX, point[1] + moveY);
        }
    }
    baseCFL();
}
function drawGraphT(args){
    'use strict';
    //パラメータ表示された曲線を描画する
     //args.funcX
    //args.funcY
    //args.tMin
    //args.tMax
    //args.width
    //args.color
    //args.lineDash
    if (args.width === undefined) {
        ctx.lineWidth = baseLineWidth;
    } else {
        ctx.lineWidth = args.width;
    }
    if (args.color === undefined) {
        ctx.strokeStyle = baseColor;
    } else {
        ctx.strokeStyle = args.color;
    }
    if (args.lineDash === undefined) {
        ctx.setLineDash([100, 0]);//線種を実線に指定
    } else {
        ctx.setLineDash([args.lineDash, args.lineDash]);//線種を破線にする
    }
    var funcX = args.funcX;
    var funcY = args.funcY;
    var tMax = args.tMax;
    var tMin = args.tMin;
    var pointNumber = 100;// 変数の分割数
    var dt = (tMax - tMin) / pointNumber;
    var idealStart = [funcX(tMin), funcY(tMin)];
    var startPoint = getZahyou(idealStart);
    ctx.beginPath();
    ctx.moveTo(startPoint[0], startPoint[1]);
    var t;
    var i;
    var idealNextPoint;
    var nextPoint;
    var boolXMin;
    var boolXMax;
    var boolYMin;
    var boolYMax;
    var xMax = args.xMax;
    var xMin = args.xMin;
    var yMax = args.yMax;
    var yMin = args.yMin;
    for (i = 1; i <= pointNumber; i++){
        t = tMin + i * dt;
        idealNextPoint = [funcX(t), funcY(t)];
        nextPoint = getZahyou(idealNextPoint);
        boolXMin = true;
        if (typeof(xMin) === 'number' && idealNextPoint[0] < xMin) {
            boolXMin = false;
        }
        boolXMax = true;
        if (typeof(xMax) === 'number' && idealNextPoint[0] > xMax) {
            boolXMax = false;
        }
        boolYMin = true;
        if (typeof(yMin) === 'number' && idealNextPoint[1] < yMin) {
            boolYMin = false;
        }
        boolYMax = true;
        if (typeof(yMax) === 'number' && idealNextPoint[1] > yMax) {
            boolYMax = false;
        }
        if(boolXMin && boolXMax && boolYMin && boolYMax){
            ctx.lineTo(nextPoint[0], nextPoint[1]);  
        } else {
            ctx.moveTo(nextPoint[0], nextPoint[1])
        }
    }
    ctx.stroke();
    baseCFL();
}
function tPaintX(args){
    'use strict';
    //パラメータ表示された曲線を描画する
    //args.tMin
    //args.tMax
    //args.color
    //args.xMin
    //args.xMax
    if (args.color === undefined) {
        ctx.strokeStyle = 'lightgray';
    } else {
        ctx.strokeStyle = args.color;
    }
    ctx.lineWidth = 1;
    var funcX = args.funcX;
    var funcY = args.funcY;
    var tMax = args.tMax;
    var tMin = args.tMin;
    var pointNumber = 1000;// 変数の分割数
    var dt = (tMax - tMin) / pointNumber;
    var t;
    var i;
    var idealPoint;
    var idealHoot;
    var point;
    var hoot;
    var boolXMin;
    var boolXMax;
    var xMax = args.xMax;
    var xMin = args.xMin;
    ctx.beginPath();
    for (i = 0; i <= pointNumber; i++){
        t = tMin + i * dt;
        idealPoint = [funcX(t), funcY(t)];
        idealHoot =[funcX(t), 0];
        point = getZahyou(idealPoint);
        hoot = getZahyou(idealHoot);
        ctx.moveTo(point[0], point[1]);
        boolXMin = true;
        if (typeof(xMin) === 'number' && idealPoint[0] < xMin) {
            boolXMin = false;
        }
        boolXMax = true;
        if (typeof(xMax) === 'number' && idealPoint[0] > xMax) {
            boolXMax = false;
        }
        if(boolXMin && boolXMax){
            ctx.lineTo(hoot[0], hoot[1]);  
        } 
    }
    ctx.stroke();
    baseCFL();
}
function tPaintY(args){
    'use strict';
    //パラメータ表示された曲線を描画する
    //args.tMin
    //args.tMax
    //args.color
    //args.yMin
    //args.yMax
    if (args.color === undefined) {
        ctx.strokeStyle = 'lightgray';
    } else {
        ctx.strokeStyle = args.color;
    }
    ctx.lineWidth = 1;
    var funcX = args.funcX;
    var funcY = args.funcY;
    var tMax = args.tMax;
    var tMin = args.tMin;
    var pointNumber = 1000;// 変数の分割数
    var dt = (tMax - tMin) / pointNumber;
    var t;
    var i;
    var idealPoint;
    var idealHoot;
    var point;
    var hoot;
    var boolYMin;
    var boolYMax;
    var yMax = args.yMax;
    var yMin = args.yMin;
    ctx.beginPath();
    for (i = 0; i <= pointNumber; i++){
        t = tMin + i * dt;
        idealPoint = [funcX(t), funcY(t)];
        idealHoot =[0, funcY(t)];
        point = getZahyou(idealPoint);
        hoot = getZahyou(idealHoot);
        ctx.moveTo(point[0], point[1]);
        boolYMin = true;
        if (typeof(yMin) === 'number' && idealPoint[1] < yMin) {
            boolYMin = false;
        }
        boolYMax = true;
        if (typeof(yMax) === 'number' && idealPoint[1] > yMax) {
            boolYMax = false;
        }
        if(boolYMin && boolYMax){
            ctx.lineTo(hoot[0], hoot[1]);  
        } 
    }
    ctx.stroke();
    baseCFL();
}
function rPaint(args){
    'use strict';
     //args.func 
    //args.start [rad]
    //args.end [rad]
    ctx.lineWidth = 2;
    if (args.color === undefined) {
        ctx.strokeStyle = 'lightgray';
    } else {
        ctx.strokeStyle = args.color;
    }
    if (args.pole === undefined) {
        args.pole = [0, 0];
    }
    var startDegree = args.start * 180 / Math.PI;
    var endDegree = args.end * 180 / Math.PI;
    var nStart = Math.ceil(startDegree * 10);//度数を10倍して0.1°ずつプロットする変数n
    var nEnd = Math.floor(endDegree * 10);
    var n = 0;
    var t = 0;
    var inputRadius = 0;
    var point = [0, 0];
    var origin = getZahyou(args.pole);
    var idealPoint = [0, 0];
    ctx.beginPath();
    var func = args.func;
    for (n = nStart; n <= nEnd; n++) {
        t = n * Math.PI / 1800;
        inputRadius = func(t);
        idealPoint = polar({
            radius: inputRadius,
            radian: t,
            pole: args.pole
        });
        point = getZahyou(idealPoint);
        ctx.moveTo(point[0], point[1]);
        ctx.lineTo(origin[0], origin[1]);
    }
    ctx.stroke();
    baseCFL();
}
function spiralMark(args){
//args.points[1]において args.points[0]　から args.points[2]まで渦巻きを描く
//args.number だけ周回してargs.points[2]に達する 既定値は 1
    //var spiralParameter = 10;//螺旋のサイズを決めるパラメータ-
    if (args.width === undefined) {
        ctx.lineWidth = baseLineWidth;
    } else {
        ctx.lineWidth = args.width;
    }
    if (args.color === undefined) {
        ctx.strokeStyle = baseColor;
    } else {
        ctx.strokeStyle = args.color;
    }
    if (args.lineDash === undefined) {
        ctx.setLineDash([100, 0]);//線種を実線に指定
    } else {
        ctx.setLineDash([args.lineDash, args.lineDash]);//線種を破線にする
    }
    var number;
     if (args.number === undefined) {
        number = 1;
    } else {
        number = args.number;
    }
    var radius ;
    if (args.radius === undefined) {
        radius = 10;
    } else {
        radius = args.radius;
    }
    var interval;
    if (args.interval === undefined){
        interval = 0.001;
    } else {
        interval = args.interval * 0.001;//0.001は螺旋の動径の増加量の調整
    }
    var clock;
    if (args.clock === true) {
        clock = true;
    } else {
        clock = false;
    }
    var size;
    if (args.size === undefined) {
        size = 10;
    } else {
        size = args.size;
    }
    var pointStart = getZahyou(args.points[0]);
    var pointCenter = getZahyou(args.points[1]);
    var pointEnd = getZahyou(args.points[2]);
    var x1 =  pointStart[0] - pointCenter[0];
    var y1 =  pointStart[1] - pointCenter[1];
    var x2 =  pointEnd[0] - pointCenter[0];
    var y2 =  pointEnd[1] - pointCenter[1];
    var startDegree = Math.atan2(y1, x1) * 180 / Math.PI;
    var endDegree;
    if (clock === true){
        endDegree = (Math.atan2(y2, x2) + 2 * Math.PI * number) * 180 / Math.PI; //number は周回数
    } else {
        endDegree = (Math.atan2(y2, x2) - 2 * Math.PI * number)  * 180 / Math.PI; //number は周回数
    }
    var nStart = Math.ceil(startDegree * 10);//度数を10倍して0.1°ずつプロットする変数n
    var nEnd = Math.floor(endDegree * 10);
    var n = 0;
    var t = 0;
    var inputRadius = 0;
    var point = [0, 0];
    var arrowHoot = [0, 0];
    arrowHoot[0] = pointCenter[0] + radius * Math.cos(Math.atan2(y1, x1));
    arrowHoot[1] = pointCenter[1] + radius * Math.sin(Math.atan2(y1, x1));
    ctx.beginPath();
    ctx.moveTo(arrowHoot[0], arrowHoot[1]);
    var i = 0;
    var endRadius;
        if (clock === true){
            for (n = nStart; n <= nEnd; n++) {
                t =  n * Math.PI / 1800;
                point[0] = pointCenter[0] + (radius + i * interval) * Math.cos(t) 
                point[1] = pointCenter[1] + (radius + i * interval) * Math.sin(t) 
                ctx.lineTo(point[0], point[1]);
                i = i + 1;
        }
            endRadius = radius + i * interval;
    } else {
        for (n = nStart; n >= nEnd; n--) {
                t =  n * Math.PI / 1800;
                point[0] = pointCenter[0] +(radius - i * interval) * Math.cos(t) 
                point[1] = pointCenter[1] +(radius - i * interval) * Math.sin(t)  
                ctx.lineTo(point[0], point[1]); 
            i = i - 1;
        }
        endRadius = radius - i * interval;
    }
    ctx.stroke();
        if (args.arrow === true) {
        var sita1;
        var sita2;
        var arrowTop = [0, 0];
        var arrowBottom1 = [0, 0];
        var arrowBottom2 = [0, 0];
        var centerToTop =[0, 0];
        arrowTop[0] = pointCenter[0] + endRadius * Math.cos(Math.atan2(y2, x2));
        arrowTop[1] = pointCenter[1] + endRadius * Math.sin(Math.atan2(y2, x2));
        centerToTop[0] = pointCenter[0] - arrowTop[0];
        centerToTop[1] = pointCenter[1] - arrowTop[1];
             if (args.clock === true){
                sita1 =  Math.PI /3;
                sita2 =  2* Math.PI /3;
                 
            } else {
                sita1 = - Math.PI /3;
                sita2 = - 2* Math.PI /3;
            }
        arrowBottom1[0] = arrowTop[0] + size /endRadius * (centerToTop[0] * Math.cos(sita1) -   centerToTop[1] * Math.sin(sita1));
        arrowBottom1[1] = arrowTop[1] + size/endRadius * (centerToTop[0] * Math.sin(sita1) +centerToTop[1] * Math.cos(sita1));
        arrowBottom2[0] = arrowTop[0] + size/endRadius * (centerToTop[0] * Math.cos(sita2) -centerToTop[1] * Math.sin(sita2));
        arrowBottom2[1] = arrowTop[1] + size/endRadius * (centerToTop[0] * Math.sin(sita2) +centerToTop[1] * Math.cos(sita2));
       // alert([arrowTop[0], arrowTop[1],arrowBottom1[0],arrowBottom1[1],arrowBottom2[0],arrowBottom2[1]]);
        ctx.beginPath();
        ctx.moveTo(arrowTop[0], arrowTop[1]);
        ctx.lineTo(arrowBottom1[0], arrowBottom1[1]);
        ctx.lineTo(arrowBottom2[0], arrowBottom2[1]);
        ctx.closePath();
        if (args.color === undefined) {
            ctx.fillStyle = baseColor;
        } else {
            ctx.fillStyle = args.color;
        }
        ctx.fill();
    }
    if (typeof(args.string) === 'string') {
        putString({
            at : args.points[1],
            string : args.string,
            color : args.color,
            font : args.font,
            move : args.move
        })
    }
    baseCFL();
}
function sutyoku(args){
    //'use strict';
    //args.label 軸の名前
    //args.range :[min, max]
    //args.scale　目盛り,すべて黒丸で
    //args.scaleLabel,
    //args.scaleSize 　目盛りの大きさ
    //args.interval [{range:[min , max],height: ,leftOpen: ,rightOpen: , leftString: ,rightString
//,leftStringMove:, rightStringMove:[]}]
    //args.paint:[{range:[], height: ,color]}]
    var min = args.range[0];
    var max = args.range[1];
    //var pInf = max + 1;
    //var mInf = min - 1;
    start = [min, -2];//領域の下端の高さは-2 とする
    end = [max, 11];//領域の高さは 11 を最高とする
    if (args.paint){//先に塗りつぶしを行う
        var paintLength = args.paint.length;
        var height = 0;
        var inputColor;
        var point5;
        var point6;
        var point7;
        var point8;
        var temp ={};
        var k;
        for (k = 0; k<= paintLength - 1; k++){
            temp = args.paint[k];
            if (temp.height === undefined){
                height = 1;
            } else {
                height = temp.height;
            }
            if (temp.color === undefined){
                inputColor = 'lightgray';
            } else {
                inputColor = temp.color;
            }
            point5 = [temp.range[0], 0];
            point6 = [temp.range[0], height];
            point7 = [temp.range[1], height];
            point8 = [temp.range[1], 0];
            drawLine({
                between : [point5, point6, point7, point8],
                color : inputColor,
                polygon : inputColor
            });
        }
    }
    drawAxis({
        type : "x",
        xLabel : args.label,
        noOrigin : true
});
    if (args.scale === true){
        var secondMin = Math.ceil(min) + 1;
        var secondMax = Math.floor(max) - 1;
        var i;
        var inputPoints =[];
        if (args.scaleLabel === true){
            for (i = secondMin;i <= secondMax; i++){
                inputPoints.push([
                    [i, 0], String(i),[-0.5,-2]                    
                ])
            }
        } else {
            for (i = secondMin;i <= secondMax; i++){
                inputPoints.push([
                    [i, 0]
                ])
            }        
        }
        pointMark({
            points : inputPoints,
            size : args.scaleSize
        })
    }
    var intervalNumber = args.interval.length;
    var j;
    var point1 = [0, 0];
    var point2 = [0, 0];
    var point3 = [0, 0];
    var point4 = [0, 0];
    var inputHeight;
    var inputInterval = {};
    for (j = 0; j <= intervalNumber - 1; j++){
        inputInterval = args.interval[j];
        if ( !isNaN(inputInterval.height)) {
           inputHeight = inputInterval.height;//height に数値の指定がある場合
        } else {
            inputHeight = 1;
        }
        point1 = [inputInterval.range[0], 0];
        point2 = [inputInterval.range[0], inputHeight];
        point3 = [inputInterval.range[1], inputHeight];
        point4 = [inputInterval.range[1], 0];
        drawLine({
            between:[point1, point2, point3, point4],
            width : inputInterval.width,
            color : inputInterval.color
        });
        singlePointMark({
            at : point1,
            size : inputInterval.size,
            color : inputInterval.color,
            open : inputInterval.leftOpen,
            width : inputInterval.width
        });
           singlePointMark({
            at : point4,
            size : inputInterval.size,
            color : inputInterval.color,
            open : inputInterval.rightOpen,
            width : inputInterval.width
        });
        if (typeof(inputInterval.leftString) === 'string'){
            putString({
                at : point1,
                string : inputInterval.leftString,
                move : inputInterval.leftStringMove,
                font : inputInterval.font,
                color:inputInterval.color
            });
        }
        if (typeof(inputInterval.rightString) === 'string'){
            putString({
                at : point4,
                string : inputInterval.rightString,
                move : inputInterval.rightStringMove,
                font : inputInterval.font,
                color:inputInterval.color
            });
        }
    }
}
function branch(string, yZahyou){
    //樹形図の枝(先端)を描画するコマンド
    //[3,yZahyou]に string を描画して
    //[3, yZahyou] を返す
   // var canvasWidth = 400;
    //var canvasHeight =400;
    var inputString = ' ' + string;
    var stringHeight = ctx.measureText('b').width;//「b」の高さの実のピクセル数
    var idealStringHeight = (end[1] - start[1]) * stringHeight /canvasHeight;//文字列の仮想座標における高さ
    putString({
        at : [3, yZahyou - idealStringHeight/2],//その半分だけ位置を下げる補正
        string : inputString,
    });
    return [3, yZahyou];
}
function tree(string, pArray){
    //樹形図を描くコマンド
    //pArrayは複数の枝の先の座標[x,y]を要素とする配列
    //枝の根元枝の先のy座標の平均とする
    //枝の根元枝の先のx座標(どれも同じ)から1を引いた値とする
    //枝の根元にinputString を描画して
    //枝の根元と先端を線分で結び
    //根元の座標[x,y]を出力する
    var inputString = ' ' + string + ' ';
    var n = pArray.length;//要素の個数
    var i;
    var ySum = 0;
    for (i = 0; i <= n - 1 ; i++){
        ySum = ySum + pArray[i][1];
    }
    var root = [pArray[0][0] - 1, ySum / n];//枝の根元の基準点
    var stringHeight = ctx.measureText('b').width;      //「b」の高さの実のピクセル数
    var idealStringHeight = (end[1] - start[1]) * stringHeight /canvasHeight;   //文字列の仮想座標における高さ
    var stringWidth = ctx.measureText(inputString).width;   //inputStringの幅の実のピクセル数
    var idealStringWidth = (end[0] - start[0]) * stringWidth / canvasWidth;    //文字列の仮想座標における幅
    var point = [root[0] + idealStringWidth/2 , root[1] ];
    for (i = 0; i <= n - 1; i++){
        drawLine({
            between :[point, pArray[i]]
        });
    }

    putString({
       at : [root[0]- idealStringWidth / 2, root[1]- idealStringHeight/2],
        string : inputString,
        //box:true
    });
    return [root[0] - idealStringWidth/2 , root[1] ];
}
function treeA(string, pArray){
    //樹形図(矢印)を描くコマンド
    //pArrayは複数の枝の先の座標[x,y]を要素とする配列
    //枝の根元枝の先のy座標の平均とする
    //枝の根元枝の先のx座標(どれも同じ)から1を引いた値とする
    //枝の根元にinputString を描画して
    //枝の根元と先端を線分で結び
    //根元の座標[x,y]を出力する
    var inputString = ' ' + string + ' ';
    var n = pArray.length;//要素の個数
    var i;
    var ySum = 0;
    for (i = 0; i <= n - 1 ; i++){
        ySum = ySum + pArray[i][1];
    }
    var root = [pArray[0][0] - 1, ySum / n];//枝の根元の基準点
    var stringHeight = ctx.measureText('b').width;      //「b」の高さの実のピクセル数
    var idealStringHeight = (end[1] - start[1]) * stringHeight /canvasHeight;   //文字列の仮想座標における高さ
    var stringWidth = ctx.measureText(inputString).width;   //inputStringの幅の実のピクセル数
    var idealStringWidth = (end[0] - start[0]) * stringWidth / canvasWidth;    //文字列の仮想座標における幅
    var point = [root[0] + idealStringWidth/2 , root[1] ];
    for (i = 0; i <= n - 1; i++){
        drawArrow({
            from :point,
            to : pArray[i],
        });
    }
    putString({
       at : [root[0]- idealStringWidth / 2, root[1]- idealStringHeight/2],
        string : inputString,
        //box:true
    });
    return [root[0] - idealStringWidth/2 , root[1] ];
}
function baseCFL(){
	//色, フォント, 太さ,線種を baseに戻す関数
	'use strict';
	ctx.strokeStyle = baseColor;//色をbaseColorに戻しておく
    ctx.fillStyle = baseColor;
    ctx.lineWidth = baseLineWidth;
	ctx.font = baseFont;
	ctx.setLineDash([100, 0]);
}
//====================計算のためのサブ関数========================
function unitVector([x, y, z]){//単位ベクトルに直す関数
    var abs = Math.sqrt(x * x + y * y + z * z);
    return [x / abs, y / abs , z / abs];
}
function scalarProduct([a, b, c], [x, y, z]){//内積を計算する関数
    return a * x + b * y + c * z;
}
function vectorProduct([a, b, c], [x, y, z]){
    return [ b * z - c * y,
            c * x - a * z,
            a * y - b * x
           ];
}
//==============================================================
var Longitude;//鉛直方向から見た場合の処理に備えてグローバル変数(大文字に)の定義
function viewFrom(latitude, longitude){
    //緯度 longitude, 経度latitude から視線ベクトル(単位ベクトル)を返す関数
    var a = Math.PI * latitude / 180;
    var b = Math.PI * longitude / 180;
    Longitude = longitude;
    return  unitVector([Math.cos(b) * Math.cos(a), Math.cos(b) * Math.sin(a), Math.sin(b)]);
}
function p3d(d,e,f){
    //視線ベクトル vf はグローバル変数
    //座標[d, e, f] を，原点を通り視線ベクトル vfに垂直な平面に射影した[X, Y]を返す関数
    var OQ = projection([d, e, f]);
//射影した面上で上向きなのは，元の(0,0,1)であり，それを射影したもの(単位ベクトル)を w とする
//視線の緯度 Longitude = 90, -90 のときは 元の (0,1,0)をwとする
//射影した面上で右向きなのは w と vf の外積 を単位ベクトルに直した u
    var w =[0, 0, 0];
    if (Longitude === 90 || Longitude === -90){
        w = unitVector(projection([0, 1, 0]));
    } else { 
        w = unitVector(projection([0, 0, 1]));
    }
    var u = unitVector(vectorProduct(w, vf));
    //射影した平面上でのxy座標を求める
    var y = scalarProduct(OQ, w);
    var x = scalarProduct(OQ, u);
    return [x, y];  
    function projection(OP){
        var opvf = scalarProduct(OP, vf);
        var OQ = [0, 0, 0];
        OQ[0] = OP[0] - opvf * vf[0]; 
        OQ[1] = OP[1] - opvf * vf[1]; 
        OQ[2] = OP[2] - opvf * vf[2]; 
        return OQ;
    }
}
function drawAxis3d(args){
    //args.length 軸の長さ
    //args.xLabel
    //args.xLabelMove,
    //args.origin 
    //args.originMove
    if(args === undefined){
        args = {length:1};
    }
    if(args.length === undefined){
        args.length = 1;
    }
    if(args.xLabel === undefined){
        args.xLabel = "x";
    }
    if(args.xLabelMove === undefined){
        args.xLabelMove = [0,0];
    }
    if(args.yLabel === undefined){
        args.yLabel = "y";
    }
    if(args.yLabelMove === undefined){
        args.yLabelMove = [0,0];
    }
    if(args.zLabel === undefined){
        args.zLabel = "z";
    }
    if(args.zLabelMove === undefined){
        args.zLabelMove = [0,0];
    }
     if(args.originMove === undefined){
        args.originMove = [0,0];
    }    
    pointO = p3d(0, 0, 0);
    pointX = p3d(args.length, 0, 0);
    pointY = p3d(0, args.length, 0);
    pointZ = p3d(0, 0, args.length);
    if (Longitude === 90 || Longitude === -90){//視線の緯度が鉛直な場合の処理
        drawArrow({  
        from : pointO,
        to : pointX
    });
    drawArrow({  
     from : pointO,
     to : pointY
    });
    pointMark({
    points:[
        [pointX, args.xLabel, args.xLabelMove],
        [pointY, args.yLabel, args.yLabelMove]
    ]
        ,size:0
    });
    } else {//それ以外の大半の時の処理
    drawArrow({  
        from : pointO,
        to : pointX
    });
    drawArrow({  
     from : pointO,
     to : pointY
    });
    drawArrow({  
     from : pointO,
     to : pointZ
    });
    pointMark({
    points:[
        [pointX, args.xLabel, args.xLabelMove],
        [pointY, args.yLabel, args.yLabelMove],
        [pointZ, args.zLabel, args.zLabelMove]
    ]
        ,size:0
    });
    }
    if (args.noOrigin !== true){//原点の描画
       pointMark({
    points:[
        [pointO, "O", args.originMove],
    ]
        ,size:1
    }); 
    }
}
function drawEnko3d(args){
    //args.center は中心の座標[a,b,c]。
    //args.radius は半径
    //args.nv は法線ベクトル
    //args.tMin は円弧の開始角(度数)
    //args.tMax は円弧の終了角（度数
    //args.width
    //args.color
    //args.lineDash
    var inputTMin;
    var inputTMax;
    if(typeof(args.tMin) !== "number"){
        inputTMin = 0;
    } else {
        inputTMin = Math.PI * args.tMin / 180;
    }
     if(typeof(args.tMax) !== "number"){
        inputTMax = 2 * Math.PI;
    } else {
        inputTMax = Math.PI * args.tMax / 180;
    }
     //args.center は中心の座標[a,b,c]。それを射影して inputCenter=[X, Y] とする
    var inputCenter = args.center;//中心として,平面座標(仮想)を入れた場合
    if (args.center.length === 3){//中心として,空間座標(仮想)を入れた場合，平面座標(仮想)に上書きする
        inputCenter = p3d(args.center[0], args.center[1], args.center[2]);  
    } 
    //r1は半径。楕円の長半径となる
    var r1 = args.radius;
    //normalVectorは円を含む平面の法線べクトル//まず法線ベクトルを射影して nv とする
    var nv = p3d(args.nv[0], args.nv[1], args.nv[2]);
    //水平右方向と法線ベクトルのなす角を返す
    var alpha = Math.atan2(nv[1], nv[0]);
    //βが水平右方向から楕円の長軸への回転角となる
    var beta = alpha - Math.PI / 2;
    //射影する平面と円を含む平面のなす角 gamma のcosは，互いの法線ベクトル(単位ベクトル)どうしの内積の絶対値と一致
    var sp = scalarProduct(unitVector(vf), unitVector(args.nv));
    var cosG = Math.abs(sp);
    //楕円の単半径を計算する
    var r2 = r1 * cosG;
    //楕円のパラメータ表示の作成
    function xxx(t){
        return inputCenter[0] + r1 * Math.cos(t)* Math.cos(beta) - r2 * Math.sin(t) * Math.sin(beta);
    }
    function yyy(t){
        return inputCenter[1] + r1 * Math.cos(t)* Math.sin(beta) + r2 * Math.sin(t) * Math.cos(beta);
    }
    drawGraphT({
        funcX : xxx,
        funcY : yyy,
        tMin : inputTMin,
        tMax : inputTMax,
        width : args.width,
        color : args.color,
        lineDash : args.lineDash
    });
}
function verticalMark3d(args){
    'use strict';
    //空間において ，角 args.points[0],args.points[1],args.points[2]に直角記号をつける
    //args.size はオプション。standardSize = 10 にsizeをかけた長さを対角線の長さとする
    //args.width;
    //args.color;
    var standardSize = 10;
    if(args.width === undefined){
        ctx.lineWidth = baseLineWidth;
    } else {
        ctx.lineWidth = args.width;
    }
    if (args.color === undefined) {
        ctx.strokeStyle = baseColor;
    } else {
        ctx.strokeStyle = args.color;
    }
    if(args.size === undefined){
        var size = 1;
    } else{
        size = args.size;
    }
    var pointA = getZahyou(args.points[0]);
    var pointH = getZahyou(args.points[1]);
    var pointB = getZahyou(args.points[2]);
    var vectorHA = [pointA[0] - pointH[0], pointA[1] - pointH[1]];
    var vectorHB = [pointB[0] - pointH[0], pointB[1] - pointH[1]];
    var vectorHC = [vectorHA[0] + vectorHB[0], vectorHA[1] + vectorHB[1]];
    var pointC= [pointH[0] + vectorHC[0], pointH[1] + vectorHC[1]];
    var length = size * standardSize /(Math.sqrt(vectorHC[0] * vectorHC[0] + vectorHC[1] * vectorHC[1]));
    var newPointA =[ pointH[0]+ length * vectorHA[0], pointH[1]+ length * vectorHA[1]];
    var newPointB =[ pointH[0]+ length * vectorHB[0], pointH[1]+ length * vectorHB[1]];
    var newPointC =[ pointH[0]+ length * vectorHC[0], pointH[1]+ length * vectorHC[1]];
    ctx.beginPath();
    ctx.moveTo(newPointA[0], newPointA[1]);
    ctx.lineTo(newPointC[0], newPointC[1]);
    ctx.lineTo(newPointB[0], newPointB[1]);
    ctx.stroke();
	baseCFL();
}
function drawGraphT3d(args){
    'use strict';
    //空間でパラメータ表示された曲線を描画する
     //args.funcX
    //args.funcY
    //args.funcZ
    //args.tMin
    //args.tMax
    //args.width
    //args.color
    //args.lineDash
    if (args.width === undefined) {
        ctx.lineWidth = baseLineWidth;
    } else {
        ctx.lineWidth = args.width;
    }
    if (args.color === undefined) {
        ctx.strokeStyle = baseColor;
    } else {
        ctx.strokeStyle = args.color;
    }
    if (args.lineDash === undefined) {
        ctx.setLineDash([100, 0]);//線種を実線に指定
    } else {
        ctx.setLineDash([args.lineDash, args.lineDash]);//線種を破線にする
    }
    var funcX = args.funcX;
    var funcY = args.funcY;
    var funcZ = args.funcZ;
    var tMax = args.tMax;
    var tMin = args.tMin;
    var pointNumber = 100;// 変数の分割数
    var dt = (tMax - tMin) / pointNumber;
    var idealStart = p3d(funcX(tMin), funcY(tMin), funcZ(tMin));//空間の仮想座標を射影先の平面座標(仮想座標)になおす
    var startPoint = getZahyou(idealStart);//射影先の平面座標を仮想座標から実座標に直す
    ctx.beginPath();
    ctx.moveTo(startPoint[0], startPoint[1]);
    var t;
    var i;
    var idealNextPoint;
    var nextPoint;
    var boolXMin;
    var boolXMax;
    var boolYMin;
    var boolYMax;
    var boolZMin;
    var boolZMax;
    var xMax = args.xMax;
    var xMin = args.xMin;
    var yMax = args.yMax;
    var yMin = args.yMin;
    var zMax = args.zMax;
    var zMin = args.zMin;
    for (i = 1; i <= pointNumber; i++){
        t = tMin + i * dt;
        idealNextPoint = [funcX(t), funcY(t), funcZ(t)];//次の点の空間の仮想座標
        nextPoint = getZahyou(p3d(idealNextPoint[0], idealNextPoint[1], idealNextPoint[2]));//次の点の射影先の平面の実座標
        boolXMin = true;
        if (typeof(xMin) === 'number' && idealNextPoint[0]< xMin) {
            boolXMin = false;
        }
        boolXMax = true;
        if (typeof(xMax) === 'number' && idealNextPoint[0] > xMax) {
            boolXMax = false;
        }
        boolYMin = true;
        if (typeof(yMin) === 'number' && idealNextPoint[1] < yMin) {
            boolYMin = false;
        }
        boolYMax = true;
        if (typeof(yMax) === 'number' && idealNextPoint[1] > yMax) {
            boolYMax = false;
        }
         boolZMin = true;
        if (typeof(zMin) === 'number' && idealNextPoint[2] < zMin) {
            boolZMin = false;
        }
        boolZMax = true;
        if (typeof(zMax) === 'number' && idealNextPoint[2] > zMax) {
            boolZMax = false;
        }
        if(boolXMin && boolXMax && boolYMin && boolYMax && boolZMin && boolZMax){
            ctx.lineTo(nextPoint[0], nextPoint[1]);  
        } else {
            ctx.moveTo(nextPoint[0], nextPoint[1])
        }
    }
    ctx.stroke();
    baseCFL();
}
function hakohige(args){
    //'use strict';
    //args.label 軸の名前
    //args.range :[min, max]
    //args.height 図の全体の高さ
    //args.scaleLabel,
    //args.scaleSize 　目盛りの大きさ
    //args.scaleLine 軸の目盛を延長した補助線（破線）
    //args.box [
//    [min, q1, q2 , q3, max, 'name'],[],
    //]
    if (args.height === undefined){
       args.height = 5;//図の全体の高さは規定値を5(本)としておく
    } 
    var min = args.range[0];
    var max = args.range[1];
    start = [min, -1];//領域の下端の高さは-1 とする
    end = [max, args.height];
    drawAxis({
        type : "x",
        xLabel : args.label,
        noOrigin : true
});
        var secondMin = Math.ceil(min) + 1;
        var secondMax = Math.floor(max) - 1;
        var i;
        var inputPoints =[];
        var bool = args.scaleLine;
        if (args.scaleLineDash === undefined) {
            var inputLineDash = 3;
        } else {
            var inputLineDash = args.scaleLineDash;
        }
        if (args.scaleLabel === true){
            for (i = secondMin;i <= secondMax; i++){
                if (bool === true){
                    drawLine({
                        between: [
                            [i, 0],[i, end[1]]
                        ],
                        lineDash : inputLineDash
                    });
                }
                inputPoints.push([
                    [i, 0], String(i),[-0.5,-2]                    
                ])
            }
        } else {
            for (i = secondMin;i <= secondMax; i++){
                if (bool === true){
                    drawLine({
                        between: [
                            [i, 0],[i, end[1]]
                        ],
                        lineDash : inputLineDash
                    });
                }
                inputPoints.push([
                    [i, 0]
                ])
            }        
        }
        pointMark({
            points : inputPoints,
            size : args.scaleSize
        });   
    var boxNumber = args.box.length;
    var j;
    var pointMin = [0, 0];
    var pointQ1 = [0, 0];
    var pointQ2 = [0, 0];
    var pointQ3 =[0,0];
    var pointMax=[0,0];
    var inputBox= [];
    var k;
    var boxHeight = 0.25;
    var higeHeight = boxHeight / 2;
    for (j = 0; j <= boxNumber - 1; j++){
        inputBox = args.box[j];
        k= j + 1;
        pointMin = [inputBox[0], k];
        pointMinTop=[inputBox[0], k + higeHeight];
        pointMinBottom=[inputBox[0], k - higeHeight];
        pointQ1 = [inputBox[1], k];
        pointQ1Top = [inputBox[1], k + boxHeight];
        pointQ1Bottom = [inputBox[1], k - boxHeight];
        pointQ2 = [inputBox[2], k];
        pointQ2Top = [inputBox[2], k + boxHeight];
        pointQ2Bottom = [inputBox[2], k - boxHeight];
        pointQ3 = [inputBox[3], k];
        pointQ3Top = [inputBox[3], k + boxHeight];
        pointQ3Bottom = [inputBox[3], k - boxHeight];
        pointMax = [inputBox[4], k];
        pointMaxTop=[inputBox[4], k + higeHeight];
        pointMaxBottom=[inputBox[4], k - higeHeight];
        drawLine({
            between:[pointQ1Top, pointQ1Bottom, pointQ3Bottom, pointQ3Top],
            polygon:"white"
        });
         drawLine({
            between:[pointQ1Top, pointQ1Bottom, pointQ3Bottom, pointQ3Top],
            polygon:true
        });
        drawLine({
            between:[pointMinTop, pointMinBottom],
        });
        
         drawLine({
            between:[pointQ2Top, pointQ2Bottom],
        });
         drawLine({
            between:[pointMaxTop, pointMaxBottom],
        });
        drawLine({
            between:[pointMin, pointQ1],
        });
        drawLine({
            between:[pointMax, pointQ3],
        });
        putString({
            at : [secondMin - 1, k],
            string :inputBox[5]
        });
    }
}
function andGate(args){
    //右端点の仮想座標を args.start　として，AND回路を書き，左端点上 I ,下 J の座標を[I , J] として返す 
    var A = args.start;//仮想座標
    var B = [A[0]- 1, A[1]];
    var C = [A[0]- 1.5, A[1] + 0.5];
    var D = [A[0]- 1.5, A[1] - 0.5];
    var E = [A[0]- 2.5, A[1] + 0.5];
    var F = [A[0]- 2.5, A[1] - 0.5];
    var G = [A[0]- 2.5, A[1] + 0.25];
    var H = [A[0]- 2.5, A[1] - 0.25];
    var I = [A[0]- 3.5, A[1] + 0.25];
    var J = [A[0]- 3.5, A[1] - 0.25];
    drawLine({
        between:[A, B]
    });
    drawLine({
        between:[C, E, F ,D]
    });
    drawLine({
        between:[G, I]
    });
    drawLine({
        between:[H, J]
    });
    drawEnko({
        center:[
            (C[0] + D[0]) / 2, (C[1] + D[1]) / 2
        ],
        startAngle : -90,
        endAngle:90,
        radius:0.5
    });
    return [I, J]
}
function nandGate(args){
    //右端点の仮想座標を args.start　として，AND回路を書き，左端点上 I ,下 J の座標を[I , J] として返す
    var A = args.start;//仮想座標
    var B = [A[0]- 1, A[1]];
    var K = [A[0] -0.9, A[1]];
    var C = [A[0]- 1.5, A[1] + 0.5];
    var D = [A[0]- 1.5, A[1] - 0.5];
    var E = [A[0]- 2.5, A[1] + 0.5];
    var F = [A[0]- 2.5, A[1] - 0.5];
    var G = [A[0]- 2.5, A[1] + 0.25];
    var H = [A[0]- 2.5, A[1] - 0.25];
    var I = [A[0]- 3.5, A[1] + 0.25];
    var J = [A[0]- 3.5, A[1] - 0.25];
    drawLine({
        between:[A, B]
    });
    drawLine({
        between:[C, E, F ,D]
    });
    drawLine({
        between:[G, I]
    });
    drawLine({
        between:[H, J]
    });
    drawEnko({
        center:[
            (C[0] + D[0]) / 2, (C[1] + D[1]) / 2
        ],
        startAngle : -90,
        endAngle:90,
        radius:0.5
    });
     drawEnko({
        center:K,
        radius:0.1,
        paint:"white"
    });
    return [I, J];
}
function orGate(args){
    //右端点の仮想座標を args.start　として，OR回路を書き，左端点上 I ,下 J の座標を[G , F] として返す
    [a, b] = args.start;
    var A = [a, b];
    var B = [a - 1, b];
    var rt3 = Math.sqrt(3);
    var C = [a - 1 - rt3 / 2, b + 1/2];
    var D = [a - 1 - rt3 / 2, b - 1/2];
    var E = [a - 2 - rt3 / 2, b + 1/2];
    var F = [a - 2 - rt3 / 2, b - 1/2];
    var OO =[a -2 - rt3, b];
    var alpha = Math.asin(0.25);
    var M = [OO[0] + Math.cos(alpha), b+0.25];
    var N = [OO[0] + Math.cos(alpha), b-0.25];
    var G = [M[0]-0.5, b +0.25];
    var H = [N[0]-0.5, b -0.25];
    drawLine({between:[A, B]});
    drawLine({between:[C, E]});
    drawLine({between:[F, D]});
    drawLine({between:[M, G]});
    drawLine({between:[H, N]});
    drawEnko({
    center:C,
    radius:1,
    startAngle:270,
    endAngle:330
    });
    drawEnko({
    center:D,
    radius:1,
    startAngle:30,
    endAngle:90
    });
    drawEnko({
    center:OO,
    radius:1,
    startAngle:-30,
    endAngle:30
    });
    return [G, H]
    };
    function xorGate(args){
        //右端点の仮想座標を args.start　として，XOR回路を書き，左端点上 I ,下 J の座標を[G , F] として返す
        [a, b] = args.start;
        var A = [a, b];
        var B = [a - 1, b];
        var rt3 = Math.sqrt(3);
        var C = [a - 1 - rt3 / 2, b + 1/2];
        var D = [a - 1 - rt3 / 2, b - 1/2];
        var E = [a - 2 - rt3 / 2, b + 1/2];
        var F = [a - 2 - rt3 / 2, b - 1/2];
        var OO =[a -2 - rt3, b];
        var alpha = Math.asin(0.25);
        var M = [OO[0] + Math.cos(alpha), b+0.25];
        var N = [OO[0] + Math.cos(alpha), b-0.25];
        var G = [M[0]-1, b +0.25];
        var H = [N[0]-1, b -0.25];
        drawLine({between:[A, B]});
        drawLine({between:[C, E]});
        drawLine({between:[F, D]});
        drawLine({between:[M, G]});
        drawLine({between:[H, N]});
        drawEnko({
        center:C,
        radius:1,
        startAngle:270,
        endAngle:330
        });
        drawEnko({
        center:D,
        radius:1,
        startAngle:30,
        endAngle:90
        });
        drawEnko({
        center:OO,
        radius:1,
        startAngle:-30,
        endAngle:30
        });
        drawEnko({
            center:[OO[0]- 0.15, OO[1]],
            radius:1,
            startAngle:-30,
            endAngle:30
            });
        return [G, H]
        };
function norGate(args){
    //右端点の仮想座標を args.start　として，NOR回路を書き，左端点上 I ,下 J の座標を[G , F] として返す
    [a, b] = args.start;
    var A = [a, b];
    var B = [a - 1, b];
    var rt3 = Math.sqrt(3);
    var C = [a - 1 - rt3 / 2, b + 1/2];
    var D = [a - 1 - rt3 / 2, b - 1/2];
    var E = [a - 2 - rt3 / 2, b + 1/2];
    var F = [a - 2 - rt3 / 2, b - 1/2];
    var OO =[a -2 - rt3, b];
    var alpha = Math.asin(0.25);
    var M = [OO[0] + Math.cos(alpha), b+0.25];
    var N = [OO[0] + Math.cos(alpha), b-0.25];
    var G = [M[0]-1, b +0.25];
    var H = [N[0]-1, b -0.25];
    var K = [a - 0.9, b];
    drawLine({between:[A, B]});
    drawLine({between:[C, E]});
    drawLine({between:[F, D]});
    drawLine({between:[M, G]});
    drawLine({between:[H, N]});
    drawEnko({
    center:C,
    radius:1,
    startAngle:270,
    endAngle:330
    });
    drawEnko({
    center:D,
    radius:1,
    startAngle:30,
    endAngle:90
    });
    drawEnko({
    center:OO,
    radius:1,
    startAngle:-30,
    endAngle:30
    });
    drawEnko({
        center:K,
        radius:0.1,
        paint:"white"
    });
    return [G, H]
};
function notGate(args){
    //右端点の仮想座標を args.start　として，NOT回路を書き，左端点Fの座標を[F] として返す
    [a, b] = args.start;
    var rt3 = Math.sqrt(3);
    var A = [a, b];
    var B = [a-1, b];
    var C = [a - 1- rt3 /2, b + 1/2];
    var D = [a - 1- rt3 /2, b - 1/2];
    var E = [a - 1- rt3 /2, b];
    var F = [a - 2- rt3 /2, b];
    var K = [a - 0.9, b];
    drawLine({between:[A, B , C, D, B]});
    drawLine({between:[E,F]});
    drawEnko({
    center:K,
    radius:0.1,
    paint:"white",
    });
    return F;
    }
function flowAction(args){//フローチャートの処理
    'use strict';
    //args.north
    //args.width
    //args.height
    //args.string
    //args.stringMove
    var north = args.north;  //起点，上辺の中央(仮想座標)
    var width = 3;         //幅の規定値 
    if (args.width){//幅の倍率があるとき
        width = 3 * args.width; //
    }
    var height = 1;      //高さの規定値
    if (args.height){//幅の倍率があるとき
        height = 1 * args.height; //
    }
    var south = [north[0], north[1]- height];//終点．下辺の中央
    var string_at = [north[0], north[1]- height/2];
    var ne = [string_at[0] + width / 2, string_at[1]+ height / 2];
    var se = [string_at[0] + width / 2, string_at[1]- height / 2];
    var nw = [string_at[0] - width / 2, string_at[1]+ height / 2];
    var sw = [string_at[0] - width / 2, string_at[1]- height / 2];
    var east = [string_at[0] + width /2, string_at[1]];
    var west = [string_at[0] - width / 2, string_at[1]];
    drawLine({
        between:[ne, se, sw, nw, ne],
        polygon:"white"
        }
    );
    var stringMove = [0,0];
    if(args.stringMove){
        stringMove = args.stringMove;
    } 
    if (args.string){
        putString({
            at : string_at,
            string : args.string,
            move : stringMove
        });
    }
    var obj = {
        north : north,
        south : south,
        east : east,
        west :west
    };
    return obj; //東西南北を連想配列として出力する
}
function flowStart(args){//フローチャートの処理
    'use strict';
    //args.north
    //args.width
    //args.height
    //args.string
    //args.stringMove
    var north = args.north;  //起点，上辺の中央(仮想座標)
    var width = 3;         //幅の規定値 
    if (args.width){//幅の倍率があるとき
        width = 3 * args.width; //
    }
    var height = 1;      //高さの規定値
    if (args.height){//幅の倍率があるとき
        height = 1 * args.height; //
    }
    var south = [north[0], north[1]- height];//終点．下辺の中央
    var string_at = [north[0], north[1]- height/2];
    var ne = [string_at[0] + width / 2, string_at[1]+ height / 2];
    var se = [string_at[0] + width / 2, string_at[1]- height / 2];
    var nw = [string_at[0] - width / 2, string_at[1]+ height / 2];
    var sw = [string_at[0] - width / 2, string_at[1]- height / 2];
    var east = [string_at[0] + width /2, string_at[1] ];
    var west = [string_at[0] - width / 2, string_at[1]];
    var far_east =[string_at[0] + width /2 + height / 2, string_at[1] ];
    var far_west =[string_at[0] - width /2 - height / 2, string_at[1] ];
    drawLine({
        between:[ne, nw]
        }
    );
    drawLine({
        between:[se, sw]
        }
    );
    drawEnko({
        center : east,
        radius : height / 2,
        startAngle : -90,
        endAngle :90
        }
    );
    drawEnko({
        center : west,
        radius : height / 2,
        startAngle : 90,
        endAngle :270
        }
    );
    var stringMove = [0,0];
    if(args.stringMove){
        stringMove = args.stringMove;
    } 
    if (args.string){
        putString({
            at : string_at,
            string : args.string,
            move : stringMove
        });
    }
    var obj = {
        north : north,
        south : south,
        east : far_east,
        west : far_west
    };
    return obj; //東西南北を連想配列として出力する
}
function flowIf(args){//フローチャートの処理
    'use strict';
    //args.north
    //args.width
    //args.height
    //args.string
    //args.stringMove
    var north = args.north;  //起点，上辺の中央(仮想座標)
    var width = 3;         //幅の規定値 
    if (args.width){//幅の倍率があるとき
        width = 3 * args.width; //
    }
    var height = 1.5;      //高さの規定値
    if (args.height){//幅の倍率があるとき
        height = 1.5 * args.height; //
    }
    var south = [north[0], north[1]- height];//終点．下辺の中央
    var string_at = [north[0], north[1]- height/2];
    var east = [string_at[0] + width /2, string_at[1] ];
    var west = [string_at[0] - width / 2, string_at[1]];
    drawLine({
        between:[north, east, south, west, north]
        }
    );
    var stringMove = [0,0];
    if(args.stringMove){
        stringMove = args.stringMove;
    } 
    if (args.string){
        putString({
            at : string_at,
            string : args.string,
            move : stringMove
        });
    }
    var obj = {
        north : north,
        south : south,
        east : east,
        west: west
    };
    return obj; //東西南北を連想配列として出力する
}
function flowLoopStart(args){//フローチャートの処理
    'use strict';
    //args.north
    //args.width
    //args.height
    //args.string
    //args.stringMove
    var north = args.north;  //起点，上辺の中央(仮想座標)
    var width = 3;         //幅の規定値 
    if (args.width){//幅の倍率があるとき
        width = 3 * args.width; //
    }
    var height = 1;      //高さの規定値
    if (args.height){//幅の倍率があるとき
        height = 1 * args.height; //
    }
    var south = [north[0], north[1]- 1.5 * height];//終点．下辺の中央
    var string_at = [north[0], north[1]- height];
    var east = [string_at[0] + width /2, string_at[1]];
    var west = [string_at[0] - width / 2, string_at[1]];
    var ne1 = [north[0] + width/2 - height/2, north[1]];
    var ne2 = [north[0] + width/2, north[1] - height /2 ];
    var nw1 = [north[0] - width/2 + height/2, north[1]];
    var nw2 = [north[0] - width/2, north[1] - height /2 ];
    var se = [south[0] + width/2, south[1]];
    var sw = [south[0] - width/2, south[1]];
    
    drawLine({
        between:[ne1, ne2, se, sw, nw2, nw1, ne1]
        }
    );
    var stringMove = [0,0];
    if(args.stringMove){
        stringMove = args.stringMove;
    } 
    if (args.string){
        putString({
            at : string_at,
            string : args.string,
            move : stringMove
        });
    }
    var obj = {
        north : north,
        south : south,
        east : east,
        west: west
    };
    return obj; //東西南北を連想配列として出力する
}
function flowLoopEnd(args){//フローチャートの処理
    'use strict';
    //args.north
    //args.width
    //args.height
    //args.string
    //args.stringMove
    var north = args.north;  //起点，上辺の中央(仮想座標)
    var width = 3;         //幅の規定値 
    if (args.width){//幅の倍率があるとき
        width = 3 * args.width; //
    }
    var height = 1;      //高さの規定値
    if (args.height){//幅の倍率があるとき
        height = 1 * args.height; //
    }
    var south = [north[0], north[1]- 1.5 * height];//終点．下辺の中央
    var string_at = [north[0], north[1]- height /2 ];
    var east = [string_at[0] + width /2, string_at[1]];
    var west = [string_at[0] - width / 2, string_at[1]];
    var ne = [north[0] + width/2, north[1]];
    var nw = [north[0] - width/2, north[1]];
    var se1 = [north[0] + width/2, north[1] - height];
    var se2 = [north[0] + width/2 - height /2, north[1] - 1.5 * height];
    var sw1 = [north[0] - width/2, north[1] - height];
    var sw2 = [north[0] - width/2 + height /2, north[1] - 1.5 * height];
    
    drawLine({
        between:[ne, nw, sw1, sw2, se2, se1, ne]
        }
    );
    var stringMove = [0,0];
    if(args.stringMove){
        stringMove = args.stringMove;
    } 
    if (args.string){
        putString({
            at : string_at,
            string : args.string,
            move : stringMove
        });
    }
    var obj = {
        north : north,
        south : south,
        east : east,
        west: west
    };
    return obj; //東西南北を連想配列として出力する
}
function flowFunc(args){//フローチャートの処理
    'use strict';
    //args.north
    //args.width
    //args.height
    //args.string
    //args.stringMove
    //args.intarval
    var north = args.north;  //起点，上辺の中央(仮想座標)
    var width = 3;         //幅の規定値 
    if (args.width){//幅の倍率があるとき
        width = 3 * args.width; //
    }
    var interval = 0.1;// ２重の縦線の間隔
    if (args.interval){
        interval = 0.1 * args.interval;
    }
    var height = 1;      //高さの規定値
    if (args.height){//幅の倍率があるとき
        height = 1 * args.height; //
    }
    var south = [north[0], north[1]- height];//終点．下辺の中央
    var string_at = [north[0], north[1]- height/2];
    var ne = [string_at[0] + width / 2, string_at[1]+ height / 2];
    var se = [string_at[0] + width / 2, string_at[1]- height / 2];
    var ne_int = [string_at[0] + width / 2 - interval, string_at[1]+ height / 2];
    var se_int = [string_at[0] + width / 2 - interval, string_at[1]- height / 2];
    var nw = [string_at[0] - width / 2, string_at[1]+ height / 2];
    var sw = [string_at[0] - width / 2, string_at[1]- height / 2];
    var nw_int = [string_at[0] - width / 2 + interval, string_at[1]+ height / 2];
    var sw_int = [string_at[0] - width / 2 + interval, string_at[1]- height / 2];
    var east = [string_at[0] + width /2, string_at[1]];
    var west = [string_at[0] - width / 2, string_at[1]];
    drawLine({
        between:[ne, se, sw, nw, ne]
        }
    );
    drawLine({
        between:[ne_int, se_int]
        }
    );
    drawLine({
        between:[nw_int, sw_int]
        }
    );
    var stringMove = [0,0];
    if(args.stringMove){
        stringMove = args.stringMove;
    } 
    if (args.string){
        putString({
            at : string_at,
            string : args.string,
            move : stringMove
        });
    }
    var obj = {
        north : north,
        south : south,
        east : east,
        west :  west
    };
    return obj; //東西南北を連想配列として出力する
}
function actStart(args){//アクテビティ図の開始
    //args.at 円の中心
    //args.radius 半径の倍率
    var radius = 0.2; //半径の規定値を3とする
    if (args.radius){
        radius = 0.2 * args.radius;
    }
    var center = args.at;
    drawEnko({
        center : center,
        radius : radius,
        paint : "black"
    })
    var north = [center[0], center[1] + radius];
    var south = [center[0], center[1] - radius];
    var east = [center[0] + radius, center[1]];
    var west = [center[0] - radius, center[1]];
    var obj = {
        north : north,
        south : south,
        east: east,
        west : west
        };
    return obj;
}
function actEnd(args){//アクテビティ図の終わり
    //args.at 円の中心
    //args.radius 黒丸の半径の倍率
    //args.interval 黒丸と円弧の間隔
    var inner_radius = 0.2; //黒丸の半径．半径の規定値を3とする
    if (args.radius){
        inner_radius = 0.2 * args.radius;
    }
    var interval = 0.05;
    if (args.interval){
        interval = 0.05 * args.interval
    }
    var radius = inner_radius + interval;//外側の円弧の半径
    var center = args.at;
    drawEnko({
        center : center,
        radius : inner_radius,
        paint : "black"
    });
    drawEnko({
        center : center,
        radius : radius
    });
    var north = [center[0], center[1] + radius];
    var south = [center[0], center[1] - radius];
    var east = [center[0] + radius, center[1]];
    var west = [center[0] - radius, center[1]];
    var obj = {
        north : north,
        south : south,
        east: east,
        west : west
        };
    return obj;
}
function actHeiretu(args){
    //args.start
    //args.width
    //args.height
    var width = 3; ///widthの規定値
    if (args.width){
        width = 3 * args.width;
    }
    var height = 0.1 // height の規定値
    if (args.height){
        height = 0.1 * args.height;
    }
    var ne = [args.start[0] + width / 2, args.start[1]];
    var se = [args.start[0] + width / 2, args.start[1]- height]; 
    var nw = [args.start[0] - width / 2, args.start[1]]; 
    var sw = [args.start[0] - width / 2, args.start[1]- height];
    drawLine({
        between:[ne, se, sw, nw],
        polygon:"black"
    });
    var p1 = [sw[0] + width / 6 * 1, sw[1]];
    var p2 = [sw[0] + width / 6 * 2, sw[1]];
    var p3 = [sw[0] + width / 6 * 3, sw[1]];
    var p4 = [sw[0] + width / 6 * 4, sw[1]];
    var p5 = [sw[0] + width / 6 * 5, sw[1]];
    var obj = {
        p1 : p1,
        p2 : p2,
        p3 : p3,
        p4 : p4,
        p5 : p5,
        end :p3
    };
    return obj; //６等分点を左からp1, p2, p3 = end, p4, p5,p6
}
function flowInput(args){//フローチャートの平行四辺形
    var width = 2;
    if (args.width){
        width = args.width;
    };
    var height = 1;
    if (args.height){
        height = args.height;
    }
    var north = args.north;
    var south =[north[0], north[1]- height]
    var A = [north[0] + width/2, north[1]];
    var B = [A[0]- height/2, south[1]];
    var C = [B[0] - width, south[1]];
    var D = [C[0] + height/2, A[1]];
    var P = [(A[0]+C[0])/2, (A[1]+C[1])/2];
    drawLine({
        between:[A,B,C,D,A]
    });
    var stringMove = [0,0];
    if(args.stringMove){
        stringMove = args.stringMove;
    }
    if(args.string){
        putString({
            at:P,
            string:args.string,
            move: stringMove
        });
    }
    var obj ={
        north : north,
        south : south
    }
    return obj;
}