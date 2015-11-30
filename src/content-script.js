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

  var showGitHubPrivateInfo = function () {
    hideableContent.map(function (hideable) {
      $(hideable).show();
    });
  };

  var bindDOM = function () {
    $(".main-content").bind("DOMNodeInserted", hideGitHubPrivateInfo);
  };

  var unbindDOM = function () {
    $(".main-content").unbind("DOMNodeInserted", hideGitHubPrivateInfo);
  };

  chrome.runtime.sendMessage({method: "getStatus"}, function(response) {
    enabled = response.status;

    if (enabled  == "true") {

      hideGitHubPrivateInfo();
      bindDOM();

    };
  });

  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method == "enabled"){
      hideGitHubPrivateInfo();
      bindDOM();
    } else if (request.method == "disabled"){
      showGitHubPrivateInfo();
      unbindDOM();
    }
  });

})();
