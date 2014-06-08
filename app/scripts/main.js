/*jshint strict: true */
$(document).ready(function() {
    "use strict";
    var date = timeSince(new Date());
    var noArticles = 1;

    var addImgValToClonedArticle = function (article) {
        var imgVal = $('#img').val();
        if (imgVal.length > 0) {
            article.find('img').attr('src', imgVal);
        }
        return article;
    };

    var addCaptionValToClonedArticle = function (article) {
        var captionVal = $('#caption').val();
        if (captionVal.length > 0) {
            article.find('h4').text(captionVal);

        }
        return article;
    };

    var addHrefValToClonedArticle = function (article) {
        var hrefVal = $('#href').val();
        if (hrefVal.length > 0) {
            article.find('.srclink').attr('href', hrefVal).text('(' + hrefVal + ')');
        }
        return article;
    };

    function onClick() {
        var article = $('#articles article').first();
        var newArticle = article.clone();

        newArticle = addImgValToClonedArticle(newArticle);
        newArticle = addCaptionValToClonedArticle(newArticle);
        newArticle = addHrefValToClonedArticle(newArticle);
        noArticles++;
        $(newArticle).attr('id', 'article-0' + noArticles);

        $(article).before(newArticle);

        return false;
    }

    /*
        Creating article list,
        preparing for rendering
    */

    var articleList = [];
    var defaultRank = 1;
    // populate articleList with existing content
    function frontArticle(text,link) {
        this.id = noArticles++;
        this.rank = defaultRank;
        this.text = text;
        this.link = link;
        this.comments = [];
    }

    var article01 = new frontArticle("monocultures rock","http://nasa.gov");
    var article02 = new frontArticle("cultural happenings", "http://boston.com");

    articleList.push(article01);
    articleList.push(article02);

    /* render when:
        1. Page first loads
        2. Article is added
        3. Article rank changes
    */
    function renderArticles(changedIdx,changedDir){
        var order = [];
        $('#articles article').each(function(index){
            order.push($(this));
        });

        if (changedIdx !== null){
            // rearrange items based on index to be changed
            var newIdx = changedIdx + changedDir;
            $(order[changedIdx]).replaceWith(newIdx);
        }

        $('#articles').html(order);
    }

    $('#submit-new-article').on('click', onClick);
// Check on noArticles after use
// console.log(noArticles);

// source: http://stackoverflow.com/questions/3177836/how-to-format-time-since-xxx-e-g-4-minutes-ago-similar-to-stack-exchange-site
    function timeSince(date) {
        var seconds = Math.floor((new Date() - date) / 1000);
        var interval = Math.floor(seconds / 31536000);

        if (interval > 1) {
            return interval + ' years';
        }

        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
            return interval + ' months';
        }

        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
            return interval + ' days';
        }

        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
            return interval + ' hours';
        }

        interval = Math.floor(seconds / 60);
        if (interval > 1) {
            return interval + ' minutes';
        }

        return Math.floor(seconds) + ' seconds';
    }
});