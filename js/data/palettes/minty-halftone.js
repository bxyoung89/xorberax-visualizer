import mintyScale from './scales/minty-scale.js';
import mintyGradient from './helpers/minty-gradient.js';
import makeHalftoneShaderFromGradient from './helpers/make-halftone-shader-from-gradient.js';
import makeBackgroundShaderFromGradient from './helpers/make-background-shader-from-gradient.js';

export default 	{
	name: 'Lime Style',
	luminosityFunction: (luminosity) => {
		return mintyScale(luminosity);
	},
	shader: makeHalftoneShaderFromGradient('mintyGradient', mintyGradient),
	backgroundShader: makeBackgroundShaderFromGradient('mintyGradient', mintyGradient),
};