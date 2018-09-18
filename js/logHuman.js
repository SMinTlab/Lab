/* 
 * ======================================================================
 * Project Name    : StickParson
 * File Name       : log.js
 * Encoding        : UTF-8
 * Creation Date   : 2018/09/18
 *
 * Copyright © 2018 Mitani. All rights reserved.
 *
 * This source code or any portion thereof must not be
 * reproduced or used in any manner whatsoever.
 * ======================================================================
 */

function logHuman(name, args) {
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
    let $defer = new $.Deferred();

    console.log(name+" >> "+args);
    let txtarea = $("#outlog textarea");
    let badge = $("#outLog span");
    txtarea.text(txtarea.text()===""?args:txtarea.text()+"\n"+args);
    badge.text(Number(badge.text())+1);
    $defer.resolve();

    if (false) {
        alert("no one named as " + name);
        return;
    }

    return $defer.promise();
}
