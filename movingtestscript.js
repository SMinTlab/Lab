/* 
 * ======================================================================
 * Project Name    : HTML5Application
 * File Name       : movingtestscript.js
 * Encoding        : UTF-8
 * Creation Date   : 2017/04/07
 *
 * Copyright © 2017 Mitani. All rights reserved.
 *
 * This source code or any portion thereof must not be
 * reproduced or used in any manner whatsoever.
 * ======================================================================
 */


function changeClass(selecter, move, dir) {
    let $target = $('.' + selecter);
    let LIMIT = 3;
    let j = 0;
    let counter = 0;
    //console.log("start changeClass(selecter=" + selecter + ",move=" + move + ",dir=" + dir + ")");
    return new Promise(function (resolve, reject) {
        walkingtime = setInterval(function () {
            //console.log("counter = " + counter);
            if (counter > 4) {
                clearInterval(walkingtime);
                counter = 0;
                resolve("Move finished.");
                return;
            }
            //console.log("counter = " + counter);
            counter++;
            $target.attr('class', 'is-position-' + j).addClass(selecter);
            if (j >= LIMIT) {
                j = 0;
            } else {
                j++;
            }

            if (dir === "left")
                document.getElementById("human").style.left = parseInt(document.getElementById("human").style.left) + move + "px";
            else if (dir === "top")
                document.getElementById("human").style.top = parseInt(document.getElementById("human").style.top) + move + "px";
            else {
                clearInterval(walkingtime);
                reject(dir);
                return;
            }
        }, 200);

    });

}
;

function moveHuman(data) {
    let op;
    let selecter = `human_foward`;
    let move = 0;
    let dir = "left";

    op = String(data).split('');
    //console.log("start moveHuman");
    new Promise(function (resolve, reject) {
        function loop(i) {
            //console.log("start loop" + i + "times");
            return new Promise(function (res, rej) {
                if (op[i] === "u") {
                    let str=op[i];
                    for(j=i+1;j<i+"up".length;j++){
                        str=str+op[j];
                    }
                    if(str==="up"){
                        selecter = `human_foward`;
                        move = -3;
                        dir = "top";
                        i=j-1;
                    }
                    
                } else if (op[i] === "r") {
                    let str=op[i];
                    for(j=i+1;j<i+"right".length;j++){
                        str=str+op[j];
                    }
                    if(str==="right"){
                        selecter = `human_right`;
                        move = 3;
                        dir = "left";
                        i=j-1;
                    }
                    
                } else if (op[i] === "l") {
                    let str=op[i];
                    for(j=i+1;j<i+"left".length;j++){
                        str=str+op[j];
                    }
                    if(str==="left"){
                        selecter = `human_left`;
                        move = -3;
                        dir = "left";
                        i=j-1;
                    }
                    
                } else if (op[i] === "d") {
                    let str=op[i];
                    for(j=i+1;j<i+"down".length;j++){
                        str=str+op[j];
                    }
                    if(str==="down"){
                        selecter = `human_back`;
                        move = 3;
                        dir = "top";
                        i=j-1;
                    }
                    
                } else {
                    rej(i + 1);
                    //console.log("undefined operation: " + op[i]);
                    move = 0;
                    dir = "none";
                    return;
                }
                document.getElementById("human").className = selecter;
                changeClass(selecter, move, dir).then(
                        function (result) {
                            //console.log("result: " + result);
                            res(i + 1);
                        },
                        function () {
                            rej(i + 1);
                            return;
                        }
                );
            }).then(
                    function (count) {
                        if (count >= op.length)
                            resolve("all operations finish");
                        else
                            loop(count);
                    }, function (count) {
                if (count >= op.length)
                    resolve("all operations finish");
                else
                    loop(count);
            }
            );
        }
        loop(0);
    }).then(function (log) {
        //console.log(log);
    }

    );
}
;



