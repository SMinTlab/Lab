/* 
 * ======================================================================
 * Project Name    : StickParson
 * File Name       : main.js
 * Encoding        : UTF-8
 * Creation Date   : 2017/12/04
 *
 * Copyright © 2017 Mitani. All rights reserved.
 *
 * This source code or any portion thereof must not be
 * reproduced or used in any manner whatsoever.
 * ======================================================================
 */

let rankphpurl;
let logphpurl;
let chalogphpurl;
let finalizeurl;
let turn = 0;
let w = 20;
let h = 20;
let area=[];
//let Player = [];
let env = [];//[tilename]
let speed = 10;
let actionstack = [];
let mod = 0;//編集回数
let isMoving = false;
let pause = false;
let data = {};
let map = new ROT.Map.DividedMaze(w, h);
let tileSet = document.createElement("img");
let display = new ROT.Display(
        {width: w + 2,
            height: h + 2,
            bg: "transparent",
            layout: "tile",
            tileWidth: 28,
            tileHeight: 28,
            tileSet: tileSet,
            tileMap: {
                "1@s1": [28, 0],
                "1@s2": [28, 28],
                "1@s3": [28, 56],
                "1@s4": [28, 84],
                "1@w1": [56, 0],
                "1@w2": [56, 28],
                "1@w3": [56, 56],
                "1@w4": [56, 84],
                "1@e1": [84, 0],
                "1@e2": [84, 28],
                "1@e3": [84, 56],
                "1@e4": [84, 84],
                "1@n1": [112, 0],
                "1@n2": [112, 28],
                "1@n3": [112, 56],
                "1@n4": [112, 84],
                "#": [0, 0],
                ".": [0, 28],
                "T2": [0, 56],
                "T#2": [0, 84],
                "T1": [140, 0],
                "T#1": [140, 28],
                "_": [140, 56],
                "L": [140, 84],
                "2@s1": [28, 112],
                "2@s2": [28, 140],
                "2@s3": [28, 168],
                "2@s4": [28, 196],
                "2@w1": [56, 112],
                "2@w2": [56, 140],
                "2@w3": [56, 168],
                "2@w4": [56, 196],
                "2@e1": [84, 112],
                "2@e2": [84, 140],
                "2@e3": [84, 168],
                "2@e4": [84, 196],
                "2@n1": [112, 112],
                "2@n2": [112, 140],
                "2@n3": [112, 168],
                "2@n4": [112, 196],
                "P#2": [0, 112],
                "P.2": [0, 140],
                "P#1": [140, 112],
                "P.1": [140, 140],
                "Z": [0, 168]
            }
        });
let scheduler = new ROT.Scheduler.Simple();
let engine = new ROT.Engine(scheduler);
let editor1 = ace.edit("editor1"), editor2 = ace.edit("editor2");
let code1 = `move("south");
move("east");
`;
let code2 = `
    if(!detect(FORWARD(), OBJECT.WALL)){
        if(detect(LEFT(), OBJECT.WALL)){
            move(FORWARD());
        }
        else{
            move(LEFT());
        }
    }
    else{
        draw();
        if(detect(LEFT(), OBJECT.WALL)){
            move(RIGHT());
        }
        else{
            move(LEFT());
        }
    }
`;
let actor1 = {
    name: $("#Player1").text(),
    x:2,
    y:2,
    dir:"SOUTH",
    buf:[],
    draw_x: 2,
    draw_y: 2,
    moveHuman: function(args){
        return moveHuman(actor1.name, args).then(function(){
            actor1.draw_x = actor1.x;
            actor1.draw_y = actor1.y;
        });
    },
    drawHuman: function(args){

        return drawHuman(actor1.name, args).then(function(){
            switch(actor1.dir){
                case "SOUTH":actor1.draw_x = actor1.x; actor1.draw_y = actor1.y + 1;
                case "NORTH":actor1.draw_x = actor1.x; actor1.draw_y = actor1.y - 1;
                case "EAST":actor1.draw_x = actor1.x + 1; actor1.draw_y = actor1.y;
                case "WEST":actor1.draw_x = actor1.x - 1; actor1.draw_y = actor1.y;
                default :actor1.draw_x = actor1.x; actor1.draw_y = actor1.y;
            }
        });
    },
    doNothing: function(){
      return new Promise(function(res, rej){
          res();
      });  
    },
    act: function () {
        let done = function (name) {
            checkRules(name, actor1.draw_x, actor1.draw_y);
            //console.log(name + " checked the Rules.");
            calc_turn(turn + 1);
            //Player[name]["b"].shift();
            actor1.buf.shift();
            if (turn > 999) {
                scheduler.remove(actor1);
                gameover();
            }
            //Lighting();
        };
        if (pause === false) {
            let a;
            let func;
            if(Object.keys(/*Player[this.name]["b"]*/actor1.buf).length > 0){
                a = actor1.buf[0];
            }
            else{
                a="actor1.doNothing()";
            }
            func = eval(a);
            actionstack.push(a);
            func.then(function () {
                    done(actor1.name);
                });
                //console.log(func);
            return func;
            //let a = Player[this.name]["b"][0];
            
            /*
            let idxS = a.search(/\(/) + 1;
            let idxG = a.search(/,/);
            let n = a.slice(idxS, idxG);
            a = a.replace(n, `"` + n + `"`);
            if (a.match(/finish/) === null && a.match(/draw/) === null) {
                idxS = idxG + 2 + 1;
                idxG = a.search(/\)/);
                n = a.slice(idxS, idxG);
                a = a.replace(n, `"` + n + `"`);
            }
            */
            
        } else {
            Lighting();
            scheduler.remove(actor1);
        }
    }
};

