/*
 * ======================================================================
 * Project Name    : HTML5Application
 * File Name       : createHuman.js
 * Encoding        : UTF-8
 * Creation Date   : 2017/04/12
 *
 * Copyright © 2017 Mitani. All rights reserved.
 *
 * This source code or any portion thereof must not be
 * reproduced or used in any manner whatsoever.
 * ======================================================================
 */
let initpos_left = 0, initpos_top = window.innerHeight - 50;
let number_of_human = 0;

function createHuman_old(name, dummy) {
    return new Promise(function (res, rej)
    {
        if (document.getElementById(name)) {
            console.log(name + " is already created.");
        } else {
            let humantab = document.getElementById("humantab");
            let divnode = document.createElement("div");
            divnode.setAttribute("id", name);
            divnode.setAttribute("class", "human_foward");
            //divnode.setAttribute("style", `position:absolute;left:` + initpos_left + `px;top:` + initpos_top + `px`);
            divnode.setAttribute("style", `position:absolute;`);
            humantab.appendChild(divnode);
            number_of_human++;
            let humanH = 28 * Start.y, humanW = 28 * Start.x;
            document.getElementById(name).style.top = humanH + "px";
            document.getElementById(name).style.left = humanW + "px";
            Player[name] = {x: Start.x, y: Start.y};
        }
        res();

    });
}

/*Appropriate global variables are needed before this function.*/
function createHuman(name, args) {
    return new Promise(function (res, rej)
    {
        if (Object.keys(Player).indexOf(name) !== -1) {
            console.log(name + " is already created.");
            env[name][Player[name].x + "," + Player[name].y].pop();
        } else {
            env[name] = {};
            number_of_human++;
            let arr = args.split(",");
            Player[name] = {x: arr[0], y: arr[1], s: arr[2], b: []};
            area[arr[0]][arr[1]] = 1;
            Draw(display1, arr[0], arr[1], ["T1", "@d1"], "", "", name);
            /*途中、Playersは宣言より前の位置で使用されていることに留意*/
            let scelm = document.getElementById("scores");
            let divelm = document.createElement("div");
            let inpelm = document.createElement("input");
            divelm.setAttribute("id", name);
            divelm.innerHTML = name;
            inpelm.setAttribute("type", "text");
            inpelm.setAttribute("name", name);
            inpelm.setAttribute("value", "0");
            inpelm.setAttribute("readonly", "readonly");
            divelm.appendChild(inpelm);
            scelm.appendChild(divelm);
        }
        res();

    });
}