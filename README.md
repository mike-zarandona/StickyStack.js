StickyStack.js
==============

A jQuery plugin that creates a stacking effect by sticking panels as they reach the top of the viewport.

Check out the demo here: &nbsp;[http://codepen.io/mike-zarandona/full/Dasnw](http://codepen.io/mike-zarandona/full/Dasnw)

&nbsp;
## Requirements
* jQuery
* A child-like sense of wonder


&nbsp;
## Usage
First include jQuery, then call `.stickyStack()` on the main content wrapper (or define it using options).  Note that the `stackingElement`s should be direct children of the `containerElement`.

		$('.main-content-wrapper').stickyStack();


&nbsp;
## Options
		$('.main-content-wrapper').stickyStack({
			containerElement: '.main-content-wrapper',
			stackingElement: 'section',
			boxShadow: '0 -3px 20px rgba(0, 0, 0, 0.25)'
		});

**containerElement** The selector which contains the elements to be stacked.

**stackingElement** The element(s) (which are direct children of `containerElement`) to be stacked on scroll.

**boxShadow** CSS property of the shadow applied to the first un-stuck `stackingElement`.


&nbsp;
## StickyStack.js in the Wild
Have you used StickyStack.js on a project or site?  I'd love to see it!  [Send me an email](mailto:mike.zarandona@gmail.com?subject=StickyStack.js%20in%20the%20Wild).


&nbsp;
## Credits
Made by [Mike Zarandona](http://twitter.com/mikezarandona) with inspiration from Matthew Peach.
