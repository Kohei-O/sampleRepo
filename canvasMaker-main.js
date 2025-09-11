const textArea = document.getElementById("textarea");

textArea.onkeyup = keyBeforeDrawCanvas;

const myCanvas = document.getElementById("myCanvas");

const canvasWidth = myCanvas.width;

const canvasHeight = myCanvas.height;

let ctx = myCanvas.getContext('2d');

let baseFont = "20px serif";

let baseColor = 'black';

let baseLineWidth = 1;

ctx.font = baseFont;

const margin = canvasWidth / 30;

function keyBeforeDrawCanvas(event){
    
    //eventオブジェクトが存在するときに行う
    if (event) {
        
        // 押されたキーが; か Escape の時の処理
        if (event.key === ";" || event.key === "Escape") {

            drawCanvas();
        
        }
    
    }

}

function drawCanvas(){

    baseFont = "20px serif";

    baseColor = 'black';

    baseLineWidth = 1;

    ctx.fillStyle = 'white';

    ctx.fillRect(0, 0, 400, 400);

    ctx.fillStyle = 'black';

    eval(textArea.value);

}

function viewSample1(){
    'use strict';

    document.getElementById("textarea").value = "  start = [0,-1];\n end = [13,12];\n pointA = [4,10];\n pointB = [2,1];\n pointC = [7,1];\n pointP = bunten({\n between:[pointA, pointB],\n rate:[1,1]\n });\n pointQ = bunten({\n between:[pointB, pointC],\n rate:[2,-1]\n });\n pointR = bunten({\n between:[pointC, pointA,],\n rate:[1,2]\n });\n drawLine({\n between:[pointA, pointB, pointC, pointA]\n });\n drawLine({\n between:[pointP, pointQ]\n });\n drawLine({\n between:[pointQ, pointC],\n lineDash:5\n });\n pointMark({\n points:[\n [pointA, 'A', [-0.5,0.5]],\n [pointB, 'B', [-1.5,-1.5]],\n [pointC, 'C', [-1,-2]],\n [pointR, 'R', [-1.5,-1.5]],\n [pointQ, 'Q', [0.5,-1.5]],\n [pointP, 'P', [-2,-0.5]]\n ]\n });\n baseLineWidth = 2;\n baseColor ='red';\n drawHenko({\n from:pointA,\n to:pointP,\n number:2\n });\n drawHenko({\n from:pointP,\n to:pointB,\n number:2\n });\n drawHenko({\n from:pointB,\n to:pointQ,\n string:'2',\n circle:true,\n move:[0, -0.5]\n });\n drawHenko({\n from:pointQ,\n to:pointC,\n angle:20,\n string:'1',\n circle:true,\n move:[0, -0.3],\n });\n drawHenko({\n from:pointC,\n to:pointR,\n string:'1',\n box:false,\n move:[-0.5, 0]\n });\n drawHenko({\n from:pointR,\n to:pointA,\n string:'2',\n box:false,\n move:[-0.5, 0]\n });"
}

function viewSample2(){
    'use strict';

    document.getElementById("textarea").value = " start=[-4,-4];\n   end=[4,4];\n   drawEnko({\n   center:[0,0],\n   radius:3\n   });\n   pointO=[0,0];\n   singlePointMark({at:pointO});\n   putString({\n   at:pointO,\n   string:'O',\n   move:[-0.5, 0.5]\n   });\n   pointA = [3,0];\n   pointB = [-3,0];\n   pointC = polar({\n  radius : 3,\n  degree : 240\n  });\n   pointD=polar({\n  radius : 3,\n  degree :30\n  });\n   pointE=polar({\n  radius :3,\n  radian : 2 * Math.PI / 3\n  });\n   drawLine({\n   between:[\n   pointA,pointC,pointB,pointA\n   ]\n   });\n   drawLine({\n   between:[\n   pointA,pointE,pointC\n   ]});\n   drawLine({\n   between:[\n   pointA,pointD,pointC\n   ]\n   });\n   verticalMark({\n   at:pointC,\n   to:pointA,\n   size:2,\n   color:'red',\n   width:2\n   });\n   angleMark({\n   points:[\n   pointC, pointD, pointA\n   ],\n   radius:1.5,\n   number:2,\n   color:'orange',\n   string:'θ',\n   move:[-2, -3.5]\n   });\n   angleMark({\n   points:[\n   pointC, pointE, pointA\n   ],\n   radius:2,\n   number:2,\n   color:'red',\n  paint:true,\n   });\n   angleMark({\n   points:[\n   pointC, pointB, pointA\n   ],\n   radius:3,\n   bar:true,\n barSize:10\n    });";
}

