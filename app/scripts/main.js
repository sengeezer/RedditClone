$(document).ready(function() {
  $('#submit-new-reddit').on('click', onClick);

  var addImgValToClonedArticle = function(article){
    var imgVal = $('#img').val();
    if(imgVal.length > 0){
      article.find('img').attr('src', imgVal);
    };
    return article;
  };

  var addCaptionValToClonedArticle = function(article){
    var captionVal = $('#caption').val();
    if(captionVal.length > 0){
      article.find('h4').text(captionVal);
    };
    return article;
  };

  var addHrefValToClonedArticle = function(article){
    var hrefVal = $('#href').val();
    if(hrefVal.length > 0){
      article.find('.srclink').attr('href', hrefVal).text('(' + hrefVal + ')');
    };
    return article;
  };

  function onClick(){
    var article = $('#articles article').first()
    var newArticle = article.clone()
    var newArticle = addImgValToClonedArticle(newArticle);
    var newArticle = addCaptionValToClonedArticle(newArticle);
    var newArticle = addHrefValToClonedArticle(newArticle);
    newArticle.prependTo(articles);
    return false;
  };
});
