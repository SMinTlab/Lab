/*
 * ======================================================================
 * Project Name    : HTML5Application
 * File Name       : ranking.js
 * Encoding        : UTF-8
 * Creation Date   : 2017/11/07
 *
 * Copyright © 2017 Mitani. All rights reserved.
 *
 * This source code or any portion thereof must not be
 * reproduced or used in any manner whatsoever.
 * ======================================================================
 */

let myPC = true;
let debug = false;
let port = false;
if (myPC){
    rankphpurl = `http://localhost:8383/Lab/php/rank.php`;
  logphpurl = `http://localhost:8383/Lab/php/log.php`;
  chalogphpurl = `http://localhost:8383/Lab/php/chalog.php`;
  finalizeurl = `http://localhost:8383/Lab/php/finalize.php`;
} else{
    if (debug) {
  rankphpurl = `http://localhost${port ? ":8080" : ""}/mitani/php/rank.php`;
  logphpurl = `http://localhost${port ? ":8080" : ""}/mitani/php/log.php`;
  chalogphpurl = `http://localhost${port ? ":8080" : ""}/mitani/php/chalog.php`;
  finalizeurl = `http://localhost${port ? ":8080" : ""}/mitani/php/finalize.php`;
} else {
  rankphpurl = `php/rank.php`;
  logphpurl = `php/log.php`;
  chalogphpurl = `php/chalog.php`;
  finalizeurl = `php/finalize.php`;
}
}


function ranking(name, score, p) {
  let $defer = new $.Deferred();
  let num = 0;

  function loop(i) {
    return new Promise(function(res, rej) {
      let data = `rank=${i}`;
      $.ajax({
        type: "GET",
        data: data,
        url: rankphpurl,
        success: function(data, dataType) {
          if (data[0] === "200") {
            num = i;
            if (score - 0 >= data[3] - 0) {
              i = 5;
            }

          } else {
            num = i;
            i = 5;
          }
          console.log(score);
          console.log(data);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          //alert("Error : " + XMLHttpRequest.status + "(" + textStatus + ")," + errorThrown);
          console.log("Error : " + XMLHttpRequest.status + "(" + textStatus + ")," + errorThrown);
          num = i;
          i = 5;
        },
        complete: function() {
          if (i < 5) {
            loop(i + 1).then(function() {
              res();
            }, function() {
              rej();
            });
          } else {
            res();
          }
        }
      });
    });
  }

  function ploop(i) {
    return new Promise(function(res, rej) {
      let data = `rank=${i}&name=${$("#Player1").text()}`;
      $.ajax({
        type: "GET",
        data: data,
        url: rankphpurl,
        success: function(data, dataType) {
          if (data[0] === "200") {
            num = i;
            if (score - 0 >= data[3] - 0) {
              i = 5;
            }

          } else {
            num = i;
            i = 5;
          }
          console.log(score);
          console.log(data);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          //alert("Error : " + XMLHttpRequest.status + "(" + textStatus + ")," + errorThrown);
          console.log("Error : " + XMLHttpRequest.status + "(" + textStatus + ")," + errorThrown);
          num = i;
          i = 5;
        },
        complete: function() {
          if (i < 5) {
            ploop(i + 1).then(function() {
              res();
            }, function() {
              rej();
            });
          } else {
            res();
          }
        }
      });
    });
  }

  if (p === true) {
    ploop(0).then(function() {
      console.log(num);
      let data = `name=${name}&score=${score}&rank=${num}`;
      /**
       * Ajax通信メソッド
       * @param type  : HTTP通信の種類
       * @param url   : リクエスト送信先のURL
       * @param data  : サーバに送信する値
       */
      $.ajax({
        type: "POST",
        url: rankphpurl,
        data: data
      }).success(function(data, dataType) {
        if (data[0] === "200") {
          console.log(data);
        } else {
          if (XMLHttpRequest.status === 0) {
            alert("新しくランキングが登録されました.");
          } else {
            //alert("Error : " + XMLHttpRequest.status + "(" + textStatus + ")," + errorThrown);
            console.log(data);
          }
          console.log("Error");
        }
      }).error(function(XMLHttpRequest, textStatus, errorThrown) {
        if (XMLHttpRequest.status === 0) {
          alert("新しくランキングが登録されました.");
        } else {
          alert("Error : " + XMLHttpRequest.status + "(" + textStatus + ")," + errorThrown);
        }
        console.log("Error");
      }).complete(function() {
        rankreload();
        $defer.resolve();
      });
    });
  } else {
    loop(0).then(function() {
      console.log(num);
      let code;
      if ($("#Player1").text() === name) {
        code = editor1.getValue();
      } else {
        code = editor2.getValue();
      }
      let data = `name=${name}&score=${score}&rank=${num}&code=${code}`;
      /**
       * Ajax通信メソッド
       * @param type  : HTTP通信の種類
       * @param url   : リクエスト送信先のURL
       * @param data  : サーバに送信する値
       */
      $.ajax({
        type: "POST",
        url: rankphpurl,
        data: data
      }).success(function(data, dataType) {
        if (data[0] === "200") {
          console.log(data);
        } else {
          if (XMLHttpRequest.status === 0) {
            alert("新しくランキングが登録されました.");
          } else {
            //alert("Error : " + XMLHttpRequest.status + "(" + textStatus + ")," + errorThrown);
            console.log(data);
          }
          console.log("Error");
        }
      }).error(function(XMLHttpRequest, textStatus, errorThrown) {
        if (XMLHttpRequest.status === 0) {
          alert("新しくランキングが登録されました.");
        } else {
          alert("Error : " + XMLHttpRequest.status + "(" + textStatus + ")," + errorThrown);
        }
        console.log("Error");
      }).complete(function() {

        rankreload();
        $defer.resolve();
      });
    });
  }
  return $defer.promise();
}

