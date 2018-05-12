export default `
	vec2 getCalculatedPixel(){
		float calculatedX = floor(vUv[0] * resolution[0]);
		float calculatedY = floor((1.0 - vUv[1]) * resolution[1]);
		return vec2(calculatedX, calculatedY);
	}
`;