function viewSample3(){
    'use strict';

    document.getElementById("textarea").value = "start = [-3, -1];\n  end = [3, 5];\n  drawAxis();\n  function f(x){\n  return x*x\n  };\n  function g(x){\n  return x+2\n  };\n  drawGraph({\n  func:f\n  });\n  drawGraph({\n  func:g\n  });\n  pointA = [-1, 1];\n  pointB = [2, 4];\n  pointMark({\n  points:[\n  [ pointA, 'A', [-2, 0] ],\n  [ pointB, 'B', [1, -1] ],\n  ],\n  open:true\n  });\n  drawAxisHoot({\n  from:pointA,\n  to:'x',\n  stringX:'−1',\n  stringXmove:[-1, -2]\n  });\n  drawAxisHoot({\n  from:pointB,\n  to:'x',\n  stringX:'2',\n  stringXmove:[-0.5, -2]\n  });\n  xPaint({\n  func1:f,\n  func2:g,\n  xMin:-1,\n  xMax:2,\n  color:'gray'})"    

}

function viewSample4(){
    'use strict';

    document.getElementById("textarea").value = "start=[-3, -3];\n end=[3, 3];\n pointA=[-1, 2];\n pointB=[-2, -2];\n pointC=[2.5, -2];\n pointD=bunten({\n between:[pointB, pointC],\n rate:[3, 2]\n });\n pointMark({\n points :[\n  [pointA,  'A', [-1, 1]],\n [pointB, 'B' ,[-1, -2]],\n [pointC, 'C' ,[0.2, -2]],\n [pointD, 'D' , [-0.4, -2]]\n ]})\n drawArrow({\n from : pointA,\n to : pointB,\n color : 'blue',\n lineDash:3\n });\n drawArrow({\n from : pointB,\n to : pointD,\n color : 'blue',\n lineDash:3\n });\n drawArrow({\n from : pointA,\n to : pointC\n });\n drawArrow({\n from : pointA,\n to : pointD,\n color : 'red',\n size:20,\n width:3\n });\n drawLine({\n between :[ pointD, pointC]\n });\n drawHenko({\n from : pointD,\n to : pointB,\n clock : true,\n string : '3',\n circle  : true,\n move:[0,-0.5]\n });\n drawHenko({\n from : pointD,\n to : pointC,\n clock : false,\n string : '2',\n circle  : true,\n move:[0, -0.9]\n });\n putString({\n at : [-2, 0],\n string : 'AB',\n vector : true,\n color : 'blue'});\n putString({\n at : [-1, -1.9],\n string : 'BD',\n vector : true,\n color : 'blue'\n });\n putString({\n at : [0, 0],\n string : 'AD',\n vector : true,\n color :'red',\n move:[0, -0.5]\n })";
}

