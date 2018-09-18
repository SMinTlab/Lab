/* 
 * ======================================================================
 * Project Name    : HTML5Application
 * File Name       : toolbar.js
 * Encoding        : UTF-8
 * Creation Date   : 2017/10/05
 *
 * Copyright © 2017 Mitani. All rights reserved.
 *
 * This source code or any portion thereof must not be
 * reproduced or used in any manner whatsoever.
 * ======================================================================
 */
$('#tutorial').click(function (e) {
    window.open("tutorial.html");
});
$('#save').click(function (e) {
    if (!confirm("コード1の内容を保存しますか？"))
        return;
    localStorage.text = editor1.getValue();
    alert("保存しました。");
});
$('#load').click(function (e) {
    if (!confirm("コード1の内容を読み込みますか？"))
        return;
    editor1.setValue(localStorage.text, -1);
});
$('#execute').click(function (e) {
    if (turn > 999) {
        alert("ゲームが終了ターンに達しました.マップをクリックして再度ゲームを始めてください.");
        return;
    } else {
        modalOpen();
        setProgress(10);
        if (mod > 0) {
            if (!confirm("状態をそのままに実行しますか?")) {
                pause = true;
                calc_turn(0);
                actionstack = [];
                //Player = [];
                Object.keys(env).forEach(function (e, i, a) {
                    env[e] = {};
                });
                for (let i = 0; i < w + 2; i++) {
                    for (let j = 0; j < h + 2; j++) {
                        display.draw(i, j, data[`${i},${j}`] ? "#" : ".", "transparent");
                    }
                }
                $(`#scores`).empty();
                init_globvars();
                $("canvas").focus();

                setProgress(20);
            } else {
                setProgress(20);
            }
        }
        actionbuffer().then(function () {
            setProgress(100);
            modalClose();
            setProgress(0);
        });
    }

});
$('#repeat').click(function (e) {
    if (pause === true) {
        repeat();
    } else {
        alert("コードの実行中は再生できません.");
    }
});
$('#export').click(function () {
    if (!confirm("コード1の内容をファイルとして保存しますか？"))
        return;
    let content = editor1.getValue();
    let link = document.createElement('a');
    link.href = window.URL.createObjectURL(new Blob([content]));
    link.download = "filename.txt";
    link.click();
});
$('.chall').click(function (e) {
    challenge($(this).attr("data-rank"));
});
$('#name_in').click(function () {
    let name = window.prompt("新しいユーザー名を入力して下さい");
    if (name.match(/^$/)) {
        alert("名前には空文字は指定できません.");
        return;
    }
    if (name.match(/^\d/)) {
        alert("名前の先頭を数字にはできません.");
        return;
    }
    if (name.match(/\W/)) {
        alert("名前には英数字およびアンダースコア以外の文字を入れることはできません.");
        return;
    }
    if (name === $("#Player2").text()) {
        alert("対戦相手と同じ名前は指定できません.");
        return;
    }
    $("#Player1").text(name);
    actor1.name = name;
    $("#" + name).id = name;
    init_globvars();
    $(`#mappan`).click();
    rankreload();
    window.alert("名前を変更しました");
});
$("#pause").click(function () {
    if ($(this).hasClass("active")) {
        pause = false;
        scheduler.add(actor1, true);
        scheduler.add(actor2, true);
        engine.start();
    } else {
        pause = true;
    }
});