function new_ranking(name, score, code) {
  let $defer = new $.Deferred();
  let data = `name=${name}&score=${score}&code=${code}`;
  $.ajax({
    type: "POST",
    url: rankphpurl,
    data: data
  }).success(function(data, dataType) {
    if (data[0] === "200") {
      console.log(data);
      alert("新しくランキングが登録されました.");
    } else {
      alert("Error : " + data);
      alert("新しくランキングを登録できませんでした.");
      console.log("Error");
      console.log("Error : " + data);
    }
  }).error(function(XMLHttpRequest, textStatus, errorThrown) {
    alert("Error : " + XMLHttpRequest.status + "(" + textStatus + ")," + errorThrown);
  }).complete(function() {
    rankreload();
    $defer.resolve();
  });
  return $defer.promise();
}

function chalog(winner, looser, winsc, loosesc) {
  let $defer = new $.Deferred();
  let data = `winner=${winner}&looser=${looser}&winsc=${winsc}&loosesc=${loosesc}`;
  $.ajax({
    type: "POST",
    url: chalogphpurl,
    data: data
  }).success(function(data, dataType) {
    if (data[0] === "200") {
      console.log(data);
    } else {
      alert("Error : " + data);
      console.log("Error");
      console.log("Error : " + data);
    }
  }).error(function(XMLHttpRequest, textStatus, errorThrown) {
    alert("Error : " + XMLHttpRequest.status + "(" + textStatus + ")," + errorThrown);
  }).complete(function() {
    $defer.resolve();
  });
  return $defer.promise();
}

function ref() {
  let $mdefer = new $.Deferred();
  let data;
  console.log("ref");
  $(`#ranktab`).find(`tbody`).empty();
  loop(0);

  function loop(i) {
    let $defer = new $.Deferred();
    data = `rank=${i}&wantcode=0`;
    $.ajax({
      type: "GET",
      url: rankphpurl,
      data: data
    }).success(function(data, dataType) {
      if (data[0] === "200") {
        console.log(data);
        let txt = `
            <tr>
                    <td id="rank${i}_rank" class="rank_${data[2]}">${i + 1}</td>
                    <td id="rank${i}_name" class="rank_${data[2]}">${data[2]}</td>
                    <td id="rank${i}_score" class="rank_${data[2]}">${data[3]}</td>
             </tr>`;
        $(`#ranktab`).find(`tbody`).append(txt);
      }
    }).error(function(XMLHttpRequest, textStatus, errorThrown) {
      alert("Error : " + XMLHttpRequest.status + "(" + textStatus + ")," + errorThrown);
      console.log(XMLHttpRequest.responseText);
      console.log("Error : " + XMLHttpRequest.status + "(" + textStatus + ")," + errorThrown);
    }).complete(function() {
      if (i < 4) {
        loop(i + 1).then(function() {
          $defer.resolve();
        });
      } else {
        $defer.resolve();
        $mdefer.resolve();
      }
    });
    return $defer.promise();
  }
  return $mdefer.promise();
}

