(function () {

    MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

    function wrapNumbers(node) {
        var rxp = new RegExp("([0-9]+)", "gm");
        var $node = $(node);
        $node.not(".easterEggstension").filter("div, p, span, b, i, h").contents().filter(function () {
            var hasNumber = /\d/;
            return this.nodeType === 3 && hasNumber.test(this.nodeValue);
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
    }
$( document ).ready(function() {
    console.log( "ready!" );
    wrapNumbers('*');
});

    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function(mutation) {
            var newNodes = mutation.addedNodes;
            if(newNodes !== null){
                var $nodes = $(newNodes);
                $nodes.each(function(){
                    var hasNumber = /\d/;
                    if(this.nodeType === 3 && hasNumber.test(this.nodeValue)){
                        var rxp = new RegExp("([0-9]+)", "gm");
                        var text = this.nodeValue;
                        $(this).replaceWith(text.replace(rxp, "<egg class='easterEggstension' data-toggle='popover'>$1</egg>"));
                    }else if(this.nodeType !== 3){wrapNumbers(this);}
                });
            }
        });
    });

    // define what element should be observed by the observer
    // and what types of mutations trigger the callback
    observer.observe(document, {
        subtree: true,
        childList: true,
        characterData: true 
                //...
    });

})();