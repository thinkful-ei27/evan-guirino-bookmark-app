'use strict';
/*global $ */ 

const api = (function () {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/evansbookmarkapp';

  const getBookmarks = function (callback) {
    $.getJSON(`${BASE_URL}/bookmarks`, callback);
}

  const createBookmark = function (bookmark, callback) {
     $.ajax({
      url: `${BASE_URL}/bookmarks`,
      method: 'POST',
      contentType: 'application/json',
      data: bookmark,
      success: callback
    });
  };


  const updateBookmark = function (id, updatedBookmark, callback) {
    $.ajax({ 
      url: `${BASE_URL}/bookmarks/${id}`,
      method: 'PATCH',
      contentType: 'application/json',
      data: JSON.stringify(updatedBookmark),
      success: callback
    })
}

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
    deleteItem, 
    updateBookmark
  }; 

}());