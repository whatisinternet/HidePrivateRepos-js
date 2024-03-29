"use strict";

var background = (function () {
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    var enabled = localStorage.getItem("HidePrivateEnabled");
    if (request.method == "getStatus")
      sendResponse({status: enabled});
  });

  chrome.browserAction.onClicked.addListener(function(tab) {
    var enabled = localStorage.getItem("HidePrivateEnabled");
    if (enabled == "true") {
      localStorage.setItem("HidePrivateEnabled", "false");
      chrome.browserAction.setIcon({path: "icon-disabled.png"});
      chrome.tabs.sendMessage(tab.id, {method: "disabled"}, function(response) {});
    } else {
      localStorage.setItem("HidePrivateEnabled", "true");
      chrome.browserAction.setIcon({path: "icon.png"});
      chrome.tabs.sendMessage(tab.id, {method: "enabled"}, function(response) {});
    }
  });
})();
