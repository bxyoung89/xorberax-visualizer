const headerClass = 'header';

export default (palette) => {
	const headerElement = document.getElementsByClassName(headerClass)[0];
	headerElement.style.background = palette(1);
	headerElement.style.color = palette(0);
};