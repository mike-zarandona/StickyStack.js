/*
**********************************************************
* StickyStack.js
* 
* Version:		v1.0
* Author:		Mike Zarandona
* Release:		March 27 2014
* 				Initial release.
* 
* Reqs:			jQuery
* 
* Usage:		$('.main-content-wrapper').stickyStack({
*					containerElement:	'.main-content-wrapper',
*					stackingElement:	'section',
*					boxShadow:			'0 -3px 20px rgba(0, 0, 0, 0.25)'
*				});
**********************************************************
*/

(function ($, undefined) {
	$.fn.stickyStack = function (options) {

		/* Override defaults with specified options. */
		options = $.extend({}, $.fn.stickyStack.options, options);

		// Variables setup
		var $sections = $(options.containerElement + ' > ' + options.stackingElement);
		var sectionsInfo = [];

		// Build the styles
		var styles = 
				options.stackingElement + '{' +
					'box-sizing: border-box;' +
					'-moz-box-sizing: border-box;' +
					'position: relative;' +
					'z-index: 100;' +
				'}' +

				options.stackingElement + '.stuck {' +
					'position: fixed;' +
					'top: 0;' +
					'z-index: 0;' +
				'}' +

				options.stackingElement + '.stuck + ' + options.stackingElement + ':not(.stuck) {' +
					'box-shadow: ' + options.boxShadow + ';' +
				'}';

		// Append the styles to the <head>
		$('head').append('<style type="text/css">' + styles + '</style>');



		// Document ready()
		$(document).ready(function() {

			// Build an array of the sections
			//		sectionsInfo[i][0] = Position from top of document
			//		sectionsInfo[i][1] = Height of section
			for (var i = 0; i < $sections.length; i++) {
				sectionsInfo[i] = [];

				sectionsInfo[i][0] = $sections.eq(i).offset().top;
				sectionsInfo[i][1] = $sections.eq(i).outerHeight(true);
			}

			// Fix the section width
			var origWidth = $sections.eq(0).outerWidth(true);
			$sections.css('width', origWidth + 'px');
		});



		// Window scroll()
		$(window).on('scroll', function() {

			// Current scroll position
			var windowScrollPos = $(window).scrollTop();

			// Counter variable
			var counter = 0;

			// Count how many sections should be stuck
			for (var t = 0; t < $sections.length; t++) {
				if ( windowScrollPos >= sectionsInfo[t][0] ) {
					counter++;
				}
			}

			setStickies(counter);
		});



		// Resize event to keep the site width fluid
		$(window).on('resize', function() {
			$sections.css('width', $(options.containerElement).width() + 'px');
		});



		function setStickies(howMany) {

			// Step 1:  Calculate how much padding the parent container should get
			var paddingTop = 0;

			// Total the amount of padding of stuck sections
			for (var p = 0; p < howMany; p++) {
				paddingTop += $sections.eq(p).outerHeight(true);
			}

			// Append that height to the parent wrapper
			$sections.eq(0).parent().css('padding-top', paddingTop);


			// Step 2:  Stick the sections to be stuck (heh)
			for (var s = 0; s < $sections.length; s++) {
				if (howMany > 0) {
					$sections.eq(s).addClass('stuck');
					howMany--;
				}
				else {
					$sections.eq(s).removeClass('stuck');
				}
			}
		}

	};



	// Default the defaults
	$.fn.stickyStack.options = {
		containerElement:	'.main-content-wrapper',
		stackingElement:	'section',
		boxShadow:			'0 -3px 20px rgba(0, 0, 0, 0.25)'
	};
})(jQuery);
