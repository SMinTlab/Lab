/* 
 * ======================================================================
 * Project Name    : StickParson
 * File Name       : maka.js
 * Encoding        : UTF-8
 * Creation Date   : 2018/02/27
 *
 * Copyright © 2018 Mitani. All rights reserved.
 *
 * This source code or any portion thereof must not be
 * reproduced or used in any manner whatsoever.
 * ======================================================================
 */
let row;
let quest_count;

$(function () {
    row = 1;
    quest_count = 0;
    $(".chosen").chosen({
        width: "auto",
    });
    $("#add").on("click", function () {
        console.log("add row");
        row++;
        $("tbody").append(`<tr class="maka-table">
                        <th class="no">${row}</th>
                        <th class="jewelry">
                            <select class="chosen" data-placeholder="装飾品を選択">
                                <option value=""></option>
                                <optgroup label="RARE5">
                                    <option value="0">威嚇珠</option>
                                    <option value="1">煙復珠</option>
                                    <option value="2">加護珠</option>
                                    <option value="3">逆境珠</option>
                                    <option value="4">窮地珠</option>
                                    <option value="5">嗅覚珠</option>
                                    <option  value="6">采配珠</option>
                                    <option  value="7">沼渡珠</option>
                                    <option  value="8">植学珠</option>
                                    <option  value="9">整備珠</option>
                                    <option  value="10">摂食珠</option>
                                    <option  value="11">潜伏珠</option>
                                    <option value="12">耐火珠</option>
                                    <option value="13">耐水珠</option>
                                    <option value="14">耐毒珠</option>
                                    <option value="15">耐爆珠</option>
                                    <option value="16">耐氷珠</option>
                                    <option value="17">耐防珠</option>
                                    <option value="18">耐麻珠</option>
                                    <option value="19">耐眠珠</option>
                                    <option value="20">耐雷珠</option>
                                    <option value="21">耐龍珠</option>
                                    <option value="22">耐裂珠</option>
                                    <option value="23">耐瘴珠</option>
                                    <option value="24">地学珠</option>
                                    <option value="25">飛燕珠</option>
                                    <option value="26">標本珠</option>
                                    <option value="27">砲手珠</option>
                                    <option value="28">無食珠</option>
                                    
                                </optgroup>
                                <optgroup label="RARE6">
                                    <option value="29">KO珠</option>
                                    <option value="30">火炎珠</option>
                                    <option value="31">回避珠</option>
                                    <option value="32">滑走珠</option>
                                    <option value="33">研磨珠</option>
                                    <option value="34">鼓笛珠</option>
                                    <option value="35">持続珠</option>
                                    <option value="36">重撃珠</option>
                                    <option value="37">治癒珠</option>
                                    <option value="38">早食珠</option>
                                    <option value="39">早復珠</option>
                                    <option value="40">速納珠</option>
                                    <option value="41">体術珠</option>
                                    <option value="42">体力珠</option>
                                    <option value="43">耐衝珠</option>
                                    <option value="44">耐震珠</option>
                                    <option value="45">耐絶珠</option>
                                    <option value="46">耐属珠</option>
                                    <option value="47">達人珠</option>
                                    <option value="48">奪気珠</option>
                                    <option value="49">跳躍珠</option>
                                    <option value="50">痛撃珠</option>
                                    <option value="51">投石珠</option>
                                    <option value="52">毒珠</option>
                                    <option value="53">毒瓶珠</option>
                                    <option value="54">破龍珠</option>
                                    <option value="55">爆師珠</option>
                                    <option value="56">氷結珠</option>
                                    <option value="57">防音珠</option>
                                    <option value="58">防御珠</option>
                                    <option value="59">防風珠</option>
                                    <option value="60">無撃珠</option>
                                    <option value="61">友愛珠</option>
                                    <option value="62">雷光珠</option>
                                    <option value="63">流水珠</option>
                                </optgroup>
                                <optgroup label="RARE7">
                                    <option value="64">剛刃珠</option>
                                    <option value="65">強壁珠</option>
                                    <option value="66">解放珠</option>
                                    <option value="67">逆上珠</option>
                                    <option value="68">渾身珠</option>
                                    <option value="69">強弾珠</option>
                                    <option value="70">昂揚珠</option>
                                    <option value="71">攻撃珠</option>
                                    <option value="72">底力珠</option>
                                    <option value="73">増弾珠</option>
                                    <option value="74">睡眠珠</option>
                                    <option value="75">挑戦珠</option>
                                    <option value="76">鉄壁珠</option>
                                    <option value="77">特射珠</option>
                                    <option value="78">爆瓶珠</option>
                                    <option value="79">早気珠</option>
                                    <option value="80">爆破珠</option>
                                    <option value="81">無傷珠</option>
                                    <option value="82">麻痺珠</option>
                                </optgroup>
                                <optgroup label="RARE8">
                                    <option value="83">強弓珠</option>
                                    <option value="84">解放珠</option>
                                    <option value="85">強走珠</option>
                                    <option value="86">貫通珠</option>
                                    <option value="87">心眼珠</option>
                                    <option value="88">散弾珠</option>
                                    <option value="89">茸好珠</option>
                                    <option value="90">短縮珠</option>
                                    <option value="91">匠珠</option>
                                    <option value="92">抜刀珠</option>
                                    <option value="93">砲術珠</option>
                                    <option value="94">痺瓶珠</option>
                                    <option value="95">眠瓶珠</option>
                                    <option value="96">龍封珠</option>
                                </optgroup>
                            </select>
                        </th>
                        <th class="jewelry">
                            <select class="chosen" data-placeholder="装飾品を選択">
                                <option value=""></option>
                                <optgroup label="RARE5">
                                    <option value="0">威嚇珠</option>
                                    <option value="1">煙復珠</option>
                                    <option value="2">加護珠</option>
                                    <option value="3">逆境珠</option>
                                    <option value="4">窮地珠</option>
                                    <option value="5">嗅覚珠</option>
                                    <option  value="6">采配珠</option>
                                    <option  value="7">沼渡珠</option>
                                    <option  value="8">植学珠</option>
                                    <option  value="9">整備珠</option>
                                    <option  value="10">摂食珠</option>
                                    <option  value="11">潜伏珠</option>
                                    <option value="12">耐火珠</option>
                                    <option value="13">耐水珠</option>
                                    <option value="14">耐毒珠</option>
                                    <option value="15">耐爆珠</option>
                                    <option value="16">耐氷珠</option>
                                    <option value="17">耐防珠</option>
                                    <option value="18">耐麻珠</option>
                                    <option value="19">耐眠珠</option>
                                    <option value="20">耐雷珠</option>
                                    <option value="21">耐龍珠</option>
                                    <option value="22">耐裂珠</option>
                                    <option value="23">耐瘴珠</option>
                                    <option value="24">地学珠</option>
                                    <option value="25">飛燕珠</option>
                                    <option value="26">標本珠</option>
                                    <option value="27">砲手珠</option>
                                    <option value="28">無食珠</option>
                                    
                                </optgroup>
                                <optgroup label="RARE6">
                                    <option value="29">KO珠</option>
                                    <option value="30">火炎珠</option>
                                    <option value="31">回避珠</option>
                                    <option value="32">滑走珠</option>
                                    <option value="33">研磨珠</option>
                                    <option value="34">鼓笛珠</option>
                                    <option value="35">持続珠</option>
                                    <option value="36">重撃珠</option>
                                    <option value="37">治癒珠</option>
                                    <option value="38">早食珠</option>
                                    <option value="39">早復珠</option>
                                    <option value="40">速納珠</option>
                                    <option value="41">体術珠</option>
                                    <option value="42">体力珠</option>
                                    <option value="43">耐衝珠</option>
                                    <option value="44">耐震珠</option>
                                    <option value="45">耐絶珠</option>
                                    <option value="46">耐属珠</option>
                                    <option value="47">達人珠</option>
                                    <option value="48">奪気珠</option>
                                    <option value="49">跳躍珠</option>
                                    <option value="50">痛撃珠</option>
                                    <option value="51">投石珠</option>
                                    <option value="52">毒珠</option>
                                    <option value="53">毒瓶珠</option>
                                    <option value="54">破龍珠</option>
                                    <option value="55">爆師珠</option>
                                    <option value="56">氷結珠</option>
                                    <option value="57">防音珠</option>
                                    <option value="58">防御珠</option>
                                    <option value="59">防風珠</option>
                                    <option value="60">無撃珠</option>
                                    <option value="61">友愛珠</option>
                                    <option value="62">雷光珠</option>
                                    <option value="63">流水珠</option>
                                </optgroup>
                                <optgroup label="RARE7">
                                    <option value="64">剛刃珠</option>
                                    <option value="65">強壁珠</option>
                                    <option value="66">解放珠</option>
                                    <option value="67">逆上珠</option>
                                    <option value="68">渾身珠</option>
                                    <option value="69">強弾珠</option>
                                    <option value="70">昂揚珠</option>
                                    <option value="71">攻撃珠</option>
                                    <option value="72">底力珠</option>
                                    <option value="73">増弾珠</option>
                                    <option value="74">睡眠珠</option>
                                    <option value="75">挑戦珠</option>
                                    <option value="76">鉄壁珠</option>
                                    <option value="77">特射珠</option>
                                    <option value="78">爆瓶珠</option>
                                    <option value="79">早気珠</option>
                                    <option value="80">爆破珠</option>
                                    <option value="81">無傷珠</option>
                                    <option value="82">麻痺珠</option>
                                </optgroup>
                                <optgroup label="RARE8">
                                    <option value="83">強弓珠</option>
                                    <option value="84">解放珠</option>
                                    <option value="85">強走珠</option>
                                    <option value="86">貫通珠</option>
                                    <option value="87">心眼珠</option>
                                    <option value="88">散弾珠</option>
                                    <option value="89">茸好珠</option>
                                    <option value="90">短縮珠</option>
                                    <option value="91">匠珠</option>
                                    <option value="92">抜刀珠</option>
                                    <option value="93">砲術珠</option>
                                    <option value="94">痺瓶珠</option>
                                    <option value="95">眠瓶珠</option>
                                    <option value="96">龍封珠</option>
                                </optgroup>
                            </select>
                        </th>
                        <th class="jewelry">
                            <select class="chosen" data-placeholder="装飾品を選択">
                                <option value=""></option>
                                <optgroup label="RARE5">
                                    <option value="0">威嚇珠</option>
                                    <option value="1">煙復珠</option>
                                    <option value="2">加護珠</option>
                                    <option value="3">逆境珠</option>
                                    <option value="4">窮地珠</option>
                                    <option value="5">嗅覚珠</option>
                                    <option  value="6">采配珠</option>
                                    <option  value="7">沼渡珠</option>
                                    <option  value="8">植学珠</option>
                                    <option  value="9">整備珠</option>
                                    <option  value="10">摂食珠</option>
                                    <option  value="11">潜伏珠</option>
                                    <option value="12">耐火珠</option>
                                    <option value="13">耐水珠</option>
                                    <option value="14">耐毒珠</option>
                                    <option value="15">耐爆珠</option>
                                    <option value="16">耐氷珠</option>
                                    <option value="17">耐防珠</option>
                                    <option value="18">耐麻珠</option>
                                    <option value="19">耐眠珠</option>
                                    <option value="20">耐雷珠</option>
                                    <option value="21">耐龍珠</option>
                                    <option value="22">耐裂珠</option>
                                    <option value="23">耐瘴珠</option>
                                    <option value="24">地学珠</option>
                                    <option value="25">飛燕珠</option>
                                    <option value="26">標本珠</option>
                                    <option value="27">砲手珠</option>
                                    <option value="28">無食珠</option>
                                    
                                </optgroup>
                                <optgroup label="RARE6">
                                    <option value="29">KO珠</option>
                                    <option value="30">火炎珠</option>
                                    <option value="31">回避珠</option>
                                    <option value="32">滑走珠</option>
                                    <option value="33">研磨珠</option>
                                    <option value="34">鼓笛珠</option>
                                    <option value="35">持続珠</option>
                                    <option value="36">重撃珠</option>
                                    <option value="37">治癒珠</option>
                                    <option value="38">早食珠</option>
                                    <option value="39">早復珠</option>
                                    <option value="40">速納珠</option>
                                    <option value="41">体術珠</option>
                                    <option value="42">体力珠</option>
                                    <option value="43">耐衝珠</option>
                                    <option value="44">耐震珠</option>
                                    <option value="45">耐絶珠</option>
                                    <option value="46">耐属珠</option>
                                    <option value="47">達人珠</option>
                                    <option value="48">奪気珠</option>
                                    <option value="49">跳躍珠</option>
                                    <option value="50">痛撃珠</option>
                                    <option value="51">投石珠</option>
                                    <option value="52">毒珠</option>
                                    <option value="53">毒瓶珠</option>
                                    <option value="54">破龍珠</option>
                                    <option value="55">爆師珠</option>
                                    <option value="56">氷結珠</option>
                                    <option value="57">防音珠</option>
                                    <option value="58">防御珠</option>
                                    <option value="59">防風珠</option>
                                    <option value="60">無撃珠</option>
                                    <option value="61">友愛珠</option>
                                    <option value="62">雷光珠</option>
                                    <option value="63">流水珠</option>
                                </optgroup>
                                <optgroup label="RARE7">
                                    <option value="64">剛刃珠</option>
                                    <option value="65">強壁珠</option>
                                    <option value="66">解放珠</option>
                                    <option value="67">逆上珠</option>
                                    <option value="68">渾身珠</option>
                                    <option value="69">強弾珠</option>
                                    <option value="70">昂揚珠</option>
                                    <option value="71">攻撃珠</option>
                                    <option value="72">底力珠</option>
                                    <option value="73">増弾珠</option>
                                    <option value="74">睡眠珠</option>
                                    <option value="75">挑戦珠</option>
                                    <option value="76">鉄壁珠</option>
                                    <option value="77">特射珠</option>
                                    <option value="78">爆瓶珠</option>
                                    <option value="79">早気珠</option>
                                    <option value="80">爆破珠</option>
                                    <option value="81">無傷珠</option>
                                    <option value="82">麻痺珠</option>
                                </optgroup>
                                <optgroup label="RARE8">
                                    <option value="83">強弓珠</option>
                                    <option value="84">解放珠</option>
                                    <option value="85">強走珠</option>
                                    <option value="86">貫通珠</option>
                                    <option value="87">心眼珠</option>
                                    <option value="88">散弾珠</option>
                                    <option value="89">茸好珠</option>
                                    <option value="90">短縮珠</option>
                                    <option value="91">匠珠</option>
                                    <option value="92">抜刀珠</option>
                                    <option value="93">砲術珠</option>
                                    <option value="94">痺瓶珠</option>
                                    <option value="95">眠瓶珠</option>
                                    <option value="96">龍封珠</option>
                                </optgroup>
                            </select>
                        </th>
                    </tr>`);
        $(".chosen").chosen({
            width: "auto",
        });
    });
    $("#quest").on("click", function () {
        let exAct = -3;
        let add_flag = false;
        quest_count++;
        console.log($(".maka-table").length);
        if ($(".maka-table").length < 4) {
            $("#add").click();
            $("#add").click();
            $("#add").click();
        }
        $(".maka-table").each(function (i, e) {
            if (quest_count % 3 === 0) {
                if ($(".maka-table").length - 2 !== i) {
                    if ($(e).hasClass("active")) {
                        $(e).removeClass("active");
                        $(e).addClass("success");
                        exAct = i;
                        if (i + 4 > $(".maka-table").length) {
                            add_flag = true;
                        }
                    }
                }
                if (i - 1 === exAct) {
                    $(e).addClass("warning");
                }
                if (i - 2 === exAct) {
                    $(e).addClass("active");
                }
            } else {
                if ($(".maka-table").length - 1 !== i) {
                    if ($(e).hasClass("active")) {
                        $(e).removeClass("active");
                        $(e).addClass("success");
                        exAct = i;
                        if (i + 4 > $(".maka-table").length) {
                            add_flag = true;
                        }
                    }
                }
                if (i - 1 === exAct) {
                    $(e).addClass("active");
                }
            }

        });
        if (add_flag === true) {
            $("#add").click();
            $("#add").click();
            $("#add").click();
        }
    });
    $("#alchemy").on("click", function () {
        let exAct = -2;
        if ($(".maka-table").length < 2) {
            $("#add").click();
            $("#add").click();
        }
        $(".maka-table").each(function (i, e) {
            if ($(".maka-table").length - 1 !== i) {
                if ($(e).hasClass("active")) {
                    $(e).removeClass("active");
                    $(e).addClass("info");
                    exAct = i;
                }

            }
            if (i - 1 === exAct) {
                $(e).addClass("active");
            }
        });
        $("#add").click();
    });
});


