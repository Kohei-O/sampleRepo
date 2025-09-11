    if (!window.indexedDB) {
        alert("お使いのブラウザは indexedDatabase に対応していません");
    }
    var ctx;//ctx はグローバル変数 canvasMaker.js 内で用いる 
    var baseFont = "20px serif";
    var baseColor = 'black';
    var baseLineWidth = 1;
    var canvasWidth = 330;
    var canvasHeight = 330;
    var formulaCanvasWidth = 250;
    var formulaCanvasHeight = 250;

    var promise1 = new Promise(func1);
    promise1.then(func2).then(func3).then(func4).catch(reason => {console.dir(reason)});
    
    function func1(resolve){
        var request = window.indexedDB.open("mathematics"); //データベースへの接続
        request.onupgradeneeded = function (event) {//データベースが無い場合の処理
        var db = event.target.result;
        var obj = db.createObjectStore("personal", {keyPath: "ID", autoIncrement: false});
        obj.createIndex("record", "record", { unique: false, multiEntry: true});//検索でIDBKeyRangeを使えるよう multiEntryをtrueにする
        obj.createIndex("bookmark", "bookmark", { unique: false});
        var obj2 = db.createObjectStore("query", {keyPath: "ID", autoIncrement: false});
        obj2.createIndex("tags", "tags", { unique: false });
        };
        request.onsuccess = function(event){//データベースがある場合の処理
            var db = event.target.result;
            resolve(db);
        };
        request.onerror = (event) => {throw event.target.error};
    }
	function func2(db) {
        return new Promise(
            function(resolve){
                var topicArray = [
                    '数と式',
                    '論理と集合',
                    'ニ次関数',
                    '三角比・三角関数',
                    '整数',
                    '幾何',
                    '場合の数・確率',
                    '整式',
                    '図形と式',
                    //'三角関数',
                    '指数・対数関数',
                    '整式の微分・積分',
                    '数列',
                    'ベクトル',
                    'データの分析・統計と確率分布',
                    'さまざまな曲線',
                    '複素数平面',
                    '極限',
                    'さまざまな関数',
                    '微分法',
                    '積分法',
                    'その他'
                    //'行列',
                    //'１次変換'
                ];
            var levelArray = ['難度A', '難度B', '難度C', '難度D'];
            var nav = document.createElement("nav");
            document.body.appendChild(nav);
            nav.className = "navbar navbar-dark bg-success";
            var button1 = document.createElement("button");
            nav.appendChild(button1);
            button1.className = "navbar-toggler border";
            button1.type = "button";
            button1.setAttribute("data-bs-toggle", "collapse");
            button1.setAttribute("data-bs-target", "#navContent");
            button1.setAttribute("area-expanded", "false");
            button1.setAttribute("area-label","Toggle navigation");
            var span1 = document.createElement("sapn");
            button1.appendChild(span1);
            span1.className = "navbar-toggler-icon";
            var anchor1 = document.createElement("a");
            nav.appendChild(anchor1);
            anchor1.href = "http://mathmedia.information.jp";
            anchor1.className = "navbar-brand";
            var span2 = document.createElement("span");
            anchor1.appendChild(span2);
            span2.style = "font-size: 17px;";
            span2.innerHTML = "スマホで できる! 問題集";
            var div1 = document.createElement("section");
            document.body.appendChild(div1);
            div1.className = "collapse bg-success text-white";
            div1.id = "navContent";
            var div2 = document.createElement("section");
            div1.appendChild(div2);
            div2.className = "accordion";
            var div3 = document.createElement("section");
            div2.appendChild(div3);
            div3.className = "accordion-item";
            var head1 = document.createElement("h2");
            div3.appendChild(head1);
            head1.className = "accordion-header";
            var button2 = document.createElement("button");
            head1.appendChild(button2);
            button2.className = "accordion-button collapsed text-white";
            button2.style = "text-align:left; padding-left:13px" 
            button2.type = "button";
            button2.setAttribute("data-bs-toggle", "collapse");
            button2.setAttribute("data-bs-target", "#category");
            button2.setAttribute("area-expanded", "false");
            var img1 = document.createElement("img");
            button2.appendChild(img1);
            img1.src = "svg/collection-fill.svg";
            img1.style = "width:20px;margin-right:5px";
            var span3 = document.createElement("span");
            button2.appendChild(span3);
            span3.style = "font-size: 20px;";
            span3.innerHTML = "分野から選ぶ";
            var div4 = document.createElement("section");
            div3.appendChild(div4);
            div4.className = "accordion-collapse collapse";
            div4.style = "background-color: mediumseagreen;";
            div4.id = "category"; 
            var categoryNum = topicArray.length; //分野数を獲得
            for (let k = 0; k < categoryNum; k++){
                var newDiv = document.createElement("section");
                div4.appendChild(newDiv);
                newDiv.className = "accordion-item";
                var newHead = document.createElement("h2");
                newDiv.appendChild(newHead);
                newHead.className = "accordion-header";
                var newButton= document.createElement("button");
                newHead.appendChild(newButton);
                newButton.className = "accordion-button collapsed text-white";
                newButton.type = "button";
                newButton.setAttribute("data-bs-toggle", "collapse");
                newButton.setAttribute("data-bs-target", "#category" + k);
                newButton.setAttribute("area-expanded", "false");
                newButton.innerHTML = topicArray[k];//eval("topic" + k);
                var newDiv2 = document.createElement("section");
                newDiv.appendChild(newDiv2);
                newDiv2.id = "category" + k;
                newDiv2.className = "accordion-collapse collapse";
                newDiv2.style = "background-color: springgreen;"
                for (let i = 0; i <= 3; i++){
                    var newDiv3 = document.createElement("section");
                    newDiv2.appendChild(newDiv3);
                    newDiv3.className = "accordion-body border text-center";
                    newDiv3.innerHTML = levelArray[i];
                    newDiv3.tagsArray =[topicArray[k], levelArray[i]];
                    newDiv3.onclick= setQuery;
                }
            }

            var div5 = document.createElement("section");
            div1.appendChild(div5);
            div5.className = "d-grid";
            var button3 = document.createElement("button");
            div5.appendChild(button3);
            button3.className = "btn btn-success";
            button3.style = "text-align:left; border-color: rgba(0, 0, 0, 0.125);"
            var img2 = document.createElement("img");
            button3.appendChild(img2);
            img2.src = "svg/tags.svg";
            img2.style = "width:20px;margin-right:5px";
            var span4 = document.createElement("span");
            button3.appendChild(span4);
            span4.style="font-size: 20px;"
            span4.innerHTML = "キーワードから選ぶ";
            
            var button4 = document.createElement("button");
            div5.appendChild(button4);
            button4.className = "btn btn-success";
            button4.style = "text-align:left; border-color: rgba(0, 0, 0, 0.125);";
            button4.tagsArray = ['bookmark'];
            button4.onclick= setQuery;
            var img3 = document.createElement("img");
            button4.appendChild(img3);
            img3.src = "svg/book.svg";
            img3.style.width ="20px";
            img3.style.marginRight = "5px";
            var span5 = document.createElement("span");
            button4.appendChild(span5);
            span5.style.fontSize = "20px";
            span5.innerHTML = "ブックマークした問題";

            var button5 = document.createElement("button");
            div5.appendChild(button5);
            button5.className = "btn btn-success";
            button5.style.textAlign ="left"
            button5.style.borderColor = "rgba(0, 0, 0, 0.125)";
            button5.tagsArray = ['history'];
            button5.onclick = setQuery;
            var img4 = document.createElement("img");
            button5.appendChild(img4);
            img4.src = "svg/calendar-week.svg";
            img4.style.width =" 20px";
            img4.marginRight = "5px";
            var span6 = document.createElement("span");
            button5.appendChild(span6);
            span6.style="font-size: 20px;"
            span6.innerHTML = "記録を見る";

            var button6 = document.createElement("button");
            div5.appendChild(button6);
            button6.className = "btn btn-success";
            button6.style.textAlign ="left";
            button6.style.borderColor = "rgba(0, 0, 0, 0.125)";
            var form = document.createElement("form");
            button6.appendChild(form);
            form.setAttribute("onsubmit" ,"searchID()");
            var img5 = document.createElement("img");
            form.appendChild(img5);
            img5.src = "svg/search.svg";
            img5.style.width = "20px";
            img5.style.marginRight = "5px";
            var span7 = document.createElement("span");
            form.appendChild(span7);
            span7.style.fontSize = "20px";
            span7.innerHTML = "問題IDで検索";
            var input = document.createElement("input");
            form.appendChild(input);
            input.type ="number";
            input.id = "numberID";
            input.style.width = "8em";
            input.style.marginLeft = "1em";
            input.style.border = "none";
            input.style.borderRadius = "5px";
            resolve(db);
        }
    )
}
function func3(db){//ブックマーク，履歴の情報がついているIDについては, その情報をデータベースから獲得
    return new Promise(
        function(resolve){
            var obj = db.transaction(["personal"], "readonly").objectStore("personal");
            var request = obj.openCursor();
            var personalData = [];
            request.onsuccess = function(event) {
                var cursor = event.target.result;
                if (cursor) {   
                    personalData.push(cursor.value);
                    cursor.continue();
                } else {
                db.close();//次の情報がなくなったらデータベベースを閉じる
                resolve(personalData);//personalDataをfunc4 へと渡す      
            }
        }
         request.onerror = (event) => {throw event.target.error};
    }
  )
}

