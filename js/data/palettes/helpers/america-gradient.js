export default `
	vec4 americaGradient(float stop) {
		vec4 color1 = vec4(0, 0.1568627450980392, 0.40784313725490196, 0.0);
		vec4 color2 = vec4(0.7490196078431373, 0.0392156862745098, 0.18823529411764706, 1.0);
		vec4 color3 = vec4(1.0, 1.0, 1.0, 0.0);
		if(stop == 0.0){
			return color1;
		}
		vec4 color = mix(color1, color2, smoothstep(0.0, 0.5, stop));
		color = mix(color, color3, smoothstep(0.5, 1.0, stop));
		return color;
	}
`;