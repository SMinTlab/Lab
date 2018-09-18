/* 
 * ======================================================================
 * Project Name    : HTML5Application
 * File Name       : ediotr.js
 * Encoding        : UTF-8
 * Creation Date   : 2017/04/07
 *
 * Copyright © 2017 Mitani. All rights reserved.
 *
 * This source code or any portion thereof must not be
 * reproduced or used in any manner whatsoever.
 * ======================================================================
 */
function setWindowSize(name) {
	winH = window.innerHeight;
        winW = window.innerWidth;
        let editorH = winH - 110;
        let editorW = winW - 370;
        let OutputH = editorH + 55;
        let humanH = editorH + 70;
        let humanW = number_of_human*10;
	document.getElementById("editor").style.height=editorH+"px";
        document.getElementById("editor").style.width=editorW+"px";
        document.getElementById("Output").style.top=OutputH+"px";
        if(name){
            document.getElementById(name).style.top=humanH+"px";
            document.getElementById(name).style.left=humanW+"px";
        }        
}

function errorHandler(e) {
    let msg = '';
    switch (e.code) {
        case 10://FileError.QUOTA_EXCEEDED_ERR:
            msg = 'QUOTA_EXCEEDED_ERR';
            break;
        case 1://FileError.NOT_FOUND_ERR:
            msg = 'NOT_FOUND_ERR';
            break;
        case 2://FileError.SECURITY_ERR:
            msg = 'SECURITY_ERR';
            break;
        case 9://FileError.INVALID_MODIFICATION_ERR:
            msg = 'INVALID_MODIFICATION_ERR';
            break;
        case 7://FileError.INVALID_STATE_ERR:
            msg = 'INVALID_STATE_ERR';
            break;
        case 4:
            msg = 'NOT_READABLE_ERR';
            break;
        case 5:
            msg = 'ENCORDING_ERR';
            break;
        case 6:
            msg = 'NO_MODIFICATION_ALLOWED_ERR';
            break;
        case 11:
            msg = 'TYPE_MISMATCH_ERR';
            break;
        case 12:
            msg = 'PATH_EXISTS_ERR';
            break;
        default:
            msg = 'UNKNOWN_ERR';
            break;
    }
    ;
    console.log('Error: ' + msg);
}

