/**
 * Created by falbertin on 7/14/14.
 */

var Datastore = require('nedb');
var fs = require('fs');

// create persistent datastore for articles

var articles = new Datastore({ filename: __dirname + '/app/data/articles', autoload: true });

articles.ensureIndex({fieldName: 'aID', unique: true});


// Enable requiring the database

module.exports = {
    articles: articles
};
