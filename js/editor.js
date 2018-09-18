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
let operation_function = function (data) {
    let status = null;
    let check = setInterval(function () {
        $.getJSON("http://api.paiza.io:80/runners/get_status?", {
            id: data.id,
            api_key: "guest"
        },
                function (data) {
                    console.log("status : " + data.status);
                    status = data.status;
                }

        );
        if (status === "completed")
            clearInterval(check);
    }, 2000);
    let get = setInterval(function(){
        if (status === "completed") {
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
                    if (data.stdout) {
                        OperationAdapter(data.stdout, 0);
                    }
                    if(data.status==="completed")
                        clearInterval(get);
                });
    }
},500);
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
let editedMapArray = null;
pre =
`
import java.util.UUID;\n
import java.util.HashMap;\n
public class Main extends Human{\n
\t  public static void main(String[] args) {\n
\t\t    Human John = new Human("John");\n
\t\t    while(!John.detect("right","#")){\n
\t\t\t    John.move("right");\n
\t\t    }\n
\t\t    John.move("down");\n
\t  }\n
}
`;
let language = "java";
editor.setValue(pre);
let editorFontSize = 12;
editor.setFontSize(editorFontSize);
editor.setOptions({
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: true
});
$('#font-size').click(function (e) {
    editorFontSize = editorFontSize+$(e.target).data('size')
    editor.setFontSize(editorFontSize);
});
$('#submit').click(function (e) {
    if (!confirm("人形を動かしますか？"))
        return;
    if(MapArray===null){
        alert("マップないと動かないんです.ごめんなさい.");
        return;
    }
    if (editedMapArray === null) {
        editedMapArray = outfromArray(MapArray);
        console.log(MapArray);
        console.log(editedMapArray);
        console.log(Start);
        console.log(Goal)
    }
    initputs = generateNameMapText();
    console.log("initputs=" + initputs);
    let ins = `
   class Human {
	final static private String Map[][] = {${editedMapArray}};
	int Start[] = { ${Start.x}, ${Start.y} };
	int Goal[] = { ${Goal.x}, ${Goal.y} };
	String name;
        static HashMap<String, int[]> Player = new HashMap<String, int[]>(){
            ${initputs}
        };

    public Human() {
        this.name = UUID.randomUUID().toString();
    }

    public Human(String name) {
        this.name = name;
        Player.putIfAbsent(name,Start);
        System.out.println(this.name + ".create(" + name + ")");

    }
    public int[] get_Position(){
        return Player.get(name);
    }
    public String MapElem(int[] pos){
        return Map[pos[0]][pos[1]];
    }
    public void move(String dir) {
        if (!detect(dir, "#")) {
            switch (dir) {
                case "up":
                    Player.get(name)[1]--;
                    break;
                case "left":
                    Player.get(name)[0]--;
                    break;
                case "down":
                    Player.get(name)[1]++;
                    break;
                case "right":
                    Player.get(name)[0]++;
                    break;
                default:
                    ;
            }
        }
        System.out.println(this.name + ".move(" + dir + ")");

    }

    public boolean detect(String dir, String target) {
        switch (dir) {
            case "up":
                if(target != null)return Map[Player.get(name)[1]-1][Player.get(name)[0]].equals(target); else return !Map[Player.get(name)[1]][Player.get(name)[0] - 1].equals("=");
            case "left":
                if(target != null)return Map[Player.get(name)[1]][Player.get(name)[0]-1].equals(target); else return !Map[Player.get(name)[1] - 1][Player.get(name)[0]].equals("=");
            case "down":
                if(target != null)return Map[Player.get(name)[1]+1][Player.get(name)[0]].equals(target); else return !Map[Player.get(name)[1]][Player.get(name)[0] + 1].equals("=");
            case "right":
                if(target != null)return Map[Player.get(name)[1]][Player.get(name)[0]+1].equals(target); else return !Map[Player.get(name)[1] + 1][Player.get(name)[0]].equals("=");
            default:
                return false;
        }
    }
}`;

    $.postJSON("http://api.paiza.io:80/runners/create?",
            {
                source_code: editor.getValue() + ins,
                language: language,
                api_key: "guest"

            },
            function (data) {
                setTimeout(function () {
                    operation_function(data);
                }, 2000);
            });
});