jQuery.postJSON = function (url, data, callback) {
    jQuery.post(url, data, callback, "json");
};
function setBlobUrl(id, content) {

    // 指定されたデータを保持するBlobを作成する。
    let blob = new Blob([content], {"type": "application/x-msdownload"});

    // Aタグのhref属性にBlobオブジェクトを設定し、リンクを生成
    window.URL = window.URL || window.webkitURL;
    $("#" + id).attr("href", window.URL.createObjectURL(blob));
    $("#" + id).attr("download", "output.txt");

}
let get_function = function (data) {
    $.getJSON("http://api.paiza.io:80/runners/get_details?", {
        id: data.id,
        api_key: "guest"
    },
            function (data) {
                console.log("stdout : " + data.stdout);
                console.log("build_stderr : " + data.build_stderr);
                if(data.build_stderr){
                    alert("Build Standard Error: "+data.build_stderr);
                }
                if(data.stderr){
                    alert("Standard Error: "+data.stderr);
                }
                if (!confirm("結果を出力しますか？"))
                    return;
                let MONTH = (new Date().getMonth() + 1);
                let DATE = (new Date().getDate());
                let HOUR = new Date().getHours();
                let MINUTE = new Date().getMinutes();
                let SECOND = new Date().getSeconds();
                if (HOUR < 10 && HOUR !== 0) {
                    HOUR = "0" + HOUR;
                }
                if (MINUTE < 10 && MINUTE !== 0) {
                    MINUTE = "0" + MINUTE;
                }
                if (SECOND < 10 && SECOND !== 0) {
                    SECOND = "0" + SECOND;
                }
                let str = data.stdout + "\t" + new Date().getFullYear() + "/" + MONTH + "/" + DATE + " " + HOUR + ":" + MINUTE + ";" + SECOND;
                
                let node = document.getElementById("Output");
                node.textContent = data.stdout;
                function onInitFs(fs) {
                    fs.root.getFile('output.txt', {create: true}, function (fileEntry) {
                        fileEntry.createWriter(function (fileWriter) {
                            fileWriter.onerror = function (e) {
                                console.log("File Writer Error.");
                            };
                            fileWriter.onwriteend = function (e) {
                                console.log('Write completed.');

                            };


                            fileWriter.seek(fileWriter.length);
                            let blob = new Blob([`\n` + str], {type: "text/pain"});
                            fileWriter.write(blob);
                        }, errorHandler);
                    }, errorHandler);
                }
                navigator.webkitPersistentStorage.requestQuota(1024 * 1024, function (grantedBytes) {
                    window.requestFileSystem(PERSISTENT, grantedBytes, onInitFs, errorHandler);
                }, function (e) {
                    console.log('Error', e);
                });
            }

    );
};
let operation_function = function (data) {
    $.getJSON("http://api.paiza.io:80/runners/get_details?", {
        id: data.id,
        api_key: "guest"
    },
            function (data) {
                console.log("stdout : " + data.stdout);
                console.log("build_stderr : " + data.build_stderr);
                if(data.build_stderr){
                    alert("Build Standard Error: "+data.build_stderr);
                }
                if(data.stderr){
                    alert("Standard Error: "+data.stderr);
                }
                if(data.stdout){
                    OperationAdapter(data.stdout,0);
                }
                
            }

    );
};
if (window.File && window.FileReader && window.FileList && window.Blob) {
} else {
  alert('このブラウザはFileAPIに対応していないので一部機能が制限されます。');
}
window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
let editor = ace.edit("editor");
//setWindowSize();
editor.$blockScrolling = Infinity;
editor.setTheme("ace/theme/monokai");
editor.getSession().setMode("ace/mode/java");
pre = 
`
import java.rmi.server.UID;\n
public class Main extends Human{\n
\t  public static void main(String[] args) {\n
\t\t    Human John = new Human("John");\n
\t\t    John.move("right");\n
\t\t    John.move("down");\n
\t\t    John.move("left");\n
\t\t    John.move("up");\n
\t  }\n
}
`;
let language = "java";
editor.setValue(pre);
editor.setOptions({
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: true
});
$('#font-size').click(function (e) {
    editor.setFontSize($(e.target).data('size'));
});
$('#language').click(function (e) {
    if ($(e.target).data('type') === "c") {
        editor.getSession().setMode("ace/mode/c_cpp");
        let pre = `int main(void){\n\tprintf("hello");\n\treturn 0;\n}`;
        editor.setValue(pre);
        language = "c";
    }
    if ($(e.target).data('type') === "java") {
        editor.getSession().setMode("ace/mode/java");
        pre = 'import java.io.*;\n\npublic class Main {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World!");\n\t}\n}';
        editor.setValue(pre);
        language = "java";
    }
});
$('#save').click(function (e) {
    if (!confirm("保存しますか？"))
        return;
    localStorage.text = editor.getValue();
    alert("保存しました。");
});
$('#load').click(function (e) {
    if (!confirm("読み込みますか？"))
        return;
    editor.setValue(localStorage.text, -1);
});
$("#export").click(function (e) {  // 出力ボタンを押した場合は、setBlobUrl関数に値を渡して実行
    //if (!confirm("結果を出力しますか？")) return;
    if (typeof Blob !== "undefined") {
        // alert('このブラウザに対応しています');
    } else {
        alert('このブラウザには対応していません');
    }
    //setBlobUrl("download", localStorage.text);
});
$('#execute').click(function (e) {
    if (!confirm("実行しますか？"))
        return;
    let ins = `
    class Human {\n
    \t  private String name;\n
    \n
    \t  public Human(){\n
    \t  }\n
    \n
    \t  public Human(String name){\n
    \t\t    this.name=name;
    \t\t    System.out.println(this.name+".create("+name+")");\n
    \t  }\n
    \n
    \t  public void move(String dir){\n
    \t\t    System.out.println(this.name+".move("+dir+")");\n
    \t  }\n
    }`;
    
    $.postJSON("http://api.paiza.io:80/runners/create?",
            {
                source_code: editor.getValue()+ins,
                language: language,
                api_key: "guest"

            },
            function (data) {
                setTimeout(function () {
                    get_function(data);
                }, 2000);
            });
});
$('#submit').click(function (e) {
    if (!confirm("人形を動かしますか？"))
        return;
    let ins = `
    class Human {\n
    \t  private String name;\n
    \t  private UID uid = null;\n
    \n
    \t  public Human(){\n
    \t\t    this.uid=new UID();\n
    \t  }\n
    \n
    \t  public Human(String name){\n
    \t\t    if(name!=null){\n
    \t\t\t    this.name=name;\n
    \t\t\t    System.out.println(this.name+".create("+name+")");\n
    \t\t    }\n
    \t  }\n
    \n
    \t  public void move(String dir){\n
    \t\t    if(this.name!=null){\n
    \t\t\t    System.out.println(this.name+".move("+dir+")");\n
    \t\t    }\n
    \t\t    else{\n
    \t\t\t    System.out.println(this.uid+".move("+dir+")");\n
    \t\t    }\n
    \t  }\n
    }`;
    
    $.postJSON("http://api.paiza.io:80/runners/create?",
            {
                source_code: editor.getValue()+ins,
                language: language,
                api_key: "guest"

            },
            function (data) {
                setTimeout(function () {
                    operation_function(data);
                }, 2000);
            });
});

