const headerClass = 'header';
const controlsClass = 'controls';
const controlsBackground = 'controls-background';
const controlsBorder = 'controls-border';
const audioVisualizerBackground = 'audio-visualization-background';

export default (palette, imageData) => {
	const {luminosityFunction} = palette;
	const headerElement = document.getElementsByClassName(headerClass)[0];
	headerElement.style.background = luminosityFunction(1, imageData);
	headerElement.style.color = luminosityFunction(0, imageData);

	const controlsElement = document.getElementsByClassName(controlsClass)[0];
	controlsElement.style.color = luminosityFunction(1, imageData);
	controlsElement.style.borderColor = luminosityFunction(0, imageData);

	const controlsBackgroundElement = document.getElementsByClassName(controlsBackground)[0];
	controlsBackgroundElement.style.background = luminosityFunction(0, imageData);
	controlsBackgroundElement.style.borderColor = luminosityFunction(1, imageData);

	const controlsBorderElement = document.getElementsByClassName(controlsBorder)[0];
	controlsBorderElement.style.borderColor = luminosityFunction(0, imageData);

	const firstAudioVisualizerBackground = document.getElementsByClassName(audioVisualizerBackground)[0];
	const fourthColor = luminosityFunction(0.25, imageData);
	const threeFourthColor = luminosityFunction(0.75, imageData);
	firstAudioVisualizerBackground.style.background = `repeating-linear-gradient(45deg, ${fourthColor}, ${fourthColor} 10px, ${threeFourthColor} 10px, ${threeFourthColor} 20px`;


	const secondAudioVisualizerBackground = document.getElementsByClassName(audioVisualizerBackground)[1];
	secondAudioVisualizerBackground.style.background = `repeating-linear-gradient(-45deg, ${fourthColor}, ${fourthColor} 10px, ${threeFourthColor} 10px, ${threeFourthColor} 20px`;
};