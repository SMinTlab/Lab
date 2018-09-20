/*
 * ======================================================================
 * Project Name    : HTML5Application
 * File Name       : rottest.js
 * Encoding        : UTF-8
 * Creation Date   : 2017/07/06
 *
 * Copyright © 2017 Mitani. All rights reserved.
 *
 * This source code or any portion thereof must not be
 * reproduced or used in any manner whatsoever.
 * ======================================================================
 */

String.prototype.splice = function (idx, rem, s) {
    return (this.slice(0, idx) + s + this.slice(idx + Math.abs(rem)));
};
jQuery.postJSON = function (url, data, callback) {
    return jQuery.post(url, data, callback, "json");
};

function wait(sec) {
    return new Promise(function (res, rej) {
        setTimeout(function () {
            res();
        }, sec * 1000);
    });
}

function replace(source, replacers) {
    let replaced = source;
    for (const replacer of replacers) {
        replaced = replaced.replace(replacer[0], replacer[1]);
    }
    return replaced;
}

function init_editor(editor, lang, fontsize, value) {
    editor.$blockScrolling = Infinity;
    editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/java");
    language = lang;
    editor.setValue(value);
    editor.setFontSize(fontsize);
    editor.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true
    });
    editor.on('focus', function () {
        $("#codesize").val(editor.getSession().getValue().length);
    });
}

function init_map() {
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
    });
    $(display.getContainer()).attr("style", "float:left;");
    $(`#map`).append(display.getContainer());
    $(`canvas`).attr(`tabindex`, 0);
}




function init_globvars() {
    pause = true;
    area = Array.apply(null, Array(w + 2)).map(() => Array(h + 2).fill(0));//0:無色,1:青
    //Player = {name: {x: 0, y: 0, s: 0, b: [], moveHuman, drawHuman}};
    env["GLOBAL"] = {};
    env[$("#Player1").text()] = {};
    env[$("#Player2").text()] = {};
    /***********************************プレイヤー初期化*******************************************/
    //Player[$("#Player1").text()] = {x: 2, y: 2, d: "SOUTH", b: []};
    actor1.x = 2;
    actor1.y = 2;
    actor1.d = "SOUTH";
    actor1.buf = [];
    area[2][2] = 1;
    Draw(0, 0, ["Z"], "GLOBAL");
    Draw(2, 2, ["T1", "1@s1", "_"], $("#Player1").text());
    //Player[$("#Player2").text()] = {x: w - 1, y: w - 1, d: "SOUTH", b: []};
    actor2.x = w - 1;
    actor2.y = h - 1;
    actor2.d = "SOUTH";
    actor2.buf = [];
    area[w - 1][w - 1] = 2;
    Draw(w - 1, w - 1, ["T2", "2@s1", "_"], $("#Player2").text());
    //Redraw(display);
    let scelm = $(`#scores`);
    let divelm = $(`<div>`);
    let inpelm = $(`<input>`);
    scelm.empty();
    divelm.attr("id", $("#Player1").text());
    divelm.text($("#Player1").text() + "のスコア");
    inpelm.attr({
        type: "text",
        name: $("#Player1").text(),
        value: "0"
                //readonly: "readonly"
    });
    divelm.append(inpelm);
    scelm.append(divelm);

    divelm = $(`<div>`);
    inpelm = $(`<input>`);
    divelm.attr("id", $("#Player2").text());
    divelm.text($("#Player2").text() + "のスコア");
    inpelm.attr({
        type: "text",
        name: $("#Player2").text(),
        value: "0",
        readonly: "readonly"
    });
    divelm.append(inpelm);
    scelm.append(divelm);
    /*******************************************************************************************/
}



let lightPasses = function (x, y) {
    let key = x + "," + y;
    if (key in data) {
        return (data[key] === 0);
    }
    return false;
};

let out1 = $(`<div>`);
let out2 = $(`<div>`);
let out3 = $(`<div>`);


