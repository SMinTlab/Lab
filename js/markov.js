/* 
 * ======================================================================
 * Project Name    : StickParson
 * File Name       : keener.js
 * Encoding        : UTF-8
 * Creation Date   : 2018/07/16
 *
 * Copyright © 2018 Mitani. All rights reserved.
 *
 * This source code or any portion thereof must not be
 * reproduced or used in any manner whatsoever.
 * ======================================================================
 */
let Names = [["Duke"], ["Miami"], ["UNC"], ["UVA"], ["VT"]];
let data = [
    ["-", "7-52", "21-24", "7-38", "0-45", "0-4", "-124"],
    ["52-7", "-", "34-16", "25-17", "27-7", "4-0", "91"],
    ["24-21", "16-34", "-", "7-5", "3-30", "2-2", "-40"],
    ["38-7", "17-25", "5-7", "-", "14-52", "1-3", "-17"],
    ["45-0", "7-27", "30-3", "54-14", "-", "3-1", "90"]
];

let names, matches, example, strength, player = [], x = [], A, rates, rank, beta = 0.85;

function isElement(obj) {
    try {
        //Using W3 DOM2 (works for FF, Opera and Chrom)
        return obj instanceof HTMLElement;
    } catch (e) {
        //Browsers not supporting W3 DOM2 don't have HTMLElement and
        //an exception is thrown and we end up here. Testing some
        //properties that all elements have. (works on IE7)
        return (typeof obj === "object") &&
                (obj.nodeType === 1) && (typeof obj.style === "object") &&
                (typeof obj.ownerDocument === "object");
    }
}

function getE() {
    let array = [Names.length];
    for (let i = 0; i < Names.length; i++) {
        var inn = [Names.length];
        array[i] = inn;
        for (let j = 0; j < Names.length; j++) {
            array[i][j] = 1;
        }
    }
    return array;
}

class ScoreEx {
    constructor(score) {
        if (score === null || score === undefined) {
            score = "0-0";
        }
        if (isElement(score)) {
            score = $(score).text();
        }
        let dig = score.match(/\d+/g);
        if (dig !== null) {
            this.fst = dig[0];
            this.snd = dig[1];
        } else {
            this.fst = 0;
            this.snd = 0;
        }
    }
    getFirst() {
        return this.fst - 0;
    }
    getSecond() {
        return this.snd - 0;
    }
    getDef() {
        return this.snd - this.fst;
    }
}

class Player {
    constructor(name) {
        if (isElement(name)) {
            name = $(name).text();
        }
        this.name = name;
    }

    getWin() {
        return this.win;
    }

    getWR() {
        return this.wr;
    }

    WinTo(name, score) {
        if (!Array.isArray(this.win)) {
            this.win = [];
        }
        if (typeof (this.win[name]) === "number") {
            this.win[name] += score;
        } else {
            this.win[name] = score;
        }
    }

    WinnigRateTo(name) {
        if (!Array.isArray(this.wr)) {
            this.wr = [];
        }
        this.wr[name] = (this.win[name] + 1) / (this.win[name] + player[name].win[this.name] + 2);
    }
}

function calc_WP() {
    for (let i = 0; i < Names.length; i++) {
        let p = player[Names[i]];
        for (let j = 0; j < Names.length; j++) {
            p.WinTo(Names[j], new ScoreEx(example.getCell(i, j)).getFirst());
        }
    }
    for (let i = 0; i < Names.length; i++) {
        let p = player[Names[i]];
        for (let j = 0; j < Names.length; j++) {
            p.WinnigRateTo(Names[j]);
        }
    }
}

function toVote(val) {
    let ret = [], score;
    for (let i = 0; i < Names.length; i++) {
        let p = player[Names[i]];
        var inn = [];
        for (let j = 0; j < Names.length; j++) {
            score = new ScoreEx(example.getCell(i, j));
            p.WinTo(Names[j], score.getFirst() - score.getSecond());
            if (val === "LooserScoreVotes") {
                inn[j] = p.win[Names[j]] >= 0 ? 0 : p.win[Names[j]] * -1;
            } else if (val === "AllVote") {
                inn[j] = score.getSecond();
            } else {
                inn[j] = p.win[Names[j]] >= 0 ? 0 : 1;
            }
        }
        ret[i] = inn;
    }
    console.log(ret);
    return ret;
}

