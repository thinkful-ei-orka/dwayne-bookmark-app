
// example
//   bookmarks: [
//     {
//       id: 'x56w',
//       title: 'Title 1',
//       rating: 3,
//       url: 'http://www.title1.com',
//       description: 'lorem ipsum dolor sit',
//       expanded: false
//     },


const bookmarks = [];
let adding = false;
let error = null;
let filter = 0;

const findById = function (id) {
    return this.bookmarks.find(currentItem => currentItem.id === id);
};


const addBookmark = function (item) {
    this.bookmarks.push(item);
};

const deleteBookmark = function (id) {
    this.bookmarks = this.bookmarks.filter(currentItem => currentItem.id !== id);
};

const filterList = function (rating) {
    this.filter = rating;
    let filterItems = this.bookmarks.filter(item =>
        item.rating >= this.filter);
    return filterItems;
};

const setError = function (error) {
    this.error = error;
};


export default {
    bookmarks,
    adding,
    error,
    filter,
    findById,
    addBookmark,
    deleteBookmark,
    filterList,
    setError
};