/*
 function operation_function(data) {
 return new Promise(function (res, rej) {
 let check = setInterval(function () {
 $.getJSON("http://api.paiza.io:80/runners/get_status?", {
 id: data.id,
 api_key: "guest"
 },
 function (data) {
 console.log("status : " + data.status);
 if (data.status === "completed") {
 clearInterval(check);
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
 let tmp = OperationAdapter(data.stdout);
 tmp.then(function () {
 console.log(tmp);
 res();
 });
 }
 });
 }
 }
 );
 }, 500);
 });
 }
 */
function operation_function(data) {
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
                        if (!data.build_stderr || !data.stderr) {
                            modalClose();
                            setProgress(0);
                        }
                        var counter = function (str, seq) {
                            return str.split(seq).length - 1;
                        }
                        //let tmp = OperationAdapter(data.stdout);
                        if (!data.stdout || counter(data.stdout,/\w+\.moveHuman\(\w+\)[\r\n]/) + counter(data.stdout,/\w+\.drawHuman\(\)[\r\n]/) === 0) {
                            alert("必ず一度は行動する(move()あるいはdraw()をする)コードを記述してください.");
                            modalClose();
                            setProgress(0);
                            return;
                        }
                        let tmp = stackActions4(data.stdout);
                        tmp.then(function () {
                            console.log(tmp);
                            res();
                        });
                    }
                });
    });
}
function Position(envname, reg) {
    let point = {x: 0, y: 0};
    let arr = (Object.keys(env[envname]).reduce(function (r, k) {
        return env[envname][k].join().match(reg) ? k : r;
    }, null)).split(",");
    point.x = parseInt(arr[0]);
    point.y = parseInt(arr[1]);
    return point;
}
function Controller(code) {
    let point = Position($("#Player1").text(), /[1-2]@[swen][1-4]/);
    console.log(point);
    if (code === 37) {/*VK_LEFT*/
        Move("west", point, data[point.x - 1 + "," + point.y] === 1, $("#Player1").text());
    }
    if (code === 38) {/*VK_UP*/
        Move("north", point, data[point.x + "," + eval(point.y - 1)] === 1, $("#Player1").text());
    }
    if (code === 39) {/*VK_RIGHT*/
        Move("east", point, data[point.x + 1 + "," + point.y] === 1, $("#Player1").text());
    }
    if (code === 40) {/*VK_DOWN*/
        Move("south", point, data[point.x + "," + eval(point.y + 1)] === 1, $("#Player1").text());
    }
}