function collectWR() {
    let ret = [];
    for (let i = 0; i < Names.length; i++) {
        var inn = [];
        for (let j = 0; j < Names.length; j++) {
            inn[j] = player[Names[i]].getWR()[Names[j]];
        }
        ret[i] = inn;
    }
    return ret;
}

function powerMethod(x, A) {
    let k = 0, y, lambda = 1, nxtlambda = 2, Ynorm, rel_eps = 0.00001;
    while (rel_eps < Math.abs(nxtlambda - lambda) / Math.abs(lambda)) {
        lambda = nxtlambda;
        nxtlambda = 0;
        y = [];
        Ynorm = 0;
        for (let i = 0; i < A.length; i++) {
            for (let j = 0; j < A[i].length; j++) {
                if (typeof (y[i]) !== "number") {
                    y[i] = 0;
                }
                y[i] += A[i][j] * x[j];
            }
            nxtlambda += x[i] * y[i];
            Ynorm += y[i] * y[i];
        }
        Ynorm = Math.sqrt(Ynorm);
        for (let i = 0; i < A.length; i++) {
            x[i] = y[i] / Ynorm;
        }
        k++;
    }
    return nxtlambda;
}

function toCols(rowVec) {
    let ret = [];
    for (let v of rowVec) {
        ret.push([v]);
    }
    return ret;
}

function toRatingVec(vec) {
    let sum = 0;
    for (let v of vec) {
        sum += v;
    }
    for (let i = 0; i < vec.length; i++) {
        vec[i] = vec[i] / sum;
    }
}

function sort(key, val) {
    let sorted = [], ret = [];
    for (let i = 0; i < key.length; i++) {
        sorted[i] = {key: key[i], val: val[i]};
    }
    sorted.sort(function (a, b) {
        if (a.val > b.val)
            return -1;
        if (a.val < b.val)
            return 1;
        return 0;
    });
    for (let i = 0; i < sorted.length; i++) {
        ret[i] = sorted[i].key;
    }
    return ret;
}
/**
 * 
 * @param {Array} array
 * @param {Number} line : 0->row, 1->column
 * @param {Number} option : 0->selfVote, 1->zero vector to 1/n・Trans(e)
 * @returns {Array} normalized array
 */
function normalization(array, line, option) {
    let ret = [], norm = 0;
    if (line === 0) {
        for (let i = 0; i < array.length - 0; i++) {
            norm = 0;
            ret[i]=[];
            for (let j = 0; j < array[i].length - 0; j++) {
                norm += array[i][j] - 0;
                ret[i][j] = array[i][j] - 0;
            }
            if (norm === 0) {
                if (option === 1) {
                    norm = Names.length - 0;
                    for (let j = 0; j < ret[i].length - 0; j++) {
                        ret[i][j] = 1;
                    }
                } else if (option === 0) {
                    ret[i][i] = 1;
                } else {
                    norm++;
                }
            }
            //console.log(norm);
            if (norm !== option) {
                for (let j = 0; j < ret[i].length - 0; j++) {
                    ret[i][j] = ret[i][j] / norm;
                }
            }
        }
    } else {
        // not necessary
    }
    return ret;
}

function Transpose(array) {
    let ret = [];
    for (let i = 0; i < array.length; i++) {
        ret[i] = [];
    }
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length; j++) {
            ret[j][i] = array[i][j];
        }
    }
    return ret;
}

function toTeleport(array) {
    let ret = [], t = getE();
    for (let i = 0; i < array.length; i++) {
        ret[i] = [];
        for (let j = 0; j < array[i].length; j++) {
            ret[i][j] = beta * array[i][j] + (1 - beta) / Names.length * t[i][j];
        }
    }
    return ret;
}

