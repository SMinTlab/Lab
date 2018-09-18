var array_data = [0, 0, 0, 0, 1500, 1500, 1, 1],
        array_graphA = [1500],
        array_graphB = [1500];

var vale_A, vale_B, sumA, sumB, RA, RB, EA, EB, K = 16;
var radioNodeListA, radioNodeListB;

$(function(){
    console.log($(`#A`).children(`input`));
    $(`#A`).children(`input`).each(function(i,e){
        $(e).on(`change`,function(){
            var now = $(this).val();
            if(now==1){
                $(`#B p`).eq(1).text("負け");
                
            }
            if(now==0){
                $(`#B p`).eq(1).text(`勝ち`);
                
            }
            if(now==0.5){
                $(`#B p`).eq(1).text("引き分け");
            }
            vale_A=now - 0;
            vale_B=1 - now;
        });
    });
});

function calculation() {
    if (vale_A == undefined || vale_B == undefined) {
        console.log("non");
    } else {

        sumA = array_data[2] + vale_A;
        sumB = array_data[3] + vale_B;

        RA = array_data[4] + K * (vale_A - array_data[6]);
        RB = array_data[5] + K * (vale_B - array_data[7]);

        EA = 1 / (1 + (Math.pow(10, (RB - RA) / 400)));
        EB = 1 / (1 + (Math.pow(10, (RA - RB) / 400)));

        array_data.splice(0, 7, vale_A, vale_B, sumA, sumB, RA, RB, EA, EB);

        array_graphA.push(RA);
        array_graphB.push(RB);
        push();
        graph();
    }
}

function reset() {
    for (var j = 0; j <= 2; j++) {
        eval('radioNodeListA[' + j + '].checked = false;');
        eval('radioNodeListB[' + j + '].checked = false;');
    }
}

function push() {
    var table = document.getElementById("result");
    var tr = table.insertRow(-1);

    var td1 = tr.insertCell(-1);
    var td2 = tr.insertCell(-1);
    var td3 = tr.insertCell(-1);
    var td4 = tr.insertCell(-1);
    var td5 = tr.insertCell(-1);
    var td6 = tr.insertCell(-1);
    var td7 = tr.insertCell(-1);
    var td8 = tr.insertCell(-1);

    // 表記用四捨五入
    var dataRA = (Math.round(array_data[4] * 100)) / 100;
    var dataRB = (Math.round(array_data[5] * 100)) / 100;
    var dataEA = (Math.round(array_data[6] * 1000)) / 1000;
    var dataEB = (Math.round(array_data[7] * 1000)) / 1000;

    td1.innerHTML = array_data[0];
    td2.innerHTML = array_data[1];
    td3.innerHTML = array_data[2];
    td4.innerHTML = array_data[3];
    td5.innerHTML = dataRA;
    td6.innerHTML = dataRB;
    td7.innerHTML = dataEA;
    td8.innerHTML = dataEB;

    // for (var i = 0; i <= 7; i++) {
    //   var tr = table.insertRow(-1);
    //   eval('var td'+i+'= tr.insertCell(-1);');
    //   eval('td'+i+'.innerHTML = array['+i+'];');
    // }
}

//------------------------------------------------------
function graph() {
    var dataset = array_graphA;
    var b = false;
    var w = 2;
    var h = 200;
    var svg;
    if($(`#graph`).children().length>1){
        svg= d3.select('#graph');
        
        b=true;
    }
    else{
        svg= d3.select('#graph')
            .append("svg");
    }
            
    // datasetを{x,y}の座標の配列に変換する。
    // X座標は、領域全体を個数で割って全体を使えるようにする。
    // 原点が左上なので、Y座標は最大値から引き算する
    // それぞれ2ずらしているのは、0地点の場合に線が欠けるため。
    var pathinfo = [];
    var b_x = w;
    for (var i = 0; i < dataset.length; i++) {
        pathinfo.push({x: i*w, y: dataset[i]/3});
    }

    // 座標データから折れ線グラフ用のコマンドを作るための関数を用意
    
    var d3line = d3.line()
            .x(function (d) {
                return d.x;
            })
            .y(function (d) {
                return d.y;
            });
    
    // 実際に線を引く。
    
    if(b){
        
        svg.select("path")
                .attr("d",d3line(pathinfo))
                .style("stroke-width", 1) // 線の太さを決める
                .style("stroke", "blue") // 色を決める
                .style("fill", "none");
        
    }
    else{
        svg.append("path")
            .attr("d", d3line(pathinfo)) // さきほどの関数に座標の配列を引数で渡す
            .style("stroke-width", 1) // 線の太さを決める
            .style("stroke", "blue") // 色を決める
            .style("fill", "none");
    }
    svg.select("svg").style("width",w*dataset.length)
                .style("height", "auto")
                .style("display","inline-block")
                .attr("viewBox",`0 400 ${w*dataset.length} ${h}`);
}
