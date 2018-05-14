export default `
	vec4 medicalGradient(float stop) {
		vec4 color1 = vec4(0.7490196078431373, 0.0392156862745098, 0.18823529411764706, 1.0);
		vec4 color2 = vec4(1.0,1.0,1.0, 1.0);
		return mix(color1, color2, stop);
	}
`;