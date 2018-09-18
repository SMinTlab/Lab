/* 
 * ======================================================================
 * Project Name    : HTML5Application
 * File Name       : operationAdapter.js
 * Encoding        : UTF-8
 * Creation Date   : 2017/04/13
 *
 * Copyright © 2017 Mitani. All rights reserved.
 *
 * This source code or any portion thereof must not be
 * reproduced or used in any manner whatsoever.
 * ======================================================================
 */

function OperationAdapter(data) {
    var op = String(data).split('');
    var opseek = 0;
    var TempleteClassSurfix="Human";
    loop();
    function loop () {
        var seekres = opSeeker(op, opseek);
        var name = seekres.x;
        opseek = seekres.y + 1;
        seekres = opDeterminater(op, opseek);
        var opname = seekres.x;
        opseek = seekres.y + 1;
        seekres = opArgumentsgetter(op, opseek);
        var opargs = seekres.x;
        opseek = seekres.y + 2;//")","\n"
        console.log("name = " + name + ",opname = " + opname + ",opargs = " + opargs);
        console.log(opname+TempleteClassSurfix+`("`+name+`","`+opargs+`").then(function(){if(opseek < op.length - 1){loop();}else{return;}});`);
        eval(opname+TempleteClassSurfix+`("`+name+`","`+opargs+`").then(function(){if(opseek < op.length - 1){loop();}else{return;}},function(log){console.log(log);return;});`);
        
    }
    
}


function opSeeker(op, i) {
    var receiver = "";
    for (i; i < op.length; i++) {
        if (op[i] === ".") {
            return {x: receiver, y: i};
        }
        receiver = receiver + op[i];
    }
}


function opDeterminater(op, i) {
    var opname = "";
    for (i; i < op.length; i++) {
        if (op[i] === "(") {
            return {x: opname, y: i};
        }
        opname = opname + op[i];
    }
}


function opArgumentsgetter(op, i) {
    var opargs = "";
    for (i; i < op.length; i++) {
        if (op[i] === ")") {
            return {x: String(opargs).split(','), y: i};
        }

        opargs = opargs + op[i];
    }
}