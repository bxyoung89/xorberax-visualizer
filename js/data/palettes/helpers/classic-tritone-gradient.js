export default `
	vec4 classicTritoneGradient(float stop) {
		if(stop < 0.33){
			return vec4(0.0, 0.0, 0.0, 1.0);
		}
		if(stop > 0.65){
			return vec4(1.0, 1.0, 1.0, 1.0);
		}
		return vec4(1.0, 0.0, 0.0, 1.0);
	}
`;