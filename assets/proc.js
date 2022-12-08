
function loadData() {
    // rawData.ext/title/description
    for (var axis of rawData.axes) {
        // axis.id/title/description
        for (var val of axis.values) {
            // val.key/title/description
            document.getElementById('clicktab_' + axis.id + '__' + val.key).onclick = fillTable;
        }
        document.getElementById('x_' + axis.id).onclick = fillTable;
        document.getElementById('y_' + axis.id).onclick = fillTable;
        console.log(document.getElementById('x_' + axis.id))
    }
    console.log("Loaded data for '" + rawData.title + "'");
}

function fillTable() {
    var x = document.querySelector('input[name="x_axis_selector"]:checked').id.substring(2);
    var y = document.querySelector('input[name="y_axis_selector"]:checked').id.substring(2);
    console.log("Fill " + x + ", " + y);
    var table = document.getElementById("image_table");
    var newContent = "<th>";
    var xAxis = null;
    var yAxis = null;
    for (var axis of rawData.axes) {
        if (axis.id == x) {
            xAxis = axis;
        }
        if (axis.id == y) {
            yAxis = axis;
        }
    }
    for (var val of xAxis.values) {
        newContent += "<td title=\"" + val.description + "\">" + val.title + "</td>";
    }
    newContent += "</th>";
    for (var val of yAxis.values) {
        newContent += "<tr><td title=\"" + val.description + "\">" + val.title + "</td>";
        var url = "";
        for (var subAxis of rawData.axes) {
            if (subAxis.id == y) {
                url += "/" + val.key;
            }
            else if (subAxis.id == x) {
                url += "/{X}"
            }
            else {
                var valSelectedKey;
                for (var subVal of subAxis.values) {
                    console.log("Axis " + subAxis.id + " at " + subVal.key + " is " + window.getComputedStyle(document.getElementById('tab_' + subAxis.id + '__' + subVal.key)).display);
                    if (window.getComputedStyle(document.getElementById('tab_' + subAxis.id + '__' + subVal.key)).display != "none") {
                        valSelectedKey = subVal.key;
                    }
                }
                url += "/" + valSelectedKey;
            }
        }
        for (var xVal of xAxis.values) {
            newContent += "<td><img src=\"" + url.replace("{X}", xVal.key).substring(1) + "." + rawData.ext + "\" /></td>";
        }
        newContent += "</tr>";
    }
    table.innerHTML = newContent;
}

loadData();
