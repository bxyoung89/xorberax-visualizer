export default `
	vec4 sunflowerGradient(float stop) {
		vec4 color1 = vec4(0.08235294117647059, 0.23921568627450981, 0.00784313725490196, 1.0);
		vec4 color2 = vec4(0.6627450980392157, 0.2627450980392157, 0.0, 1.0);
		vec4 color3 = vec4(0.3568627450980392, 0.6078431372549019, 0.21568627450980393, 1.0);
		vec4 color4 = vec4(1.0, 0.6901960784313725, 0.0, 1.0);
		vec4 color5 = vec4(1.0, 0.8745098039215686, 0.0, 1.0);
		if(stop == 0.0){
			return color1;
		}
		vec4 color = mix(color1, color2, smoothstep(0.0, .25, stop));
		color = mix(color, color3, smoothstep(.25, .5, stop));
		color = mix(color, color4, smoothstep(.5, .75, stop));
		color = mix(color, color4, smoothstep(.75, 1.0, stop));
		return color;
	}
`;