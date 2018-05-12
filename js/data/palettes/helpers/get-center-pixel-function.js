export default  `
	vec2 getCenterPixel(vec2 calculatedPixel) {
		float squareSize = 5.0;
		float halfSquare = squareSize / 2.0;
		float centerX = floor(calculatedPixel[0] / squareSize) * squareSize + halfSquare;
		float centerY = floor(calculatedPixel[1] / squareSize) * squareSize + halfSquare;
		return vec2(centerX, centerY);
	}
`;