function func4(personalData){//ページを表示していく    
    var mondai = [allMondai[0], allMondai[53], allMondai[162], allMondai[153], allMondai[248], allMondai[300],  allMondai[333]];//, allMondai[696]];//トップページに表示する問題
    var j_end = mondai.length;
    //===問題表示領域 mainBoxの作成============================================================
    var mainBox = document.createElement("section");
    mainBox.className = "container";
    document.body.appendChild(mainBox);//
    //==============各カードの作成========================    
    for (var j = 0; j < j_end; j++) {//レコード１つごとにセクション:問題?を新設しm:mainViewに付与していく
        var oneMondai = mondai[j];
        var card = document.createElement("section");
        card.className = "card mb-4";
        //=============ヘッダー1の作成=========================================
        var cardHeader1container = document.createElement("section");
        cardHeader1container.className = "container card-header";
        card.appendChild(cardHeader1container);
        var cardHeader1 = document.createElement("section");
        cardHeader1.style.height = "50px";
        cardHeader1.className ="row";
        cardHeader1container.appendChild(cardHeader1);
        //-----------ヘッダー1 の左---------------------------------------------
        var cardHeader1Left = document.createElement("section");
        cardHeader1.appendChild(cardHeader1Left);
        cardHeader1Left.className = "col-3 h-100";
        var mondaiNum = document.createElement("h3");
        cardHeader1Left.appendChild(mondaiNum);
        mondaiNum.className ="row mt-1 mb-1";
        mondaiNum.innerHTML =  "問題" + j;
        var mondaiID = document.createElement("h5");
        cardHeader1Left.appendChild(mondaiID);
        mondaiID.className ="row text-muted h6 my-0";
        mondaiID.innerHTML =  "ID:" + oneMondai.ID;
        //------------ヘッダー1の中央-----------------------------
        var cardHeader1center =document.createElement("section");
        cardHeader1.appendChild(cardHeader1center);
        cardHeader1center.ID = oneMondai.ID;
        cardHeader1center.onclick = writeRecord;
        cardHeader1center.className ="col-2 offset-4 h-100 container";
        cardHeader1center.style.width = "60px";
        var svgRow = document.createElement("section");
        cardHeader1center.appendChild(svgRow);
        svgRow.className = "row";
        var history_img = document.createElement("img");
        history_img.className = "img-fluid";
        history_img.id = "history_img" + oneMondai.ID;
        svgRow.appendChild(history_img);
        //履歴かブックマークがある場合はその情報を配列 にfoundData[0]として 格納．ない場合は []となる
        var foundData = personalData.filter(element => element.ID === oneMondai.ID);
        //それまでに，できたを押した
        if (foundData[0] === undefined){
            var solve_times = 0;
        } else {
            solve_times = foundData[0].record.length;
        }
        switch(solve_times){
            case 0:
                history_img.src = "svg/reception-0.svg";
                break;
            case 1:
                history_img.src = "svg/reception-1.svg";
                break;
            case 2:
                history_img.src = "svg/reception-2.svg";
                break;
            case 3:
                history_img.src = "svg/reception-3.svg";
                break;
            case 4:
                history_img.src = "svg/reception-4.svg";
                break;
            default:
                history_img.src = "svg/rainbow.svg";
            }  
        
        var text_badge_row = document.createElement("section");
        cardHeader1center.appendChild(text_badge_row);
        text_badge_row.className = "row justify-content-around";
        var text_span = document.createElement("span");
        text_badge_row.appendChild(text_span);
        text_span.className = "col-6 p-0";
        text_span.style.color = "orange";
        text_span.style.fontSize = "9px";
        text_span.innerHTML = "できた!";
        var badge_span = document.createElement("span");
        text_badge_row.appendChild(badge_span);
        badge_span.className = "col-5 badge rounded-pill text-center";
        badge_span.style.color = "white";
        badge_span.style.backgroundColor = "orange";
        badge_span.style.fontSize = "9px";
        badge_span.innerHTML = solve_times;
        badge_span.id = "badge_span" + oneMondai.ID;
        //--c-------------------------------------
        var cardHeader1Right = document.createElement("section");
        cardHeader1Right.className = "col-2 px-0 py-1 h-100";
        cardHeader1Right.style = "text-align:right";
        var img = document.createElement("img");
        img.ID = oneMondai.ID;
        if (foundData.length === 0 || foundData[0].bookmark === false) {
            img.src = "svg/bookmark.svg";
            img.onclick = bookmarkOn;
            img.className="img-fluid";
        } else {
            img.src = "svg/bookmark-check-fill.svg";
            img.onclick = bookmarkOff;
            img.className="img-fluid";
        }
        cardHeader1Right.appendChild(img);
        cardHeader1.appendChild(cardHeader1Right);
        //=============================================================-
        var cardHeader2 = document.createElement("section");
        cardHeader2.className = "card-header";
        var tabs = document.createElement("section");
        tabs.className = "nav nav-tabs card-header-tabs";
        var nav = document.createElement("ul");
        nav.className = "nav nav-tabs card-header-tabs";
        var anc1 = document.createElement("a");
        anc1.className = "nav-link active";
        anc1.setAttribute("data-bs-toggle", "tab");
        anc1.href = "#mondai" + j;
        anc1.setAttribute("area-selected", "true");
        anc1.innerHTML = "問題文";
        tabs.appendChild(anc1);
        var anc2 = document.createElement("a");
        anc2.className = "nav-link";
        anc2.setAttribute("data-bs-toggle", "tab");
        anc2.href = "#kaito" + j;
        anc2.setAttribute("area-selected", "false");
        anc2.innerHTML = "解答";
        tabs.appendChild(anc2);
        var anc3 = document.createElement("a");
        anc3.className = "nav-link";
        anc3.setAttribute("data-bs-toggle", "tab");
        anc3.href = "#rireki" + j;
        anc3.setAttribute("area-selected", "false");
        anc3.innerHTML = "記録";
        tabs.appendChild(anc3);
        //===========ノートタブの作成
        var anc4 = document.createElement("a");
        anc4.className = "nav-link";
        anc4.setAttribute("data-bs-toggle", "tab");
        anc4.href = "#note" + j;
        anc4.setAttribute("area-selected", "false");
        anc4.innerHTML = "ノート";
        tabs.appendChild(anc4);
        //==============ここまで===========
        cardHeader2.appendChild(tabs);
        card.appendChild(cardHeader2);
        //====================カードボディの作成===================================
        var s1 = document.createElement("section");
        s1.className = "card-body tab-content";
        var tab1 = document.createElement("section");
        tab1.className = "tab-pane fade show active";
        tab1.id = "mondai" + j;
        tab1.innerHTML = "<p>" + lineBreakAdjust(oneMondai.problem) + "  </p>";
        if (oneMondai.canvasScript1){
            var canvasNumber = oneMondai.canvasScript1.length;
            if(canvasNumber >= 1){//canvas要素の個数が１つ以上のときに行う
                var q;
                for (q = 0; q <= canvasNumber - 1; q++){
                    var myCanvas = document.createElement("canvas");
                    tab1.appendChild(myCanvas);
                    myCanvas.width = canvasWidth;
                    myCanvas.height = canvasHeight;
                    ctx = myCanvas.getContext("2d");
                    ctx.font = baseFont;
                    ctx.fillStyle = baseColor;
                    eval(oneMondai.canvasScript1[q]);
                    baseFont = "20px serif";
                    baseColor = 'black';
                    baseLineWidth = 1; 
                }
            }
        }
        s1.appendChild(tab1);
        card.appendChild(s1);
        var tab2 = document.createElement("section");
        tab2.className = "tab-pane fade";
        tab2.id = "kaito" + j;
        tab2.innerHTML = lineBreakAdjust(oneMondai.solution);
        if(mondai[j].canvasScript2){
            var canvasNumber2 = oneMondai.canvasScript2.length;
            if(canvasNumber2 >= 1){//canvas要素の個数が１つ以上のときに行う
                    var q;
                    for (q = 0; q <= canvasNumber2 - 1; q++){
                        var myCanvas = document.createElement("canvas");
                        tab2.appendChild(myCanvas);
                        myCanvas.width = canvasWidth;
                        myCanvas.height = canvasHeight;
                        ctx = myCanvas.getContext("2d");
                        ctx.font = baseFont;
                        ctx.fillStyle = baseColor;
                        eval(oneMondai.canvasScript2[q]);
                        baseFont = "20px serif";
                        baseColor = 'black';
                        baseLineWidth = 1; 
                    }
                }
            }
        s1.appendChild(tab2);
        //-----------履歴欄の作成-----------
        var tab3 = document.createElement("section");
        tab3.className = "tab-pane fade";
        tab3.id = "rireki" + j;   
　      var his_list = document.createElement("ul");
        tab3.appendChild(his_list);
        his_list.id = "history" + oneMondai.ID;
        if (foundData.length > 0){//空の配列ではないとき．一度でもブックマークまたは記録したことのある問題に対し存在する
            var record = foundData[0].record;
            var i_end = record.length;//履歴の個数の獲得
            if (i_end > 0){  
                for (var i = 0; i < i_end; i++) {
                    var li = document.createElement("li");
                    his_list.appendChild(li);
                    var day = new Date(record[i]);//タイムスタンプから Date オブジェクトを作成
                    var date = day.toLocaleString();//ローカルタイムに直す
                    var text = document.createTextNode(date);
                    li.appendChild(text);
                }
            var delete_button = document.createElement("section");
            tab3.appendChild(delete_button);
            delete_button.className = "btn btn-danger";
            delete_button.innerHTML  = "直近の履歴を消去";
            delete_button.ID = oneMondai.ID;
            delete_button.onclick = deleteRecord;
            }
        }
        s1.appendChild(tab3);
        //--------ノート欄の作成------------
        //----ボタングループの作成
        var tab4 = document.createElement("section");
        s1.appendChild(tab4);
        tab4.className = "tab-pane fade";
        tab4.id = "note" + j;
        tab4.style.overflow = "scroll";
        tab4.style.height = "500px";
        var all_button = document.createElement("section");
        tab4.appendChild(all_button);
        all_button.className = "row justify-content-center g-0"
        var button_group = document.createElement("section");
        all_button.appendChild(button_group);
        button_group.className = "btn-group col-8";
        var label_class = ["btn btn-dark", "btn btn-danger", "btn btn-primary", "btn btn-light"];
        var color_array = ["black", "red", "blue", "white"];
        for (let g = 0; g <= 3; g++){
            var button_input = document.createElement("input");
            button_group.appendChild(button_input);
            button_input.type = "radio";
            button_input.className = "btn-check";
            button_input.name = "btnradio";
            button_input.id = "btnradio" + g;
            if (g === 0) {
                button_input.checked = "checked";
            }
            button_input.onclick = "changeLineColor('" + color_array[0] + "')";
            var button_label = document.createElement("label");
            button_group.appendChild(button_label);
            button_label.className = label_class[g];
            button_label.for = "btnradio" + g;
            var label_image = document.createElement("img");
            button_label.appendChild(label_image);
            label_image.src = "http://mathmedia.information.jp/svg/pencil-fill.svg";
            if (g === 3){
                label_image.src = "http://mathmedia.information.jp/svg/eraser-fill.svg";  
            }
            label_image.alt = "鉛筆";
        }
        var trash_button = document.createElement("button");
        all_button.appendChild(trash_button);
        trash_button.type = "button";
        trash_button.className = "btn btn-secondary col-2";
        trash_button.onclick = "trashCanvas()";
        var trash_img = document.createElement("img");
        trash_button.appendChild(trash_img);
        trash_img.src = "http://mathmedia.information.jp/svg/trash3-fill.svg";
        trash_img.alt = "ゴミ箱";
        //----キャンバスの作成----------
        var note_canvas = document.createElement("canvas");
        tab4.appendChild(note_canvas);
        //console.dir(mainBox.clientWidth);
        //ar card_body_padding = 16;
        //console.log("padding" + card_body_padding);
        //console.log("s1.clientWidth:" + s1.clientWidth);
        var container_padding = 16;
        var card_border = 1;
        var card_body_padding = 12;
        //この時点て取得できるのは card-body の width でなく，container の widthだけ．
        //それを基準に canvas の幅を設定
        //HTML生成の詳細を知る必要がある
        note_canvas.width = mainBox.clientWidth - 2 *container_padding -2 * card_border 
        -2* card_body_padding;
        note_canvas.height = 700;
        note_canvas.style.backgroundColor = "yellow";

        //==========フッターの作成==============
        var tagsNum = oneMondai.tags.length;//前の仕様 
        var cardFooter = document.createElement("section");
        cardFooter.className = "card-footer";
            for (var n = 0; n < tagsNum; n++) {//各タグについて行う
                //var formulaArray = formula.filter(element => element.topic === oneMondai.tags[n]);
                var formulaArray =[];
                if (formulaArray.length === 0){//公式集にないタグ，分野名，フリーワードなどのとき
                    var tagSpan = document.createElement("span");
                    tagSpan.className = "m-1";
                    cardFooter.appendChild(tagSpan);
                    tagSpan.innerHTML = "#" + oneMondai.tags[n];
                } else {
                    var tagAnchor = document.createElement("a");
                    cardFooter.appendChild(tagAnchor);
                    tagAnchor.setAttribute("data-bs-toggle", "modal");
                    let modal_id = "modal_"+ j + "_"+ n;
                    tagAnchor.setAttribute("data-bs-target", "#" + modal_id);
                    tagAnchor.href = "javascript:void(0)";
                    tagAnchor.style.marginRight = "10px";
                    tagAnchor.innerHTML = "#" + oneMondai.tags[n];
                     //=========モーダルダイアログの作成
                    let modal = document.createElement("section");
                    modal.className = "modal fade";
                    modal.tabindex = "-1";
                        modal.id = modal_id;
                        let modal_dialog = document.createElement("section");
                        modal_dialog.className = "modal-dialog";
                        //--------モーダルヘッダー-----------------
                        let modal_content = document.createElement("section");
                        modal_content.className = "modal-content";
                        let modal_header = document.createElement("section");
                        modal_header.className = "modal-header";
                        let title = document.createElement("h4");
                        title.className = "modal-title";
                        title.innerHTML = oneMondai.tags[n];
                        modal_header.appendChild(title);
                        modal_content.appendChild(modal_header);
                        //-------モーダルボディ---------
                        let modal_body = document.createElement("section");
                        modal_body.className = "modal-body";
                        modal_body.innerHTML = formulaArray[0].text;
                        if (formulaArray[0].canvasScript) {//canvasScript が undefined でない場合に行う
                            var  myCanvas = document.createElement("canvas");
                            modal_body.appendChild(myCanvas);
                            myCanvas.width = canvasWidth;
                            myCanvas.height = canvasHeight;
                            ctx = myCanvas.getContext("2d");
                            ctx.font = baseFont;
                            ctx.fillStyle = baseColor;
                            eval(formulaArray[0].canvasScript);
                            baseFont = "20px serif";
                            baseColor = 'black';
                            baseLineWidth = 1; 
                       }
                        modal_content.appendChild(modal_body);
                        //---------モーダルフッター------------
                        let modal_footer =document.createElement("section");
                        modal_footer.className = "modal-footer";
                        let key_button = document.createElement("button");
                        key_button.type = "button";
                        key_button.className = "btn btn-primary rounded-pill";
                        key_button.innerHTML = "「" + formulaArray[0].word + "」で検索";
                        key_button.topic = formulaArray[0].topic;
                        key_button.onclick = setQuery;
                        modal_footer.appendChild(key_button);
                        let close_button = document.createElement("button");
                        close_button.className = "btn btn-secondary";
                        close_button.setAttribute("data-bs-dismiss", "modal");
                        close_button.innerHTML ="閉じる";
                        modal_footer.appendChild(close_button);
                        modal_content.appendChild(modal_footer);
                        modal_dialog.appendChild(modal_content);
                        modal.appendChild(modal_dialog);
                    //====== modal は HTML直下に入れる ===============
                        mainBox.appendChild(modal);
                    }
            }
        card.appendChild(cardFooter);
        mainBox.appendChild(card);
    }
    MathJax.typesetPromise();
}
function writeRecord() {
	'use strict';
	var ID = this.ID;
	var request = window.indexedDB.open("mathematics"); //データベースへの接続
	request.onsuccess = function () {
		var objectStore = request.result.transaction(["personal"], "readwrite").objectStore("personal");
        var today = new Date();//Date オブジェクト today を作成する。引数がないので現在の時刻となる
		var inputData = today.getTime();// 時刻をタイムスタンプに直す
		var secondRequest = objectStore.get(ID);
		    secondRequest.onsuccess = function (event) {//要求したIDの結果が返った場合の処理
                if(secondRequest.result === undefined){//履歴やブックマークがない場合の処理
                    var data = {
                        ID:ID, 
                        bookmark:false,
                        record:[]
                    };
                    data.record.push(inputData);//キー:record(配列)の最後の要素として inputData を書き込むメソッド。data そのものが変化する
                } else {//すでに履歴やブックマークがある場合の処理
                    data = secondRequest.result;
                    data.record.push(inputData);//キー:record(配列)の最後の要素として inputData を書き込むメソッド。data そのものが変化する
                }
                objectStore.put(data);
                var his_list = document.getElementById("history" + ID);
                var li = document.createElement("li");
                his_list.appendChild(li);
                var date = today.toLocaleString();//ローカルタイムに直す
                var text = document.createTextNode(date);
                li.appendChild(text);
                var img = document.getElementById("history_img" + ID);
                switch(data.record.length){
                    case 0:
                        img.src = "svg/reception-0.svg";
                        break;
                    case 1:
                        img.src = "svg/reception-1.svg";
                        break;
                    case 2:
                        img.src = "svg/reception-2.svg";
                        break;
                    case 3:
                        img.src = "svg/reception-3.svg";
                        break;
                    case 4:
                        img.src = "svg/reception-4.svg";
                        break;
                    default:
                        img.src = "svg/rainbow.svg";
                }
                var badge = document.getElementById("badge_span" + ID);
                badge.innerHTML = data.record.length;
               
			}
        secondRequest.onerror = function(event){
        }    
    }
}
function deleteRecord() {
	'use strict';
    var ID = this.ID;
    var bool = window.confirm("直近の履歴を消去します");
    if (bool) {
        var request = window.indexedDB.open("mathematics"); //データベースへの接続
        request.onsuccess = function () {
            var obj = request.result.transaction(["personal"], "readwrite").objectStore("personal");
            var secondRequest = obj.get(ID);
            secondRequest.onsuccess = function (event) {
                //それぞれの問題（配列）の履歴・ブックマークオブジェクトを獲得する undefined の場合もサクセスに含まれる
                var data = secondRequest.result;
                console.log(data);
                if (data === undefined){//履歴・ブックマークオブジェクトがなかった場合には何もしない

                } else {//履歴・ブックマークオブジェクトがある場合の処理
                    
                    if (data.record.length >= 1) {//すでに履歴がある場合の処理
                        data.record.pop();//キー:record(配列)の最後の要素を削除するメソッド。data そのものが変化する
                        var thirdRequest = obj.put(data);//データベースを更新後のデータに更新する
                            thirdRequest.onsuccess = function(event) {//履歴欄の更新
                                var his_list = document.getElementById("history" + ID);
                                his_list.removeChild(his_list.lastChild);
                                var img = document.getElementById("history_img" + ID);//できたマークの更新
                                switch(data.record.length){
                                    case 0:
                                        img.src = "svg/reception-0.svg";
                                        break;
                                    case 1:
                                        img.src = "svg/reception-1.svg";
                                        break;
                                    case 2:
                                        img.src = "svg/reception-2.svg";
                                        break;
                                    case 3:
                                        img.src = "svg/reception-3.svg";
                                        break;
                                    case 4:
                                        img.src = "svg/reception-4.svg";
                                        break;
                                    default:
                                        img.src = "svg/rainbow.svg";
                                }
                                var badge = document.getElementById("badge_span" + ID);//できた回数バッヂの更新
                                badge.innerHTML = data.record.length;
                            }   
                    }
                }
            }
        }
    }
}
function setQuery() {
    'use strict';
    var tagsArray = this.tagsArray;//[文字列タグを要素とする配列]
     var request = window.indexedDB.open("mathematics"); //データベースへの接続
     request.onsuccess = function () {
        var objectStore = request.result.transaction(["query"], "readwrite").objectStore("query");
        var data = {tags: tagsArray, ID: 0};//queryのレコードは ID:0 のみ。そこに要求したnewTopic, newDifficultyを上書きする。
        var secondRequest  = objectStore.put(data);
        secondRequest.onsuccess = function () {
          window.location.href = "http://mathmedia.information.jp/mathView.html";
        }
    }
  }
