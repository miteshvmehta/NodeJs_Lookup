var Nightmare = require('nightmare'),
	vo = require('vo'),
	path = require('path'),
	selector = '#accelus_components_application_IframeView_0';
/*, 
 */
	iframe = require('frames'),
/*
Nightmare.action('clearCache', 
	function(name, option, parent, win, renderer, done){
		parent.respondTo('clearCache', function(done){
			win.webContents.session.clearCache(done);
		});
		done();
	},
	function(message, done){
		this.child.call('clearCache', done);
	});
*/

vo(function*(){
	var RI_nightmare = Nightmare({
		show:true,
		'web-preferences':{'ignoreSslErrors':true,'web-security':false},
		waitTimeout:5000	//in ms
	});
	
	var docTitle = yield RI_nightmare
					.viewport(1000,1000)
					//.clearCache()
					.useragent("Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36")
					.goto('http://complianceqa.westlaw.com/find/default.wl?cite=OJ%202013%20L173%2F2&rs=GRCF1.0&vr=2.0&DB=EU-LEG')
					//
					//Authentication Page
					//
					.wait("button#SignIn")
					.html('authenticationPage.html','HTMLComplete')
					.screenshot('authenticationPage.png')
					//
					//authenticate - sometimes these fields are pre-filled -- TODO: fix
					//uncomment the first time the script is used.
					//.insert('input[id="Username"]', 'mitesh.mehta')
					//.insert('input[id="Password"]', 'Testing123')
					//.check('input[name="SaveUsernamePassword"]')
					.click('button#SignIn')
					//
					//EnvirnomentSelection Page
					//
					.wait('#dijit_form_Button_0_label')
					.html('environmentSelectionPage.html','HTMLComplete')
					.screenshot('environmentSelectionPage.png')
					.click('#dijit_form_Button_0_label')
					//.wait(3000)
					//
					//Doc Display Page
					//
					//.inject('js','jquery.min.js')
					.html('docDisplayPage.html','HTMLComplete')
					.screenshot('docDisplayPage.png')
					.wait(2000)
					//
					//What does the doc display HTML look like
					//
					.evaluate(function(){
						//
						//this is where you would add logic to parse the html and see if we have a document,
						//a pick list, an out-of-subscription message, or just a bad link
						//
						//NEED TO FIX iframe loading though
						//
						//var html = document.documentElement.innerHTML;
			            //var myFrame = $(html).find('title').text();
			            //   var message = 'Hello!  The time is: ' + (new Date().getTime());
			            //   var iframe = document.getElementsByClassName('windowApp')[0].contentWindow;
			            //   iframe.postMessage(message, "https://uat.accelus.com"); //https://uat.accelus.com
			            // //  var myFrame = $(".windowApp").contents().find('#ri').html();
			            //   var myFrame = $(".windowApp").contents().find('#ri').html();


			            //var myFrame = document.getElementsByClassName('windowApp')[0].contents().html();
			            //return myFrame;

						//var selector = 'div#accelus_components_application_IframeView_0'
			            //  this.page.switchToFrame(1);  this is the way it would be done in phantomJS
						
						//return document.querySelector(selector).innerHTML;
						
					/*
						var iframeSelector = document.querySelector('#accelus_components_application_IframeView_0 iframe');
						console.log(iframeSelector[0].outerHTML);
						var divIframe = iframeSelector[0].outerHTML;
						console.log(divIframe);
						*/
						/*
						window.parent.frames[1].document.body.style.background = 'red';
						//console.log('Document: ' + document.documentElement.innerHTML);
						*/
						//  page.switchToFrame(1);
			                        // return document.getElementById('iframe_id').contentWindow.document.body.innerHTML
			                        //return document.documentElement.innerHTML;
						//return document.body.querySelector('#accelus_components_application_IframeView_0').innerHTML;
						
						/*
						 * Working Copy
						 * return document.querySelector('#accelus_components_application_IframeView_0').outerHTML;
						 * 
						 */
						return document.querySelector('#accelus_components_application_IframeView_0').outerHTML;
					} );
	
	yield RI_nightmare.end();
	
	return docTitle;
	
})(function(err,result){
	if (err){
		return console.log('Error:' + err + '. Result:' + result);
	}
	
	console.log(result);
});
