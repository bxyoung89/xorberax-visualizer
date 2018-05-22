[logo]: https://raw.githubusercontent.com/bxyoung89/xorberax-visualizer/master/regular-logo.svg "Xorberax logo"


Hey, thanks for checking out the repo. Hope you enjoyed the site!

From a philosophical perspective I wanted to mix my gif collection with the joys of windows media player.

Technologically I learned quite a bit about WebGL. 
I initially started with a canvas implementation and it crashed the browser (and made files that were too big for github). 
What I ended up going with was a combination of cutting edge technologies with a lo fi asthetic.
- the background image and processing is done with WebGL and a bunch of shaders. It was really hard figuring out how to do the circle based ones, but I'm gald how it turned out.
- the bar chart is made using d3 and the native Audio API  (shoutout to [Patrick Wied](https://www.patrick-wied.at/blog/how-to-create-audio-visualizations-with-javascript-html) for inspiration )
- pretty much everything else is just fancy CSS (some things might be familiar to CSS Tricks Readers)
- You'll also notice if you look at the code that there's no webpack or grunt or any other tooling. This takes advantage of ES6 modules in the browser.


### Tooling
To add new gifs I found it easiest if you put them in the tools folder and ran `npm run gif2data ./test.gif `. Then you need to run `npm run update-data ./test`, this second step gets the colors.

Sometimes I'd have to adjust the timing data.

### Links

I got a lot of music from [https://icons8.com/music/]
The rest I got from [https://zooloo75.newgrounds.com/audio] (used with permission)