function searchID(){
    'use strict';
    var ID = parseInt(document.getElementById("numberID").value);
    var tagsArray = ['searchID', ID];//'問題 + ID' (文字列)
    var request = window.indexedDB.open("mathematics"); //データベースへの接続
    request.onsuccess = function () {
        var objectStore = request.result.transaction(["query"], "readwrite").objectStore("query");
        var data = {tags: tagsArray, ID: 0};//queryのレコードは ID:0 のみ。difficulty に 問題ID を格納する
        var secondRequest  = objectStore.put(data);
        secondRequest.onsuccess = function () {
            window.location.href = "http://mathmedia.information.jp/mathView.html";
        }
    }
}
function lineBreakAdjust(sample){
    sample = sample.replace(/\\begin{align}/g, "<div>\\begin{align}");
    sample = sample.replace(/\\begin{align\*}/g, "<div>\\begin{align\*}");
    sample = sample.replace(/\\end{align}/g, "\\end{align}</div>");
    sample = sample.replace(/\\end{align\*}/g, "\\end{align\*}</div>");
    sample = sample.replace(/\\\[/g, "<div>\\\[");
    sample = sample.replace(/\\\]/g, "\\\]</div>");
    return sample;
}
function bookmarkOn(){
    this.src = "svg/bookmark-check-fill.svg";
    this.onclick = bookmarkOff;
	var ID = this.ID;
    var request = window.indexedDB.open("mathematics"); //データベースへの接続
    request.onsuccess = function () {
        var obj = request.result.transaction(["personal"], "readwrite").objectStore("personal");
        var secondRequest = obj.get(ID);
		secondRequest.onsuccess = function (event) { 
            if(secondRequest.result === undefined){//それまでに履歴もブックマークもない場合の処理
                var data = {
                            ID:ID,
                            bookmark:true,
                            record:[]
                }              
            } else {//それまでに履歴かブックマークがある場合の処理
                data = secondRequest.result; 
                data.bookmark = true;
            }
            obj.put(data);//データベースを更新後のデータに更新する
        }
        secondRequest.onerror = function(event) {
                window.alert("bookmark error");
        }
    }
    request.onerror = function(event) {
        window.alert("bookmark error");
    }
}
function bookmarkOff(){
    this.src = "svg/bookmark.svg";
    this.onclick = bookmarkOn;
	var ID = this.ID; 
    var request = window.indexedDB.open("mathematics"); //データベースへの接続
    request.onsuccess = function () {
        var obj = request.result.transaction(["personal"], "readwrite").objectStore("personal");
        var secondRequest = obj.get(ID);
		secondRequest.onsuccess = function (event) {
            var data = secondRequest.result;//それぞれの問題（配列）を獲得する
            data.bookmark = false;
            var thirdRequest = obj.put(data);//データベースを更新後のデータに更新する
            thirdRequest.onsuccess = function(event) {}
            thirdRequest.onerror = function(event) {
                window.alert("bookmark error");
              }
        }
    }
}