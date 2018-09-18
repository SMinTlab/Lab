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
function wait(sec) {
    let d = $.Deferred();
    setTimeout(function () {
        d.resolve();
    }, sec * 1000);
    return d.promise();
}

function OperationAdapter(data) {
    return new Promise(function (res, rej) {
        if (data === "") {
            res();
        } else {
            let TempleteClassSurfix = "Human";
            let op = String(data).split('');
            let opseek = 0;
            loop(op, opseek).then(function () {
                res();
            });
            function loop(op, opseek) {
                let d = new $.Deferred();
                let seekres = opSeeker(op, opseek);
                let name = seekres.x;
                opseek = seekres.y + 1;
                seekres = opDeterminater(op, opseek);
                let opname = seekres.x;
                opseek = seekres.y + 1;
                seekres = opArgumentsgetter(op, opseek);
                let opargs = seekres.x;
                opseek = seekres.y + 2;//")","\n"
                /*
                 console.log("name = " + name + ",opname = " + opname + ",opargs = " + opargs);
                 eval(opname+TempleteClassSurfix+`("`+name+`","`+opargs+`").then(
                 function(){
                 if(opseek < op.length - 1){
                 
                 wait(0.2).then(function(){
                 loop();
                 });
                 }
                 else{
                 return;
                 }
                 },function(e){
                 console.log("error : "+e);
                 })`
                 );
                 */
                eval(`stackActions2("` + opname + TempleteClassSurfix + `(` + name + `,` + opargs + `)","` + name + `").then(
                        function(){
                            if(opseek < op.length - 1){
                                //console.log("looped");
                                d.resolve();
                                return loop(op, opseek);
                            }
                            else{
                                console.log("stack ended.");
                                d.resolve();
                            }
                        },function(e){
                                    console.log("error : "+e);
                        });`
                        );
                return d.promise();
            }
        }
    });
}


function opSeeker(op, i) {
    let receiver = "";
    for (i; i < op.length; i++) {
        if (op[i] === ".") {
            return {x: receiver, y: i};
        }
        receiver = receiver + op[i];
    }
}


function opDeterminater(op, i) {
    let opname = "";
    for (i; i < op.length; i++) {
        if (op[i] === "(") {
            return {x: opname, y: i};
        }
        opname = opname + op[i];
    }
}


function opArgumentsgetter(op, i) {
    let opargs = "";
    for (i; i < op.length; i++) {
        if (op[i] === ")") {
            return {x: String(opargs).split(','), y: i};
        }

        opargs = opargs + op[i];
    }
}