(function () {

    MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

    function findNumbers(node) {
        var $node = $(node);
        $node.not("egg, a *").filter("div, p, span, b, i, h").contents().filter(function () {
            var hasNumber = /\d/;
            return this.nodeType === 3 && hasNumber.test(this.nodeValue);
        }).each(function () {
            wrapNumbers(this);
        });
        
        $("egg").not(".cracked").each(function () {
            var egg = this;
            $(egg).popover({
                content: "<span class='egg-loading glyphicon glyphicon-refresh gly-spin' aria-hidden='true'></span>",
                html: true,
                trigger: "hover",
                placement: "top"});
        });

        $("egg").not(".cracked").one('mouseover', function () {
            var egg = this;
            chrome.runtime.sendMessage(
                    $(egg).text(),
                    function (response) {
                        if(response === ''){
                            return;
                        }
                        $(egg).data('bs.popover').options.content = response;
                        if ($(egg).is(":hover")) {
                            $(egg).popover("show");
                        }
                    }
            );
            
        });
        $("egg").not(".cracked").addClass("cracked");
    }
    
    function wrapNumbers(node) {
        var rxp = new RegExp("([0-9]+)", "gm");
        var text = node.nodeValue;
        $(node).replaceWith(text.replace(rxp, "<egg class='easterEggstension' data-container='body' data-toggle='popover'>$1</egg>"));
    }

    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            var newNodes = mutation.addedNodes;
            if (newNodes !== null) {
                var $nodes = $(newNodes).filter(function () {
                    return !($(this).parents(".popover-content, popover, a, style").length);
                });
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
        
        observer.observe(document.body, {
            subtree: true,
            childList: true,
            characterData: true
                    //...
        });
    });

})();