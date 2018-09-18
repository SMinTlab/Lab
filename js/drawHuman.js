/* 
 * ======================================================================
 * Project Name    : HTML5Application
 * File Name       : drawHuman.js.js
 * Encoding        : UTF-8
 * Creation Date   : 2017/10/16
 *
 * Copyright © 2017 Mitani. All rights reserved.
 *
 * This source code or any portion thereof must not be
 * reproduced or used in any manner whatsoever.
 * ======================================================================
 */

function drawHuman(name, args) {
    return new Promise(function (res, rej) {
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
        let tmp = env[name][actor.x + "," + actor.y].join().match(/[swen]/);
        //console.log(env[name]);
        if (tmp !== null) {
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
                an = 1;
            }

            if (tmp[0] === "s") {
                let cal = actor.y - 0 + 1;
                if (area[actor.x - 0][cal] === 0) {
                    area[actor.x - 0][cal] = an;
                    Draw(actor.x, cal, data[actor.x + "," + cal] === 0 ? ["T" + an] : ["T#" + an], name);
                    //console.log(name + " drew the tile at " + actor.x + "," + cal);

                }
                res();
            }
            if (tmp[0] === "w") {
                let cal = actor.x - 1;
                if (area[cal][actor.y - 0] === 0) {
                    area[cal][actor.y - 0] = an;
                    Draw(cal, actor.y, data[cal + "," + actor.y] === 0 ? ["T" + an] : ["T#" + an], name);
                    //console.log(name + " drew the tile at " + cal + "," + actor.y);

                }
                res();
            }
            if (tmp[0] === "e") {
                let cal = actor.x - 0 + 1;
                if (area[cal][actor.y - 0] === 0) {
                    area[cal][actor.y - 0] = an;
                    Draw(cal, actor.y, data[cal + "," + actor.y] === 0 ? ["T" + an] : ["T#" + an], name);
                    //console.log(name + " drew the tile at " + cal + "," + actor.y);
                }
                res();
            }
            if (tmp[0] === "n") {
                let cal = actor.y - 1;
                if (area[actor.x - 0][cal] === 0) {
                    area[actor.x - 0][cal] = an;
                    Draw(actor.x, cal, data[actor.x + "," + cal] === 0 ? ["T" + an] : ["T#" + an], name);
                    //console.log(name + " drew the tile at " + actor.x + "," + cal);
                }
                res();
            }

        }


    });
}


