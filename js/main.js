import AnimationControl from './animation-control.js';
import GifRenderer from './gif-renderer.js';
import styleElementsToPalette from './dom-manipulation/style-elements-to-palette.js';
import setUpDropdowns from './dom-manipulation/set-up-dropdowns.js';
import getFrameData from './data/get-frame-data.js';

let state = {};
const gifRenderer = new GifRenderer();

const runGifAnimationBasedOnState = () => {
	const {currentImage, currentPalette, currentVertexShader} = state;
	gifRenderer.setGif(currentImage, currentPalette, currentVertexShader);
	gifRenderer.runAnimation();
	AnimationControl.startAnimation();
};

const renderEverythingBasedOnState = () => {
	styleElementsToPalette(state.currentPalette);
	AnimationControl.stopAnimation();
	if(state.currentImage.frameData === undefined){
		getFrameData(state.currentImage.imageFolder).then((frameData) => {
			state.currentImage.frameData = frameData;
			runGifAnimationBasedOnState();
		});
		return;
	}
	runGifAnimationBasedOnState();
};

const updateState = (newState) => {
	state = {
		...state,
		...newState,
	};
	renderEverythingBasedOnState();
};
updateState(setUpDropdowns(updateState));


