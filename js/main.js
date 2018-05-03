import getImage from './get-image.js';
import GifRenderer from './gif-renderer.js';
import canvasRenderers from './canvas-renderers.js';
import palettes from './palettes.js';
import loadingGifData from './loading-gif-data.js';
import styleElementsToPalette from './style-elements-to-palette.js';

const canvasId = 'gif-canvas';
let currentPalette = palettes.black2Red;
let currentCanvasRenderer = canvasRenderers.paletteLuminosity;
let lastGif = undefined;
styleElementsToPalette(currentPalette);

const gifRenderer = new GifRenderer(canvasId, loadingGifData, currentPalette, currentCanvasRenderer);
gifRenderer.runAnimation();

const runLoadingIndicator = () => {
	gifRenderer.loadNewSettings(loadingGifData, currentPalette, currentCanvasRenderer);
	gifRenderer.runAnimation();
};

const reloadEverything = () => {
	styleElementsToPalette(currentPalette);
	gifRenderer.loadNewSettings(lastGif, currentPalette, currentCanvasRenderer);
	gifRenderer.runAnimation();
};

const onImageChange = (event) => {
	runLoadingIndicator();
	getImage(event.target.value).then((json) => {
		lastGif = json;
		reloadEverything();
	});
};

const onPaletteChange = (event) => {
	runLoadingIndicator();
	currentPalette = palettes[event.target.value];
	reloadEverything();
};

const onCanvasRendererChange = (event) => {
	runLoadingIndicator();
	currentCanvasRenderer = canvasRenderers[event.target.value];
	reloadEverything();
};

document.addEventListener('DOMContentLoaded', function () {
	document.querySelector('#image-selector').onchange = onImageChange;
	document.querySelector('#palette-selector').onchange = onPaletteChange;
	document.querySelector('#canvas-renderer-selector').onchange = onCanvasRendererChange;
}, false);

getImage('pimp-hank-with-money.json').then((json) => {
	lastGif = json;
	reloadEverything();
});