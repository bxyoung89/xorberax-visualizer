import getImage from './get-image.js';
import GifRenderer from './gif-renderer.js';
import canvasRenderers from './canvas-renderers.js';
import palettes from './palettes.js';
import loadingGifData from './loading-gif-data.js';

const canvasId = 'gif-canvas';
const gifRenderer = new GifRenderer(canvasId, loadingGifData, palettes.black2Red, canvasRenderers.palletLuminosity);
gifRenderer.runAnimation();

getImage('pimp-hank-with-money.json').then((json) => {
// getImage('shibe-puppers-eat-lettuce.json').then((json) => {
	gifRenderer.loadNewSettings(json, palettes.black2Red, canvasRenderers.palletLuminosity);
	gifRenderer.runAnimation();
});