/*
 db/schema.js contains database schema description for application models
 by default (when using jugglingdb as ORM) this file uses database connection
 described in config/database.json. But it's possible to use another database
 connections and multiple different schemas, docs available at

 http://railwayjs.com/orm.html

 Example of model definition:

 define('User', function () {
     property('email', String, { index: true });
     property('password', String);
     property('activated', Boolean, {default: false});
 });

 Example of schema configured without config/database.json (heroku redistogo addon):
 schema('redis', {url: process.env.REDISTOGO_URL}, function () {
     // model definitions here
 });

*/

//var Post = describe('Post', function () {
//    property('title', String);
//    property('content', String);
//});


customSchema(function () {

    console.log("custom schema initialized");

    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/test');

    var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

    var BlogPost = new Schema({
        author    : ObjectId
        , title     : String
        , content      : String
        , date      : Date
    });

    var Post = mongoose.model('BlogPost', BlogPost);
    Post.modelName = 'BlogPost'; // this is for some features inside railway (helpers, etc)

    Post.all = function () {
        return this.find();
    }

    module.exports['Post'] = Post;
});


