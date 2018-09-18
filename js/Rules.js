/* 
 * ======================================================================
 * Project Name    : HTML5Application
 * File Name       : Rules.js
 * Encodeng        : UTF-8
 * Creation Date   : 2017/09/20
 *
 * Copyright © 2017 Mitani. All rights reserved.
 *
 * This source code or any portion thereof must not be
 * reproduced or used in any manner whatsoever.
 * ======================================================================
 */
function checkRules(name, x, y) {
    //console.log(name + " check the rules.");
    let $deferred = new $.Deferred();
    let deferreds = [];
    let actor;
    if(typeof actor1 !== "undefined" && actor1.name===name){
        actor=actor1;
    }
    else if(typeof actor2 !== "undefined" && actor2.name===name){
        actor=actor2;
    }
    else{
        actor=tutorial;
    }
    /*左*/
    if (area[x - 1][y] === 0) {
        deferreds.push(fill(x - 1, y, -1), area);
    }
    /*左上*/
    if (area[x - 1][y - 1] === 0) {
        deferreds.push(fill(x - 1, y - 1, -1), area);
    }
    /*左下*/
    if (area[x - 1][y + 1] === 0) {
        deferreds.push(fill(x - 1, y + 1, -1), area);

    }
    /*右*/
    if (area[x - 0 + 1][y] === 0) {
        deferreds.push(fill(x - 0 + 1, y, -1), area);
    }
    /*右上*/
    if (area[x - 0 + 1][y - 1] === 0) {
        deferreds.push(fill(x - 0 + 1, y - 1, -1), area);
    }
    /*右下*/
    if (area[x - 0 + 1][y + 1] === 0) {
        deferreds.push(fill(x - 0 + 1, y + 1, -1), area);
    }
    /*上*/
    if (area[x][y - 1] === 0) {
        deferreds.push(fill(x, y - 1, -1), area);
    }
    /*下*/
    if (area[x][y - 0 + 1] === 0) {
        deferreds.push(fill(x, y - 0 + 1, -1), area);
    }
    function zero_ume(){
        fill(0, 0, 0).then(function () {
                //console.log(name);
                //console.log(area);
                area.forEach(function (e1, i1, a1) {
                    e1.forEach(function (e2, i2, a2) {
                        if (area[i1][i2] === -1) {
                            console.log(name + " makes a cycle.");
                            let scelm = document.getElementById("scores");
                            let ch = scelm.children;
                            //console.log(ch);
                            for (let i = 0; i < ch.length; i++) {
                                if (ch[i].id === name) {
                                    ch[i].firstElementChild.value++;
                                }
                            }
                            //area[i1][i2] = name;
                            
                            let char = [];
                            if(name === $("#Player2").text()){
                                area[i1][i2] = 4;
                                if(data[i1+","+i2] === 0){
                                    char = ["P.2"];
                                }
                                else{
                                    char = ["P#2"];
                                }
                            }
                            else{
                                area[i1][i2] = 3;
                                if(data[i1+","+i2] === 0){
                                    char = ["P.1"];
                                }
                                else{
                                    char = ["P#1"];
                                }
                            }
                            console.log(char);
                            Draw(i1, i2, char, name);
                            console.log(area);
                        }
                        if (i1 === a1.length - 1) {
                            $deferred.resolve();
                        }
                    });
                });
            });
    }
    console.log(deferreds);
    if (deferreds.length === 0) {
        //console.log(name + " has no deferreds.");
        $deferred.resolve();
    } else {
        $.when.apply(null, deferreds).done(function () {
            zero_ume();
        }).fail(function (e) {
            $deferred.reject(e);
        });
    }
    return $deferred.promise();
}
/*塗られた部分に隣接した塗られていない部分を領域で区切る*/
function fill(x, y, num) {
    return new Promise(function (res, rej) {
        //console.log(x + "," + y);
        let old = area[x][y];
        area[x][y] = num;
        let check = null;
        /*左*/
        if (x !== 0 && old === area[x - 1][y]) {
            check = true;
            fill(x - 1, y, num).then(function () {
                res();
            });
        }
        else{
            check = false;
        }
        /*左上*/
        if (x !== 0 && y !== 0 && old === area[x - 1][y - 1]) {
            check = true;
            fill(x - 1, y - 1, num).then(function () {
                res();
            });
        }
        else{
            check = false;
        }
        /*上*/
        if (y !== 0 && old === area[x][y - 1]) {
            check = true;
            fill(x, y - 1, num).then(function () {
                res();
            });
        }
        else{
            check = false;
        }
        /*右上*/
        if (x !== w + 1  && y !== 0 && old === area[x + 1][y - 1]) {
            check = true;
            fill(x + 1, y - 1, num).then(function () {
                res();
            });
        }
        else{
            check = false;
        }
        /*右*/
        if (x !== w + 1 && old === area[x + 1][y]) {
            check = true;
            fill(x + 1, y, num).then(function () {
                res();
            });
        }
        else{
            check = false;
        }
        /*右下*/
        if (x !== w + 1 && y !== h + 1 && old === area[x + 1][y + 1]) {
            check = true;
            fill(x + 1, y + 1, num).then(function () {
                res();
            });
        }
        else{
            check = false;
        }
        /*下*/
        if (y !== h + 1 && old === area[x][y + 1]) {
            check = true;
            fill(x, y + 1, num).then(function () {
                res();
            });
        }
        else{
            check = false;
        }
        /*左上*/
        if (x !== 0 && y !== h + 1 && old === area[x - 1][y + 1]) {
            check = true;
            fill(x - 1, y + 1, num).then(function () {
                res();
            });
        }
        else{
            check = false;
        }
        if (check === false) {
            res();
        }
        //console.log(area);
    });

}
