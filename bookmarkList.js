/*global $, store*/ 
'use strict';

const bookmarkList = (function () {
  const generateBookmark = function (bookmark) {

    return `
      <li class="bookmark-element" data-item-id="${bookmark.id}">
        
        <span class="bookmark-title">${bookmark.title}</span>
            <span class="stars">${bookmark.rating}</span>
        </div>
      </li>
    `;
  };

  const generateBookmarkStr = function (bookmarkList) {
    const bookmarks = bookmarkList.map(bookmark => generateBookmark(bookmark));
    return bookmarks.join;
  }; 

  const render = function () {
    console.log('render running')
    let list = [...store.list];
    const bookmarkListStr = generateBookmarkStr(list);

    console.log( $('.bookmark-list').html(bookmarkListStr));
  };

  return {
    render
  };
}());