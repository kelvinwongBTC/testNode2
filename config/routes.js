exports.routes = function (map) {
    map.resources('cposts');
    map.resources('posts');
    map.resources('posts');

    map.root('home#index');

    // Generic routes. Add all your routes below this line
    // feel free to remove generic routes
    map.all(':controller/:action');
    map.all(':controller/:action/:id');
};