import miamiScale from './scales/miami-scale.js';
import miamiGradient from './helpers/miami-gradient.js';
import getLuminosity from './helpers/get-luminosity.js';

export default 	{
	name: 'Vice City',
	luminosityFunction: (luminosity) => {
		return miamiScale(luminosity);
	},
	shader: `
			uniform sampler2D texture;
			varying vec2 vUv;
			
			${getLuminosity}
			${miamiGradient}
			
			void main() {
				vec4 tColor = texture2D( texture, vUv );
				float luminosity = getLuminosity(tColor);
				gl_FragColor = miamiGradient(luminosity);
			}
			`,
	backgroundShader: `
		  void main() {
				gl_FragColor = vec4(0.88235294117,0.23529411764,0.69019607843, 1.0);
		  }
		`,
};