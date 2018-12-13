/*global api, store, bookmarkList */

'use strict';
$(function () {
  api.getBookmarks( (bookmarks) => {
    bookmarks.forEach((bookmark) => store.addBookMark(bookmark));
    console.log(bookmarkList.render());
  });
})


