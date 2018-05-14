import oceanScale from './scales/ocean-scale.js';
import oceanGradient from './helpers/ocean-gradient.js';
import makeFragShaderFromGradient from './helpers/make-frag-shader-from-gradient.js';
import makeBackgroundShaderFromGradient from './helpers/make-background-shader-from-gradient.js';

export default 	{
	name: 'Ocean',
	luminosityFunction: (luminosity) => {
		return oceanScale(luminosity);
	},
	shader: makeFragShaderFromGradient('oceanGradient', oceanGradient),
	backgroundShader: makeBackgroundShaderFromGradient('oceanGradient', oceanGradient),
};