const state = {
    bookmarks: [],
    adding: false,
    error: null,
    filter: 0
}

/* 
const bookmarks = [];
let adding = false;
let error = null;
let filter = 0; */

const findById = function (id) {
    return state.bookmarks.find(currentItem => currentItem.id === id);
};


const addBookmark = function (item) {
    state.bookmarks.push(item);
};

const deleteBookmark = function (id) {
    state.bookmarks = this.bookmarks.filter(currentItem => currentItem.id !== id);
};

const filterList = function (rating) {
    state.filter = rating;
    let filterItems = state.bookmarks.filter(item =>
        item.rating >= state.filter);
    return filterItems;
};

const setError = function (error) {
    state.error = error;
};


export default {
    bookmarks: state.bookmarks,
    adding: state.adding,
    error: state.error,
    filter: state.filter,
    findById,
    addBookmark,
    deleteBookmark,
    filterList,
    setError
};