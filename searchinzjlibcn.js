// ==UserScript==
// @name           Search in ZJLIB.CN
// @namespace      openingcard.com
// @description    Search book in ZJLIB
// @include        http://*.douban.com/*
// ==/UserScript==

var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://code.jquery.com/jquery-latest.pack.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);


function GM_wait() {
    if (typeof unsafeWindow.jQuery === 'undefined') {
        window.setTimeout(GM_wait, 1000);
    } else {
        jqcode(unsafeWindow.jQuery);
    }
}

function jqcode($) {
    $('body').append("<form action='http://opac.zjlib.cn:8088/opac/search?searchWay=title' method='get' target='_blank' id='zjlib'><input type='hidden' name='q' value=''/></form>");
    $("a[href!='9.douban.com'][href^='http://book.douban.com/subject/'][href$='/']").each(function() {
        var _this = $(this);
        
        var bookName = $.trim(_this.attr('title') || _this.text());
        
        if (bookName === null || bookName === "") {
            return;
        }

        var obj = [
            "<a href=\"javascript:var fm=document.forms.zjlib;fm.q.value='"
            , encodeURIComponent(bookName)
            , "';fm.submit();\" title='&#21435;&#27993;&#22270;&#25214;&#25214;&#30475;'><img src='data:image/png;base64,"
            , "iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAMAAAC67D+PAAAAFVBMVEVmmcwzmcyZzP8AZswAZv////////9E6giVAAAAB3RSTlP///////8AGksDRgAAADhJREFUGFcly0ESAEAEA0Ei6/9P3sEcVB8kmrwFyni0bOeyyDpy9JTLEaOhQq7Ongf5FeMhHS/4AVnsAZubxDVmAAAAAElFTkSuQmCC'/></a>"
        ];
        _this.after(obj.join(''));
    });
}

GM_wait();
