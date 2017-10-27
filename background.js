/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


chrome.runtime.onMessage.addListener(
        function (number, sender, sendResponse) {

            var searchUrl = 'http://numbersapi.com/' + number;
            
            var x = new XMLHttpRequest();
            x.onload = function () {
                if(x.status === 200){sendResponse(x.responseText);}
                else{sendResponse("")}
            };
            x.onerror = function () {
                console.log(x);
                sendResponse("");
            };
            x.open('GET', searchUrl, true);
            x.send();
            console.log(x);
            return true;
        }
);

