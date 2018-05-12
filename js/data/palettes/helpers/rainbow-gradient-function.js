export default `
	vec4 rainbowGradient(float stop) {
		vec4 color1 = vec4(0.5803921568627451, 0, 0.8274509803921568, 0.0);
		vec4 color2 = vec4(0.29411764705882354, 0, 0.5098039215686274, 0.0);
		vec4 color3 = vec4(0.0, 0.0, 1.0, 0.0);
		vec4 color4 = vec4(0.0, 1.0, 0.0, 0.0);
		vec4 color5 = vec4(1.0, 1.0, 0.0, 0.0);
		vec4 color6 = vec4(1.0, 0.4980392156862745, 0.0, 0.0);
		vec4 color7 = vec4(1.0, 0.0, 0.0, 0.0);
		if(stop == 0.0){
			return color1;
		}
		vec4 color = mix(color1, color2, smoothstep(0.0, .14, stop));
		color = mix(color, color3, smoothstep(.14, .28, stop));
		color = mix(color, color4, smoothstep(.28, .42, stop));
		color = mix(color, color5, smoothstep(.42, 0.56, stop));
		color = mix(color, color6, smoothstep(.56, .7, stop));
		color = mix(color, color7, smoothstep(.84, 1.0, stop));
		return vec4(stop * color[0], stop * color[1], stop * color[2], 1.0);
	}
`;
