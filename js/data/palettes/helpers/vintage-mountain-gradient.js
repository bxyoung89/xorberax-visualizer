export default `
	vec4 vintageMountainGradient(float stop) {
		vec4 color1 = vec4(0.16862745098039217, 0.1843137254901961, 0.23921568627450981, 1.0);
		vec4 color2 = vec4(0.30980392156862746, 0.3058823529411765, 0.2784313725490196, 1.0);
		vec4 color3 = vec4(0.27450980392156865, 0.40784313725490196, 0.4549019607843137, 1.0);
		vec4 color4 = vec4(0.6235294117647059, 0.5725490196078431, 0.43137254901960786, 1.0);
		vec4 color5 = vec4(0.9686274509803922, 0.9686274509803922, 0.8862745098039215, 1.0);
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