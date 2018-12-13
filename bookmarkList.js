/*global $, store, api*/ 
'use strict';

const bookmarkList = (function () {
  function generateBookmark (bookmark) {

    const addingClass = bookmark.addNewBookmark ? 'adding-bookmark' : 'bookmark-list-element';

    let bookmarkTitle = `<span class="bookmark-title" ${addingClass}>${bookmark.title} </span>`;

    if (store.addNewBookmark === true) {
      bookmarkTitle =
      `
        <form class="adding-bookmark">
          <input class="bookmark-item type="text" value="${bookmark.title}" />
        </form>
      `;
    }

    return `
      <li class="bookmark-list-element" data-item-id="${bookmark.id}">
        ${bookmarkTitle}
            <span class="stars">${bookmark.rating} stars</span>
        </div>
      </li>
    `;
  };

  const generateBookmarkStr = function (bookmarkList) {
    const bookmarks = bookmarkList.map(bookmark => generateBookmark(bookmark));
    return bookmarks.join('');
  }; 

  const render = function () {
    console.log('render running');
    let list = store.list;
    const bookmarkListStr = generateBookmarkStr(list);

    $('.bookmark-list').html(bookmarkListStr);
  };

  
  const getBookmarkId = function (bookmark) {
    return $(bookmark)
      .closest('.bookmark-list-element')
      .data('item-id');

  };

  const addBookmarkHandler = function () {
    $('.add-bookmark-button').on('click', (event => {


      api.createBookmark(title, url, desc, rating, function (res) {
        store.addBookmark(res);
        render();
      } )
    }));
  }; 

  const expandBookmark = function() {
    $('.bookmark-list').on('click', '.bookmark-list-element', (event => {
      const id = getBookmarkId(event.target);
      const newProp = {condensed: true};
      store.addCondensedProp(id, newProp);
    }) );
  }

  function bindEventListeners () {
    getBookmarkId();
    addBookmarkHandler();
    expandBookmark();
  }

  return {
    render,
    bindEventListeners
  };
}());