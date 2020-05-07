const BASE_URL = 'https://thinkful-list-api.herokuapp.com/dwayne';



const bookmarkApiFetch = function (...args) {

    let error;
    return fetch(...args)
        .then(res => { //res would be an array of objects ==> bookmarks [{}]
            if (!res.ok) {
                error = { code: res.status };
            }

            return res.json();
        })
        .then(data => {

            if (error) {
                error.message = data.message;
                return Promise.reject(error);
            }
            return data;
        });
};

const getItems = function () {
    return bookmarkApiFetch(`${BASE_URL}/bookmarks`);
};

const createBookmark = function (title, url, desc, rating) {
    const newItem = JSON.stringify({ title, url, desc, rating });
    return bookmarkApiFetch(`${BASE_URL}/bookmarks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: newItem
    });
};

const deleteBookmark = function (id) {
    return bookmarkApiFetch(`${BASE_URL}/bookmarks/${id}`, {
        method: 'DELETE'
    });
};


export default {
    getItems,
    createBookmark,
    deleteBookmark
};