export default `
	vec4 getCenterPixelColor(vec2 centerPixel) {
		vec2 transformedCenterPixel = vec2(centerPixel[0]/resolution[0], 1.0 - (centerPixel[1]/resolution[1]) );
		return texture2D(texture, transformedCenterPixel);
	}
`;