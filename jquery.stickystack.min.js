/*!
**********************************************************
* StickyStack.js
* 
* Version:		v1.1.2
* Author:		Mike Zarandona
* Release:		June 24 2014
* 				Added a fix for sections that are taller than the screen
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
!function(t,e){t.fn.stickyStack=function(e){function o(t){for(var e=0,o=0;t>o;o++)e+=a.eq(o).outerHeight(!0);a.eq(0).parent().css("padding-top",e);for(var n=0;n<a.length;n++)t>0?(a.eq(n).addClass("stuck"),t--):a.eq(n).removeClass("stuck")}function n(){for(var e=0,o=t(window).outerHeight(!0),n=0;n<a.length;n++)s[n]=[],s[n][1]=a.eq(n).outerHeight(!0),s[n][1]>o?(s[n][2]=s[n][1]-o,a.eq(n).addClass("align-bottom")):(s[n][2]=0,a.eq(n).removeClass("align-bottom")),a.eq(n).attr("data-scrollto",a.eq(n).offset().top),a.eq(n).hasClass("stuck")?(s[n][0]=e,e+=s[n][1]):s[n][0]=a.eq(n).offset().top,a.eq(n).attr("data-scrollto",s[n][0]).attr("data-height",s[n][1]).attr("data-offset",s[n][2])}e=t.extend({},t.fn.stickyStack.options,e);var a=t(e.containerElement+" > "+e.stackingElement),s=[],i=e.stackingElement+"{box-sizing: border-box;-moz-box-sizing: border-box;position: relative;z-index: 100;}"+e.stackingElement+".stuck {position: fixed;top: 0;z-index: 0;}"+e.stackingElement+".stuck + "+e.stackingElement+":not(.stuck) {box-shadow: "+e.boxShadow+";}"+e.stackingElement+".stuck.align-bottom {top: auto !important;bottom: 0 !important;}";t("head").append('<style id="sticky-stack-styles" type="text/css">'+i+"</style>"),t(document).ready(function(){n();var t=a.eq(0).outerWidth(!0);a.css("width",t+"px")}),t(window).on("scroll",function(){for(var e=t(window).scrollTop(),n=0,i=0;i<a.length;i++)0!=a.eq(i).attr("data-offset")?e>=s[i][2]+s[i][0]&&n++:e>=s[i][0]&&n++;o(n)}),t(window).on("resize",function(){a.css("width",t(e.containerElement).width()+"px"),n()})},t.fn.stickyStack.options={containerElement:".main-content-wrapper",stackingElement:"section",boxShadow:"0 -3px 20px rgba(0, 0, 0, 0.25)"}}(jQuery);