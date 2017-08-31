var rxp = new RegExp("([0-9]+)", "gm");
$("div, p, span, pre, b, i, h, code").not(".easterEggstension").contents().filter(function () {
    return this.nodeType === 3;
}).each(function () {
    var text = this.nodeValue;
    $(this).replaceWith(text.replace(rxp, "<egg class='easterEggstension' data-toggle='popover'>$1</egg>"));
});

$(document).on('click', 'egg[data-toggle="popover"]', function () {
    $(this).popover({
        content: $(this).text(),
        trigger: "hover",
        placement: "top"});
    $(this).popover("show");
});