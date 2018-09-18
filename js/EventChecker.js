/* 
 * ======================================================================
 * Project Name    : HTML5Application
 * File Name       : EventChecker.js
 * Encoding        : UTF-8
 * Creation Date   : 2017/05/19
 *
 * Copyright © 2017 Mitani. All rights reserved.
 *
 * This source code or any portion thereof must not be
 * reproduced or used in any manner whatsoever.
 * ======================================================================
 */
function getEdges() {
    let element = document.getElementById("stage");
    let rect = element.getBoundingClientRect();
    let position = {x: rect.left + window.pageXOffset, y: rect.top + window.pageYOffset};
    let edges = {x: position.x + element.clientWidth, y: position.y + element.clientHeight};
    return edges;
}
function checkCollision(name,dir) {
    if(Max===null){
        let Edges = getEdges();
        return;
    }
    else{
        let Edges = {x:(Max.x - 1), y:(Max.y - 1)};
    }
    console.log(Player[name]);
    console.log(MapArray[Player[name].y][Player[name].x]);
    //console.log(Edges);
    if (dir === "left") {
        if(Player[name].x === 0){
            return true;
        }
        if(MapArray[Player[name].y][Player[name].x - 1]==="#"){
            return true;
        }
    }
    if (dir === "right") {
        if(Player[name].x === Edges.x){
            return true;
        }
        if(MapArray[Player[name].y][Player[name].x + 1]==="#"){
            return true;
        }
    }
    if (dir === "up") {
        if(Player[name].y === 0){
            return true;
        }
        if(MapArray[Player[name].y - 1][Player[name].x]==="#"){
            return true;
        }
    }
    if (dir === "down") {
        if(Player[name].y === Edges.y){
            return true;
        }
        if(MapArray[Player[name].y + 1][Player[name].x]==="#"){
            return true;
        }
    }
    
    return false;
}
function checkGoal(name){
    if(Player[name].x===Goal.x&&Player[name].y===Goal.y){
        return true;
    }
}
