const headerClass = 'header';
const controlsClass = 'controls';
const controlsBackground = 'controls-background';
const controlsBorder = 'controls-border';

export default (palette) => {
	const {luminosityFunction} = palette;
	const headerElement = document.getElementsByClassName(headerClass)[0];
	headerElement.style.background = luminosityFunction(1);
	headerElement.style.color = luminosityFunction(0);

	const controlsElement = document.getElementsByClassName(controlsClass)[0];
	controlsElement.style.color = luminosityFunction(1);
	controlsElement.style.borderColor = luminosityFunction(0);

	const controlsBackgroundElement = document.getElementsByClassName(controlsBackground)[0];
	controlsBackgroundElement.style.background = luminosityFunction(0);
	controlsBackgroundElement.style.borderColor = luminosityFunction(1);

	const controlsBorderElement = document.getElementsByClassName(controlsBorder)[0];
	controlsBorderElement.style.borderColor = luminosityFunction(0);
};