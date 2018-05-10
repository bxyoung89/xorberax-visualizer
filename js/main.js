import AnimationControl from './animation-control.js';
import AudioVisualizerControl from './audio-visualizer-control.js';
import GifRenderer from './gif-renderer.js';
import styleElementsToPalette from './dom-manipulation/style-elements-to-palette.js';
import setUpDropdowns from './dom-manipulation/set-up-dropdowns.js';
import getImageData from './data/get-image-data.js';

let state = {};
const gifRenderer = new GifRenderer();
const defaultImageColors = {colors: ['#000', '#FFF']};

const runGifAnimationBasedOnState = () => {
	const {currentImage, currentPalette, currentVertexShader} = state;
	gifRenderer.setGif(currentImage, currentPalette, currentVertexShader);
	gifRenderer.runAnimation();
	AnimationControl.startAnimation();
};

const renderEverythingBasedOnState = () => {
	styleElementsToPalette(state.currentPalette, defaultImageColors);
	AnimationControl.stopAnimation();
	if (state.currentImage.imageData === undefined) {
		getImageData(state.currentImage.imageFolder).then((imageData) => {
			state.currentImage.imageData = imageData;
			runGifAnimationBasedOnState();
			styleElementsToPalette(state.currentPalette, state.currentImage.imageData);
		});
		return;
	}
	runGifAnimationBasedOnState();
	styleElementsToPalette(state.currentPalette, state.currentImage.imageData);
};

const updateState = (newState) => {
	state = {
		...state,
		...newState,
	};
	renderEverythingBasedOnState();
};
updateState(setUpDropdowns(updateState));
AudioVisualizerControl.startAnimation();


