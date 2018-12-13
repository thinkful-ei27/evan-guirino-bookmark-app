/*global api, store, bookmarkList */

'use strict';
$(function () {
  bookmarkList.bindEventListeners();
  bookmarkList.render()
  api.getBookmarks( (bookmarks) => {
    bookmarks.forEach((bookmark) => store.addBookmark(bookmark));
    bookmarkList.render();
  });
})


api.getBookmarks((items) => {
  const item = items[0];

  api.updateBookmark(item.id, { rating: 3 }, () => {
    console.log('updated!');
  });
});