/* 
 * ======================================================================
 * Project Name    : HTML5Application
 * File Name       : txtParse.js
 * Encoding        : UTF-8
 * Creation Date   : 2017/05/19
 *
 * Copyright © 2017 Mitani. All rights reserved.
 *
 * This source code or any portion thereof must not be
 * reproduced or used in any manner whatsoever.
 * ======================================================================
 */

let MapArray = null, Max = null, Player = {name: {x: 0, y: 0}}, Start = {x: 0, y: 0}, Goal = {x: 0, y: 0};
let Wallnum = 0;
function intoArray(txt) {
    MapArray = [];
    Max = {x: 0, y: 0};
    let elem = document.getElementById("humantab");
    while (elem.firstChild) {
        Player[elem.firstChild.getAttribute("id")] = {x: 0, y: 0};
    }
    let lines = txt.split("\n");
    Max.x = lines[0].length;
    Max.y = lines.length;
    for (let i = 0; i < lines.length; ++i) {
        MapArray.push(lines[i].split(""));
        if (i === 0 || i === Max.y) {
            MapArray[i].forEach(function (e, j, a) {
                if (e !== "#") {
                    alert("The Map must be enclosed by a wall." + i + 1 + "行目" + j + 1 + "列目の要素が" + e + "です.");
                }
                if (e === "#")
                    Wallnum++;
            });
        } else {
            MapArray[i].forEach(function (e, j, a) {
                if (j === 0 || j === Max.x) {
                    if (e !== "#") {
                        alert("The Map must be enclosed by a wall." + i + 1 + "行目" + j + 1 + "列目の要素が" + e + "です.");
                    }
                }
                if (e === "#")
                    Wallnum++;
            });
        }
    }
    console.log(MapArray);
    console.log("Wallnum=" + Wallnum);
    //Start,Goal検索
    let tmp = {x: -1, y: -1};
    MapArray.forEach(function (arr) {
        tmp.y++;
        if (arr.indexOf("S") !== -1) {
            tmp.x = arr.indexOf("S");
            for (let key in Player) {
                Player[key] = {x: tmp.x, y: tmp.y};
            }
            Start.x = tmp.x;
            Start.y = tmp.y;
        }
        if (arr.indexOf("G") !== -1) {
            tmp.x = arr.indexOf("G");
            Goal.x = tmp.x;
            Goal.y = tmp.y;
        }
    });
    console.log(Player);
    console.log(Goal);
}
String.prototype.splice = function (idx, rem, s) {
    return (this.slice(0, idx) + s + this.slice(idx + Math.abs(rem)));
};

function outfromArray(arr) {
    let txt = "";

    for (let i = 0, tmp = 0; i < arr.length; ++i) {
        txt = txt + ",\"" + arr[i].join(`\",\"`);
    }
    let txtlength = Max.x * Max.y;
    txt = txt.splice(0, 1, "");
    console.log("txtlength = " + txtlength);
    console.log("Max.x = " + Max.x);
    console.log("Max.y = " + Max.y);
    for (let i = 0; i < (txtlength / (Max.x)); ++i) {
        txt = txt.splice(3 * i * (Max.x) + i * (Max.x - 1) + i * 3, 0, "{");
        txt = txt.splice(3 * (i + 1) * (Max.x) + (i + 1) * (Max.x - 1) + i * 3, 0, "\"}");
    }
    return txt;
}

function generateNameMapText() {
    let humans = document.getElementById("humantab").childNodes;
    let txt = "";
    humans.forEach(function (e, i, a) {
        txt = txt + "{int[] tmp = {" + Player[humans[i].id].x + "," + Player[humans[i].id].y + "};put(\"" + humans[i].id + "\",tmp);}";
    });
    return txt;
}

function showMapinStage(txt) {
    let stage = document.getElementById("stage");
    let tiles = document.createElement("div");
    tiles.setAttribute("id", "tiles");
    stage.appendChild(tiles);
    for (let i = 0; i < txt.length; ++i) {
        let tile = document.createElement("div");
        console.log(i % Max.y+","+(Math.floor(i/Max.y) % Max.x));
        let e = MapArray[i % Max.y][(Math.floor(i/Max.y) % Max.x)];
        if(e==="#"){
            tile.setAttribute("class", "wall");
        }
        else if(e==="S"){
            tile.setAttribute("class", "start");
        }
        else if(e==="G"){
            tile.setAttribute("class", "goal");
        }
        else{
            tile.setAttribute("class", "floor");
        }
        tile.setAttribute("id", "tile("+(Math.floor(i/Max.y) % Max.x)+","+(i % Max.y)+")");
        tile.setAttribute("style", "position: absolute;height: 28px;width: 28px;top: " + (28 * (i % Max.y)) + "px;left: " + (28 * (Math.floor(i/Max.y) % Max.x)) + "px;");
        tiles.appendChild(tile);
    }

}