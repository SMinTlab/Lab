/* 
 * ======================================================================
 * Project Name    : HTML5Application
 * File Name       : detectWall.js
 * Encoding        : UTF-8
 * Creation Date   : 2017/06/02
 *
 * Copyright © 2017 Mitani. All rights reserved.
 *
 * This source code or any portion thereof must not be
 * reproduced or used in any manner whatsoever.
 * ======================================================================
 */
function detectHuman(name, dummy){
    if(Max===null)
        return;
    let elem = document.getElementById(name);
    if(elem.getAttribute("class")==="human_foward")
        return MapArray[Player.x][Player.y-1]==="#";
    else if(elem.getAttribute("class")==="human_left")
        return MapArray[Player.x-1][Player.y]==="#";
    else if(elem.getAttribute("class")==="human_back")
        return MapArray[Player.x][Player.y+1]==="#";
    else if(elem.getAttribute("class")==="human_right")
        return MapArray[Player.x+1][Player.y]==="#";
    else
        console.log("where does he/her look ?");
}

