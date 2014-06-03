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