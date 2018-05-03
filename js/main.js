import getImage from './get-image.js';
import GifRenderer from "./gif-renderer.js";

const canvasId = 'gif-canvas';

getImage('pimp-hank-with-money.json').then((json) => {
	const gifRenderer = new GifRenderer(canvasId, json);
	gifRenderer.runAnimation();
});