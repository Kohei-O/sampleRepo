<!DOCTYPE html>
<html lang="ja">
<head>
<title>入力フォーム</title>    
<link rel="stylesheet" href="inputform-style.css"  >
<meta charset="UTF-8">  
<!--MathJax関連の設定-->
<!--数式中の自動改行はオフにしておく
<script type="text/x-mathjax-config">
MathJax.Hub.Config({
  CommonHTML: { linebreaks: { automatic: true } },
  "HTML-CSS": { linebreaks: { automatic: true } },
         SVG: { linebreaks: { automatic: true } }});
</script>-->
<script type="text/x-mathjax-config">
MathJax.Hub.Config({
tex2jax: {
inlineMath: [ ['$','$'], ['\\(','\\)'] ],
processEscapes: true
}
});
</script>
<script type="text/javascript" async src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-AMS_CHTML"></script>
</head>    
<body>
    <span id="macro">$$ \newcommand{\rt}[1]{\sqrt{#1}} \newcommand{\bun}[2]{\dfrac{#1}{#2}} \newcommand{\li}[2]{\lim\limits_{{#1} \to {#2}}} \newcommand{\bm}[1]{\boldsymbol{#1}} \newcommand{\sig}[2]{\displaystyle \sum_{#1}^{#2}} \newcommand{\sekib}[2]{\displaystyle\int _{#1}^{#2}} \newcommand{\bect}[1]{\overrightarrow{\mathrm{#1}}} \newcommand{\beca}{\vec{a}} \newcommand{\becb}{\vec{b}} \newcommand{\becc}{\vec{c}} \newcommand{\tatebec}[2]{\begin{pmatrix} {#1} \\ {#2} \end{pmatrix}}\newcommand{\tatebeca}[3]{\begin{pmatrix} {#1} \\ {#2}\\{#3} \\ \end{pmatrix}}\newcommand{\sita}{\theta} \newcommand{\mr}[1]{\mathrm{#1}} \newcommand{\mugen}{\infty} \newcommand{\tri}[1]{\triangle \mathrm{#1}} \newcommand{\kak}[1]{\angle \mathrm{#1}} \newcommand{\bm}[1]{\boldsymbol{#1}} \newcommand{\al}{\alpha} \newcommand{\kumi}[2]{{}_{#1}\mathrm{C}_{#2}}\newcommand{\jun}[2]{{}_{#1}\mathrm{P}_{#2}}$$</span>  
    <h1>ウェブ数学問題集の入力フォーム</h1>
    <form method="post" action="http://mathemedia.information.jp/receipt.php" enctype= "multipart/form-data">
        <ul>
            <li>文字の読み書きは文字コード UTF-8 で行ってください。    </li>
            <li>問題集はこちら &rarr;<a href="http://mathemedia.information.jp/index.html"> ウェブ数学問題集 (スマホ版) </a></li>
            <li>著作権の侵害をしないようオリジナルの問題を投稿してください。</li>
            <li> 本サイトでは MathJax により TeX のコンパイルを行います。
     使えるコマンドについては<a href="http://easy-copy-mathjax.xxxx7.com/"> Easy Copy MathJax </a> などをご覧ください。</li>
            <li>数式を表示するには \$数式\$ としてください。</li>
            <li>数式だけの行をセンタリングして表示するには次のようにしてください。$\[ 数式] \]$ 
            <li>数式中の不等号 (&lt;) の次には必ず半角スペースを入れてください。</li>
            <li>連続した半角スペースは１つとして認識されます。数式内での &sim; (チルダ) は通常通り使えます。</li>
            <li>改行は自動で行われます。意図的に改行するには改行コマンド &lt;br&gt; をお使いください。コマンドには半角スペースを入れないでください。
            </li>
            <li>複数行立てのときは以下をどうぞ。<br>
                $\begin{align}$<br>
                \\<br>
        <br>
                $\end{align}$
            <li>小問つきの問題, 解答を作るときは, 以下のコマンドをお使いください。</li>
            &lt;ol&gt;<br>    
            &lt;li&gt;ああ &lt;/li&gt;<br>
            &lt;li&gt;いい &lt;/li&gt;<br>
            &lt;/ol&gt;<br>  
            <li>見出しをつけるには次をお使いください。&lt;h4&gt; &lt;/h4&gt;</li>
        <li>添付できる画像は「.png」「.gif」「.jpg」形式に限ります。サイズは1枚当たり 100KB 以下としてください。</li>
            <li>マクロを使いたい場合は次のように冒頭に書き込んでください。</li>
                \$\$\newcommand{?}{?}\newcommand{?}{?} \$\$ 
            <li>登録した問題・解答に訂正がある場合は, 改訂版を登録したのち管理人に削除を申し出てください。
                <a href="mailto:admin@mathemedia.information.jp">admin@mathemedia.information.jp</a></li>
            <li>ブラウザで問題・解答のHTMLソースを表示すると,その中にTeXソースが含まれています。それを用いると訂正が容易です。ただし,不等号など一部の記号はMathJaxにより改変されているので必ず元に戻してお使いください。</li>
        </ul>
        <h2 >[ 問題文 ]</h2>
        <p class="comment">
            問題文に画像を添える場合はこちらへ &rarr; 
            <span id="area1"> <input type="file" name="upfile[]" size="30" /></span>
            <input type="button" value="リセット" onclick="remove1()"></p>
        <div class="twoclm1">
<textarea id="mondai" name="problem" maxlength=5000 onkeyup="change1()">
&lt;ol&gt;
&lt;li&gt; &lt;/li&gt;
&lt;li&gt; &lt;/li&gt;
&lt;li&gt; &lt;/li&gt;
&lt;/ol&gt;
</textarea>
            <div id="review1"></div>
        </div>
        <h3>javascript でグラフを描画する場合</h3>
        <input type="button" value = " フォーム 1 のモード切り替え" onclick="changeMode(1)">
        <input type="button" value = " フォーム 2 のモード切り替え" onclick="changeMode(2)">
        <input type="button" value = " フォーム 3 のモード切り替え" onclick="changeMode(3)">
        <input type="button" value = " フォーム 4 のモード切り替え" onclick="changeMode(4)">
        <?php
        makePage(1);
        makepage(2);
        makepage(3);
        makepage(4);
					function makePage($a){
                        echo "<h4>[図$a ]</h4>\n";
                        echo "<div class = 'twoclm3'>\n";
                        echo "<div>\n";
						echo "<div id ='modeEmpty${a}' style = 'display:block'>描画モード off</div>\n";
						echo "<div id ='range${a}' style = 'display:none'> \n";
						echo "<p>";
						echo "<input type = 'radio' name = 'scaleAxis_$a' value ='scaleAxis' checked ='true'>座標軸あり(目盛りあり)<br>\n";
						echo "<input type = 'radio' name = 'scaleAxis_$a' value ='scale'>座標軸あり(目盛りなし)<br>\n";
						echo "<input type = 'radio' name = 'scaleAxis_$a' value ='none'>座標軸なし<br>\n";
						echo "</p>\n";
						echo "xの下限 <input type='number' id='${a}_xmin' name = 'mondai${a}[]' step='0.1'><br>\n";
						echo "xの上限 <input type='number' id='${a}_xmax' name = 'mondai${a}[]' step='0.1'><br>\n";
						echo "yの下限 <input type='number' id='${a}_ymin' name = 'mondai${a}[]' step='0.1'><br>\n";
						echo "yの上限 <input type='number' id='${a}_ymax' name = 'mondai${a}[]' step='0.1'>\n";
						for ($b = 1; $b <=3 ;$b++){
                            echo "<h4>グラフ $b</h4>\n";
                            echo "グラフ $b の式 y=<input type= 'text' id = '${a}_y${b}' name = 'mondai${a}[]' step ='0.1'><br>\n"; 
                            echo " 定義域の下限 <input type = 'number' id = '${a}_xstart${b}' name = 'mondai${a}[]' step='0.1'><br>\n";
                            echo "定義域の上限 <input type = 'number' id = '${a}_xend${b}' name = 'mondai${a}[]' step = '0.1'>\n";
                        }
						echo "</div>\n";
                        echo "<div id = 'string${a}' style = 'display:none'>";
                        for ($b = 1; $b <= 6;$b++){
                            echo "文字列 $b <input type = 'text' id = '${b}_str$a' name = 'str${a}[]'><br>\n";
                            echo "x座標 <input type = 'number'  id = 'x${b}_str$a' name = 'str${a}[]' step = '0.1'>\n";
                            echo "y座標 <input type = 'number'  id = 'y${b}_str$a' name = 'str${a}[]' step = '0.1'><br>\n" ;   
                        }
                         echo "</div>";
                        echo "<div id = 'line$a' style = 'display:none'>";
                        echo "<h4>折れ線 A</h4>\n";
                        echo "以下の順に結ぶ<br>\n";
                            for ($b = 1; $b<=5 ;$b++){
                                echo "点$b x座標 <input type = 'number' name = 'line${a}A[]' step = '0.1'>\n";
                                echo "y座標 <input type = 'number' name = 'line${a}A[]' step = '0.1'><br>\n";  
                            }
                        echo "<h4>折れ線 B</h4>\n";
                        echo "以下の順に結ぶ<br>\n";
                            for ($b = 1; $b<=5 ;$b++){
                                echo "点$b x座標 <input type = 'number' name = 'line${a}B[]' step = '0.1'>\n";
                                echo "y座標 <input type = 'number' name = 'line${a}B[]' step = '0.1'><br>\n";  
                            }
                        echo "<h4>折れ線 C</h4>\n";
                        echo "以下の順に結ぶ<br>\n";
                            for ($b = 1; $b<=5 ;$b++){
                                echo "点$b x座標 <input type = 'number' name = 'line${a}C[]' step = '0.1'>\n";
                                echo "y座標 <input type = 'number' name = 'line${a}C[]' step = '0.1'><br>\n";  
                            }
                        echo "</div>\n";
                        echo "<div id = 'dotline$a' style = 'display:none'>\n";
                        echo "<h4>破線 A</h4>\n";
                        echo "以下の順に結ぶ<br>\n";
                            for ($b = 1; $b<=5 ;$b++){
                                echo "点$b x座標 <input type = 'number' name = 'dotline${a}A[]' step = '0.1'>\n";
                                echo "y座標 <input type = 'number' name = 'dotline${a}A[]' step = '0.1'><br>\n";  
                            }
                        echo "<h4>破線 B</h4>\n";
                        echo "以下の順に結ぶ<br>\n";
                            for ($b = 1; $b<=5 ;$b++){
                                echo "点$b x座標 <input type = 'number' name = 'dotline${a}B[]' step = '0.1'>\n";
                                echo "y座標 <input type = 'number' name = 'dotline${a}B[]' step = '0.1'><br>\n";  
                            }
                        echo "<h4>破線 C</h4>\n";
                        echo "以下の順に結ぶ<br>\n";
                            for ($b = 1; $b<=5 ;$b++){
                                echo "点$b x座標 <input type = 'number' name = 'dotline${a}C[]' step = '0.1'>\n";
                                echo "y座標 <input type = 'number' name = 'dotline${a}C[]' step = '0.1'><br>\n";  
                            }
                        echo "</div>\n";
                        echo "<div id = 'circle$a' style = 'display:none'>\n";
                        echo "<h5>円弧 A</h5>\n";
                        echo "<p>中心のx座標 <input type = 'number' name = 'm${a}_circleA[]' step = '0.1'></p>\n";
                        echo "<p>中心のy座標 <input type= 'number' name = 'm${a}_circleA[]' step = '0.1'></p>\n";
                        echo "<p>半径 <input type = 'number' name = 'm${a}_circleA[]' step = '0.1' min = '0.1'></p>\n";
                        echo "<p><input type = 'number' name='m${a}_circleA[]' step = '5' min = '0' max = '360'> 度の位置から</p>\n";
                        echo "<p><input type = 'number' name='m${a}_circleA[]' step = '5' min = '0' max = '360'> 度の位置まで</p>\n";
                        echo "<p><input type = 'radio' name= 'm${a}_clockA' value= 'true' checked>反時計回りに<input type = 'radio' name='m${a}_clockA' value = 'false'>時計回りに結ぶ </p>\n";
                        echo "<h5>円弧 B</h5>\n";
                        echo "<p>中心のx座標 <input type = 'number' name = 'm${a}_circleB[]' step = '0.1'></p>\n";
                        echo "<p>中心のy座標 <input type= 'number' name = 'm${a}_circleB[]' step = '0.1'></p>\n";
                        echo "<p>半径 <input type = 'number' name = 'm${a}_circleB[]' step = '0.1' min = '0.1'></p>\n";
                        echo "<p><input type = 'number' name='m${a}_circleB[]' step = '5' min = '0' max = '360'> 度の位置から</p>\n";
                        echo "<p><input type = 'number' name='m${a}_circleB[]' step = '5' min = '0' max = '360'> 度の位置まで</p>\n";
                        echo "<p><input type = 'radio' name= 'm${a}_clockB' value= 'true' checked>反時計回りに<input type = 'radio' name='m${a}_clockB' value = 'false'>時計回りに結ぶ </p>\n";
                        echo "<h5>円弧 C</h5>\n";
                        echo "<p>中心のx座標 <input type = 'number' name = 'm${a}_circleC[]' step = '0.1'></p>\n";
                        echo "<p>中心のy座標 <input type= 'number' name = 'm${a}_circleC[]' step = '0.1'></p>\n";
                        echo "<p>半径 <input type = 'number' name = 'm${a}_circleC[]' step = '0.1' min = '0.1'></p>\n";
                        echo "<p><input type = 'number' name='m${a}_circleC[]' step = '5' min = '0' max = '360'> 度の位置から</p>\n";
                        echo "<p><input type = 'number' name='m${a}_circleC[]' step = '5' min = '0' max = '360'> 度の位置まで</p>\n";
                        echo "<p><input type = 'radio' name= 'm${a}_clockC' value= 'true' checked>反時計回りに<input type = 'radio' name='m${a}_clockC' value = 'false'>時計回りに結ぶ </p>\n";
                        echo "※ x 軸、y 軸の１目盛あたりの長さが異なる場合に出力されている円は、<br>
                    実際には入力した値が x 方向の半径であるようなだ円です。\n";
                        echo "</div>\n";
                        echo "</div>\n";
                        echo "<div>\n";
                        echo "<canvas id = '${a}_mycanvas' width = '400' height = '400' style = 'display:none'></canvas>\n";
                        echo "</div>\n";
                        echo "</div>\n";
                    }
					?>
<h2>[ 解答 ]</h2>
<p class="comment">
解答に画像を添える場合はこちらへ &rarr;
<span id="area2"> <input type="file" name="upfile[]" size="30" /></span>
<input type="button" value="リセット" onclick="remove2()"></p>
<div class="twoclm2">
<textarea id="kaitou" name='solution' maxlength=10000 onkeyup="change2()">
<h4>1.</h4> 
<h4>2.</h4> 
<h4>3.</h4>
<h4>4.</h4>
</textarea>
<div id="review2"></div>
</div>
<h3>javascript でグラフを描画する場合</h3>
<input type="button" value = " フォーム 1 のモード切り替え" onclick="changeMode('k1')">
    <input type="button" value = " フォーム 2 のモード切り替え" onclick="changeMode('k2')">
    <input type="button" value = " フォーム 3 のモード切り替え" onclick="changeMode('k3')">
        <input type="button" value = " フォーム 4 のモード切り替え" onclick="changeMode('k4')">

      <?php
        makePageK(1);
        makepageK(2);
        makepageK(3);
        makepageK(4);
					function makePageK($a){
                        echo "<h4>[図$a ]</h4>\n";
                        echo "<div class = 'twoclm3'>\n";
                        echo "<div>\n";
						echo "<div id ='modeEmptyk$a' style = 'display:block'>描画モード off</div>\n";
						echo "<div id = 'rangek$a' style='display:none'>\n";
						echo "<p>";
						echo "<input type = 'radio' name = 'scaleAxis_k$a' value ='scaleAxis' checked>座標軸あり(目盛りあり)<br>\n";
						echo "<input type = 'radio' name = 'scaleAxis_k$a' value ='scale'>座標軸あり(目盛りなし)<br>\n";
						echo "<input type = 'radio' name = 'scaleAxis_k$a' value ='none'>座標軸なし<br>\n";
						echo "</p>\n";
						echo "xの下限 <input type='number' id='k${a}_xmin' name = 'kaitou${a}[]' step='0.1'><br>\n";
						echo "xの上限 <input type='number' id='k${a}_xmax' name = 'kaitou${a}[]' step='0.1'><br>\n";
						echo "yの下限 <input type='number' id='k${a}_ymin' name = 'kaitou${a}[]' step='0.1'><br>\n";
						echo "yの上限 <input type='number' id='k${a}_ymax' name = 'kaitou${a}[]' step='0.1'>\n";
						for ($b = 1; $b <=3 ;$b++){
                            echo "<h4>グラフ $b</h4>\n";
                            echo "グラフ $b の式 y=<input type= 'text' id = 'k${a}_y${b}' name = 'kaitou${a}[]' step ='0.1'><br>\n"; 
                            echo " 定義域の下限 <input type = 'number' id = 'k${a}_xstart${b}' name = 'kaitou${a}[]' step='0.1'><br>\n";
                            echo "定義域の上限 <input type = 'number' id = 'k${a}_xend${b}' name = 'kaitou${a}[]' step = '0.1'>\n";
                        }
						echo "</div>\n";
                        echo "<div id = 'stringk${a}' style = 'display:none'>";
                        for ($b = 1; $b <= 6;$b++){
                            echo "文字列 $b <input type = 'text' id = '${b}_strk$a' name = 'strk${a}[]'><br>\n";
                            echo "x座標 <input type = 'number'  id = 'x${b}_strk$a' name = 'strk${a}[]' step = '0.1'>\n";
                            echo "y座標 <input type = 'number'  id = 'y${b}_strk$a' name = 'strk${a}[]' step = '0.1'><br>\n" ;   
                        }
                         echo "</div>";
                        echo "<div id = 'linek$a' style = 'display:none'>";
                        echo "<h4>折れ線 A</h4>\n";
                        echo "以下の順に結ぶ<br>\n";
                            for ($b = 1; $b<=5 ;$b++){
                                echo "点$b x座標 <input type = 'number' name = 'linek${a}A[]' step = '0.1'>\n";
                                echo "y座標 <input type = 'number' name = 'linek${a}A[]' step = '0.1'><br>\n";  
                            }
                        echo "<h4>折れ線 B</h4>\n";
                        echo "以下の順に結ぶ<br>\n";
                            for ($b = 1; $b<=5 ;$b++){
                                echo "点$b x座標 <input type = 'number' name = 'linek${a}B[]' step = '0.1'>\n";
                                echo "y座標 <input type = 'number' name = 'linek${a}B[]' step = '0.1'><br>\n";  
                            }
                        echo "<h4>折れ線 C</h4>\n";
                        echo "以下の順に結ぶ<br>\n";
                            for ($b = 1; $b<=5 ;$b++){
                                echo "点$b x座標 <input type = 'number' name = 'linek${a}C[]' step = '0.1'>\n";
                                echo "y座標 <input type = 'number' name = 'linek${a}C[]' step = '0.1'><br>\n";  
                            }
                        echo "</div>\n";
                        echo "<div id = 'dotlinek$a' style = 'display:none'>\n";
                        echo "<h4>破線 A</h4>\n";
                        echo "以下の順に結ぶ<br>\n";
                            for ($b = 1; $b<=5 ;$b++){
                                echo "点$b x座標 <input type = 'number' name = 'dotlinek${a}A[]' step = '0.1'>\n";
                                echo "y座標 <input type = 'number' name = 'dotlinek${a}A[]' step = '0.1'><br>\n";  
                            }
                        echo "<h4>破線 B</h4>\n";
                        echo "以下の順に結ぶ<br>\n";
                            for ($b = 1; $b<=5 ;$b++){
                                echo "点$b x座標 <input type = 'number' name = 'dotlinek${a}B[]' step = '0.1'>\n";
                                echo "y座標 <input type = 'number' name = 'dotlinek${a}B[]' step = '0.1'><br>\n";  
                            }
                        echo "<h4>破線 C</h4>\n";
                        echo "以下の順に結ぶ<br>\n";
                            for ($b = 1; $b<=5 ;$b++){
                                echo "点$b x座標 <input type = 'number' name = 'dotlinek${a}C[]' step = '0.1'>\n";
                                echo "y座標 <input type = 'number' name = 'dotlinek${a}C[]' step = '0.1'><br>\n";  
                            }
                        echo "</div>\n";
                        echo "<div id = 'circlek$a' style = 'display:none'>\n";
                        echo "<h5>円弧 A</h5>\n";
                        echo "<p>中心のx座標 <input type = 'number' name = 'k${a}_circleA[]' step = '0.1'></p>\n";
                        echo "<p>中心のy座標 <input type= 'number' name = 'k${a}_circleA[]' step = '0.1'></p>\n";
                        echo "<p>半径 <input type = 'number' name = 'k${a}_circleA[]' step = '0.1' min = '0.1'></p>\n";
                        echo "<p><input type = 'number' name='k${a}_circleA[]' step = '5' min = '0' max = '360'> 度の位置から</p>\n";
                        echo "<p><input type = 'number' name='k${a}_circleA[]' step = '5' min = '0' max = '360'> 度の位置まで</p>\n";
                        echo "<p><input type = 'radio' name= 'k${a}_clockA' value= 'true' checked>反時計回りに<input type = 'radio' name='k${a}_clockA' value = 'false'>時計回りに結ぶ </p>\n";
                        echo "<h5>円弧 B</h5>\n";
                        echo "<p>中心のx座標 <input type = 'number' name = 'k${a}_circleB[]' step = '0.1'></p>\n";
                        echo "<p>中心のy座標 <input type= 'number' name = 'k${a}_circleB[]' step = '0.1'></p>\n";
                        echo "<p>半径 <input type = 'number' name = 'k${a}_circleB[]' step = '0.1' min = '0.1'></p>\n";
                        echo "<p><input type = 'number' name='k${a}_circleB[]' step = '5' min = '0' max = '360'> 度の位置から</p>\n";
                        echo "<p><input type = 'number' name='k${a}_circleB[]' step = '5' min = '0' max = '360'> 度の位置まで</p>\n";
                        echo "<p><input type = 'radio' name= 'k${a}_clockB' value= 'true' checked>反時計回りに<input type = 'radio' name='k${a}_clockB' value = 'false'>時計回りに結ぶ </p>\n";
                        echo "<h5>円弧 C</h5>\n";
                        echo "<p>中心のx座標 <input type = 'number' name = 'k${a}_circleC[]' step = '0.1'></p>\n";
                        echo "<p>中心のy座標 <input type= 'number' name = 'k${a}_circleC[]' step = '0.1'></p>\n";
                        echo "<p>半径 <input type = 'number' name = 'k${a}_circleC[]' step = '0.1' min = '0.1'></p>\n";
                        echo "<p><input type = 'number' name='k${a}_circleC[]' step = '5' min = '0' max = '360'> 度の位置から</p>\n";
                        echo "<p><input type = 'number' name='k${a}_circleC[]' step = '5' min = '0' max = '360'> 度の位置まで</p>\n";
                        echo "<p><input type = 'radio' name= 'k${a}_clockC' value= 'true' checked>反時計回りに<input type = 'radio' name='k${a}_clockC' value = 'false'>時計回りに結ぶ </p>\n";
                        echo "※ x 軸、y 軸の１目盛あたりの長さが異なる場合に出力されている円は、<br>
                    実際には入力した値が x 方向の半径であるようなだ円です。\n";
                        echo "</div>\n";
                        echo "</div>\n";
                        echo "<div>\n";
                        echo "<canvas id = 'k${a}_mycanvas' width = '400' height = '400' style = 'display:none'></canvas>\n";
                        echo "</div>\n";
                        echo "</div>\n";
                    }
					?>
<h2>[ 項目 ]</h2>
<p class="comment">
        (１つ以上を選択)
</p>
<h3>数学I</h3>
<h4>1章. 数と式</h4>
<p class="check">
<input type="checkbox" name=":I10" value="I10">式の計算          
<input type="checkbox" name=":I11" value="I11">実数
<input type="checkbox" name=":I12" value="I12">１次不等式
</p>
       
<h4>2章. 集合と論証</h4>
<p class="check">
<input type="checkbox" name=":I13" value="I13">集合 
<input type="checkbox" name=":I14" value="I14">命題と論証
</p>
<h4 >3章. ２次関数</h4>
<p class="check"> 
<input type="checkbox" name=":I15" value="I15">関数とグラフ 
<input type="checkbox" name=":I16" value="I16">２次方程式・２次不等式
</p>
<h4>4章. 図形と計量</h4>
<p class="check">
<input type="checkbox" name=":I17" value="I17">鋭角の三角比 
<input type="checkbox" name=":I18" value="I18">三角比の拡張
<input type="checkbox" name=":I19" value="I19">三角形への応用
</p>
<h4>5章. データの分析</h4>
<p class="check">
<input type="checkbox" name=":I20" value="I20">データの整理と分析 
<input type="checkbox" name=":I21" value="I21">データの相関
</p>
<h3>数学Ⅱ</h3>
<h4>1章. 方程式・式と証明</h4>
<p class="check">
<input type="checkbox" name=":J10" value="J10">整式の乗法・除法と分数式
<input type="checkbox" name=":J11" value="J11">２次方程式
<input type="checkbox" name=":J12" value="J12">高次方程式
<input type="checkbox" name=":J13" value="J13">式と証明
</p>
<h4>2章. 図形と方程式</h4>
<p class="check">
<input type="checkbox" name=":J14" value="J14">点と直線
<input type="checkbox" name=":J15" value="J15">円
<input type="checkbox" name=":J16" value="J16">軌跡と領域
</p>
<h4 >3章. 三角関数</h4>
<p class="check">
<input type="checkbox" name=":J17" value="J17">三角関数
<input type="checkbox" name=":J18" value="J18">加法定理
</p>
<h4>4章. 指数関数・対数関数</h4>
<p class="check">
<input type="checkbox" name=":J19" value="J19">指数関数
<input type="checkbox" name=":J20" value="J20">対数関数
</p>
<h4>5章. 微分と積分</h4>
<p class="check">
<input type="checkbox" name=":J21" value="J21">微分係数と導関数
<input type="checkbox" name=":J22" value="J22">導関数の応用
<input type="checkbox" name=":J23" value="J23">積分
</p> 
<h3>数学Ⅲ</h3>
<h4 align ="left">1章. 平面上の曲線</h4>
<p class="check">
<input type="checkbox" name=":K10" value="K10">２次曲線
<input type="checkbox" name=":K11" value="K11">媒介変数と極表示
</p>
<h4>2章. 複素数平面 </h4>
<p class="check">
<input type="checkbox" name=":K12" value="K12">複素数平面
<input type="checkbox" name=":K13" value="K13">図形への応用
</p>
<h4>3章. 関数と極限</h4>
<p class="check">
<input type="checkbox" name=":K14" value="K14">関数
<input type="checkbox" name=":K15" value="K15">数列の極限
<input type="checkbox" name=":K16" value="K16">関数の極限
</p>
<h4>4章. 微分</h4>
<p class="check">
<input type="checkbox" name=":K17" value="K17">微分法  
<input type="checkbox" name=":K18" value="K18">いろいろな関数の導関数            
</p>
<h4>5章. 微分の応用</h4>
<p class="check">
<input type="checkbox" name=":K19" value="K19">接線, 関数の増減
<input type="checkbox" name=":K20" value="K20">微分のいろいろな応用           
</p>
<h4>6章. 積分とその応用</h4>
<p class="check">
<input type="checkbox" name=":K21" value="K21">不定積分
<input type="checkbox" name=":K22" value="K22">定積分
<input type="checkbox" name=":K23" value="K23">面積・体積・長さ        
</p>
<h3>数学A</h3>
<h4>1章. 場合の数と確率</h4>
<p class="check">
<input type="checkbox" name=":A10" value="A10">集合
<input type="checkbox" name=":A11" value="A11">場合の数
<input type="checkbox" name=":A12" value="A12">確率とその基本性質
<input type="checkbox" name=":A13" value="A13">いろいろな確率
</p>
<h4>2章. 整数の性質</h4>
<p class="check">
<input type="checkbox" name=":A14" value="A14">約数と倍数
<input type="checkbox" name=":A15" value="A15">ユークリッドの互除法と不定方程式
<input type="checkbox" name=":A16" value="A16">整数の性質の利用        
</p>
<h4>3章. 図形の性質</h4>
<p class="check">
<input type="checkbox" name=":A17" value="A17">三角形の性質
<input type="checkbox" name=":A18" value="A18">円の性質
<input type="checkbox" name=":A19" value="A19">作図
<input type="checkbox" name=":A20" value="A20">空間図形        
</p>
<h3>数学B</h3>
<h4>1章. 数列 </h4>
<p class="check">
<input type="checkbox" name=":B10" value="B10">数列
<input type="checkbox" name=":B11" value="B11">漸化式と数学的帰納法       
</p>
<h4>2章. ベクトル </h4>
<p class="check">
<input type="checkbox" name=":B12" value="B12">平面上のベクトル
<input type="checkbox" name=":B13" value="B13">ベクトルの応用
<input type="checkbox" name=":B14" value="B14">空間におけるベクトル        
</p>
<h4>3章. 確率分布と統計的な推測 </h4>
<p class="check">
<input type="checkbox" name=":B15" value="B15">確率分布
<input type="checkbox" name=":B16" value="B16">正規分布
<input type="checkbox" name=":B17" value="B17">統計的な推測        
</p>
<h2 >[ 難易度 ]</h2>
<p class="comment">(1つを選択)</p>
<p id='diff'>
<input type="radio" name="difficulty" value="A"> A (教科書の例題レベル)   
<input type="radio" name="difficulty" value="B"> B (入試問題の基本レベル)<br>
<input type="radio" name="difficulty" value="C"> C (入試問題の標準レベル)
<input type="radio" name="difficulty" value="D"> D (入試問題の難問レベル)
</p>
<h2>[ キーワード ]</h2>
<p class="comment">(任意。数字については半角数字を利用。複数を入力するときは「,( カンマ) 」で分けてください)   </p>  
<p class="kinyu">
<input type="text "id="keyword" name='keyword' size="30"  maxlengt="60">  </p>　
<h2>[ 作題者 ]</h2>
<p class="comment">(任意。問題集には表示されません)  </p> 
<p class="kinyu">
<input type="text " id="author" name='author' 
                    size="20" maxlength = "20">  　</p>
<h2>[ パスワード ]</h2>
<p class="comment">
           上記の内容をよく確認した後に入力してください。
</p>
<p class="kinyu">
<input type="password" id="password" name='password' maxlengt="30">   </p>       
<p id="sub">
<input type="submit" value="登録する">
</p>
</form>
<script src="inputform_1.js"></script>
<script src="inputform_2.js"></script>
</body>
</html>