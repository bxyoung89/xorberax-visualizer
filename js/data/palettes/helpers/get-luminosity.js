export default `
	float getLuminosity(vec4 color) {
		return 0.299 * color[0] + 0.587 * color[1] + 0.114 * color[2];
	}
`;