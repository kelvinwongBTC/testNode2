require('../test_helper.js').controller('cposts', module.exports);

var sinon  = require('sinon');

function ValidAttributes () {
    return {
        title: '',
        content: '',
        createdAt: ''
    };
}

exports['cposts controller'] = {

    'GET new': function (test) {
        test.get('/cposts/new', function () {
            test.success();
            test.render('new');
            test.render('form.' + app.set('view engine'));
            test.done();
        });
    },

    'GET index': function (test) {
        test.get('/cposts', function () {
            test.success();
            test.render('index');
            test.done();
        });
    },

    'GET edit': function (test) {
        var find = Cpost.find;
        Cpost.find = sinon.spy(function (id, callback) {
            callback(null, new Cpost);
        });
        test.get('/cposts/42/edit', function () {
            test.ok(Cpost.find.calledWith('42'));
            Cpost.find = find;
            test.success();
            test.render('edit');
            test.done();
        });
    },

    'GET show': function (test) {
        var find = Cpost.find;
        Cpost.find = sinon.spy(function (id, callback) {
            callback(null, new Cpost);
        });
        test.get('/cposts/42', function (req, res) {
            test.ok(Cpost.find.calledWith('42'));
            Cpost.find = find;
            test.success();
            test.render('show');
            test.done();
        });
    },

    'POST create': function (test) {
        var cpost = new ValidAttributes;
        var create = Cpost.create;
        Cpost.create = sinon.spy(function (data, callback) {
            test.strictEqual(data, cpost);
            callback(null, cpost);
        });
        test.post('/cposts', {Cpost: cpost}, function () {
            test.redirect('/cposts');
            test.flash('info');
            test.done();
        });
    },

    'POST create fail': function (test) {
        var cpost = new ValidAttributes;
        var create = Cpost.create;
        Cpost.create = sinon.spy(function (data, callback) {
            test.strictEqual(data, cpost);
            callback(new Error, cpost);
        });
        test.post('/cposts', {Cpost: cpost}, function () {
            test.success();
            test.render('new');
            test.flash('error');
            test.done();
        });
    },

    'PUT update': function (test) {
        Cpost.find = sinon.spy(function (id, callback) {
            test.equal(id, 1);
            callback(null, {id: 1, updateAttributes: function (data, cb) { cb(null); }});
        });
        test.put('/cposts/1', new ValidAttributes, function () {
            test.redirect('/cposts/1');
            test.flash('info');
            test.done();
        });
    },

    'PUT update fail': function (test) {
        Cpost.find = sinon.spy(function (id, callback) {
            test.equal(id, 1);
            callback(null, {id: 1, updateAttributes: function (data, cb) { cb(new Error); }});
        });
        test.put('/cposts/1', new ValidAttributes, function () {
            test.success();
            test.render('edit');
            test.flash('error');
            test.done();
        });
    },

    'DELETE destroy': function (test) {
        test.done();
    },

    'DELETE destroy fail': function (test) {
        test.done();
    }
};

