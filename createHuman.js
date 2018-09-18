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

function createHuman(name, dummy) {
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
            divnode.setAttribute("style", `position:relative;`);
            humantab.appendChild(divnode);
            number_of_human++;

        }
        setWindowSize(name);
        res();

    });

}