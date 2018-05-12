import americaScale from './scales/america-scale.js';
import americaGradient from './helpers/america-gradient.js';
import makeFragShaderFromGradient from './helpers/make-frag-shader-from-gradient.js';
import makeBackgroundShaderFromGradient from './helpers/make-background-shader-from-gradient.js';

export default 	{
	name: 'THE HOME OF THE FREE',
	luminosityFunction: (luminosity) => {
		return americaScale(luminosity);
	},
	shader: makeFragShaderFromGradient('americaGradient', americaGradient),
	backgroundShader: makeBackgroundShaderFromGradient('americaGradient', americaGradient),
};