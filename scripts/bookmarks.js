import store from './store.js';
import api from './api.js';


const generateMainMenu = function () {
    return `
    <button id="addBookmark" class="button">New +</button>
       <select id="filterBy"> 
        <option>Filter by</option>
        <option value = "5">5</option> 
        <option value = "4"> 5</option>
        <option value = "3"> 5</option>
        <option value = "2"> 5</option>
        <option value = "1"> 5</option>
       </select>
    `;
};

const generateBookmarkElement = function (bookmark) {
    if (bookmark.expanded) {
        return `
          <li class="bookmark-item bookmark-item-expanded" data-id="${bookmark.id}">
          <h2>${bookmark.title}</h2> <div class="rating">Rating: ${bookmark.rating}</div>
          <a href="${bookmark.url}" target="blank" class="button-link">Visit ${bookmark.title}!</a><span class="rating-${bookmark.rating}">   </span>
          <div class="description">                    
          <p>${bookmark.desc}</p>
          </div>
          <button type="button" class="buttonD button-delete">Delete</button> 
          </li>
          `;
    }
    else {
        return `
        <li class="bookmark-item" data-id="${bookmark.id}">
        <h2>${bookmark.title}</h2> 
        <div class="rating">Rating: ${bookmark.rating}</div>
        </li>
        `;
    }
};


const generateBookmarkString = function (bookmarkItem) {
    const bookmarks = bookmarkItem.map(item =>
        generateBookmarkElement(item));
    return bookmarks.join('');
};

const generateAddBookmark = function () {
    return `
    <form class="addingItem js-addingItem">
    <fieldset>
    <legend>Add New Bookmark</legend>
    <label for="addNewBookmark">Title</label>
    <input type="text" id="addNewBookmark" name="title" required>
    <label for="desc">Description</label>
    <input type="text" id="desc" name="desc" required>
    <label for="link">Link:</label>
    <input type="url" id="link" name="url" required>
    <label for="rating">Rating:</label>
    <input type="number" min=1 max=5 id="rating" name="rating" required>
    <div class="buttons">
    <button type="submit" class="button submit">Submit</button>
    <button type="button" id="js-cancel" class="button">Cancel</button>
    </div>
    </fieldset>
    </form>
    `;
};


const generateError = function (message) {
    return `
      <section class="error-content">
        <button id="cancel-error">X</button>
        <p>${message}</p>
      </section>
    `;
};

const renderError = function () {
    if (store.error) {
        const el = generateError(store.error);
        $('.error-container').html(el);
    } else {
        $('.error-container').empty();
    }
};

const handleCloseError = function () {
    $('.error-container').on('click', '#cancel-error', () => {
        store.setError(null);
        renderError();
    });
};

const render = function () {
    renderError();

    let items = store.filterList(store.filter);

    let html = generateMainMenu();

    if (store.adding === false) {
        html += '<ul>' + generateBookmarkString(items) + '</ul>';
    }
    else {
        html += generateAddBookmark();
    }
    $('main').html(html);
};


const toAddNewPage = function () {
    $('main').on('click', '#addBookmark', event => {
        event.preventDefault();
        store.adding = true;
        render();
    });
};


const handleCancelButton = function () {
    $('main').on('click', '#js-cancel', event => {
        event.preventDefault();
        store.adding = false;
        render();
    });
};


const handleNewBookmarkSubmit = function () {
    $('main').on('submit', '.js-addingItem', event => {
        event.preventDefault();
        const title = $('#addNewBookmark').val();
        const url = $('#link').val();
        const desc = $('#desc').val();
        const rating = $('#rating').val();
        api.createBookmark(title, url, desc, rating)
            .then((newItem) => {
                store.addBookmark(newItem);
                store.adding = false;
                render();
            })
            .catch((error) => {
                store.setError(error.message);
                render();
            });
    });
};

const handleExpendBookmark = function () {
    $('main').on('click', '.bookmark-item', event => {
        const id = $(event.currentTarget).data('id');
        const item = store.bookmarks.find(bookmark => bookmark.id === id);
        if (!item.expanded) {
            item.expanded = true;
        }
        else {
            item.expanded = false;
        }
        render();
    });
};

const getItemIdFromElement = function (item) {
    return $(item)
        .closest('.bookmark-item')
        .data('id');
};

const handleDeleteBookmark = function () {
    $('main').on('click', '.button-delete', event => {
        const id = getItemIdFromElement(event.currentTarget);

        api.deleteBookmark(id)
            .then(() => {
                store.deleteBookmark(id);
                render();
            })
            .catch((error) => {
                store.setError(error.message);
                render();
            });
    });
};

const handleFilterBookmark = function () {
    $('main').on('change', '#filterBy', event => {
        let value = event.currentTarget.value;
        store.filter = value
        store.filterList(value);
        render();
    });
}




function bindEventListeners() {
    toAddNewPage();
    handleCancelButton();
    handleNewBookmarkSubmit();
    handleExpendBookmark();
    handleDeleteBookmark();
    handleFilterBookmark();
    handleCloseError();
}


export default {
    bindEventListeners,
    render
};