function viewSample5(){
    'use strict';
    
    document.getElementById("textarea").value = "start=[-1,-2];\n end=[2.5 ,2];\n function r(t){\n return 1+Math.cos(t);\n };\n rPaint({\n func : r,\n start : 0,\n end : 2*Math.PI\n });\n drawGraphR({\n func : r,\n start:0,\n end:2*Math.PI\n });\n drawAxis();\n putString({\n at : [1, 1],\n string : 'r=1+ cosθ',\n move:[1,2.7]})";
}
function viewSample6(){
    'use strict';
    
    document.getElementById("textarea").value = "sutyoku({\n range:[-2,10],\n label:'t',\n scale:true,\n scaleLabel:true,\n interval:[\n {range:[-1,6], rightOpen:true},\n {range:[4, 12], height:2, leftString:'a', leftStringMove:[-1.5, 0.5], font:'30px serif'},\n {range:[-3, 2], height:3}\n ],\n paint:[\n {range:[-1, 2], height:3, color:'yellow'},\n {range:[4, 6], height:2}\n ]\n });";
}
function viewSample7(){
    'use strict';
    
    document.getElementById("textarea").value = "start = [-9, -9];\n end = [9, 9];\n pointA=[0, 6];\n pointB=[2,0];\n pointC=[-2,0];\n putString({at:pointA,string:'6',move:[0.5,0]});\n putString({at:[-4,-8.5],string:'m=3√5/2',color:'orange'});\n putString({at:pointB,string:'2',move:[0.5,0]});\n putString({at:pointC,string:'−2',move:[-2.5,0]});\n   drawAxis();\n   function f(y){\n   return 2*Math.sqrt(y*y/9+1);\n   };\n   function g(y){\n   return -2*Math.sqrt(y*y/9+1);\n   };\n function j(x){\n return 1.5*x};\n function k(x){\n return -1.5*x};\n   drawGraphY({\n   func:f,\n width:2\n   });\n   drawGraphY({\n   func:g,\n width:2\n   });\n   drawGraph({\n   func:j,\n lineDash:4\n   });\n  drawGraph({\n   func:k,\n lineDash:4\n   });\n function h(x){\n  return 1.5*Math.sqrt(5)*x+6\n   };\n   drawGraph({\n   func:h,\n color:'orange',\n width:2\n   });\n function l(x){\n  return 5*x+6\n   };\n   drawGraph({\n   func:l,\n color:'red',\n width:2\n   });\n function m(x){\n  return 0.2*x+6\n   };\n   drawGraph({\n   func:m,\n color:'blue',\n width:2\n   });\n function s(x){\n  return 1.5*x+6\n   };\n   drawGraph({\n   func:s,\n color:'orange',\n width:2\n   });\n function t(x){\n  return 2.5*x+6\n   };\n   drawGraph({\n   func:t,\n color:'blue',\n width:2\n   });";
}

function viewSample8(){
    'use strict';
    
    document.getElementById("textarea").value = "start=[-1.5,-1.5];\n end=[1.5,1.5];\n drawAxis({});\n drawEnko({\n center:[0,0],\n radius:1\n });\n drawEnko({\n center:[0,0],\n radius:1,\n startAngle:30,\n endAngle:150,\n color:'red',\n width:3\n });\n function f(x){\n return 1/2};\n drawGraph({\n func:f,\n width:2,\n color:'blue'});\n function g(x){\n return -1};\n drawGraph({\n func:g,\n color:'blue',\n width:3\n });\n pointA=[1,1/2];\n putString({at:pointA,\n string: 'y=1/2',\n move:[0.5,-2],\n color:'blue'});\n pointB=[1,-1];\n putString({\n at:pointB,\n string:'y=−1',\n color:'blue',\n move:[1,-2]});\n pointMark({\n points:[\n [[Math.sqrt(3)/2,1/2],'π/6',[0,0.5]],\n [[-Math.sqrt(3)/2,1/2],'5π/6',[-4,1]],\n [[0,-1],'3π/2',[0.5,-2]]\n ],\n color:'red',\n size:2\n });";
}
function viewSample9(){
    'use strict';
    
    document.getElementById("textarea").value = 'start = [-3,-9];\n end = [5, 5];\n var b1 = branch(" aa",3);\n var b2 = branch(" bb",2);\n var b3 = branch(" cc", 1);\n var b4 = branch(" aa",0);\n var b5 = branch(" bb",-1);\n var b6 = branch(" cc", -2);\n var tree1 = tree(" dddd ",[b1,b2, b3]);\n var tree2 = tree(" ee ",[b4,b5, b6]);\n var tree3 = tree(" ff ",[tree1, tree2]);\n var b7 = branch(" aa",-3);\n var b8 = branch(" bb",-4);\n var b9 = branch(" cc", -5);\n var b10 = branch(" aa",-6);\n var b11 = branch(" bb",-7);\n var b12 = branch(" cc", -8);\n var tree4 = tree(" dddd ",[b7,b8, b9]);\n var tree5 = tree(" ee ",[b10,b11, b12]);\n var tree6 = tree(" ff ",[tree4, tree5]);\n var tree7 = tree(" xx ",[tree6, tree3]);';
}

function viewSample10(){
    'use strict';
    
    document.getElementById("textarea").value = 'start=[-1,-1];\n end=[2.5,2.5];\n drawAxis();\n function fff(sita){\n return 1+Math.cos(sita);\n };\n function ggg(sita){\n return 0.5+0.5*Math.sin(sita);\n };\n drawGraphT({\n funcX:fff,\n funcY:ggg,\n tMin:0,\n tMax:7,\n width:3\n });\n pointA=[1,0.5];\n singlePointMark({at:pointA});\n drawAxisHoot({\n from:pointA,\n stringX:"1",\n stringXmove:[-0.5,-2],\n stringY:"1/2",\n stringYmove:[-3.5,-0.5]\n });';
}

