'use strict';
/*global $ */ 

const api = (function () {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/evansbookmarkapp';

  const getBookmarks = function (callback) {
    $.getJSON(`${BASE_URL}/bookmarks`, callback);
}

  const createBookmark = function (title, url, desc, rating, callback) {
    let newBookmark = {
      title,
      url,
      desc,
      rating
    };

    newBookmark = JSON.stringify(newBookmark);

    $.ajax({
      url: `${BASE_URL}/bookmarks`,
      method: 'POST',
      contentType: 'application/json',
      data: newBookmark,
      success: callback
    });
  };

  const deleteItem = function (id, callback) {
    $.ajax({
      url: `${BASE_URL}/bookmarks/${id}`,
      method: 'DELETE',
      contentType: 'application/json',
      success: callback
    });
  }

  return {
    getBookmarks,
    createBookmark,
    deleteItem
  }; 

}());