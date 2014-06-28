/*jshint strict: true */
$.noConflict();
jQuery(document).ready(function($) {
    'use strict';

    var noArticles = 1;

    var imgVal = '';
    var captionVal = '';
    var hrefVal = '';
    var rankVal = '';

    /*
     Creating article list,
     preparing for rendering
     */

    // From MDN
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    var articleList = [];
    var defaultScore = getRandomInt(1,25);

    // TODO: Random score for first item, rest in descending order. Write ranking algorithm
    var defaultRank = defaultScore;

    function FrontArticle(rank, text, link, image) {
        this.id = noArticles++;
        this.rank = rank || defaultRank;
        this.score = getRandomInt(1,25);
        this.text = text;
        this.image = image || 'http://placehold.it/75x75&text=icon';
        this.link = link;
        this.comments = [];
    }

    // populate articleList with existing content
    var article01 = new FrontArticle(1, 'monocultures rock', 'http://nasa.gov');
    var article02 = new FrontArticle(2, 'cultural happenings', 'http://boston.com');
    var article03 = new FrontArticle(3, 'Gotthard', 'http://gotthard.com');

    articleList.push(article01);
    articleList.push(article02);
    articleList.push(article03);

    /* render when:
     1. Page first loads
     2. Article is added
     3. Article score changes
     */

    // html put through http://www.htmlescape.net/stringescape_tool.html

    function activateNumberListener(){
        $('.voter').on('click', 'a', function(e){
            e.preventDefault();

            var currScore = $(this).closest('article').find('.score').text();
            console.log(currScore);

            var currId = $(this).closest('article').attr('id');
            var cRid = currId.charAt(currId.length - 1);

            var oldVal = articleList[cRid - 1].score;
            var newVal = '';

            if($(this).hasClass('up')){
                newVal = oldVal + 1;
                console.log('up ' + cRid + ' newVal is ' + newVal);
            }
            else if ($(this).hasClass('down')){
                newVal = oldVal - 1;
                console.log('down ' + cRid + ' newVal is ' + newVal);
            }

            // TODO: .score should display actual number of votes

            articleList[cRid - 1].score = newVal;

            reorderArticles(articleList);
        });
    }

    function renderArticles() {
        var order = [];
        $(articleList).each(function (index, element) {
            order.push(
            '\x3Carticle id=\"article-' + element.id + '\" class=\"clearfix\"\x3E\n'+
                '\x3Csection class=\"left ranking\"\x3E\n'+
                '\x3Cp class=\"rank\"\x3E' + element.rank + '\x3C\x2Fp\x3E\n'+
                '\x3Cdiv class=\"voter\"\x3E\n'+
                '\x3Cul\x3E\n'+
                '\x3Cli\x3E\x3Ca href=\"#\" class=\"up\"\x3E+\x3C\x2Fa\x3E\x3C\x2Fli\x3E\n'+
                '\x3Cli class=\"score\"\x3E' + element.score + '\x3C\x2Fli\x3E\n'+
                '\x3Cli\x3E\x3Ca href=\"#\" class=\"down\"\x3E-\x3C\x2Fa\x3E\x3C\x2Fli\x3E\n'+
                '\x3C\x2Ful\x3E\n\x3C\x2Fdiv\x3E\n'+
                '\x3C\x2Fsection\x3E\n'+
                '\x3Csection class=\"left content\"\x3E\n'+
                '\x3Cimg src=\"' + element.image + '\"\x3E\n'+
                '\x3Ch4\x3E' + element.text + ' ' + '\x3Ca href=\"' + element.link + '\" target=\"_blank\" class=\"srclink\"\x3E' + '(' + element.link.slice(7) + ')' + '\x3C\x2Fa\x3E\x3C\x2Fh4\x3E\n'+
                '\x3Ch5 class=\"subheader\"\x3Esubmitted \x3Cdate\x3E6 hours\x3C\x2Fdate\x3E ago by CarlPerkins\x3C\x2Fh5\x3E\n'+
                '\x3Cul class=\"inline-list attrlist\"\x3E\n'+
                '\x3Cli\x3E\x3Ca href=\"article.html?id=' + index + '\"\x3E100 comments\x3C\x2Fa\x3E\x3C\x2Fli\x3E\n'+
                '\x3Cli\x3E\x3Ca href=\"#\"\x3Eshare\x3C\x2Fa\x3E\x3C\x2Fli\x3E\n'+
                '\x3Cli\x3E\x3Ca href=\"#\"\x3Esave\x3C\x2Fa\x3E\x3C\x2Fli\x3E\n'+
                '\x3Cli\x3E\x3Ca href=\"#\"\x3Ehide\x3C\x2Fa\x3E\x3C\x2Fli\x3E\n'+
                '\x3Cli\x3E\x3Ca href=\"#\"\x3Ereport\x3C\x2Fa\x3E\x3C\x2Fli\x3E\n'+
                '\x3C\x2Ful\x3E\n'+
                '\x3C\x2Fsection\x3E\n' +
                '\x3C\x2Farticle\x3E'
            );
        });

        $('#articles').html(order.join(''));
        activateNumberListener();
    }

    // From http://jsfiddle.net/dFNva/1/
    var sortBy = function(field, reverse, primer){
        var key = function (x) {return primer ? primer(x[field]) : x[field];};

        return function (a,b) {
            var A = key(a), B = key(b);
            return ( (A < B) ? -1 : ((A > B) ? 1 : 0) ) * [-1,1][+!!reverse];
        };
    };

    // Reorder rank values after sorting by score
    function reRank(element, index){
        element.rank = parseInt(index + 1);
    }

    function reorderArticles(currArticles){
        currArticles.sort(sortBy('score', false, parseInt));

        currArticles.forEach(reRank);

        renderArticles(); // renderWhen:3
    }

    function submitArticle() {
        imgVal = $('#img').val();
        captionVal = $('#caption').val();
        hrefVal = $('#href').val();
        rankVal = 4; // should be last rank in articles + 1

        articleList.push(new FrontArticle(rankVal, captionVal, hrefVal, imgVal));
        renderArticles(); // renderWhen:2
        return false;
    }

    // Allows efficient usage of multiple query strings per request
    // credit: http://jquery-howto.blogspot.com/2009/09/get-url-parameters-values-with-jquery.html
    function getUrlVars(){
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    }

    // renderWhen:1
    if (getUrlVars().id === undefined){
        reorderArticles(articleList);
    }

    $('#submit-new-article').on('click', submitArticle);

    activateNumberListener();
});