for (let i = 0; i < Names.length; i++) {
    player[Names[i]] = new Player(Names[i]);
}
$(document).on(`click`, "#addName", function () {
    let name, check = false, none = "0";
    if ((name = $("#inputName").val()) === null) {
        alert("Nameを入力してください");
        return;
    }
    if (name === "") {
        alert("Name１文字以上入力してください");
        return;
    }
    for (let n of Names) {
        check |= n == name;
    }
    if (check) {
        alert("Nameが重複しています");
        return;
    }
    let lines = [];
    for (let i = 0; i < Names.length; i++) {
        if (data[i] === undefined) {
            data[i] = [];
        }
        data[i].splice(Names.length, 0, "0-0");
        lines.push("0-0");
    }
    lines.push("-");
    lines.push("0-0");
    lines.push("0");
    data.push(lines);
    Names.push([name]);
    names.render();
    names.updateSettings({data: Names});
    example.render();
    example.updateSettings({colHeaders: Names.concat(["勝敗", "得点差"])});

});

$(document).on(`click`, "#addMatch", function () {
    let check1 = false, check2 = false,
            idx1 = -1, idx2 = -1,
            n1 = $(matches.getCell(0, 0)).text(), n2 = $(matches.getCell(0, 1)).text(),
            sc1 = $(matches.getCell(1, 0)).text() - 0, sc2 = $(matches.getCell(1, 1)).text() - 0,
            cmp = sc1 < sc2 ? true : false;
    for (let i = 0; i < Names.length; i++) {
        if (Names[i] == n1) {
            check1 = true;
            idx1 = i;
        }
        if (Names[i] == n2) {
            check2 = true;
            idx2 = i;
        }
    }
    let m = new ScoreEx(example.getCell(idx1, idx2));
    //console.log(`${idx1}, ${idx2}`);
    if (check1) {
        data[idx1][Names.length + 1] = data[idx1][Names.length + 1] - 0 + sc1 - sc2;
        sc1 += m.getFirst();
    }
    if (check2) {
        data[idx2][Names.length + 1] = data[idx2][Names.length + 1] - 0 + sc2 - sc1;
        sc2 += m.getSecond();
    }
    if (check1 && check2) {
        data[idx1][idx2] = `${sc1}-${sc2}`;
        data[idx2][idx1] = `${sc2}-${sc1}`;
        let wl1 = new ScoreEx(data[idx1][Names.length]);
        let wl2 = new ScoreEx(data[idx2][Names.length]);
        if (m.getFirst() === m.getSecond()) {
            data[idx1][Names.length] = `${wl1.getFirst() + (cmp ? 0 : 1) - 0}-${wl1.getSecond() + (cmp ? 1 : 0) - 0}`;
            data[idx2][Names.length] = `${wl2.getFirst() + (cmp ? 1 : 0) - 0}-${wl2.getSecond() + (cmp ? 0 : 1) - 0}`;
        } else if ((m.getFirst() < m.getSecond()) ^ cmp) {
            //console.log(n1+" : "+n2);
            //console.log(m.getFirst()+" : "+m.getSecond());
            if (data[idx1][idx2] == data[idx1][idx2]) {
                data[idx1][Names.length] = `${wl1.getFirst() + (cmp ? -1 : 0) - 0}-${wl1.getSecond() + (cmp ? 0 : -1) - 0}`;
                data[idx2][Names.length] = `${wl2.getFirst() + (cmp ? 0 : -1) - 0}-${wl2.getSecond() + (cmp ? -1 : 0) - 0}`;
            } else {

                data[idx1][Names.length] = `${wl1.getFirst() + (cmp ? -1 : 1) - 0}-${wl1.getSecond() + (cmp ? 1 : -1) - 0}`;
                data[idx2][Names.length] = `${wl2.getFirst() + (cmp ? 1 : -1) - 0}-${wl2.getSecond() + (cmp ? -1 : 1) - 0}`;
            }
        }

        example.updateSettings({
            data: data,
            rowHeaders: Names
        });
        example.render();
    } else {
        console.log("unreachable");
    }
});

