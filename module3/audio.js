var ad=document.getElementById("playing");
//上記のようにDOMでオーディオオブジェクトを獲得できた。下のようにコンストラクタを使うと controls と対応が効かない。
//var ad=new Audio("/audio/tomo.mp3");
//alert(ad.canPlayType("audio/mp3"));
//preload をauto にしないと、再生前には duration を獲得できない。当然か。
//alert(ad.duration);
if(ad.play){
var temp=document.getElementById("source").textContent;
document.getElementById("product").innerHTML=temp;
timer=setInterval("count()",5000);}

function count(){
var ad=document.getElementById("playing");
var temp=document.getElementById("source").textContent;
//その時点の経過時間を四捨五入して time (整数)とする
var time=Math.round(ad.currentTime*10);
//直前の改行も１文字のようだ
var temp_left=temp.substring(0,time);
var temp_right=temp.substring(time,temp.length);
document.getElementById("product").innerHTML="<span class='colored'>"+temp_left+"</span>"+temp_right;
if(ad.ended){
//document.getElementById("product").innerHTML=document.getElementById("source").textContent;
clearInterval(timer);}

}