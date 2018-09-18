/* 
 * ======================================================================
 * Project Name    : HTML5Application
 * File Name       : moveHuman.js
 * Encoding        : UTF-8
 * Creation Date   : 2017/04/13
 *
 * Copyright © 2017 Mitani. All rights reserved.
 *
 * This source code or any portion thereof must not be
 * reproduced or used in any manner whatsoever.
 * ======================================================================
 */

function moveHuman(name, args) {
    var selecter,move,dir;
    if (args === "up") {
        selecter = `human_foward`;
        move = -3;
        dir = "top";
    } else if (args === "right") {
        selecter = `human_right`;
        move = 3;
        dir = "left";
    } else if (args === "left") {
        selecter = `human_left`;
        move = -3;
        dir = "left";
    } else if (args === "down") {
        selecter = `human_back`;
        move = 3;
        dir = "top";
    } else {
        alert("undefined operation");
        selecter = `human_foward`;
        move = 0;
        dir = "top";
    }
    document.getElementById(name).className = selecter;
    var $target = $('.' + selecter);
    var LIMIT = 3;
    var j = 0;
    var counter = 0;
    console.log("start changeClass(name=" + name + ",selecter=" + selecter + ",move=" + move + ",dir=" + dir + ")");
    return new Promise(function (resolve, reject) {
        var animationtime = setInterval(function () {
            //console.log("counter = " + counter);
            if (counter > 4) {
                clearInterval(animationtime);
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
                document.getElementById(name).style.left = parseInt(document.getElementById(name).style.left) + move + "px";
            else if (dir === "top")
                document.getElementById(name).style.top = parseInt(document.getElementById(name).style.top) + move + "px";
            else {
                clearInterval(animationtime);
                reject(dir);
                return;
            }
        }, 200);

    });
}
