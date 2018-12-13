/*global  cuid*/
'use strict'

const Bookmark = (function () {
  const valitdate = function (title) {
    if (!title) {
      throw new Error('Must Enter Bookmark');
    }
  };

  const create = function (title) {
    return {
      id: cuid(),
      title: title,
      rating: 0,
      description: '',
    };
  };


  return {
    valitdate,
    create
  }
})