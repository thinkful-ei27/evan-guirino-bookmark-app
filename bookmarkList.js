/*global $, store, api*/ 
'use strict';

const bookmarkList = (function () {
  
  const generateError = function (err) {
    let message = '';
    if (err.responseJSON && err.responseJSON.message) {
      message = err.responseJSON.message;
    } else {
      message = `${err.code} Server Error`;
    }

    return `
      <section class="error content">
        <button id="cancel-error">Try Again</button>
        <p>${message}</p>
      </section>
    `;
  };
  
  function generateBookmark (bookmark) {

    
 
    const addingAClass = bookmark.addNewBookmark ? 'adding-bookmark' : 'bookmark-list-element';

    let bookmarkTitleandRating = `
    <div>
      <span class="bookmark-title" ${addingAClass}>${bookmark.title} </span>
      <span class="stars">${bookmark.rating} &#9733;'s</span>
      
    </div>`;    
    if(bookmark.show) {
      bookmarkTitleandRating += `
      <div class="extended">
        <p>${bookmark.desc}</p>
        <p>Rating: ${bookmark.rating} &#9733;'s</p>
        <a href="${bookmark.url}" class="url">${bookmark.url}</a>
        <button class="delete">Delete</button>
        <button class="close-extended">Close</button>
      </div>

      `;
    }
    return `
      <li class="bookmark-list-element" data-item-id="${bookmark.id}">
        ${bookmarkTitleandRating}
            
        
      </li>
    `;
  }

  const generateBookmarkStr = function (bookmarkList) {
    let appForm = '';
    if (store.addNewBookmark) {
      appForm =
      `
        <form class="adding-bookmark">
          <div class="form-content">
            <div class="title-field">
              <label for="title">Title</label>
              <input type="text" name="title" id="title" value="enter a title"></input>
            </div>
            <div class="url-field">
              <label for="url">URL</label>
              <input type="url" name="url" id="url" value="enter a url"></input>
            </div>
            <div class="description-field">
              <label for="decription">Description</label>
              <textarea name="desc"  id#"desc" rows="8" cols="30">Enter a description for your bookmark.</textarea>
            </div>
            <div class="submit-button" >
              <button type="submit">Submit your new bookmark!</button>
              <button type="button" id="close">close</button>
            </div>
            <aside class="rating-buttons">
            <label for="rating">Rating</label>
            <select id="rating" value="rating" name="rating">
            <option value="5">5</option>
            <option value="4">4</option>
            <option value="3">3</option>
            <option value="2">2</option>
            <option value="1">1</option>
          </select>
           </aside>
         </div>
        </form>
      `;
    }


    
  



    const bookmarks = bookmarkList.map(bookmark => generateBookmark(bookmark));
  return  `${appForm}<ul>${bookmarks.join('')}</ul>`;
  }; 

  const render = function () {
    console.log('render running');
    if (store.error) {
      const errorMessage = generateError(store.error);
      $('.error-container').html(errorMessage);
    }
    let bookmarks = store.filterByRating();
    

    const bookmarkListStr = generateBookmarkStr(bookmarks);

    $('.bookmark-list').html(bookmarkListStr);
  }
  
  
  $.fn.extend({
    serializeJson: function () {
      const formData = new FormData(this[0]);
      const obj = {};
      formData.forEach((val, name) => obj[name] = val);
      const stringified = JSON.stringify(obj);
      return stringified;
      
    }
  });

  const handleSubmitBookmark = function () {
    $('body').on('submit', '.bookmark-list', (event => {
      event.preventDefault();
      let obj = $(event.target).serializeJson();
      console.log(obj);

      api.createBookmark(obj, (res) => {
        store.addBookmark(res);
        render();
      },
      (err) => {
        store.setError(err);
        render();
      }
      );
    }));
  };


  const getBookmarkId = function (bookmark) {
    return $(bookmark)
      .closest('.bookmark-list-element')
      .data('item-id');

  };

  const addBookmarkButtonHandler = function  () {
    $('.add-bookmark-button').on('click', (event => {
      store.addNewBookmark = true;
      console.log(store.addNewBookmark);
      render();
    }));
  }; 

  const closeBookmarkButtonHandler = function  () {
    $('body').on('click', '#close', (event => {
      store.addNewBookmark = false;
      console.log(store.addNewBookmark);
      render();
    }));
  }; 

  
  
  const filterBySelectedRating = function () {
    $('#rating').change((event) => {
      const ratingValue = $(event.target).val();
      store.minRating = ratingValue;
      
       
      render();
    });
  };
   
  const expandBookmark = function() {
    $('.bookmark-list').on('click', '.bookmark-list-element', (event => {
      let id = getBookmarkId(event.target);
      let newProp = {show: true};
      store.addShowProp(id, newProp);
      console.log('tried to add close functionality, but ran out of time');
      render();
      
    }) );
  };

  
  

  const deleteBookmark = function () {
    $('.bookmark-list').on('click', '.delete', (event) => {
      const id = getBookmarkId(event.target);
      api.deleteItem(id, (res) => {
        store.deleteBookmark(id);
        render();
      }, 
      (err) => {
        store.setError(err);
        render();
      });
      
    })
  }

  function bindEventListeners () {
    getBookmarkId();
    addBookmarkButtonHandler();
    expandBookmark();
    closeBookmarkButtonHandler();
    handleSubmitBookmark();
    deleteBookmark();
   
    filterBySelectedRating();
    
    
  }

  return {
    render,
    bindEventListeners
  };
}());