const headerClass = 'header';
const controlsClass = 'controls';
const controlsBackground = 'controls-background';
const controlsBorder = 'controls-border';
const logoWrapperContainerClass = 'logo-wrapper';
const logoClass = 'logo';

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

	const logoWrapperContainer = document.getElementsByClassName(logoWrapperContainerClass)[0];
	logoWrapperContainer.style.background = luminosityFunction(1, imageData);

	const logos = document.getElementsByClassName(logoClass);
	for(let x = 0; x < logos.length; x+=1){
		const logo = logos[x];
		logo.style.fill = luminosityFunction(0.25 * x, imageData);
	}
};