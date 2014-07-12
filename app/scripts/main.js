/*jshint strict: true */
$.noConflict();

jQuery(document).ready(function($) {
    'use strict';

    var noArticles = 1;

    var imgVal = '';
    var captionVal = '';
    var hrefVal = '';
    var rankVal = '';
    var scoreVal = 0;

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

    // TODO: Write ranking algorithm
    var defaultRank = defaultScore;

    function FrontArticle(rank, score, text, link, image) {
        this.id = noArticles++;
        this.rank = rank || defaultRank;
        this.score = score;
        this.text = text;
        this.image = image || 'http://placehold.it/75x75&text=icon';
        this.link = link;
        this.comments = [];
    }

    // populate articleList with existing content
    var article01 = new FrontArticle(1, getRandomInt(1,25), 'monocultures rock', 'http://nasa.gov');
    var article02 = new FrontArticle(2, getRandomInt(1,25), 'cultural happenings', 'http://boston.com');
    var article03 = new FrontArticle(3, getRandomInt(1,25), 'Gotthard', 'http://gotthard.com');

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
            }
            else if ($(this).hasClass('down')){
                newVal = oldVal - 1;
            }

            articleList[cRid - 1].score = newVal;

            reorderArticles(articleList);
        });

    }

    function activateCommentsListener(){
        $('section.content').on('click', 'a.cmnt-nr', function(e){
            e.preventDefault();
            var currId = $(this).closest('article').attr('id');
            var cRid = currId.charAt(currId.length - 1);
            var toBeT = '.c' + cRid;

            // console.log(toBeT);
            $(toBeT).toggle();

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
                //'\x3Ch5 class=\"subheader\"\x3Esubmitted \x3Cdate\x3E6 hours\x3C\x2Fdate\x3E ago by CarlPerkins\x3C\x2Fh5\x3E\n'+
                '\x3Ch5 class=\"subheader\"\x3E by CarlPerkins\x3C\x2Fh5\x3E\n'+
                '\x3Cul class=\"inline-list attrlist\"\x3E\n'+
                '\x3Cli\x3E\x3Ca href=\"#\" class=\"cmnt-nr\"\x3E0 comments\x3C\x2Fa\x3E\x3C\x2Fli\x3E\n'+
                //'\x3Cli\x3E\x3Ca href=\"#\"\x3Eshare\x3C\x2Fa\x3E\x3C\x2Fli\x3E\n'+
                //'\x3Cli\x3E\x3Ca href=\"#\"\x3Esave\x3C\x2Fa\x3E\x3C\x2Fli\x3E\n'+
                //'\x3Cli\x3E\x3Ca href=\"#\"\x3Ehide\x3C\x2Fa\x3E\x3C\x2Fli\x3E\n'+
                //'\x3Cli\x3E\x3Ca href=\"#\"\x3Ereport\x3C\x2Fa\x3E\x3C\x2Fli\x3E\n'+
                '\x3C\x2Ful\x3E\n'+
                '\x3C\x2Fsection\x3E\n' +
                '\x3Csection class=\"left comments clearfix c' + element.id + '\"\x3E\n' +
                '\x3Ch5\x3E\x3Cspan class=\"cmnt-nr\"\x3E0 comments\x3C\x2Fspan\x3E\x3C\x2Fh5\x3E\n' +
                '\x3Chr\x3E\n' +
                '\x3Cdiv id=\"comments\"\x3E\x3C\x2Fdiv\x3E\n' +
                '\x3Cdiv class=\"row\"\x3E\n' +
                '\x3Cdiv class=\"small-12 medium-7 columns\"\x3E\n' +
                '\x3Cform class=\"comment-form\" name=\"comment-submit\"\x3E\n' +
                '\x3Ctextarea placeholder=\"comment\" name=\"cmnt\" class=\"cmnt\"\x3E\x3C\x2Ftextarea\x3E\n' +
                '\x3Cdiv class=\"row\"\x3E\n' +
                '\x3Cdiv class=\"small-1 medium-1 columns\"\x3E\n' +
                '\x3Cinput type=\"submit\" value=\"Save\" class=\"submit-new-comment\"\x3E\n' +
                '\x3C\x2Fdiv\x3E\n' +
                '\x3C\x2Fdiv\x3E\n' +
                '\x3C\x2Fform\x3E\n' +
                '\x3C\x2Fdiv\x3E\n' +
                '\x3C\x2Fdiv\x3E\n' +
                '\x3C\x2Fsection\x3E\n' +
                '\x3C\x2Farticle\x3E'
            );
        });

        $('#articles').html(order.join(''));
        activateNumberListener();
        activateCommentsListener();
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
        rankVal = articleList[articleList.length - 1].rank + 1;
        scoreVal = 0;

        articleList.push(new FrontArticle(rankVal, scoreVal, captionVal, hrefVal, imgVal));
        renderArticles(); // renderWhen:2
        return false;
    }

    // renderWhen:1

    reorderArticles(articleList);

    function renderComments(comments) {
      var order = [];
      $(comments).each(function (index, element) {
        order.push(
        '<div class="comment"><h5>by user1990</h5><div class="content">' + element + '</div></div>'
        );
      });

      $('#comments').html(order.join(''));
    }

    function updateCommentNumber(id, number) {
        var text = '';
        if (number === 1) {
            text = number + ' comment';
        } else {
            text = number + ' comments';
        }

        // Ensure that correct article's number is updated
        var toBeU = '#article-' + id + ' ' + '.cmnt-nr';
        $(toBeU).html(text);
    }

    function submitComment() {
        var currId = $(this).closest('article').attr('id');
        console.log('215: ' + currId);
        var articleId = currId.charAt(currId.length - 1);

        var article = articleList[articleId];
        // use rank, not ID
        var currCmtVal = '#' + currId + ' ' + '.cmnt';

        var cmntVal = $(currCmtVal).val();


        var currForm = $(this).closest('form');
        $(currForm).submit(function(e){
            e.preventDefault();

        });
        console.log('228: ' + cmntVal);
        if (article !== undefined && cmntVal.length > 0) {
            console.log('232: article.id: ' + article.id + ' cmntVal.length: ' + cmntVal.length);

            console.log('234: article.comments: ' + article.comments);

            article.comments.push(cmntVal);

            renderComments(article.comments);
            updateCommentNumber(article.id, article.comments.length);
            $(currCmtVal).val('');
        }
        return false;
    }

    $('#submit-new-article').on('click', submitArticle);
    $('.submit-new-comment').on('click', submitComment);

    activateNumberListener();
});
