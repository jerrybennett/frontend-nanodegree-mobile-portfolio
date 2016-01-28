# FEND P4: Website Performance Optimization

This project focuses on website performance optimization and has 2 main goals:

1. Get PageSpeed results above 90 on 'index.html.'
2. Optimize Frames Per Second in 'pizza.html.' Specifically get FPS above 60 and eliminate 'jank'.

I used Gulp to automatically perform certain optimizations such as, check the quality of JS, optimize images, minify CSS and JS, etc. You can inspect my gulpfile.js and/or package.json to see what plugins were used. I used this tutorial to get up and running with Gulp:
http://www.sitepoint.com/introduction-gulp-js/

####Part 1: Optimize PageSpeed Insights score (above 90) for 'index.html'

1. Used Google's "Web Font Loader" (https://github.com/typekit/webfontloader) to load 'Open Sans.' (line 71 on src/index.html)
2. Put a media query on the 'print.css' to prevent render blocking. (line 10 on src/index.html)
3. Compressed css with CSS Compressor: 'http://csscompressor.com/'
4. Inlined CSS from 'src/css/style.css' to prevent render blocking. (line 12 on src/index.html)
5. Moved all render blocking javascript to the bottom of
   the page just above the closing body tag, and added `async` tag to the scripts.
6. Optimized images with Photoshop's 'save for web' tool and/or
   downloaded external images, placed them in local 'src/img' folder and
   created new links to images.

####Check the PageSpeed Insights results here:
'https://developers.google.com/speed/pagespeed/insights/?url=http%3A%2F%2Fjerrybennett.me%2Ffrontend-nanodegree-mobile-portfolio%2Fdist%2Findex.html&tab=mobile'


####Part 2: Optimize Frames per Second in 'pizza.html'

- Reduce time to resize pizzas to less than 5ms on 'pizza.html' page.
- Optimize Frames Per Second (get FPS above 60 and eliminate 'jank') on 'pizza.html' page.

The following optimizations were made to 'src/views/js/main.js':

1. Changed function `changePizzaSizes` (line 460) to prevent forced synchronous layouts.
2. Changed `document.querySelectorAll` to `document.getElementsByClassName` as it is a faster way of accessing `.randomPizzaContainer` in the DOM. (line 475)
3. Changed `document.querySelectorAll()` in `var items` (on line 530) to `document.getElementsByClassName()` as it is a faster method to access `.mover` in the DOM.
4. Cached `document.body.scrollTop / 1250` calculation in `var scrollTop` (line 534), outside of the for loop to prevent layout thrashing.
5. Changed the number of moving background pizzas being generated (appended to `#movingPizzas1`) from 200 to 55. (line 557)

####Other Optimizations for Part 2

1. In 'src/views/images' file I changed the size of 'pizza.png' to 100px wide and renamed it 'pizza1.png.'

2. In 'src/views/css/style.css' I added `z-index: -1;`, `transform: translateZ(0);`, `transform: translate3d(0,0,0);` and `will-change: transform;` to `.mover` in order to reduce paint time by putting it on a new layer and send rendering to the GPU for better performance.

####You can open my 'pizza.html' page with Chrome and use Chrome Developer Tools to measure performance:
'http://jerrybennett.me/frontend-nanodegree-mobile-portfolio/dist/views/pizza.html'

You can also download this repository to inspect the code.