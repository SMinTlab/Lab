/* 
 * ======================================================================
 * Project Name    : HTML5Application
 * File Name       : dropzone.js
 * Encoding        : UTF-8
 * Creation Date   : 2017/05/19
 *
 * Copyright © 2017 Mitani. All rights reserved.
 *
 * This source code or any portion thereof must not be
 * reproduced or used in any manner whatsoever.
 * ======================================================================
 */
function handleFileSelect(evt) {
    evt.preventDefault();
    evt.stopPropagation();

    let files = evt.dataTransfer.files; // FileList object.

    // files is a FileList of File objects. List some properties.
    let output = [];
    let type;

    for (let i = 0, f; f = files[i]; i++) {
        type = f.type;
        if (f.type === "text/plain") {
            let reader = new FileReader();
            reader.readAsText(f);
            reader.onload = function (ev) {
                /*
                let resultarr = (reader.result).split("\n");
                let result = resultarr[0] + "<br>";
                for (i = 1; i < resultarr.length; ++i) {
                    result += resultarr[i] + "<br>";
                }
                document.getElementById('stage').innerHTML = document.getElementById('stage').innerHTML +
                        '<div id="map"; style="positioin: static; margin: -40px -5px; font-size: 14px; paddind: 0px; text-align: left;">' + result + '</div>';
                        */
                intoArray(reader.result);
                showMapinStage(reader.result);
            };
        } else {
            output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                    f.size, ' bytes, last modified: ',
                    f.lastModifiedDate.toLocaleDateString(), '</li>');
        }
    }
    console.log("file type is " + type);
    if (type !== "text/plain") {
        document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
    }
}

function handleDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    editedMapArray = null;
    if (document.getElementById('map') !== null) {
        let e = document.getElementById('map');
        e.parentNode.removeChild(e);

    }
    if (document.getElementById('humantab') !== null) {
        let h = document.getElementById('humantab');
        while (h.firstChild) {
            h.removeChild(h.firstChild);
        }
    }
    if(document.getElementById('tiles') !== null){
        let t = document.getElementById('tiles');
        while (t.firstChild) {
            t.removeChild(t.firstChild);
        }
    }
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

// Setup the dnd listeners.
let dropZone = document.getElementById('stage');
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', handleFileSelect, false);
