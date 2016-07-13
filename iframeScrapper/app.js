var Nightmare = require('nightmare');
var nightmare = Nightmare({ show: true })

nightmare
  .goto('http://www.w3schools.com/html/html_iframe.asp')
  .wait('#mainLeaderboard')
  .evaluate(function () {
	  var iframeObj = document.querySelector("iframe[src='default.asp']");
	  return iframeObj.contentWindow.document.body.innerHTML;;
  })
  .end()
  .then(function (result) {
    console.log(result)
  })
  .catch(function (error) {
    console.error('Search failed:', error);
  });