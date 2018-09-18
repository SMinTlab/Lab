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
function moveHuman_old(name, args) {
    let selecter, move, dir;
    console.log(args);
    if (args === "north") {
        selecter = `human_foward`;
        move = -10;
        dir = "top";
        emitResult(name + "は上に歩く");
        if (!checkCollision(name, args)) {
            actor.y--;
            colflag = false;
        } else {
            move = 0;
            emitResult(name + "は壁にぶつかった");
            colflag = true;
        }
    } else if (args === "east") {
        selecter = `human_right`;
        move = 10;
        dir = "west";
        emitResult(name + "は右に歩く");
        if (!checkCollision(name, args)) {
            actor.x++;
            colflag = false;
        } else {
            move = 0;
            emitResult(name + "は壁にぶつかった");
            colflag = true;
        }
    } else if (args === "west") {
        selecter = `human_left`;
        move = -10;
        dir = "west";
        emitResult(name + "は左に歩く");
        if (!checkCollision(name, args)) {
            actor.x--;
            colflag = false;
        } else {
            move = 0;
            emitResult(name + "は壁にぶつかった");
            colflag = true;
        }
    } else if (args === "south") {
        selecter = `human_back`;
        move = 10;
        dir = "top";
        emitResult(name + "は下に歩く");
        if (!checkCollision(name, args)) {
            actor.y++;
            colflag = false;
        } else {
            move = 0;
            emitResult(name + "は壁にぶつかった");
            colflag = true;
        }
    } else {
        alert("undefined move operation");
        selecter = `human_foward`;
        move = 0;
        dir = "top";
    }
    if (document.getElementById(name) === null) {
        alert("no one named as " + name);
        return;
    }
    if (checkGoal(name)) {
        emitResult(name + "はゴールにたどり着いた");
    }
    document.getElementById(name).className = selecter;
    let $target = $('.' + selecter);
    let LIMIT = 3;
    let j = 0;
    let counter = 0;
    console.log("start changeClass(name=" + name + ",selecter=" + selecter + ",move=" + move + ",dir=" + dir + ")");
    return new Promise(function (resolve, reject) {
        let animationtime = setInterval(function () {
            //console.log("counter = " + counter);
            if (counter > 4) {
                clearInterval(animationtime);
                counter = 0;
                resolve("Move finished.");
                return;
            } else {
                //console.log("counter = " + counter);
                counter++;
                $target.attr('class', 'is-position-' + j).addClass(selecter);
                if (j >= LIMIT) {
                    j = 0;
                } else {
                    j++;
                }

                if (counter < 4) {
                    if (dir === "west") {
                        document.getElementById(name).style.west = parseInt(document.getElementById(name).style.west) + move + "px";
                    } else if (dir === "top") {
                        document.getElementById(name).style.top = parseInt(document.getElementById(name).style.top) + move + "px";
                    } else {
                        clearInterval(animationtime);
                        reject(dir);
                        return;
                    }
                }
            }

        }, 200);
    });
}
let testtxt = "";
function moveHuman(name, args) {
    let actor;
    if(typeof actor1 !== "undefined" && actor1.name===name){
        actor = actor1;
    }
    else if(typeof actor2 !== "undefined" && actor2.name===name){
        actor = actor2;
    }
    else{
        actor = tutorial;
    }
    //console.log(env[name]);
    let $defer = new $.Deferred();
    let wall;
    let an = 0;
    if (typeof actor1 !== "undefined" || typeof actor2 !== "undefined") {
        switch (name) {
            case actor1.name :
                an = 1;
                break;
            case actor2.name :
                an = 2;
                break;
            case tutorial.name :
                an = 1;
                break;
            default :
                break;
        }
    } else {
        //alert("tutorial");
        an = 1;
    }

    if (args === "north") {
        //emitResult(name+"は上に歩く");
        let tmp = actor.y - 1;actor.dir="NORTH";
        Move(args,{x:actor.x, y:actor.y}, data[actor.x + "," + tmp] === 1, name).then(
                function () {
                    if (!checkCollision(name, args)) {
                        actor.y--;
                        if (area[actor.x - 0][actor.y - 0] === 0) {
                            area[actor.x - 0][actor.y - 0] = an;
                        }
                        testtxt = testtxt + "north<br>";
                    } else {
                        //emitResult(name+"は壁にぶつかった");
                    }
                    $defer.resolve();
                }
        );
    } else if (args === "east") {
        //emitResult(name+"は右に歩く");
        let tmp = actor.x - 0 + 1;actor.dir="EAST";
        Move(args,{x:actor.x, y:actor.y}, data[tmp + "," + actor.y] === 1, name).then(
                function () {
                    if (!checkCollision(name, args)) {
                        actor.x++;
                        if (area[actor.x - 0][actor.y - 0] === 0) {
                            area[actor.x - 0][actor.y - 0] = an;
                        }
                        testtxt = testtxt + "east<br>";
                    } else {
                        //emitResult(name+"は壁にぶつかった");
                    }
                    $defer.resolve();
                });
    } else if (args === "west") {
        //emitResult(name+"は左に歩く");
        let tmp = actor.x - 1;actor.dir="WEST";
        Move(args,{x:actor.x, y:actor.y}, data[tmp + "," + actor.y] === 1, name).then(
                function () {
                    if (!checkCollision(name, args)) {
                        actor.x--;
                        if (area[actor.x - 0][actor.y - 0] === 0) {
                            area[actor.x - 0][actor.y - 0] = an;
                        }
                        testtxt = testtxt + "west<br>";
                    } else {
                        //emitResult(name+"は壁にぶつかった");
                    }
                    $defer.resolve();
                }
        );
    } else if (args === "south") {
        //emitResult(name+"は下に歩く");
        let tmp = actor.y - 0 + 1;actor.dir="SOUTH";
        Move(args,{x:actor.x, y:actor.y}, data[actor.x + "," + tmp] === 1, name).then(
                function () {
                    if (!checkCollision(name, args)) {
                        actor.y++;
                        if (area[actor.x - 0][actor.y - 0] === 0) {
                            area[actor.x - 0][actor.y - 0] = an;
                        }
                        testtxt = testtxt + "south<br>";
                    } else {
                        //emitResult(name+"は壁にぶつかった");
                    }
                    $defer.resolve();
                });
    } else {
        alert("undefined move operation");
    }

    if (false) {
        alert("no one named as " + name);
        return;
    }
    if (false) {
        emitResult(name + "はゴールにたどり着いた");
    }

    return $defer.promise();
}

function checkCollision(name, dir) {
    let actor;
    if(typeof actor1 !== "undefined" && actor1.name===name){
        actor=actor1;
    }
    else if(typeof actor2 !== "undefined" && actor2.name === name){
        actor=actor2;
    }
    else{
        actor=tutorial;
    }
    if (dir === "west") {
        if (actor.x === 0) {
            return true;
        }
        if (data[(actor.x - 1) + "," + actor.y] === 1) {
            return true;
        }
    } else if (dir === "east") {
        if (actor.x === w + 1) {
            return true;
        }
        if (data[(actor.x - 0 + 1) + "," + actor.y] === 1) {
            return true;
        }
    } else if (dir === "north") {
        if (actor.y === 0) {
            return true;
        }
        if (data[actor.x + "," + (actor.y - 1)] === 1) {
            return true;
        }
    } else if (dir === "south") {
        if (actor.y === h + 1) {
            return true;
        }
        if (data[actor.x + "," + (actor.y - 0 + 1)] === 1) {
            return true;
        }
    } else {
        return false;
    }
}