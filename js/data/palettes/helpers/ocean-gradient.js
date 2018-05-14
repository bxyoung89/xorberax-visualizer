export default `
	vec4 oceanGradient(float stop) {
		vec4 color1 = vec4(0.0, 0.1450980392156863, 0.20784313725490197, 1.0);
		vec4 color2 = vec4(0.0, 0.2196078431372549, 0.3176470588235294, 1.0);
		vec4 color3 = vec4(0.13333333333333333, 0.39215686274509803, 0.43137254901960786, 1.0);
		vec4 color4 = vec4(0.23137254901960785, 0.5372549019607843, 0.6745098039215687, 1.0);
		vec4 color5 = vec4(0.7490196078431373, 0.8235294117647058, 0.8509803921568627, 1.0);
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