/*jshint strict: true */
$(document).ready(function() {
    "use strict";
    var date = timeSince(new Date());
    var noArticles = 1;

    var imgVal = $('#img').val();
    var captionVal = $('#caption').val();
    var hrefVal = $('#href').val();

    /*
        Creating article list,
        preparing for rendering
    */

    var articleList = [];
    var defaultRank = 1;
    // populate articleList with existing content
    function frontArticle(text,link,image) {
        this.id = noArticles++;
        this.rank = defaultRank;
        this.text = text;
        this.image = image;
        this.link = link;
        this.comments = [];
    }

    var article01 = new frontArticle("monocultures rock","http://nasa.gov");
    var article02 = new frontArticle("cultural happenings", "http://boston.com");

    articleList.push(article01);
    articleList.push(article02);

    function submitArticle(){
        articleList.push(new frontArticle(captionVal,hrefVal,imgVal));
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

    $('#submit-new-article').on('click', submitArticle);

// Check on noArticles after use
// console.log(noArticles);