$(document).on(`click`, "#reCal", function (e) {
    e.preventDefault();
    let val = $('#ReCalcurate [name=variation]').val();
    for (let i = 0; i < Names.length; i++) {
        player[Names[i]] = new Player(Names[i]);
    }
    //calc_WP();
    if ($("[name=noLoose]:checked").val()) {
        strength.updateSettings({
            data: A = normalization(toVote(val), 0, 0),
            rowHeaders: Names,
            colHeaders: Names
        });
        A = toTeleport(A);
        console.log(A);
    } else {
        strength.updateSettings({
            data: A = normalization(toVote(val), 0, 1),
            rowHeaders: Names,
            colHeaders: Names
        });
    }
    x[0] = 1;
    for (let i = 1; i < Names.length; i++) {
        x[i] = 0;
    }
    console.log(powerMethod(x, Transpose(A)));
    x = [x];
    x = normalization(x, 0, 0);
    //console.log(x);
    //toRatingVec(x);
    rates.updateSettings({
        data: toCols(x[0]),
        rowHeaders: Names
    });
    rank.updateSettings({
        data: toCols(sort(Names, x[0]))
    });
    strength.render();
    rates.render();
    rank.render();
});

$(document).on(`click`, "#load", function (e) {
    e.preventDefault();
    let file = $("#inputFile")[0].files[0], reader = new FileReader(), arr = [];
    Names = [];
    data = [];
    names.updateSettings({
        data: []
    });
    example.updateSettings({
        data: []
    });
    reader.readAsText(file);
    reader.addEventListener('load', function () {
        let ns = reader.result.split(/;/);
        let ar = ns[1].split(/\n/);
        ns = ns[0].split(/\s+/);
        for (let n of ns) {
            $("#inputName").val(n);
            $("#addName").click();
        }
        names.render();
        for (let v of ar) {
            if (v !== "")
                arr.push(v.split(/\s+/));
        }
        for (let i = 0; i < arr.length; i++) {
            matches.updateSettings({
                data: [[arr[i][0], arr[i][1]], [arr[i][2], arr[i][3]]]
            });
            $("#addMatch").click();
        }
        $("#reCal").click();
    }, false);


});

$(function () {
    names = new Handsontable($("#names").get(0), {
        data: Names,
        startRows: Names.length,
        startCols: 1,
        colHeaders: ["Name"],
        rowHeaders: true
    });
    matches = new Handsontable($("#matches").get(0), {
        startRows: 2,
        startCols: 2,
        cell: [
            {col: 0, row: 0, editor: "select", selectOptions: Names},
            {col: 1, row: 0, editor: "select", selectOptions: Names},
            {col: 0, row: 1, type: "numeric", strict: true, allowInvalid: false},
            {col: 1, row: 1, type: "numeric", strict: true, allowInvalid: false}
        ],
        rowHeaders: ["Name", "Score"]
    });
    example = new Handsontable($("#example1").get(0), {
        data: data,
        startRows: Names.length,
        startCols: Names.length + 2,
        rowHeaders: Names,
        colHeaders: Names.concat(["勝敗", "得点差"]),
        fillHandle: true //possible values: true, false, "horizontal", "vertical"
    });

    strength = new Handsontable($("#wr").get(0), {
        data: A = normalization(toVote("normal"), 0, 1),
        rowHeaders: Names,
        colHeaders: Names,
        fillHandle: false //possible values: true, false, "horizontal", "vertical"
    });

    x[0] = 1;
    for (let i = 1; i < Names.length; i++) {
        x[i] = 0;
    }
    console.log(A);
    powerMethod(x, Transpose(A));
    x = [x];
    x = normalization(x, 0, 0);
    console.log(x);
    //toRatingVec(x);

    rates = new Handsontable($("#rate").get(0), {
        data: toCols(x[0]),
        colHeaders: ["レーティングベクトル"],
        rowHeaders: Names
    });

    rank = new Handsontable($("#rank").get(0), {
        data: toCols(sort(Names, x[0])),
        colHeaders: ["順位"],
        rowHeaders: true
    });

    /*
     * x = [1,0];
     * console.log(powerMethod(x,[[1,-1],[-1,2]]));//strict answer = 2.618034
     * console.log(x); //strict answer = (0.52・・・,-0.85・・・)
     * 
     */
});



