const headerClass = 'header';
const controlsClass = 'controls';
const controlsBackground = 'controls-background';
const controlsBorder = 'controls-border';

export default (palette) => {
	const headerElement = document.getElementsByClassName(headerClass)[0];
	headerElement.style.background = palette(1);
	headerElement.style.color = palette(0);

	const controlsElement = document.getElementsByClassName(controlsClass)[0];
	controlsElement.style.color = palette(1);
	controlsElement.style.borderColor = palette(0);

	const controlsBackgroundElement = document.getElementsByClassName(controlsBackground)[0];
	controlsBackgroundElement.style.background = palette(0);
	controlsBackgroundElement.style.borderColor = palette(1);

	const controlsBorderElement = document.getElementsByClassName(controlsBorder)[0];
	controlsBorderElement.style.borderColor = palette(0);
};