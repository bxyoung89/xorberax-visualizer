let hexColor2Vec4 = (hexColor) => {
	if(hexColor.startsWith('#')){
		hexColor = hexColor.substr(1, hexColor.length -1);
	}
	const red = hexColor.substr(0, 2);
	const green = hexColor.substr(2, 2);
	const blue = hexColor.substr(4, 2);
	const hexDoubleToString = (hexDouble) => Number.parseInt(hexDouble, 16) /255;
	return `vec4(${hexDoubleToString(red)}, ${hexDoubleToString(green)}, ${hexDoubleToString(blue)}, 1.0)`;
}