//フォームの表示・非表示や文字列の置換をするスクリプト
function change1() {
    "use strict";
    var $temp = document.getElementById("mondai").value;
/* alignや align* やセンタリング環境を使った場合は<div></div>を付け加える */
    $temp = $temp.replace(/\\begin\{align\}/g, "<div>\\begin{align}");
    $temp = $temp.replace(/\\end\{align\}/g, "\\end{align}</div>");
    $temp = $temp.replace(/\\begin\{align\*\}/g, "<div>\\begin{align*}");
    $temp = $temp.replace(/\\end\{align\*\}/g, "\\end{align*}</div>");
    $temp = $temp.replace(/\\\\/g, "kaigyo");
    $temp = $temp.replace(/\\\[/g, "<div>\\[");
    $temp = $temp.replace(/\\\]/g, "\\]</div>");
    $temp = $temp.replace(/kaigyo/g, "\\\\");
    document.getElementById("review1").innerHTML = $temp;
   // MathJax.Hub.Queue(["Typeset", MathJax.Hub, "review1"]);
    MathJax.typeset();
}
function change2() {
    "use strict";
    var $temp = document.getElementById("kaitou").value;
/* alignや align* やセンタリング環境を使った場合は<div></div>を付け加える */
    $temp = $temp.replace(/\\begin\{align\}/g, "<div>\\begin{align}");
    $temp = $temp.replace(/\\end\{align\}/g, "\\end{align}</div>");
    $temp = $temp.replace(/\\begin\{align\*\}/g, "<div>\\begin{align*}");
    $temp = $temp.replace(/\\end\{align\*\}/g, "\\end{align*}</div>");
    $temp = $temp.replace(/\\\\/g, "kaigyo");
    $temp = $temp.replace(/\\\[/g, "<div>\\[");
    $temp = $temp.replace(/\\\]/g, "\\]</div>");
    $temp = $temp.replace(/kaigyo/g, "\\\\");
    document.getElementById("review2").innerHTML = $temp;
    //MathJax.Hub.Queue(["Typeset", MathJax.Hub, "review2"]);
    MathJax.typeset();
}
function remove1() {
    "use strict";
    var $temp = document.getElementById("area1").innerHTML;
    document.getElementById("area1").innerHTML = $temp;
}
function remove2() {
    "use strict";
    var $temp = document.getElementById("area2").innerHTML;
    document.getElementById("area2").innerHTML = $temp;
}
//描画フォームの表示モードを変更するスクリプト
function changeMode(a) {
    "use strict";
    if (document.getElementById("modeEmpty" + a).style.display === "block") {
        document.getElementById("modeEmpty" + a).style.display = "none";
        document.getElementById("range" + a).style.display = "block";
        document.getElementById(a + "_mycanvas").style.display = "block";
    } else if (document.getElementById("range" + a).style.display === "block") {
        document.getElementById("range" + a).style.display = "none";
        document.getElementById("string" + a).style.display = "block";
    } else if (document.getElementById("string" + a).style.display === "block") {
        document.getElementById("string" + a).style.display = "none";
        document.getElementById("line" + a).style.display = "block";
    } else if (document.getElementById("line" + a).style.display === "block") {
        document.getElementById("line" + a).style.display = "none";
        document.getElementById("dotline" + a).style.display = "block";
    } else if (document.getElementById("dotline" + a).style.display === "block") {
        document.getElementById("dotline" + a).style.display = "none";
        document.getElementById("circle" + a).style.display = "block";
    } else {
        document.getElementById("circle" + a).style.display = "none";
        document.getElementById("modeEmpty" + a).style.display = "block";
        document.getElementById(a + "_mycanvas").style.display = "none";
    }
}