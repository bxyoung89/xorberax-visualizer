export default `
	vec4 mintyGradient(float stop) {
		vec4 color1 = vec4(0.0, 0.32941176470588235, 0.0, 1.0);
		vec4 color2 = vec4(0.4235294117647059, 0.6313725490196078, 0.0, 1.0);
		vec4 color3 = vec4(0.7803921568627451, 0.8627450980392157, 0.4392156862745098, 1.0);
		vec4 color4 = vec4(0.8431372549019608, 0.8784313725490196, 0.8862745098039215, 1.0);
		vec4 color5 = vec4(0.9529411764705882, 0.9411764705882353, 0.8784313725490196, 1.0);
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