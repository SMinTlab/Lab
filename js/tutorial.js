/* 
 * ======================================================================
 * Project Name    : StickParson
 * File Name       : tutorial.js
 * Encoding        : UTF-8
 * Creation Date   : 2017/12/01
 *
 * Copyright © 2017 Mitani. All rights reserved.
 *
 * This source code or any portion thereof must not be
 * reproduced or used in any manner whatsoever.
 * ======================================================================
 */
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
w = 5;
h = 5;
speed = 50;
pause = false;
language = "java";
let scheduler = new ROT.Scheduler.Simple();
let engine = new ROT.Engine(scheduler);
map = new ROT.Map.Arena(5, 5);
data = {};
area = [];
env = {};
let t_instxt = "player1repeatcounter = 0;\n";
let tileSet = document.createElement("img");
let options = {
    width: w + 2,
    height: h + 2,
    layout: "tile",
    bg: "transparent",
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
        "2@n4": [112, 196],
        "P#2": [0, 112],
        "P.2": [0, 140],
        "P#1": [140, 112],
        "P.1": [140, 140],
        "Z": [0, 168]
    }
};
let display = new ROT.Display(options);


$(function () {
    tileSet.src = "./asset/pics.png";

});

$(window).load(function () {
    t_restart();
    Draw(0, 0, ["Z"], "GLOBAL");
});

$(`button`).on(`click`, function () {
    let code = "";
    let op = $(this).parent(`*`).parent(`*`).attr(`id`).match(/.*(?=_api)/)[0];
    console.log(op);
    switch (op) {
        case "move":
            code = t_instxt + op + `(${$(this).parent(`*`).parent(`*`).children(`[name=arg1]`).children(`*`).children(`option:selected`).text()});`;
            t_actionbuffer(code);
            break;
        case "detect":
            code = t_instxt + "System.out.println(" + op + `(${$(this).parent(`*`).parent(`*`).children(`[name=arg1]`).children(`*`).children(`option:selected`).text()},${$(this).parent(`*`).parent(`*`).children(`[name=arg2]`).children(`*`).children(`option:selected`).text()})` + ");";
            t_actionbuffer2(code).then(function (r) {
                $(`#` + op + `_api .return`).children(`input`).val(r);
            });
            break;
        case "draw":
            code = t_instxt + op + `();`;
            t_actionbuffer(code);
            break;
        case "get_Position":
            code = t_instxt + "System.out.println(Arrays.toString(" + op + `()` + "));";
            t_actionbuffer2(code).then(function (r) {
                $(`#` + op + `_api .return`).children(`input`).val(r);
            });
            break;
        case "get_X":
            code = t_instxt + "System.out.println(" + op + `()` + ");";
            t_actionbuffer2(code).then(function (r) {
                $(`#` + op + `_api .return`).children(`input`).val(r);
            });
            break;
        case "get_Y":
            code = t_instxt + "System.out.println(" + op + `()` + ");";
            t_actionbuffer2(code).then(function (r) {
                $(`#` + op + `_api .return`).children(`input`).val(r);
            });
            break;
        case "get_Direction":
            code = t_instxt + "System.out.println(" + op + `()` + ");";
            t_actionbuffer2(code).then(function (r) {
                $(`#` + op + `_api .return`).children(`input`).val(r);
            });
            break;
        case "MapElem":
            code = t_instxt + "System.out.println(" + op + `(new int [] ${$(this).parent(`*`).parent(`*`).children(`[name=arg1]`).children(`*`).children(`option:selected`).text()}));`;
            t_actionbuffer2(code).then(function (r) {
                $(`#` + op + `_api .return`).children(`input`).val(r);
            });
            break;
        case "FORWARD":
            code = t_instxt + "System.out.println(" + op + `()` + ");";
            t_actionbuffer2(code).then(function (r) {
                $(`#` + op + `_api .return`).children(`input`).val(r);
            });
            break;
        case "BACKWARD":
            code = t_instxt + "System.out.println(" + op + `()` + ");";
            t_actionbuffer2(code).then(function (r) {
                $(`#` + op + `_api .return`).children(`input`).val(r);
            });
            break;
        case "RIGHT":
            code = t_instxt + "System.out.println(" + op + `()` + ");";
            t_actionbuffer2(code).then(function (r) {
                $(`#` + op + `_api .return`).children(`input`).val(r);
            });
            break;
        case "LEFT":
            code = t_instxt + "System.out.println(" + op + `()` + ");";
            t_actionbuffer2(code).then(function (r) {
                $(`#` + op + `_api .return`).children(`input`).val(r);
            });
            break;
        case "log":
            code = t_instxt + op + `("${$(this).parent(`*`).parent(`*`).children(`input`).val()}");`;
            t_actionbuffer(code).then(function (r) {
                $(`#` + op + `_api .return`).children(`input`).val(r);
            });
            break;
        default :
            code = "none";
            break;
    }
    //alert(code);

});

