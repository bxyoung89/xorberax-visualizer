export default `
	vec4 miamiGradient(float stop) {
		vec4 color1 = vec4(0.88235294117,0.23529411764,0.69019607843, 1.0);
		vec4 color2 = vec4(0.21960784313,0.70980392156,0.90196078431, 1.0);
		return mix(color1, color2, stop);
	}
`;