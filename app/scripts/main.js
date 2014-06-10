/*jshint strict: true */
$(document).ready(function() {
    "use strict";
    var date = timeSince(new Date());
    var noArticles = 1;

    var newId = function() {
      noArticles++;
      return 'article-0' + noArticles
    };

    var newCaption = function() {
      return $('#caption').val();
    };

    var newImg = function() {
      return $('#img').val();
    };

    var newHref = function() {
      return $('#href').val();
    };

    var addImgValToClonedArticle = function (article, imgVal) {
        if (imgVal.length > 0) {
            article.find('img').attr('src', imgVal);
        }
        return article;
    };

    var addCaptionValToClonedArticle = function (article, captionVal) {
        if (captionVal.length > 0) {
            article.find('h4').text(captionVal);
        }
        return article;
    };

    var addHrefValToClonedArticle = function (article, hrefVal) {
        if (hrefVal.length > 0) {
            article.find('.srclink').attr('href', hrefVal).text('(' + hrefVal + ')');
        }
        return article;
    };

    var addIdToClonedArticle = function (article, id) {
        if (id.length > 0) {
            article.attr('id', id);
        }
        return article;
    };

    var addCommentsToClonedArticle = function (article, comments) {
        if (comments.length > 0) {
          article.append('<ul></ul>');
          for(var i = 0; i < comments.length; i++) {
            var newList = article.find('ul');
            var newListItem = '<li>' + comments[i] + '<li>';
            newList.append(newListItem);
          };
        };
        return article;
    };

    var showLinks = function(links) {
      var article = $('#articles article').first();

      for(var i = 0; i < links.length; i++) {
        var newArticle = article.clone();

        var newArticle = addImgValToClonedArticle(newArticle, links[i].img );
        var newArticle = addCaptionValToClonedArticle(newArticle, links[i].caption);
        var newArticle = addHrefValToClonedArticle(newArticle, links[i].href);
        var newArticle = addIdToClonedArticle(newArticle, links[i].id);
        //var newArticle = addCommentsToClonedArticle(newArticle, links[i].comments);
        $(article).before(newArticle);
      }
    };
    function onClick() {
      var linkList = [];

      var newLink = {
        id: newId(),
        img: newImg(),
        caption: newCaption(),
        href: newHref(),
        comments: ['asdf'],
      };

      linkList.push(newLink);
      showLinks(linkList);

      return false;
    }

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
