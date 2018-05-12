import bumblebeeScale from './scales/bumblebee-scale.js';
import bumblebeeGradient from './helpers/bumblebee-gradient.js';
import makeHalftoneShaderFromGradient from './helpers/make-halftone-shader-from-gradient.js';
import makeBackgroundShaderFromGradient from './helpers/make-background-shader-from-gradient.js';

export default 	{
	name: 'The Bee Movie',
	luminosityFunction: (luminosity) => {
		return bumblebeeScale(luminosity);
	},
	shader: makeHalftoneShaderFromGradient('bumblebeeGradient', bumblebeeGradient),
	backgroundShader: makeBackgroundShaderFromGradient('bumblebeeGradient', bumblebeeGradient),
};