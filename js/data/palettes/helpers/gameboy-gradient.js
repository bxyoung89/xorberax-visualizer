export default `
	vec4 gameboyGradient(float stop) {
		vec4 color1 = vec4(0.058823529411764705, 0.2196078431372549, 0.058823529411764705, 0.0);
		vec4 color2 = vec4(0.18823529411764706, 0.3843137254901961, 0.18823529411764706, 0.0);
		vec4 color3 = vec4(0.5450980392156862, 0.6745098039215687, 0.058823529411764705, 0.0);
		vec4 color4 = vec4(0.6078431372549019, 0.7372549019607844, 0.058823529411764705, 0.0);
		if(stop == 0.0){
			return color1;
		}
		vec4 color = mix(color1, color2, smoothstep(0.0, .33, stop));
		color = mix(color, color3, smoothstep(.33, .66, stop));
		color = mix(color, color4, smoothstep(.66, 1.0, stop));
		return vec4(stop * color[0], stop * color[1], stop * color[2], 1.0);
	}
`;