let actor2 = {
    name: $("#Player2").text(),
    x:w-1,
    y:h-1,
    dir:"SOUTH",
    buf:[],
    draw_x: w-1,
    draw_y: h-1,
    moveHuman: function(args){
        return moveHuman(actor2.name, args).then(function(){
            actor2.draw_x = actor2.x;actor2.draw_y = actor2.y;
        });
    },
    drawHuman: function(args){
        return drawHuman(actor2.name, args).then(function(){
            switch(actor2.dir){
                case "SOUTH":actor2.draw_x = actor2.x; actor2.draw_y = actor2.y + 1;
                case "NORTH":actor2.draw_x = actor2.x; actor2.draw_y = actor2.y - 1;
                case "EAST":actor2.draw_x = actor2.x + 1; actor2.draw_y = actor2.y;
                case "WEST":actor2.draw_x = actor2.x - 1; actor2.draw_y = actor2.y;
                default :actor2.draw_x = actor2.x; actor2.draw_y = actor2.y;
            }
        });
    },
    doNothing: function(){
      return new Promise(function(res, rej){
          res();
      });  
    },
    act: function () {
        let done = function (name) {
            checkRules(name,actor2.draw_x, actor2.draw_y);
            calc_turn(turn + 1);
            //Player[name]["b"].shift();
            actor2.buf.shift();
            //Lighting();
            if (turn > 999) {
                scheduler.remove(actor2);
                gameover();
            }
        };
        if (pause === false) {
            let a;
            let func;
            if(Object.keys(/*Player[this.name]["b"]*/actor2.buf).length > 0){
                a = actor2.buf[0];
            }
            else{
                a = "actor2.doNothing()";
            }
            actionstack.push(a);
            func = eval(a);
            //let a = Player[this.name]["b"][0];
            
            /*
            let idxS = a.search(/\(/) + 1;
            let idxG = a.search(/,/);
            let n = a.slice(idxS, idxG);
            a = a.replace(n, `"` + n + `"`);
            if (a.match(/finish/) === null && a.match(/draw/) === null) {
                idxS = idxG + 2 + 1;
                idxG = a.search(/\)/);
                n = a.slice(idxS, idxG);
                a = a.replace(n, `"` + n + `"`);
            }
            */
            
            func.then(function () {
                done(actor2.name);
            });
            //console.log(func);
            return func;
        } else {
            Lighting();
            scheduler.remove(actor2);
            if (pause === false) {
                actionbuffer();
            }
        }
    }
};
$(function () {
    init_editor(editor1, "java", 14, code1);
    init_editor(editor2, "java", 14, code2);
    $(".disabled").click(function () {
        return false;
    });

    $(`body`).append(out1);
    $(`body`).append(out2);
    $(`body`).append(out3);
    //ROT.RNG.setSeed(12345);
    let seedmin = 0;
    let seedmax = 100000;
    ROT.RNG.setSeed(Math.floor( Math.random() * (seedmax + 1 - seedmin) ) + seedmin);
    DIR_NORTH = 0;
    DIR_SOUTH = 4;
    DIR_WEST = 6;
    DIR_EAST = 2;
    if (ROT.isSupported() === false) {
        alert("お使いのブラウザでは本システムの対応をしておりません.");
    } else {
        if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
            alert("お使いのブラウザではFile APIに一部対応していない場合がありますので予めご了承ください.");
        }
    }
    tileSet.src = "asset/pics.png";
});

$(window).load(function () {
    init_map();
    init_globvars();
    $("canvas").on("keydown", function (e) {
        let code = e.keyCode;
        let txt = "";
        console.log("isMoving = " + isMoving);
        if (code === 37 || code === 38 || code === 39 || code === 40) {
            if (isMoving === true) {
                txt = "StickParson is still moving!";
            } else {
                isMoving = true;
                Controller(code);
            }
        }


        let vk = "?"; /* find the corresponding constant */
        for (let name in ROT) {
            if (ROT[name] === code && name.indexOf("VK_") === 0) {
                vk = name;
            }
        }

        out1.html = "Keydown: code is " + code + " (" + vk + ")";
        out3.html = txt;
    });

    $("canvas").on("keypress", function (e) {
        let code = e.charCode;
        let ch = String.fromCharCode(code);
        out2.html = "Keypress: char is " + ch;
    });
    $(window).on("keydown", function (e) {
        if (document.activeElement.nodeName === "CANVAS") {
            let code = e.keyCode;
            switch (code) {
                case 37:
                case 38:
                case 39:
                case 40:
                    e.preventDefault();
                default :
                    break;
            }
        }
    });
    editor1.focus();
});
$(document).on(`click`,`#finalizeUserdata`,function(){
    return new Promise(function(res,rej){
        $.ajax({
        type: "POST",
        data: "",
        url: finalizeurl,
        success: function(data, dataType) {
          console.log(data);
          location.reload();
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          console.log("Error : " + XMLHttpRequest.status + "(" + textStatus + ")," + errorThrown);
        },
        complete: function() {
          
        }
      });
    });
});

