/* 
 * ======================================================================
 * Project Name    : HTML5Application
 * File Name       : TurnController.js
 * Encoding        : UTF-8
 * Creation Date   : 2017/09/13
 *
 * Copyright © 2017 Mitani. All rights reserved.
 *
 * This source code or any portion thereof must not be
 * reproduced or used in any manner whatsoever.
 * ======================================================================
 */

function stackActions(action, name) {
    console.log(waitlimit);
    return new Promise(function (res, rej) {
        console.log(actionstack);
        let tmp = Object.keys(actionstack).length;
        if (waitlimit < 0) {
            actionstack[tmp] = {action: action, name: name};
            waitlimit = 10;
            res();
        } else if (Object.keys(actionstack).length === 0) {
            actionstack[tmp] = {action: action, name: name};
            waitlimit = 10;
            res();
        } else if (actionstack[tmp - 1].name !== name) {
            actionstack[tmp] = {action: action, name: name};
            waitlimit = 10;
            res();
        } else {
            setTimeout(function () {
                waitlimit = waitlimit - 1;
                stackActions(action, name).then(function () {
                    res();
                });
            }, 150);

        }
    });
}

function stackActions2(action, name) {
    return new Promise(function (res, rej) {
        //console.log(Player);
        if (action.search(/create/) !== -1) {
            let idxS = action.search(/\(/) + 1;
            let idxG = action.search(/,/);
            let n = action.slice(idxS, idxG);
            action = action.replace(n, `"` + n + `"`);
            idxS = idxG + 2 + 1;
            idxG = action.search(/\)/);
            n = action.slice(idxS, idxG);
            action = action.replace(n, `"` + n + `"`);
            //console.log(action);
            eval(action + `.then(function(){res(0);})`);
        } else {
            Player[name]["b"].push(action);
            res(0);
        }
    });
}

function stackActions3(actions){
    let $defer = new $.Deferred();
    let actor;
    let arr = actions.split("\n");
    
    Object.keys(arr).forEach(function(e,i,a){
        
        let argstxt = arr[e].slice(arr[e].search(/\(/)+1, arr[e].search(/\)/));
        let args = [];
        if(argstxt.length>0){
            Object.keys(argstxt.split(/(?:\s),|,(?:\s)|,/)).forEach(function(e,i,a){
                args.push(`"`+argstxt.split(/(?:\s),|,(?:\s)|,/)[e]+`"`);
            });
        }
        let com = args.length ? "," : "";
        if(arr[e].match(/.+(?=\.)/)){
            //console.log(`"`+arr[e].match(/.+(?=\.)/)[0]+`"`);
            //console.log(Player);
            //Player[arr[e].match(/.+(?=\.)/)[0]]["b"].push(arr[e].match(/\..+/)[0].slice(1).splice(arr[e].match(/\..+/)[0].slice(1).search(/\(/) + 1, arr[e].match(/\..+/)[0].slice(1).search(/\)/) , `"` + arr[e].match(/.+(?=\.)/)[0] + `"` + com + args.join(`,`)+`)`));
            //console.log(arr[e].match(/\..+/)[0].slice(1).splice(arr[e].match(/\..+/)[0].slice(1).search(/\(/) + 1, arr[e].match(/\..+/)[0].slice(1).search(/\)/) , `"` + arr[e].match(/.+(?=\.)/)[0] + `"` + com + args.join(`,`)+`)`));
            if(typeof actor1 !== "undefined" && actor1.name===arr[e].match(/.+(?=\.)/)[0]){
                actor=actor1;
            }
            else if(typeof actor2 !== "undefined" && actor2.name===arr[e].match(/.+(?=\.)/)[0]){
                actor=actor2;
            }
            else{
                actor=tutorial;
            }
            actor.buf.push(arr[e].match(/\..+/)[0].slice(1).splice(arr[e].match(/\..+/)[0].slice(1).search(/\(/) + 1, arr[e].match(/\..+/)[0].slice(1).search(/\)/) , `"` + arr[e].match(/.+(?=\.)/)[0] + `"` + com + args.join(`,`)+`)`));
        }
        if(a.length-1===i){
            $defer.resolve();
        }
    });
    return $defer.promise();
}
/*
process.stdin.resume();
process.stdin.setEncoding('utf8');
// Your code here!
String.prototype.splice = function (idx, rem, s) {
    return (this.slice(0, idx) + s + this.slice(idx + Math.abs(rem)));
};
var txt = "John.move()";
console.log(txt.match(/.+(?=\.)/));
console.log(txt.match(/\..+/)[0].slice(1));
console.log(txt.search(/\./));
console.log(txt.search(/\(/));
var argstxt = txt.slice(txt.search(/\(/)+1, txt.search(/\)/));
console.log(argstxt);
console.log(argstxt.split(/(?:\s),|,(?:\s)|,/));
var args = [];
if(argstxt.length>0){
    Object.keys(argstxt.split(/(?:\s),|,(?:\s)|,/)).forEach(function(e,i,a){
    console.log(argstxt.split(/(?:\s),|,(?:\s)|,/)[e]);
    args.push(`"`+argstxt.split(/(?:\s),|,(?:\s)|,/)[e]+`"`);
    });
}

console.log(args);
console.log(args.length ? "," : "");
var com = args.length ? "," : "";

console.log(txt.match(/\..+/)[0].slice(1).splice(txt.match(/\..+/)[0].slice(1).search(/\(/) + 1, txt.match(/\..+/)[0].slice(1).search(/\)/) , `"` + txt.match(/.+(?=\.)/)[0] + `"` + com + args.join(`,`)+`)`));
*/
function stackActions4(actions){
    let $defer = new $.Deferred();
    let actor;
    let arr = actions.split("\n");
    Object.keys(arr).forEach(function(e,i,a){
        let argstxt = arr[e].slice(arr[e].search(/\(/)+1, arr[e].search(/\)/));
        let args = [];
        if(argstxt.length>0){
            Object.keys(argstxt.split(/(?:\s),|,(?:\s)|,/)).forEach(function(e,i,a){
                args.push(`"`+argstxt.split(/(?:\s),|,(?:\s)|,/)[e]+`"`);
            });
        }
        if(arr[e].match(/.+(?=\.)/)){
            if(typeof actor1 !== "undefined" && actor1.name===arr[e].match(/.+(?=\.)/)[0]){
                actor="actor1";
            }
            else if(typeof actor2 !== "undefined" && actor2.name===arr[e].match(/.+(?=\.)/)[0]){
                actor="actor2";
            }
            else{
                actor="tutorial";
            }
            eval(actor).buf.push(actor+arr[e].match(/\..+(?=\()/)+"("+args.join(",")+")");
        }
        if(a.length-1===i){
            $defer.resolve();
        }
    });
    return $defer.promise();
}