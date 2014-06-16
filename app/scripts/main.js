/*jshint strict: true */
$.noConflict();
jQuery(document).ready(function($) {
    'use strict';

    var noArticles = 1;

    var imgVal = '';
    var captionVal = '';
    var hrefVal = '';

    /*
     Creating article list,
     preparing for rendering
     */

    var articleList = [];
    var defaultRank = 1;

    function frontArticle(text, link, image) {
        this.id = noArticles++;
        this.rank = defaultRank;
        this.text = text;
        this.image = image || 'http://placehold.it/75x75&text=icon';
        this.link = link;
        this.comments = [];
    }

    // populate articleList with existing content
    var article01 = new frontArticle('monocultures rock', 'http://nasa.gov');
    var article02 = new frontArticle('cultural happenings', 'http://boston.com');

    articleList.push(article01);
    articleList.push(article02);
    // console.log(articleList);


    /* render when:
     1. Page first loads
     2. Article is added
     3. Article rank changes
     */

    // html put through http://www.htmlescape.net/stringescape_tool.html

    function renderArticles() {
        var order = [];
        $(articleList).each(function (index, element) {
            order.push(
            '\x3Carticle id=\"article-' + element.id + '\" class=\"clearfix\"\x3E\n'+
                '\x3Csection class=\"left ranking\"\x3E\n'+
                '\x3Cp\x3E1\x3C\x2Fp\x3E\n'+
                '\x3Cinput type=\"number\" id=\"ar' + element.id + '\" min=\"1\" max=\"10\" step=\"1\" value=\"5\" \x2F\x3E\n'+
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
    }

    // From http://jsfiddle.net/dFNva/1/

    var sortBy = function(field, reverse, primer){
        var key = function (x) {return primer ? primer(x[field]) : x[field]};

        return function (a,b) {
            var A = key(a), B = key(b);
            return ( (A < B) ? -1 : ((A > B) ? 1 : 0) ) * [-1,1][+!!reverse];
        }
    };

    function reorderArticles(currArticles){

        currArticles.sort(sortBy('rank', true, parseInt));

        /*
        currArticles.sort(function(a,b){

            if(a.rank > b.rank){
                console.log('right order, a rank is ' + a.rank + ' and b rank is ' + b.rank + '\n' + 'currArticles[a]: ' + currArticles[0]);

            }
            if(a.rank < b.rank){
                // console.log('right order, a rank is ' + a.rank + ' and b rank is ' + b.rank);
                tempObj = currArticles[a];
                currArticles[a] = currArticles[b];
                currArticles[b] = tempObj;
            }
            else {
                b.rank++;
                reorderArticles(currArticles); // re-run to check
            }

        });
        */

        renderArticles(); // renderWhen:3
    }

    function submitArticle() {
        imgVal = $('#img').val();
        captionVal = $('#caption').val();
        hrefVal = $('#href').val();

        articleList.push(new frontArticle(captionVal, hrefVal, imgVal));
        renderArticles(); // renderWhen:2
        return false;
    }

    // Allows efficient usage of multiple query strings per request
    // credit: http://jquery-howto.blogspot.com/2009/09/get-url-parameters-values-with-jquery.html
    function getUrlVars(){
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++)
        {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    }
    // alert(getUrlVars());
    // renderWhen:1
    if (getUrlVars()['id'] === undefined){
        renderArticles();
    }

    $('#submit-new-article').on('click', submitArticle);

    $('input[type="number"]').change(function(){

        var ovI = Math.abs($(this).attr('id').charAt(length-1));
        var oldVal = articleList[ovI].rank;
        var newVal = Math.abs(oldVal - $(this).val());

        articleList[ovI].rank = newVal;

        console.log('Newval is ' + newVal);

        reorderArticles(articleList);
    });
});