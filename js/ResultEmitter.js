/* 
 * ======================================================================
 * Project Name    : HTML5Application
 * File Name       : ResultEmitter.js
 * Encoding        : UTF-8
 * Creation Date   : 2017/06/01
 *
 * Copyright © 2017 Mitani. All rights reserved.
 *
 * This source code or any portion thereof must not be
 * reproduced or used in any manner whatsoever.
 * ======================================================================
 */
function emitResult(result){
    let elem = document.getElementById("result");
    let divnode = document.createElement("div");
    divnode.innerHTML=result;
    elem.appendChild(divnode);
}

function saveLogs(name,action,args){
    let elem = document.getElementById("log");
    let divnode = document.createElement("div");
    divnode.innerHTML=name+`.`+action+`(`+args+`) (`+Player[name].x+`,`+Player[name].y+`)`;
    elem.appendChild(divnode);   
}
