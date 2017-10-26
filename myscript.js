(function () {

    MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

    function findNumbers(node) {
        var $node = $(node);
        $node.not(".easterEggstension").filter("div, p, span, b, i, h").contents().filter(function () {
            var hasNumber = /\d/;
            return this.nodeType === 3 && hasNumber.test(this.nodeValue);
        }).each(function () {
            wrapNumbers(this);
        });

        $("egg").one('click', function () {
            $(this).popover({
                content: $(this).text(),
                trigger: "hover",
                placement: "top"});
            $(this).popover("show");
        });
    }
    
    function wrapNumbers(node) {
        var rxp = new RegExp("([0-9]+)", "gm");
        var text = node.nodeValue;
        $(node).replaceWith(text.replace(rxp, "<egg class='easterEggstension' data-toggle='popover'>$1</egg>"));
    }

    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            var newNodes = mutation.addedNodes;
            if (newNodes !== null) {
                var $nodes = $(newNodes);/*.filter(function () {
                    return !($(this).parents(".popover-content").length);
                });*/
                $nodes.each(function(){
                    var hasNumber = /\d/;
                    if(this.nodeType === 3 && hasNumber.test(this.nodeValue)){
                        wrapNumbers(this);
                    }else if(this.nodeType !== 3){findNumbers(this);}
                });
            }
        });
    });
    
    $(document).ready(function () {
        findNumbers('*');
        /*
        observer.observe(document, {
            subtree: true,
            childList: true,
            characterData: true
                    //...
        });*/
    });

})();