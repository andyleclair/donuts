// only makes square graphs, ya dummy!

function donutGraph(size, num, total, target, outerColor, innerColor) {
    var outerFill = { stroke: outerColor, fill: outerColor };
    var innerFill = { stroke: innerColor, fill: innerColor };
    var r = Raphael(target, size, size),
        halfSize = (size / 2),
        outerSize = halfSize - (halfSize / 4),
        arcSize = halfSize * 0.625,
        bigTxtSize = halfSize * 0.275,
        smallTxtSize = halfSize * 0.125,
        percentage = Math.round((num / total) * 100),
        numVsTotal = num + "/" + total,
        param = {
            stroke: "#fff",
            "stroke-width": halfSize * 0.16
        };
    r.customAttributes.arc = function(value, total, R) {
        var alpha = 360 / total * value,
            a = (90 - alpha) * Math.PI / 180,
            x = halfSize + R * Math.cos(a),
            y = halfSize - R * Math.sin(a),
            path;
        if (total == value) {
            path = [["M", halfSize, halfSize - R], ["A", R, R, 0, 1, 1, halfSize - 0.01, halfSize - R]];
        } else {
            path = [["M", halfSize, halfSize - R], ["A", R, R, 0, +(alpha > 180), 1, x, y]];
        }
        return {
            path: path,
            stroke: outerColor
        };
    };

    var outer = r.circle(halfSize, halfSize, outerSize).attr(outerFill);
    var second = r.circle(halfSize, halfSize, outerSize * 0.926).attr(innerFill);
    var percent = r.path().attr(param).attr({
        arc: [0, total, arcSize]
    }).animate({
        arc: [num, total, arcSize]
    }, 1500);

    var third = r.circle(halfSize, halfSize, outerSize * 0.734).attr(outerFill);
    var inner = r.circle(halfSize, halfSize, outerSize * 0.667).attr(innerFill);

    var mainText = r.text(halfSize, halfSize * 0.9, percentage + "%").attr({
        "font-size": bigTxtSize,
        "font-family": "Helvetica Neue",
        "font-weight": "bold"
    });
    
    var subText = r.text(halfSize * 1.3, halfSize * 1.1, numVsTotal).attr({
        "font-size": smallTxtSize,
        "font-family": "Helvetica Neue",
        "stroke": outerColor,
        "fill": outerColor,
        "text-anchor": 'end'
    });
}


donutGraph(400, 1770, 3000, 'chart', "#17BDCB", "#F2F2F2");
