/* 
 * ======================================================================
 * Project Name    : StickParson
 * File Name       : tips.js
 * Encoding        : UTF-8
 * Creation Date   : 2017/11/21
 *
 * Copyright © 2017 Mitani. All rights reserved.
 *
 * This source code or any portion thereof must not be
 * reproduced or used in any manner whatsoever.
 * ======================================================================
 */
$(function () {
    let tipsClassName = `help_tips`;
    let popIdName = "help_tips_pop";
    $(`.` + tipsClassName).hover(function () {
        let dataText = $(this).attr(`data-help`);
        let em = $("#emScale");
        $(this).after(`<div id=` + popIdName + `>` + dataText + `</div>`);
        $(this).mousemove(function (e) {
            let w = em["0"].clientWidth * dataText.length;
            let x;
            if(parseInt($(window).width())-(e.clientX - e.offsetX + w) < 0){
                x = e.offsetX - w;
            }
            else{
                x = e.offsetX;
            }
            let y = e.pageY - e.offsetY;
            $(`#` + popIdName).css({left: x + `px`, top: y + `px`, "z-index": 7, width:dataText.length + `em`});
        });
    }, function () {
        $(`#` + popIdName).remove();
    });
});