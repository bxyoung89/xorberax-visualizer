export default `
	vec4 bumblebeeGradient(float stop) {
		vec4 color1 = vec4(0.0, 0.0, 0.0, 1.0);
		vec4 color2 = vec4(1.0, 0.9764705882352941, 0.2, 1.0);
		return mix(color1, color2, stop);
	}
`;