import gameboyScale from './scales/gameboy-scale.js';

export default 	{
	name: 'THIS AIN\'T NO GAME, BOY',
	luminosityFunction: (luminosity) => {
		return gameboyScale(luminosity);
	},
	shader: `
			uniform sampler2D texture;
			varying vec2 vUv;
			void main() {
				vec4 tColor = texture2D( texture, vUv );
				float luminosity = 0.299 * tColor[0] + 0.587 * tColor[1] + 0.114 * tColor[2];
				vec3 color1 = vec3(0.058823529411764705, 0.2196078431372549, 0.058823529411764705);
				vec3 color2 = vec3(0.18823529411764706, 0.3843137254901961, 0.18823529411764706);
				vec3 color3 = vec3(0.5450980392156862, 0.6745098039215687, 0.058823529411764705);
				vec3 color4 = vec3(0.6078431372549019, 0.7372549019607844, 0.058823529411764705);
				vec3 color = mix(color1, color2, smoothstep(0.0, .33, luminosity));
				color = mix(color, color3, smoothstep(.33, .66, luminosity));
				color = mix(color, color4, smoothstep(.66, 1.0, luminosity));
				gl_FragColor = vec4(luminosity * color[0], luminosity * color[1], luminosity * color[2], 1.0);
			}
			`,
	backgroundShader: `
		  void main() {
				gl_FragColor = vec4(0.058823529411764705, 0.2196078431372549, 0.058823529411764705, 1.0);
		  }
		`,
};