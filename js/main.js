import AnimationControl from './animation-control.js';
import AudioVisualizerControl from './audio-visualizer-control.js';
import GifRenderer from './gif-renderer.js';
import styleElementsToPalette from './dom-manipulation/style-elements-to-palette.js';
import setUpDropdowns from './dom-manipulation/set-up-dropdowns.js';
import getImageData from './data/get-image-data.js';
import renderer from "./three-js-objects/renderer.js";
import camera from './three-js-objects/camera.js'
import UrlManipulator from './url-manipulator.js';

let state = {};
const gifRenderer = new GifRenderer();
const defaultImageColors = {colors: ['#000', '#FFF']};

const runGifAnimationBasedOnState = () => {
	const {currentImage, currentPalette, currentVertexShader} = state;
	gifRenderer.setGif(currentImage, currentPalette, currentVertexShader);
	gifRenderer.runAnimation();
	AnimationControl.startAnimation();
};

const stopAnimationAndSetLoadingColors = () => {
	styleElementsToPalette(state.currentPalette, defaultImageColors);
	AudioVisualizerControl.updateBasedOnPalette(state.currentPalette, defaultImageColors);
	AnimationControl.stopAnimation();
};

const renderEverytingBasedOnState= () => {
	runGifAnimationBasedOnState();
	styleElementsToPalette(state.currentPalette, state.currentImage.imageData);
	AudioVisualizerControl.updateBasedOnPalette(state.currentPalette, state.currentImage.imageData);
	UrlManipulator.writeToUrl(state);
};

const loadImage = () => {
	stopAnimationAndSetLoadingColors();
	if (state.currentImage.imageData === undefined) {
		getImageData(state.currentImage.imageFolder).then((imageData) => {
			state.currentImage.imageData = imageData;
			renderEverytingBasedOnState();
		});
		return;
	}
	renderEverytingBasedOnState();
};

const updateState = (newState) => {
	state = {
		...state,
		...newState,
	};
	loadImage();
};
updateState(setUpDropdowns(updateState));
AudioVisualizerControl.startAnimation();

window.addEventListener('resize', () => {
	const appBody = document.getElementById('body');
	renderer.setSize(appBody.clientWidth, appBody.clientHeight);
	renderEverytingBasedOnState();
	AudioVisualizerControl.handleResize();
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
});
