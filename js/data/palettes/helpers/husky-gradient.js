export default `
	vec4 huskyGradient(float stop) {
		vec4 color1 = vec4(0.09019607843137255, 0.07450980392156863, 0.08627450980392157, 1.0);
		vec4 color2 = vec4(0.3686274509803922, 0.3686274509803922, 0.4, 1.0);
		vec4 color3 = vec4(0.6941176470588235, 0.7058823529411765, 0.7411764705882353, 1.0);
		vec4 color4 = vec4(0.9254901960784314, 0.8941176470588236, 0.8627450980392157, 1.0);
		vec4 color5 = vec4(0.9725490196078431, 0.9764705882352941, 0.984313725490196, 1.0);
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