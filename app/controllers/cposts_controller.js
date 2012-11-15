load('application');

before(loadCpost, {only: ['show', 'edit', 'update', 'destroy']});

action('new', function () {
    this.title = 'New cpost';
    this.cpost = new Cpost;
    render();
});

action(function create() {
    Cpost.create(req.body.Cpost, function (err, cpost) {
        if (err) {
            flash('error', 'Cpost can not be created');
            render('new', {
                cpost: cpost,
                title: 'New cpost'
            });
        } else {
            flash('info', 'Cpost created');
            redirect(path_to.cposts());
        }
    });
});

action(function index() {
    this.title = 'Cposts index';
    Cpost.all(function (err, cposts) {
        render({
            cposts: cposts
        });
    });
});

action(function show() {
    this.title = 'Cpost show';
    render();
});

action(function edit() {
    this.title = 'Cpost edit';
    render();
});

action(function update() {
    this.cpost.updateAttributes(body.Cpost, function (err) {
        if (!err) {
            flash('info', 'Cpost updated');
            redirect(path_to.cpost(this.cpost));
        } else {
            flash('error', 'Cpost can not be updated');
            this.title = 'Edit cpost details';
            render('edit');
        }
    }.bind(this));
});

action(function destroy() {
    this.cpost.destroy(function (error) {
        if (error) {
            flash('error', 'Can not destroy cpost');
        } else {
            flash('info', 'Cpost successfully removed');
        }
        send("'" + path_to.cposts() + "'");
    });
});

function loadCpost() {
    Cpost.find(params.id, function (err, cpost) {
        if (err || !cpost) {
            redirect(path_to.cposts());
        } else {
            this.cpost = cpost;
            next();
        }
    }.bind(this));
}
