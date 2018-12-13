'use strict';

const api = (function () {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/evansbookmarkapp';

  const getBookmarks = function (callback) {
  $.getJSON(`${BASE_URL}/bookmarks`)
    console.log(callback('connected'))
  }


return {
  getBookmarks,
}

}());