function viewSample11(){
    'use strict';
    
    document.getElementById("textarea").value = 'start=[-3,-4];\n   end=[4,3];\n  vf=viewFrom(30,60);\n   drawAxis3d({\n   length:4,\n  xLabelMove:[1,0]\n   });\n   pointA=p3d(0,0,3);\n   pointB=p3d(0,3,0);\n   pointC=p3d(3,0,0);\n  pointD=p3d(1,1,1);\n   drawLine({\n   between:[pointA,pointB,pointC],\n   polygon:true\n   });\n   drawEnko3d({\n   center:pointD,\n   radius:1,\n   nv:[1,1,1]\n   });';
}
function viewSample12(){

    'use strict';
    
    document.getElementById("textarea").value = 'start=[-2,-2];\n  end=[3.5,3.5];\n  vf=viewFrom(-45,-75);\n  AA=p3d(-1,0,0);\n  BB=p3d(0,1,0);\n  CC=p3d(0,0,1);\n  DD=p3d(3,-1,0);\n  HH=p3d(4/3, 2/3,5/3);\n  GG=p3d(-1/3,1/3,1/3);\n  PP=[0,0.3];\n  PPO=[0.52,0.11];\n  drawEnko3d({\n  center:[-1/3,1/3,1/3],\n  radius:Math.sqrt(6)/3,\n  nv:[-1,1,1]\n  });\n  drawLine({\n  between:[DD, HH]});\n  drawLine({\n  between:[GG, HH],\n  color:"red",\n  width:2\n  });\n  drawLine({\n  between:[DD,PP, HH],\n  color:"blue",\n  width:2\n  });\n  pointMark({\n  points:[\n  [GG, "G", [-2,0]], [DD, "D", [0.4, 0]], \n  [HH, "H", [0.5, 0]], [PP, "P" ,[-1.5,0]],\n  [PPO, "Po",[0,-2]]\n  ]\n  });\n  drawLine({\n  between:[\n  [-1.5,-1.5],[2,-1.5],[3,2],[-0.5,2]\n  ],\n  polygon:true\n  });\n verticalMark3d({\n points:[DD, HH, PP],\n size:2,\n color:"green",\n width:2\n });';

}

function viewSample13(){
    'use strict';
    
    document.getElementById("textarea").value = 'start=[-2,-0.5];\n  end=[2.5 ,1.5];\n  function f(t){\n  return Math.tan(t)-2*Math.sqrt(2)*Math.sin(t);\n  };\n  function g(t){\n  return Math.sin(t);\n  };\n drawGraphT({\n funcX:f,\n funcY:g,\n tMin:0,\n tMax:Math.PI/2-0.1\n });\n drawAxis();\n drawGraph({\n func:1,\n lineDash:5});\n pointA=[-1,1/Math.sqrt(2)];\n drawAxisHoot(\n {from:pointA,\n stringX:"−1",\n stringXmove:[-1,-2],\n stringY:"1/√2",\n stringYmove:[0.3,-0.4]});\n putString({\n at:[0,1],\n string:"1",\n move:[0.4,0.7]});';
}

function viewSample14(){
    'use strict';
    
    document.getElementById("textarea").value = 'start=[-4,-4];\n end=[4,3];\n vf=viewFrom(50,60);\n drawAxis3d({\n length:5,\n xLabelMove:[1,0]\n});\n function f(t){\n return Math.cos(3*t)\n};\n function g(t){\n return Math.sin(3*t)\n};\n function h(t){\n return t\n};\n drawGraphT3d({\n funcX:f,\n funcY:g,\n funcZ:h,\n tMin:0,\n tMax:4\n});';
}

function viewSample15(){
    'use strict';
    
    document.getElementById("textarea").value = 'baseFont = "15px serif";\n hakohige({\n range : [-3,15],\n box : [\n [0, 1, 2, 5, 6, "③"], [3, 4, 5, 8, 9, "②"], [4, 7, 8, 8, 10, "①"]\n ],\n height : 4,\n label : " ",\n scaleLabel : true,\n scaleLine : true,\n scaleLineDash : 4\n });';
}

