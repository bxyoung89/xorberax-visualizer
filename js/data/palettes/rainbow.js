import rainbowScale from './scales/rainbow-scale.js';
import rainbowGradientFunction from './helpers/rainbow-gradient-function.js';

export default {
	name: 'All \'o Dem',
	luminosityFunction: (luminosity) => {
		return rainbowScale(luminosity);
	},
	shader: `
			uniform sampler2D texture;
			varying vec2 vUv;
			
			${rainbowGradientFunction}
			
			void main() {
				vec4 tColor = texture2D( texture, vUv );
				float luminosity = 0.299 * tColor[0] + 0.587 * tColor[1] + 0.114 * tColor[2];
				gl_FragColor = rainbowGradient(luminosity);
			}
			`,
	backgroundShader: `
		  void main() {
				gl_FragColor = vec4(0.5803921568627451, 0, 0.8274509803921568, 1.0);
		  }
		`,
};