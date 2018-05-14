import AudioController from './audio-controller.js';
import AudioVisualizer from './audio-visualizer.js';

class AudioVisualizerControl {
	constructor() {
		this.animationRequest = undefined;
	}

	startAnimation() {
		if (this.animationRequest) {
			return;
		}
		this.animationRequest = window.requestAnimationFrame(() => this.animate());
	}

	stopAnimation() {
		if (!this.animationRequest) {
			return;
		}
		window.cancelAnimationFrame(this.animationRequest);
		this.animationRequest = undefined;
	}

	animate() {
		this.animationRequest = undefined;
		const frequencyData = AudioController.getFrequencyData();
		AudioVisualizer.animate(frequencyData);
		this.startAnimation();
	}

	updateBasedOnPalette(palette, imageData) {
		const {luminosityFunction} = palette;
		AudioVisualizer.setRectFillColor(luminosityFunction(1, imageData));
	}

	handleResize(){
		AudioVisualizer.updateVariables();
	}
}


export default new AudioVisualizerControl();