function clearText(){
    
    const conf = confirm('入力した内容を消去します。よろしいですか?');
    
    if(conf){

        document.getElementById("textarea").value ='';
    
    }
}

function storeText(){

    const request = window.indexedDB.open("canvasMaker",1);

    request.onerror = function(){

        alert("[storeText] エラー : インターネットへの接続を確認してください。");

    }

    //request.onupgradeneeded = function(event){
      //  alert("upgradeneeded");
     //   var db = event.target.result;
    //    var objectStore = db.createObjectStore("text",{keyPath: "date"});
    //    objectStore.createIndex("command", "command", {unique :false});
    //}
    request.onsuccess = function(event){
        
        const now = new Date();

        const timeStamp = now.getTime();
        
        const inputCommand = document.getElementById("textarea").value;
        
        const data = {date : timeStamp, command : inputCommand};
        
        const db = event.target.result;
        
        const newRequest = db.transaction(["text"],"readwrite").objectStore("text").add(data);
        
        newRequest.onerror = function(event){
        
            alert("保存に失敗しました");
        
        }
        
        newRequest.onsuccess = function(event){
        
            alert("保存しました。\n" + now.toLocaleString());
        
            const div = document.getElementById("storage");
        
            const child = div.childNodes[0];
        
            div.removeChild(child);
        
            getStorage();

        }

    }

}
function getStorage(){

    const request = window.indexedDB.open("canvasMaker",1);
    
    request.onerror = function(){

        alert("【getStorage】エラー : インターネットへの接続を確認してください。");

    }
    
    request.onupgradeneeded = function(event){
    
        //  alert("upgradeneeded");

        const db = event.target.result;
        
        const objectStore = db.createObjectStore("text",{keyPath: "date"});
        
        objectStore.createIndex("command", "command", {unique :false});
    
    }
    
    request.onsuccess = function(event){
    
        const storage = document.getElementById("storage");
        
        const ul = document.createElement("ul");
        
        const db = event.target.result;

        const objectStore = db.transaction("text").objectStore("text");
        
        let anchorText = '';
        
        let anchor;
        
        let date;
        
        let list;
        
        let button;
        
        objectStore.openCursor().onsuccess = function(event){

            const cursor = event.target.result;
            
            if (cursor) {
            
                list = document.createElement("li");
            
                anchor = document.createElement("a");
            
                anchor.setAttribute("href", "javascript:void(0)");
            
                anchor.setAttribute("onclick", "viewStorage(" + cursor.key + ")");
            
                date = new Date(cursor.key);
            
                anchorText = document.createTextNode(date.toLocaleString());
            
                anchor.appendChild(anchorText);
            
                button = document.createElement("input");
            
                button.setAttribute("type", "button");
            
                button.setAttribute("value", date.toLocaleString()+" を削除する");
            
                button.setAttribute("onclick", "deleteStorage(" + cursor.key + ")");
            
                list.appendChild(anchor);
            
                list.appendChild(button);
            
                ul.appendChild(list);
            
                cursor.continue();
            
            } else {
            
                storage.appendChild(ul);
            
            }
        
        }
    
    }
}

function viewStorage(date){
    var request = window.indexedDB.open("canvasMaker",1);
    request.onerror = function(){
        alert("[viewStorage] エラー : インターネットへの接続を確認してください。");
    }
    request.onupgradeneeded = function(event){
    }
    request.onsuccess = function(event){
        var db = event.target.result;
        var newRequest = db.transaction(["text"]).objectStore("text").get(date);
        newRequest.onsuccess = function(event){
            var data = newRequest.result;
            document.getElementById("textarea").value = data.command;
            drawCanvas();
        }
        newRequest.onerror = function(){
        }
    }
}
function deleteStorage(date){
    var message = confirm("削除します。よろしいですか？");
    if (message){
        var request = window.indexedDB.open("canvasMaker",1);
        request.onerror = function(){
            alert("[deleteStorage] エラー : インターネットへの接続を確認してください。");
        }
        request.onupgradeneeded = function(event){
        }
        request.onsuccess = function(event){
            var db = event.target.result;
            var newRequest = db.transaction(["text"], "readwrite").objectStore("text").delete(date);
            newRequest.onsuccess = function(){
                var div = document.getElementById("storage");
                var child = div.childNodes[0];
                div.removeChild(child);
                getStorage();
            }
            newRequest.onerror = function(){
            }
        }
    }
}
document.body.onload = getStorage();