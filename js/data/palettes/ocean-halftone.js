import oceanScale from './scales/ocean-scale.js';
import oceanGradient from './helpers/ocean-gradient.js';
import makeHalftoneShaderFromGradient from './helpers/make-halftone-shader-from-gradient.js';
import makeBackgroundShaderFromGradient from './helpers/make-background-shader-from-gradient.js';

export default 	{
	name: 'Deep Blue',
	luminosityFunction: (luminosity) => {
		return oceanScale(luminosity);
	},
	shader: makeHalftoneShaderFromGradient('oceanGradient', oceanGradient),
	backgroundShader: makeBackgroundShaderFromGradient('oceanGradient', oceanGradient),
};