let tutorial = {
    name: "Tutorial",
    x:2,
    y:2,
    dir: "SOUTH",
    buf:[],
    draw_x: 2,
    draw_y: 2,
    logHuman: function(args){
        return logHuman(tutorial.name, args);
    },
    moveHuman: function(args){
        return moveHuman(tutorial.name, args).then(function(){
            tutorial.draw_x = tutorial.x;tutorial.draw_y = tutorial.y;
        });
    },
    drawHuman: function(args){
        return drawHuman(tutorial.name, args).then(function(){
            switch(tutorial.dir){
                case "SOUTH":tutorial.draw_x = tutorial.x; tutorial.draw_y = tutorial.y + 1;
                case "NORTH":tutorial.draw_x = tutorial.x; tutorial.draw_y = tutorial.y - 1;
                case "EAST":tutorial.draw_x = tutorial.x + 1; tutorial.draw_y = tutorial.y;
                case "WEST":tutorial.draw_x = tutorial.x - 1; tutorial.draw_y = tutorial.y;
                default :tutorial.draw_x = tutorial.x; tutorial.draw_y = tutorial.y;
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
            checkRules(name,tutorial.draw_x, tutorial.draw_y);
            //Player[name]["b"].shift();
            tutorial.buf.shift();
            Lighting();
        };
        console.log(tutorial.buf);
        if (pause === false) {
            let a;
            let func;
            if(Object.keys(/*Player[this.name]["b"]*/tutorial.buf).length > 0){
                a = tutorial.buf[0];
            }
            else{
                a = "tutorial.doNothing()";
            }
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
           console.log(a);
            func = eval(a);
            func.then(function () {
                done(tutorial.name);
            });
            //console.log(func);
            return func;
        } else {

            scheduler.remove(tutorial);
        }
    }
};

function t_actionbuffer(code) {
    console.log(code);
    pause = true;
    //Player[tutorial.name]["b"] = [];
    tutorial.buf=[];
    let src = jQuery.get("java/Main.java", function () {
        if (src.readyState === 4) {
            let result = replace(src.responseText, [
                [/MAP/g, js2darr_to_java2darr(data_to_js2darr(data))],
                [/AREA/g, js2darr_to_java2darr(area)],
                [/PLAYER1_NAME/g, tutorial.name],
                [/PLAYER2_NAME/g, "None"],
                [/PLAYER1_CODE/g, code],
                [/PLAYER2_CODE/g, ""],
                [/PLAYER1_X/g, tutorial.x],
                [/PLAYER1_Y/g, tutorial.y],
                [/PLAYER2_X/g, 0],
                [/PLAYER2_Y/g, 0],
                [/PLAYER1_DIR/g, tutorial.dir],
                [/PLAYER2_DIR/g, "SOUTH"]
            ]);

            $.postJSON("http://api.paiza.io:80/runners/create?",
                    {
                        source_code: result,
                        language: language,
                        longpoll: true,
                        longpoll_timeout: 10,
                        api_key: "guest"

                    },
                    function (data) {
                        operation_function(data).then(function () {
                            pause = false;
                            scheduler.add(tutorial, true);
                            engine.start();
                        });
                    }
            );
        }

    });
}
function t_actionbuffer2(code) {
    return new Promise(function (res, rej) {
        console.log(code);
        pause = true;
        //Player[tutorial.name]["b"] = [];
        tutorial.buf=[];
        let src = jQuery.get("java/Main.java", function () {
            if (src.readyState === 4) {
                let result = replace(src.responseText, [
                    [/MAP/g, js2darr_to_java2darr(data_to_js2darr(data))],
                    [/AREA/g, js2darr_to_java2darr(area)],
                    [/PLAYER1_NAME/g, tutorial.name],
                    [/PLAYER2_NAME/g, "None"],
                    [/PLAYER1_CODE/g, code],
                    [/PLAYER2_CODE/g, "player2repeatcounter = 0;\n"],
                    [/PLAYER1_X/g, tutorial.x],
                    [/PLAYER1_Y/g, tutorial.y],
                    [/PLAYER2_X/g, 0],
                    [/PLAYER2_Y/g, 0],
                    [/PLAYER1_DIR/g, tutorial.dir],
                    [/PLAYER2_DIR/g, "SOUTH"]
                ]);

                $.postJSON("http://api.paiza.io:80/runners/create?",
                        {
                            source_code: result,
                            language: language,
                            longpoll: true,
                            longpoll_timeout: 10,
                            api_key: "guest"

                        },
                        function (data) {
                            operation_function2(data).then(function (r) {
                                console.log(r);
                                res(r);
                            });
                        }
                );
            }

        });
    });

}
function operation_function2(data) {
    return new Promise(function (res, rej) {
        $.getJSON("http://api.paiza.io:80/runners/get_details?", {
            id: data.id,
            api_key: "guest"
        },
                function (data) {
                    console.log("stdout : " + data.stdout);
                    console.log("build_stderr : " + data.build_stderr);
                    if (data.build_stderr) {
                        alert("Build Standard Error: " + data.build_stderr);
                    }
                    if (data.stderr) {
                        alert("Standard Error: " + data.stderr);
                    }
                    if (data.status === "completed") {
                        res(data.stdout);
                    }
                });
    });
}

function t_restart() {
    area = Array.apply(null, Array(w + 2)).map(() => Array(h + 2).fill(0));//0:無色,1:青
    Player = {name: {x: 2, y: 2, d: "SOUTH", b: []}};
    env["GLOBAL"] = {};
    env[tutorial.name] = {};
    Player[tutorial.name] = {x: 2, y: 2, d: "SOUTH", b: []};
    tutorial.x=2;
    tutorial.y=2;
    tutorial.buf=[];
    tutorial.dir="SOUTH";
    area[2][2] = 1;
    map.create(function (x, y, wall) {
        console.log(x + "," + y);
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
    });
    Draw(2, 2, ["T1", "1@s1", "_"], tutorial.name);
    $(`#map`).append(display.getContainer());
}

