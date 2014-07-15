/**
 * Created by falbertin on 7/14/14.
 */

var Datastore = require('nedb');
var fs = require('fs');

var fa = require('frontArticle');

// create persistent datastore for articles

var articles = new Datastore({ filename: __dirname + '/app/data/articles', autoload: true });

articles.ensureIndex({fieldName: 'aID', unique: true});

// If db empty, insert first three docs
articles.findOne({ _id: 'id1' }, function (err, doc) {
    // If no document is found, doc is null
    if (err) {
        return console.error(err);
        insertDefArticles();
    }
    console.log(doc.toString());
});

function insertDefArticles(){
    var article01 = new fa(1, getRandomInt(1,25), 'monocultures rock', 'http://nasa.gov');
    var article02 = new fa(2, getRandomInt(1,25), 'cultural happenings', 'http://boston.com');
    var article03 = new fa(3, getRandomInt(1,25), 'Gotthard', 'http://gotthard.com');

    articles.insert([article01, article02, article03], function(err){
        if (err) {
            return console.error(err);
        }
    });
}

// Enable requiring the database

module.exports = {
    articles: articles
};
