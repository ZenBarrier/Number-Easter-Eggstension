var rxp = new RegExp("([0-9]+)", "gm");
$("div").contents().filter(function () {
    return this.nodeType === 3;
}).each(function () {
    var text = this.nodeValue;
    $(this).replaceWith(text.replace(rxp, "<span data-toggle='popover'>$1</span>"));
});

$(document).on('click', 'span[data-toggle="popover"]', function () {
    $(this).popover({
        content: $(this).text(),
        trigger: "hover",
        placement: "top"});
    $(this).popover("show");
});