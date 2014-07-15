/**
 * Created by falbertin on 7/15/14.
 */

var noArticles = 1;

// From MDN
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var defaultScore = getRandomInt(1,25);

// TODO: (M2+) Write ranking algorithm
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

module.exports = FrontArticle;