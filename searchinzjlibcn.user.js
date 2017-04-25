// ==UserScript==
// @name           Search in ZJLIB.CN
// @namespace      openingcard.com
// @description    Search book in ZJLIB
// @include        https://*.douban.com/*
// @require        https://code.jquery.com/jquery-3.1.0.min.js
// @icon           data:image/vnd.microsoft.icon;base64,AAABAAEAEBAAAAEACABoBQAAFgAAACgAAAAQAAAAIAAAAAEACAAAAAAAAAEAABILAAASCwAAAAEAAAABAAA4jSoAEHMAAIW4fQCtz6gAQZIzAODt3gAQcgAARJQ3AFCbRAA3iikA3uzcAKvNpQDL4cgAFHQEADiMKgBfpFQAN4oqAD+OMgCRwIkAQJAyACqDGwBHkzsAR5Y6ABV3BABEkDcARJE3ACqFGwBQmkQA3OvZAIa4fQA2iikAQ5Q2AF+hVADb6tkAcKpmAFCYRABDkDYAkL6JAEiWOwCZxZIAzOHIAIa5fQBHlDoArtCoAJnEkgBwrWYAPo4xADaJKQCszqYAOIsrAIS3fAA4iyoAEXYAABF1AAARdAAA////ABF3AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABDg1NgE2NjY2NjY2NgE2EzgPKwMwCzAwMDALMAMDIDU4Jzc3Nzc3Nzc3Nzc3Nyw0ODg4OBI3IjU4LTclATQ4ODg4ODQFNw02NRc3BQY2NDg4ODgbNzcvLhEeNzcjATU4ODgmNzc3Nzc3Nzc3NxU1ODg4BzchEAAAAAAAHDcYNTg4OB83DAY2NTU1NSg3JDU4ODgHNwoxMTExMTEKNxk1ODg4Fjc3Nzc3Nzc3NzcqNDg4ODQOMwkzMzMzCTMzNjU0OBopHQIyMjIyMjICAgIUNDgINzc3Nzc3Nzc3Nzc3CDg4ODg4ODg4ODg4ODg4ODg4BDg4ODg4ODg4ODg4ODg4BAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=
// ==/UserScript==

function GM_wait() {
    if (typeof unsafeWindow.jQuery === 'undefined') {
        window.setTimeout(GM_wait, 1000);
    } else {
        jqcode(unsafeWindow.jQuery);
    }
}

function jqcode($) {
    //http://opac.zjlib.cn/opac/search?rows=10&searchWay0=marc&q0=&logical0=AND&q=coffeescript&searchWay=title&scWay=dim&searchSource=reader
    $("a[href^='https://book.douban.com/subject/'], a[href^='https://read.douban.com/ebook/'], a[href^='https://market.douban.com/book/']").each(function() {
        var _this = $(this);

        if (_this.text() == 'Springer版'
            || _this.attr('href') == 'https://market.douban.com/book/'
            || _this.attr('href').search('(comments|discussion)') != -1
            || _this.attr('href').search('(edit|new_review|doulists|buylinks|new_offer|doings|collections|wishes|reviews|offers|annotation)$') != -1) {
            return;
        }

        var bookName = $.trim(_this.attr('title') || _this.text());

        if (bookName === null || bookName === "") {
            return;
        }

        var obj = [
            "<a target='_blank' href=\"http://opac.zjlib.cn/opac/search?rows=10&searchWay=title&q="
            , encodeURIComponent(bookName)
            , "\" title='&#21435;&#27993;&#22270;&#25214;&#25214;&#30475;'><img src='data:image/png;base64,"
            , "iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAMAAAC67D+PAAAAFVBMVEVmmcwzmcyZzP8AZswAZv////////9E6giVAAAAB3RSTlP///////8AGksDRgAAADhJREFUGFcly0ESAEAEA0Ei6/9P3sEcVB8kmrwFyni0bOeyyDpy9JTLEaOhQq7Ongf5FeMhHS/4AVnsAZubxDVmAAAAAElFTkSuQmCC'/></a>"
        ];
        _this.before(obj.join(''));
    });
}

GM_wait();
