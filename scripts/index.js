import bookmarks from './bookmarks.js';
import store from './store.js';
import api from './api.js';

const main = function () {
    api.getItems()
        .then(items => {
            items.forEach(item => store.addBookmark(item));
            bookmarks.render();
        });
    bookmarks.bindEventListeners();
    bookmarks.render();
}

$(main);