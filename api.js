'use strict';
/*global $ */ 

const api = (function () {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/evansbookmarkapp';

  const getBookmarks = function (callback) {
    $.getJSON(`${BASE_URL}/bookmarks`, callback);
}

  const createBookmark = function (bookmark, callback, err) {
     $.ajax({
      url: `${BASE_URL}/bookmarks`,
      method: 'POST',
      contentType: 'application/json',
      data: bookmark,
      success: callback,
      error: err
    });
  };


  const updateBookmark = function (id, updatedBookmark, callback,err) {
    $.ajax({ 
      url: `${BASE_URL}/bookmarks/${id}`,
      method: 'PATCH',
      contentType: 'application/json',
      data: JSON.stringify(updatedBookmark),
      success: callback,
      error: err
    })
}

  const deleteItem = function (id, callback, err) {
    $.ajax({
      url: `${BASE_URL}/bookmarks/${id}`,
      method: 'DELETE',
      contentType: 'application/json',
      success: callback,
      error: err
    });
  }

  return {
    getBookmarks,
    createBookmark,
    deleteItem, 
    updateBookmark
  }; 

}());