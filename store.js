'use strict';

const store = (function () {

  const setError = function (error) {
    this.error = error;
  }
  
  const findBookmarkById = function (id) {
    
    return this.bookmarks.find(bookmark => bookmark.id === id);
  };

  const addBookmark = function (bookmark) {
    this.bookmarks.push(bookmark);
  };

  const isAddingNewBookmark = function (id, isAdding) {
    const bookmark = this.findBookmarkById(id);

    bookmark.addNewBookmark = isAdding;

  };

  const addShowProp = function (id, newProp) {
    const found = this.findBookmarkById(id);
    
    (Object.assign(found, newProp));
    
    
  };

  const filterByRating = function () {
    return this.bookmarks.filter(bookmark => (bookmark.rating >= this.minRating));
    
  };

  const deleteBookmark = function (id) {
    // this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== id);
    const bookmark = this.findBookmarkById(id);
    this.bookmarks.splice(bookmark, 1);

  };


  return {
    bookmarks: [],
    addNewBookmark: false, 
    minRating: null,
    error: null,

    findBookmarkById,
    addBookmark, 
    isAddingNewBookmark,
    addShowProp,
    deleteBookmark,
    filterByRating,
    setError
    
  };
}());  