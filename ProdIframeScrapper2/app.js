var fs = require("fs");
var Nightmare = require('nightmare');
var nightmare = Nightmare({ show: true,
		'web-preferences':{'ignoreSslErrors':true,'web-security':false},
		waitTimeout:8000	//in ms
	});


var fileName = "RequestedLinkFile" + Math.floor((Math.random() * 1000000000000000)) + ".html";

nightmare
	.viewport(1000,1000)
	.useragent("Mozilla/5.0 (Windows; U; MSIE 9.0; WIndows NT 9.0; en-US))")
	.goto('http://compliance.westlaw.com/find/default.wl?cite=OJ%202013%20L173%2F2&rs=GRCF1.0&vr=2.0&DB=EU-LEG')
	.wait('button#SignIn')
	.click('input[id="Username"]')
	.click('input[id="Password"]')
	.click("button#SignIn")
	.wait(5000)
	.html(fileName,'HTMLComplete')
	.evaluate(function (fileName, fs) {
		var htmlData = '';

		/*
		fs.readFile(fileName, 'utf8', function(error, data){
		  if (err) {
			return console.log(err);
		  }
		  htmlData = data;
		});
*/
fs.readFile('C:\Mitesh-Java\NodeJs\ProdIframeScrapper2\RequestedLinkFile101741474121809.html', function (err, buf) {
    console.log(buf.toString());
});

var contents = fs.readFileSync('RequestedLinkFile101741474121809.html').toString();
console.log(contents);
htmlData = contents;
		return htmlData;
		//return fileName;
/*
		var fo = document.createElement("meta");
		fo.setAttribute("http-equiv", "X-Frame-Options");
		fo.setAttribute("content", "ALLOW-FROM https://regint.accelus.com/");
		document.head.appendChild(fo);
		
		
		//return document.head.innerHTML;
	  var iframeObj = document.querySelector("iframe.windowApp");
	  //return iframeObj.contentWindow.document.body.innerHTML;
	  //return iframeObj.contentDocument.body.innerHTML;
	  //var instanceOfDOMRequest = iframeObj.getScreenshot(1000, 1000);
	  return iframeObj;
*/
	}, fileName, fs)
	
	.end()
	.then(function (result) {
		console.log(result)
	})
	.catch(function (error) {
		console.error('Search failed:', error);
	});