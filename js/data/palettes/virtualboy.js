import black2RedScale from './scales/black-2-red-scale.js';

export default {
	name: 'VirtualBoy',
	luminosityFunction: (luminosity) => {
		return black2RedScale(luminosity);
	},
	shader: `
			uniform sampler2D texture;
			varying vec2 vUv;
			void main() {
				vec4 tColor = texture2D( texture, vUv );
				float luminosity = 0.299 * tColor[0] + 0.587 * tColor[1] + 0.114 * tColor[2];
				vec4 themeColor = vec4(1.0, 0.0, 0.0, 0.0);
				gl_FragColor = vec4(luminosity * themeColor[0], luminosity * themeColor[1], luminosity * themeColor[2], 1.0);
			}
			`,
	backgroundShader: `
		  void main() {
				gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
		  }
		`,
};