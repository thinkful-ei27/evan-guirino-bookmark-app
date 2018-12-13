'use strict';

const store = (function () {


  
  const findBookmarkById = function (id) {
    
    return this.list.find(bookmark => bookmark.id === id);
  };

  const addBookmark = function (bookmark) {
    this.list.push(bookmark);
  };

  const isAddingNewBookmark = function (id, isAdding) {
    const bookmark = findBookmarkById(id);

    bookmark.addNewBookmark = isAdding;

  };

  const addCondensedProp = function (id, newProp) {
    const found = findBookmarkById(id);
    Object.assign(found, newProp);
  };



  return {
    list: [],
    addNewBookmark: false, 
    filter: null,
    error: null,

    findBookmarkById,
    addBookmark, 
    isAddingNewBookmark,
    addCondensedProp
  };
}());  