import getImage from './get-image.js';
import GifRenderer from './gif-renderer.js';
import canvasRenderers from './canvas-renderers.js';
import palettes from './palettes.js';
import loadingGifData from './loading-gif-data.js';
import styleElementsToPalette from './style-elements-to-palette.js';

const canvasId = 'gif-canvas';
let currentPalette = palettes.black2Red;
let currentCanvasRenderer = canvasRenderers.palletLuminosity;
styleElementsToPalette(currentPalette);



const gifRenderer = new GifRenderer(canvasId, loadingGifData, currentPalette, currentCanvasRenderer);
gifRenderer.runAnimation();

getImage('pimp-hank-with-money.json').then((json) => {
// getImage('shibe-puppers-eat-lettuce.json').then((json) => {
	gifRenderer.loadNewSettings(json, currentPalette, currentCanvasRenderer);
	gifRenderer.runAnimation();
});