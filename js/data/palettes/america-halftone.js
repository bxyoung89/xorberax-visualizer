import americaScale from './scales/america-scale.js';
import americaGradient from './helpers/america-gradient.js';
import makeHalftoneShaderFromGradient from './helpers/make-halftone-shader-from-gradient.js';
import makeBackgroundShaderFromGradient from './helpers/make-background-shader-from-gradient.js';

export default 	{
	name: 'LAND OF THE BRAVE',
	luminosityFunction: (luminosity) => {
		return americaScale(luminosity);
	},
	shader: makeHalftoneShaderFromGradient('americaGradient', americaGradient),
	backgroundShader: makeBackgroundShaderFromGradient('americaGradient', americaGradient),
};