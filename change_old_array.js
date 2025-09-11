//2021年12月04日以前に作ったオブジェクトに tagsプロパティを追加するパッチ関数
change_old_array();
//console.dir(allMondai);
function change_old_array (){
    var len = allMondai.length;
    for (var i = 0; i < len; i++){
        var mondai = allMondai[i];
        if (mondai.tags === undefined){
            mondai.tags = [];
        }
        switch(mondai.difficulty){
        case 0:
        mondai.tags.push('難度A');
        break;
        case 1:
        mondai.tags.push('難度B');
        break;
        case 2:
            mondai.tags.push('難度C');
            break;
        case 3:
            mondai.tags.push('難度D');
    }
        switch(mondai.topic){
            case 0:
                mondai.tags.push('数と式');
                break;
            
            case 1:
                mondai.tags.push('集合と論理');
                break;
            
            case 2:
                mondai.tags.push('ニ次関数');
                break;
            
            case 3:
                mondai.tags.push('三角比・三角関数');
                break;
            
            case 4:
            mondai.tags.push('データの分析・統計と確率分布');
            break;
            
            case 5:
            mondai.tags.push('整式');
            mondai.tags.push('その他');
            break;

            case 6:
            mondai.tags.push('図形と式');
            break;
            
            case 7:
            mondai.tags.push('三角比・三角関数');
            break;
            
            case 8:
            mondai.tags.push('指数・対数関数');
            break;
            
            case 9:
            mondai.tags.push('整式の微分・積分');
            break;
            
            case 10:
            mondai.tags.push('整式の微分・積分');
            break;
            
            case 11:
            mondai.tags.push('さまざまな曲線');
            break;

            case 12:
            mondai.tags.push('複素数平面');
            break;
            
            case 13:
            mondai.tags.push('極限');
            mondai.tags.push('さまざまな関数');
            break;
            
            case 14:
            mondai.tags.push('微分法');
            break;

            case 15:
            mondai.tags.push('積分法');
            
            case 16:
            mondai.tags.push('場合の数・確率');
            break;
            
            case 17:
            mondai.tags.push('整数');
            break;
            
            case 18:
            mondai.tags.push('幾何');
            break;
            
            case 19:
            mondai.tags.push('数列');
            break;

            case 20:
            mondai.tags.push('ベクトル');
            break;

            case 21:
            mondai.tags.push('データの分析・統計と確率分布');
            break;
        }
    }
}
  