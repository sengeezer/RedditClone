$(document).ready(function() {
  console.log( "The DOM is now loaded and can be manipulated." );
});



var valHref = document.form.href.value;
var valCaption = document.form.caption.value;
var date = timeSince(new Date);

var noArticles = 1;

function articleAsHtml(articleId){
    return "<article id=\"article-" + articleId + "\" class=\"clearfix\">\n" + "<section class=\"left ranking\">\n" + " <p>1</p>\n " + "<input type=\"number\" id=\"stepper\" name=\"stepper\" min=\"1\" max=\"10\" value=\"5\" />\n" + "</section>\n" + "<section class=\"left content\">\n" + "<img src=\"http://placehold.it/75x75&text=icon\">\n" + "<h4>"+ valCaption +"<span class=\"srclink\">" + valHref +"</span></h4>\n" + "<h5 class=\"subheader\">submitted <date>" + date + "</date> ago by CarlPerkins</h5>\n" + "<ul class=\"attrlist clearfix\">\n" + "<li class=\"left\">100 comments</li>\n" + "<li class=\"left\">share</li>\n" + "<li class=\"left\">save</li>\n" + "<li class=\"left\">hide</li>\n" + "<li class=\"left\">report</li>\n" + "</ul>\n" + "</section>\n" + "</article>";
}

function addNewArticle() {
    var articles = document.getElementById('articles');
    console.log(date);
    console.log("Line 16: " + valHref);
    noArticles++;
    articles.innerHTML = articleAsHtml(noArticles) + articles.innerHTML;
}

function setValues(){
    valHref = document.form.href.value;
    valCaption = document.form.caption.value;
    date = timeSince(new Date);
    // debug messages
    console.log(valHref);
    console.log(valCaption);
    // Execute crux and return
    addNewArticle();
    return false;
}

// Check on noArticles after use
console.log(noArticles);

// source: http://stackoverflow.com/questions/3177836/how-to-format-time-since-xxx-e-g-4-minutes-ago-similar-to-stack-exchange-site
function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);
    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) { return interval + " years"; }

    interval = Math.floor(seconds / 2592000);
    if (interval > 1) { return interval + " months"; }

    interval = Math.floor(seconds / 86400);
    if (interval > 1) { return interval + " days"; }

    interval = Math.floor(seconds / 3600);
    if (interval > 1) { return interval + " hours"; }

    interval = Math.floor(seconds / 60);
    if (interval > 1) { return interval + " minutes"; }

    return Math.floor(seconds) + " seconds";
}
