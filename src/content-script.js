"use strict";

var main = (function () {

  var enabled = undefined;

  var hideableContent = ['.private'
    , '.news.column.two-thirds'
    , '.contribution-activity'];

  var hideGitHubPrivateInfo = function () {
    hideableContent.map(function (hideable) {
      $(hideable).hide();
    });
  };

  var bindDOM = function () {
    $(".main-content").bind("DOMNodeInserted", hideGitHubPrivateInfo);
  };

  chrome.runtime.sendMessage({method: "getStatus"}, function(response) {
    enabled = response.status;

    if (enabled  == "true") {

      hideGitHubPrivateInfo();
      bindDOM();

    };
  });

})();
