/* 
 * ======================================================================
 * Project Name    : HTML5Application
 * File Name       : finishHuman.js
 * Encoding        : UTF-8
 * Creation Date   : 2017/09/07
 *
 * Copyright © 2017 Mitani. All rights reserved.
 *
 * This source code or any portion thereof must not be
 * reproduced or used in any manner whatsoever.
 * ======================================================================
 */

function finishHuman(name) {
    return new Promise(function (res, rej) {
        let tmp = env[name][Player[name].x + "," + Player[name].y];
        Array.prototype.push.apply(tmp, ["_"]);
        //console.log(tmp);
        
        Draw(display1, Player[name].x, Player[name].y, tmp,"","", name);
        Redraw(display1, {x: 0, y: 0});
        //Lighting();
        res();
    });
}

