"use strict";

var main = (function () {

  var hideableContent = ['.private'
    , '.news.column.two-thirds'
    , '.contribution-activity'];

  var hideGitHubPrivateInfo = function () {
    hideableContent.map(function (hideable) {
      $(hideable).remove();
    });
  };

  var bindDOM = function () {
    $(".main-content").bind("DOMNodeInserted", hideGitHubPrivateInfo);
  };

  hideGitHubPrivateInfo();
  bindDOM();

})();
