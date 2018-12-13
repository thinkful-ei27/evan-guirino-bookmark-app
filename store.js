'use strict';

const store = (function () {

  const findBookmarkById = function (id) {
    return this.list.find(bookmark => bookmark.id === id)
  };

  const addBookMark = function (bookmark) {
    this.list.push(bookmark);
  };




  return {
    list: [],
    addNewBookMark: false, 
    filter: null,
    error: null,

    findBookmarkById,
    addBookMark
  };
}());  