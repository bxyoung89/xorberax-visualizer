const headerClass = 'header';
const controlsClass = 'controls';
const controlsBackground = 'controls-background';
const controlsBorder = 'controls-border';

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
};