function Draw(x, y, ch, envname) {
    //console.log("Draw : "+envname);
    //console.log(env[envname]);
    let tmpkey = x + "," + y;
    //console.log("env["+tmpkey+"]");
    //console.log(env[envname][tmpkey]);
    if (ch.join().match(/L/)) {
        let tmp = Object.keys(env[envname]).reduce(function (r, k) {
            return env[envname][k].join().match(/L/) ? k : r;
        }, null);
        while (tmp !== null) {
            env[envname][tmp] = env[envname][tmp].filter(function (v) {
                return v.match(/L/) === null;
            });
            tmp = Object.keys(env[envname]).reduce(function (r, k) {
                return env[envname][k].join().match(/L/) ? k : r;
            }, null);
        }
    }
    /*唯一性の保持*/
    if (ch.join().match(/[1-2]@[swen][1-4]/)) {
        //console.log(ch.join().match(/@[swen][1-4]/));
        let tmp = Object.keys(env[envname]).reduce(function (r, k) {
            return env[envname][k].join().match(/([1-2]@[swen][1-4])(?!(.*_))/) ? k : r;
        }, null);
        while (tmp !== null) {
            env[envname][tmp] = env[envname][tmp].filter(function (v) {
                return v.match(/[1-2]@[swen][1-4]/) === null;
            });
            tmp = Object.keys(env[envname]).reduce(function (r, k) {
                return env[envname][k].join().match(/([1-2]@[swen][1-4])(?!(.*_))/) ? k : r;
            }, null);

        }
    }
    if (ch.join().match(/T(#|)1/)) {
        //console.log(area);
        //console.log(x+","+y);
        if (area[x][y] === 0) {
            //console.log("first");
            area[x][y] = 1;
        } else {

            //console.log("already");
        }
    }
    if (ch.join().match(/T(#|)2/)) {
        if (area[x][y] === 0) {
            //console.log("first");
            area[x][y] = 2;
        } else {

            //console.log("already");
        }
    }
    if (env[envname] !== undefined) {
        if (env[envname][tmpkey] !== undefined) { //環境がすでに存在している場合
            env[envname][tmpkey] = Object.assign(ch, env[envname][tmpkey], ch);
        } else {
            env[envname][tmpkey] = ch;
        }
    } else {
        env[envname] = [];
        env[envname][tmpkey] = ch;
    }

    display.draw(x, y, env[envname][tmpkey], "transparent");

}
function Redraw() {
    //console.log("Redraw");
    //console.log(env);
    //let $defer = new $.Deferred();
    //let $deferreds = [];
    for (let i = 0; i < w + 2; i++) {
        for (let j = 0; j < h + 2; j++) {
            display.draw(i, j, data[`${i},${j}`] ? "#" : ".", "transparent");
        }
    }
    function drawn() {
        return new Promise(function (res, rej) {
            Object.keys(area).forEach(function (e1, i1, a1) {
                Object.keys(area[e1]).forEach(function (e2, i2, a2) {
                    if (area[e1][e2] === 1) {
                        display.draw(e1, e2, data[e1 + "," + e2] === 0 ? ["T1"] : ["T#1"], "transparent");
                    }
                    if (area[e1][e2] === 2) {
                        display.draw(e1, e2, data[e1 + "," + e2] === 0 ? ["T2"] : ["T#2"], "transparent");
                    }
                    if (i1 === a1.length - 1) {
                        res();
                    }
                });
            });
        });
    }
    ;

    Object.keys(area).forEach(function (e1, i1, a1) {
        Object.keys(area[e1]).forEach(function (e2, i2, a2) {
            if (area[e1][e2] === 1) {
                display.draw(e1, e2, data[e1 + "," + e2] === 0 ? ["T1"] : ["T#1"], "transparent");
            }
            if (area[e1][e2] === 2) {
                display.draw(e1, e2, data[e1 + "," + e2] === 0 ? ["T2"] : ["T#2"], "transparent");
            }
            /*
             if (i1 === a1.length - 1) {
             res();
             }
             */
        });
    });
    Object.keys(env).forEach(function (e1, i1, a1) {
        Object.keys(env[e1]).forEach(function (e2, i2, a2) {
            if (env[e1][e2].join().match(/@/) === null && env[e1][e2].join().match(/T/) === null) {
                display.draw(e2.split(`,`)[0], e2.split(`,`)[1], env[e1][e2], "transparent");
            } else {
                if (env[e1][e2].join().match(/[1-2]@[swen][1-4](?=(.*_))/) !== null) { //”_”入ってない人間は描画しない
                    var tmp = env[e1][e2].join().match(/[1-2]@[swen][1-4]/);
                    //console.log("human drawn at " + e2.split(`,`)[0] + "," + e2.split(`,`)[1]);
                    display.draw(e2.split(`,`)[0], e2.split(`,`)[1], Object.assign(["_"], tmp), "transparent");
                }
            }
        });
    });
    /*
     $deferreds.push(drawn);
     $deferreds.push(map);
     $.when.apply(null, $deferreds)
     .done(function () {
     $defer.resolve();
     }).fail(function () {
     console.log("Error in Redraw.");
     $defer.resolve();
     $defer.reject();
     });
     console.log($deferreds);
     return $defer.promise();
     */
}

function Move(dir, at, wall, envname) {
    console.log(at);
    let $defer = new $.Deferred();
    isMoving = true;
    let an = 0;
    if (typeof actor1 !== "undefined" || typeof actor2 !== "undefined") {
        switch (envname) {
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

    let xdiffc = 0;
    let ydiffc = 0;
    if (dir === "west") {
        xdiffc = -1;
    } else if (dir === "north") {
        ydiffc = -1;
    } else if (dir === "east") {
        xdiffc = 1;
    } else if (dir === "south") {
        ydiffc = 1;
    }
    //console.log(env[envname][at.x + "," + at.y]);
    if (env[envname][at.x + "," + at.y] !== undefined) {
        env[envname][at.x + "," + at.y] = env[envname][at.x + "," + at.y].filter(function (v) {
            return v.match(/_/) === null;
        });

    }

    function animation() {
        return new Promise(function (res, rej) {
            let c = 0;
            let d = 0;
            let anim = setInterval(function () {
                Redraw();
                if (c >= 0.8) {
                    clearInterval(anim);
                    res();
                } else {
                    c += 0.1;
                    d++;
                    if (d < 5) {
                        //console.log("Is there a wall? - "+wall);
                        if (wall === true) {
                            display.draw(at.x, at.y, an + `@${dir.charAt(0).toLowerCase()}${d}`, "transparent");
                        } else {
                            if (xdiffc === 0) {
                                if (ydiffc > 0) {
                                    display.draw(at.x, at.y - 0 + c, an + `@${dir.charAt(0).toLowerCase()}${d}`, "transparent");
                                } else {
                                    display.draw(at.x, at.y - c, an + `@${dir.charAt(0).toLowerCase()}${d}`, "transparent");
                                }
                            } else {
                                if (xdiffc > 0) {
                                    display.draw(at.x - 0 + c, at.y, an + `@${dir.charAt(0).toLowerCase()}${d}`, "transparent");
                                } else {
                                    display.draw(at.x - c, at.y, an + `@${dir.charAt(0).toLowerCase()}${d}`, "transparent");
                                }
                            }

                        }

                    } else {
                        d = 1;
                        if (wall === true) {
                            display.draw(at.x, at.y, an + `@${dir.charAt(0).toLowerCase()}${d}`, "transparent");
                        } else {
                            if (xdiffc === 0) {
                                if (ydiffc > 0) {
                                    display.draw(at.x, at.y - 0 + c, an + `@${dir.charAt(0).toLowerCase()}${d}`, "transparent");
                                } else {
                                    display.draw(at.x, at.y - c, an + `@${dir.charAt(0).toLowerCase()}${d}`, "transparent");
                                }
                            } else {
                                if (xdiffc > 0) {
                                    display.draw(at.x - 0 + c, at.y, an + `@${dir.charAt(0).toLowerCase()}${d}`, "transparent");
                                } else {
                                    display.draw(at.x - c, at.y, an + `@${dir.charAt(0).toLowerCase()}${d}`, "transparent");
                                }
                            }

                        }
                    }
                }

            }, speed);
        });
    }
    animation().then(function () {
        let x, y;
        if (wall === true) {
            x = at.x - 0;
            y = at.y - 0;
            Draw(x, y, ["T" + an, an + `@${dir.charAt(0).toLowerCase()}1`, "_"], envname);
            //console.log("行き止まり描画");
        } else {
            if (xdiffc === 0) {
                x = at.x - 0;
                y = at.y - 0 + ydiffc;
                Draw(x, y, ["T" + an, an + `@${dir.charAt(0).toLowerCase()}1`, "_"], envname);
            } else {
                x = at.x - 0 + xdiffc;
                y = at.y - 0;
                Draw(x, y, ["T" + an, an + `@${dir.charAt(0).toLowerCase()}1`, "_"], envname);
            }
        }
        isMoving = false;
        //console.log(envname + " move animation ended.");
        $defer.resolve();
    });
    return $defer.promise();
}

function Lighting() {
    Object.keys(env).forEach(function (e1, i, a) {
        Object.keys(env[e1]).forEach(function (e2, i, a) {
            fov = new ROT.FOV.RecursiveShadowcasting(lightPasses);
            let d;
            let tmp1 = env[e1][e2].join().match(/([1-2]@[swen][1-4])(?=.*_)/);
            if (tmp1 !== null) {
                if (tmp1[0].slice(2, 3) === "s") {
                    d = DIR_SOUTH;
                } else if (tmp1[0].slice(2, 3) === "w") {
                    d = DIR_WEST;
                } else if (tmp1[0].slice(2, 3) === "e") {
                    d = DIR_EAST;
                } else {
                    d = DIR_NORTH;
                }
                console.log(tmp1);
                fov.compute90(parseInt(e2.split(",")[0]), parseInt(e2.split(",")[1]), 10, d, function (x, y, r, visibility) {
                    let tmpkey = x + "," + y;
                    let color = "rgba(255,255,0,0.2)";
                    display.draw(x, y, Object.assign(["L"], env[e1][tmpkey]), color, color);
                    //console.log(Object.assign(["L"], data[tmpkey] ? ["#"] : ["."],env[e1][tmpkey]));
                });
            }
        });
    });
}

function data_to_js2darr(data) {
    let arr = [];
    for (let i = 0; i < h + 2; i++) {
        let arrsub = [];
        for (let j = 0; j < w + 2; j++) {
            arrsub.push(data[i + "," + j]);
        }
        arr.push(arrsub);
    }
    return arr;
}

function js2darr_to_java2darr(arr) {
    let txt = "";
    for (let i = 0; i < arr.length; ++i) {
        txt = txt + "," + "{\"" + arr[i].join(`\",\"`) + "\"}";
    }
    txt = txt.splice(0, 1, "");
    return txt;
}

function generateNameText() {
    let txt = "";
    Object.keys(Player).forEach(function (key) {
        txt = txt + "{int[] tmp = {" + this[key].x + "," + this[key].y + "};put(\"" + key + "\",tmp);}";
    }, Player);
    return txt;
}

function actionbuffer() {
    let $defer = new $.Deferred();
    console.log("stack start");
    pause = true;
    actor1.buf = [];
    let src = jQuery.get("java/Main.java", function () {
        if (src.readyState === 4) {
            let result = replace(src.responseText, [
                [/MAP/g, js2darr_to_java2darr(data_to_js2darr(data))],
                [/AREA/g, js2darr_to_java2darr(area)],
                [/PLAYER1_NAME/g, $("#Player1").text()],
                [/PLAYER2_NAME/g, $("#Player2").text()],
                [/PLAYER1_CODE/g, editor1.getValue()],
                [/PLAYER2_CODE/g, editor2.getValue()],
                [/PLAYER1_X/g, actor1.x],
                [/PLAYER1_Y/g, actor1.y],
                [/PLAYER2_X/g, actor2.x],
                [/PLAYER2_Y/g, actor2.y],
                [/PLAYER1_DIR/g, actor1.dir],
                [/PLAYER2_DIR/g, actor2.dir]
            ]);
            console.log(result);
            mod++;
            setProgress(30);
            code_logger(result, actor1.name);
            setProgress(40);
            $.postJSON("http://api.paiza.io:80/runners/create?",
                    {
                        source_code: result,
                        language: language,
                        longpoll: true,
                        longpoll_timeout: 10,
                        api_key: "guest"

                    },
                    function (data) {
                        setProgress(70);
                        operation_function(data).then(function () {
                            //action();
                            setProgress(90);
                            pause = false;
                            scheduler.add(actor1, true);
                            scheduler.add(actor2, true);
                            engine.start();
                            $defer.resolve();
                        });
                    }
            );
        }

    });
    return $defer.promise();
}

function calc_turn(num) {
    turn = num;
    $(`#turn`).val(turn);
}

function repeat() {
    calc_turn(0);
    for (let i = 0; i < w + 2; i++) {
        for (let j = 0; j < h + 2; j++) {
            console.log(data[i + "," + j]);
            display.draw(i, j, data[i + "," + j] === 1 ? "#" : ".", "transparent");
        }
    }
    Player = [];
    Object.keys(env).forEach(function (e, i, a) {
        env[e] = {};
    });
    let scelm = document.getElementById("scores");
    for (let i = scelm.childNodes.length - 1; i >= 0; i--) {
        scelm.removeChild(scelm.childNodes[i]);
    }
    init_globvars();
    loop();
    function loop() {
        let act = actionstack.shift();
        if (act !== null) {
            eval(act).then(function () {
                console.log(act.match(/"([\s\S]*?)"/));
                checkRules(act.match(/"([\s\S]*?)"/)[1]);
                calc_turn(turn + 1);
                loop();
            });
        } else {
            return;
        }
    }
}

function code_logger(code, name) {
    let data = {'request': code, 'name': name,
        'option': mod};
    /**
     * Ajax通信メソッド
     * @param type  : HTTP通信の種類
     * @param url   : リクエスト送信先のURL
     * @param data  : サーバに送信する値
     */
    $.ajax({
        type: "POST",
        url: logphpurl,
        data: data
    }).success(function (data, dataType) {
        if (data[0] !== "200") {
            alert("Error : " + XMLHttpRequest.status + "(" + textStatus + ")," + errorThrown);
            alert("実行したコードが保存できませんでした.");
        }
        console.log(data);
    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
        if (XMLHttpRequest.status !== 0) {
            alert("Error : " + XMLHttpRequest.status + "(" + textStatus + ")," + errorThrown);
            alert("実行したコードが保存できませんでした.");
        }
    });
}

function rankreload() {
    let src = $("#rankwin").attr("src");
    $("#rankwin").attr("src", "");
    $("#rankwin").attr("src", src);
    return;
}

function challenge(rank) {
    let data = `rank=${rank}&wantcode=1`;
    console.log(data);
    $.ajax({
        type: "GET",
        url: rankphpurl,
        data: data
    }).success(function (data, dataType) {
        if (data[0] === "200") {
            console.log(data);
            console.log(editor2.getValue());
            editor2.setValue(data[3]);
            if ($("#Player1").text() === data[2]) {
                $("#Player2").text(data[2] + "old");
                actor2.name = data[2] + "old";
                $("#" + data[2]).id = data[2] + "old";
            } else {
                $("#Player2").text(data[2]);
                actor2.name = data[2];
                $("#" + data[2]).id = data[2];
            }

            init_globvars();
            $(`#mappan`).click();
            alert("相手を変更しました.");
        } else {
            alert("Error : " + XMLHttpRequest.status + "(" + textStatus + ")," + errorThrown);
            alert("相手を変更できませんでした.");
        }

    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
        if (XMLHttpRequest.status !== 0) {
            alert("Error : " + XMLHttpRequest.status + "(" + textStatus + ")," + errorThrown);
            alert("相手を変更できませんでした.");
        }
    });
}

function gameover() {
    pause = true;
    modalOpen();
    let name1 = $("#Player1").text();
    let name2 = $("#Player2").text();
    let score1 = $(`#${name1}`).children(`input`).val();
    let score2 = $(`#${name2}`).children(`input`).val();
    setProgress(20);
    console.log(score1 + "," + score2);
    new_ranking(name1, score1, editor1.getValue()).then(function () {
        setProgress(60);
        new_ranking(name2, score2, editor2.getValue()).then(function () {
            if (name2 !== "OPP") {
                setProgress(80);
                if (score1 > score2) {
                    chalog(name1, name2, score1, score2).then(function () {
                        setProgress(100);
                        modalClose();
                        setProgress(0);
                    });
                } else {
                    chalog(name2, name1, score2, score1).then(function () {
                        setProgress(100);
                        modalClose();
                        setProgress(0);
                    });
                }
            }
            setProgress(100);
            modalClose();
            setProgress(0);
        });
    });
}

function modalOpen(speed) {
    $("body").append('<div id="modal-bg"></div>');
    modalResize();
    if (speed === null) {
        speed = "fast";
    }
    $("#modal-bg,#modal-main").fadeIn(speed);
}
function modalClose(speed) {
    if (speed === null) {
        speed = "slow";
    }
    $("#modal-main,#modal-bg").fadeOut(speed, function () {
        $('#modal-bg').remove();
    });
}
function modalResize() {

    var w = $(window).width();
    var h = $(window).height();

    var cw = $("#modal-main").outerWidth();
    var ch = $("#modal-main").outerHeight();

    //取得した値をcssに追加する
    $("#modal-main").css({
        "left": ((w - cw) / 2) + "px",
        "top": ((h - ch) / 2) + "px"
    });
}

function setProgress(num) {
    $("#php-progress").css("width", num + "%");
    $("#php-progress").html(num + "%");
}

/*******************************自作スケジューラー********************************/
function action(a, b) {
    console.log(a);
    console.log(b);
    let speeds = [];
    let names = [];
    loop();
    function loop() {
        if (names.length !== 0) {
            speeds.forEach(function (e, i, a) {
                if (e <= 0) {
                    speeds[i] = Player[Object.keys(Player)[i + 1]]["s"] - 0;
                }
            });
            console.log(speeds);
        } else {
            Object.keys(Player).forEach(function (e, i, a) {
                if (e !== "name") {
                    speeds.push(Player[e].s);
                    names.push(e);
                }
            });
            console.log(names);
        }

        let i = 0;
        let tmpnames = [];
        function speedsIn(i) {
            return new Promise(function (res, rej) {
                while (true) {
                    if (i >= speeds.length) {
                        i = 0;
                    }
                    if (speeds[i] <= 0) {
                        res();
                        break;
                    } else {
                        for (let j = 0; j < speeds.length; j++) {
                            speeds[j]--;
                        }
                        i++;
                    }

                }
            });
        }

        function tmpnamesIn() {
            //console.log(speeds);
            return new Promise(function (res, rej) {
                let i = 0;
                while (true) {
                    if (i >= speeds.length) {
                        res();
                        break;
                    }
                    if (speeds[i] <= 0) {
                        tmpnames.push(names[i]);
                    }
                    i++;
                }
            });
        }
        function mainIn(i) {
            //console.log(tmpnames);
            return new Promise(function (res, rej) {
                console.log(Player[tmpnames[i]]["b"]);
                let a = Player[tmpnames[i]]["b"][0];
                if (Player[tmpnames[i]]["b"].length <= 0) {
                    console.log("行動が読み込まれていないか、全ての行動が終了しました.");
                    console.log(Player);
                    Lighting();
                    if (pause === false) {
                        actionbuffer();
                    }
                    res();
                } else {
                    calc_turn(turn + 1);
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
                    console.log(a);
                    eval(a + `.then(function(){Player["${tmpnames[i]}"]["b"].shift();return checkRules("${tmpnames[i]}");}).then(function(){if(${i + 1}<${tmpnames.length}){res();mainIn(${i + 1});}else{res();check();}});`);
                }

            });
        }
        function check() {
            let check = false;
            let i = 0;
            while (true) {
                //console.log(check);
                if (i >= names.length) {
                    if (check === false) {
                        loop();
                    }
                    break;

                }

                if (Player[names[i]]["b"] === []) {
                    check = true;
                }
                i++;
            }
        }
        speedsIn(i).then(function () {
            tmpnamesIn();
        }).then(function () {
            mainIn(0);
        });
    }
}
/******************************************************************************/
