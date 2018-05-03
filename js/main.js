import getImage from './get-image.js';
import GifRenderer from './gif-renderer.js';
import canvasRenderers from './canvas-renderers.js';
import palettes from './palettes.js';

const canvasId = 'gif-canvas';

getImage('pimp-hank-with-money.json').then((json) => {
	const gifRenderer = new GifRenderer(canvasId, json, palettes.black2Red, canvasRenderers.palletLuminosity);
	gifRenderer.runAnimation();
});