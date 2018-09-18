/* 
 * ======================================================================
 * Project Name    : HTML5Application
 * File Name       : writer.js
 * Encoding        : UTF-8
 * Creation Date   : 2017/10/31
 *
 * Copyright © 2017 Mitani. All rights reserved.
 *
 * This source code or any portion thereof must not be
 * reproduced or used in any manner whatsoever.
 * ======================================================================
 */

var http = require('http');
var fs = require('fs');


function readFile(path) {
    fs.readFile(path, 'utf8', function (err, data) {

        //エラーの場合はエラーを投げてくれる
        if (err) {
            throw err;
        }

        //ここに処理
        console.log(data);
    });
}


//ファイルの追記関数
function appendFile(path, data) {
    fs.appendFile(path, data, function (err) {
        if (err) {
            throw err;
        }
    });
}

var server = http.createServer(function (req, res) {
    switch (req.method) {
        case `POST`:
            var data = '';
            //readableイベントが発火したらデータにリクエストボディのデータを追加
            req.on('readable', function (chunk) {
                data += req.read();
            });
            //リクエストボディをすべて読み込んだらendイベントが発火する。
            req.on('end', function () {
                appendFile(`../userdata/log.txt`,data);
                res.end(data);
            });
            break;
        case `GET`:
            res.end("get resend");
            break;
        default :
            console.log("Hi");
            res.end();
    }
});
server.listen(20000);
//readFile("../userdata/log.txt");

