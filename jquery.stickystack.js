/*
**********************************************************
* StickyStack.js
* 
* Version:        v1.1.1
* Author:		Mike Zarandona
* Release:		June 03 2014
* 				Added data-scrollto for section scrolling
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
		var $sections = $(options.containerElement + ' > ' + options.stackingElement),
			sectionsInfo = [],

		// Build the styles
			styles = 
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

			buildSectionsInfo();

			// Fix the section width
			var origWidth = $sections.eq(0).outerWidth(true);
			$sections.css('width', origWidth + 'px');
		});



		// Window scroll()
		$(window).on('scroll', function() {

			// Current scroll position
			var windowScrollPos = $(window).scrollTop(),

			// Counter variable
				counter = 0;

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

			buildSectionsInfo();
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



		// Helper function which builds the array sectionsInfo[] which keeps track of all the section elements
		function buildSectionsInfo() {
			// Build an array of the sections
			//		sectionsInfo[i][0] = Position from top of document
			//		sectionsInfo[i][1] = Height of section
			var runningHeightCounter = 0;

			for (var i = 0; i < $sections.length; i++) {
				sectionsInfo[i] = [];

				// record the height of the section
				sectionsInfo[i][1] = $sections.eq(i).outerHeight(true);

				// write the data-scrollto
				$sections.eq(i).attr('data-scrollto', $sections.eq(i).offset().top);

				// if the section is stuck, calculate its .offset() based on preceeding section heights
				if ( $sections.eq(i).hasClass('stuck') ) {
					sectionsInfo[i][0] = runningHeightCounter;
					runningHeightCounter += sectionsInfo[i][1];
				}
				else {
					sectionsInfo[i][0] = $sections.eq(i).offset().top;
				}

				// Attach a data attribute to be used to scroll to sections
				$sections.eq(i).attr('data-scrollto', sectionsInfo[i][0]);
				$sections.eq(i).attr('data-height', sectionsInfo[i][1]);
			}
			console.log(runningHeightCounter);
		}

	};



	// Default the defaults
	$.fn.stickyStack.options = {
		containerElement:	'.main-content-wrapper',
		stackingElement:	'section',
		boxShadow:		'0 -3px 20px rgba(0, 0, 0, 0.25)'
	};
})(jQuery);