function refP1(name) {
  let data;
  console.log("refP1");
  $(`#P1log`).find(`tbody`).empty();
  loop(0);

  function loop(i) {
    let $defer = new $.Deferred();
    data = `rank=${i}&name=${name}&wantcode=0`;
    $.ajax({
      type: "GET",
      url: rankphpurl,
      data: data
    }).success(function(data, dataType) {
      if (data[0] === "200") {
        console.log(data);
        let txt = `<tr>
                            <td id="log${i}P1">${i + 1}</td>
                            <td id="log${i}_scoreP1">${data[3]}</td>
                           </tr>`;
        $(`#P1log`).find(`tbody`).append(txt);
        //console.log(txt);
      }

    }).error(function(XMLHttpRequest, textStatus, errorThrown) {
      alert("Error : " + XMLHttpRequest.status + "(" + textStatus + ")," + errorThrown);
      console.log(XMLHttpRequest.responseText);
      console.log("Error : " + XMLHttpRequest.status + "(" + textStatus + ")," + errorThrown);
    }).complete(function() {
      if (i < 4) {
        loop(i + 1).then(function() {
          $defer.resolve();
        });
      } else {
        $defer.resolve();
      }
    });
    return $defer.promise();
  }
}

function refchalog() {
  let data;
  let txt;
  console.log("refchalog");
  loop(0);

  function loop(i) {
    let $defer = new $.Deferred();
    data = `num=${i}`;
    $.ajax({
      type: "GET",
      url: chalogphpurl,
      data: data
    }).success(function(data, dataType) {
      console.log(data);
      if (data[0] === "200") {
        if (i === 0) {
          if ($(`.rank_${data[1]}`).length) {

            $(`.rank_${data[1]}`).each(function(i) {
              if ($(this).hasClass("danger")) {
                $(this).removeClass("danger");
              }
              $(this).addClass("success");
            });

          }
          if ($(`.rank_${data[2]}`).length) {
            $(`.rank_${data[2]}`).each(function(i) {
              if ($(this).hasClass("success")) {
                $(this).removeClass("success");
              }
              $(this).addClass("danger");
            });

          }
        }
        if (data[1]) {
          txt = `<p>${data[1]}のコードが${data[2]}のコードと戦い,${data[3]}対${data[4]}で${data[1]}が勝利した.(${data[5].slice(0,4)}/${data[5].slice(4,6)}/${data[5].slice(6,8)} ${data[5].slice(8,10)}:${data[5].slice(10,12)}:${data[5].slice(12,14)})</p>`;
          $("#chalog").append(txt);
        }

      }
    }).error(function(XMLHttpRequest, textStatus, errorThrown) {
      //alert("Error : " + XMLHttpRequest.status + "(" + textStatus + ")," + errorThrown);
      console.log(XMLHttpRequest.responseText);
      console.log("Error : " + XMLHttpRequest.status + "(" + textStatus + ")," + errorThrown);
    }).complete(function() {
      if (i < 4) {
        loop(i + 1).then(function() {
          $defer.resolve();
        });
      } else {
        $defer.resolve();
      }
    });
    return $defer.promise();
  }
}

function adjust(F) {
  if (document.getElementById(F)) {
    let myF = document.getElementById(F);
    let myC = myF.contentWindow.document.documentElement;
    let myH = 400;
    if (document.all) {
      myH = myC.scrollHeight;
    } else {
      myH = myC.offsetHeight;
    }
    myF.style.height = myH + "px";
  }
}

$(window).load(function() {
  ref().then(function() {
    refchalog();
  });
  refP1($("#Player1", parent.document).text());

  adjust(this.id);
});