$(document).on(`click`,`#logtest`,function () {
    let src = jQuery.get("java/Main.java", function () {
        if (src.readyState === 4) {
            let result = replace(src.responseText, [
                [/MAP/g, js2darr_to_java2darr(data_to_js2darr(data))],
                [/AREA/g, js2darr_to_java2darr(area)],
                [/PLAYER1_NAME/g, actor1.name],
                [/PLAYER2_NAME/g, actor2.name],
                [/PLAYER1_CODE/g, editor1.getValue()],
                [/PLAYER2_CODE/g, editor2.getValue()],
                [/PLAYER1_X/g, actor1.x],
                [/PLAYER1_Y/g, actor1.y],
                [/PLAYER2_X/g, actor1.x],
                [/PLAYER2_Y/g, actor2.y]
            ]);
            mod++;
            code_logger(result);
        }
    });
});
$(document).on(`click`,`#lighting`,function () {
    Lighting();
});
$(document).on(`click`,`#array`,function () {
    console.log(js2darr_to_java2darr(data_to_js2darr(data)));
});

$(document).on(`change`,'#speed',function () {
    speed = $(`#speed`).val();
});
$(document).on(`click`,'#envout',function () {
    console.log(env);
});
$(document).on(`click`,'#gameover',function () {
    gameover();
});
$(document).on(`click`,`#rankreload`,function () {
    ref();
    refP1($("#Player1").text());
});
$(document).on(`click`,"#ranking",function () {
    let name = $("#Player1").text();
    new_ranking(name, $(`#${name}`).children(`input`).val(), editor1.getValue());
});
/*再描画*/
$(`#mappan`).click(function (e) {
    if (pause === false) {
        alert("実行中はマップを変更できません.");
    } else {
        calc_turn(0);
        mod = 0;
        actionstack = [];
        //Player = [];
        Object.keys(env).forEach(function (e, i, a) {
            env[e] = {};
        });
        map.create(function (x, y, wall) {
            //console.log(x+","+y);
            let tmp = [x + 1, y + 1, x + 2, y + 2];
            let tmp2 = [w + 1, h + 1];
            data[tmp[0] + "," + tmp[1]] = wall;
            display.draw(tmp[0], tmp[1], wall ? "#" : ".", "transparent");
            if (x === 0 || y === 0) {
                if (x === 0) {
                    data[0 + "," + tmp[1]] = 1;
                    display.draw(0, tmp[1], "#", "transparent");
                    if (y === h - 1) {
                        data[0 + "," + tmp2[1]] = 1;
                        display.draw(0, tmp2[1], "#", "transparent");
                    }
                }
                if (y === 0) {
                    data[tmp[0] + "," + 0] = 1;
                    display.draw(tmp[0], 0, "#", "transparent");
                    if (x === w - 1) {
                        data[tmp2[0] + "," + 0] = 1;
                        display.draw(tmp2[0], 0, "#", "transparent");
                    }
                }
            }
            if (x === w - 1 || y === h - 1) {
                if (x === w - 1) {
                    data[tmp2[0] + "," + tmp[1]] = 1;
                    display.draw(tmp2[0], tmp[1], "#", "transparent");
                    if (y === h - 1) {
                        data[tmp2[0] + "," + tmp[3]] = 1;
                        display.draw(tmp2[0], tmp[3], "#", "transparent");
                    }
                }
                if (y === h - 1) {
                    data[tmp[0] + "," + tmp2[1]] = 1;
                    display.draw(tmp[0], tmp2[1], "#", "transparent");
                }
            }
            data["0,0"] = 1;
        });
        $(`#scores`).empty();
        init_globvars();
        $("canvas").focus();
        console.log(data);
        console.log(js2darr_to_java2darr(area));
        console.log(js2darr_to_java2darr(data_to_js2darr(data)));
    }
});

$(document).on("change","#opcodepeep", function () {
    if ($(this).is(`:checked`)) {

        $(".disabled").addClass("enabled");
        $(".disabled").removeClass("disabled");
        $(".enabled").off("click");
    } else {
        $(".enabled").addClass("disabled");
        $(".disabled").removeClass("enable");
        $(".disabled").click(function () {
            return false;
        });
        $("#Player1").click();
    }
});

$("#speedrange").change(function () {
    speed = this.value;

});
