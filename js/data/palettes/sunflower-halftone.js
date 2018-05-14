import sunflowerScale from './scales/sunflower-scale.js';
import sunflowerGradient from './helpers/sunflower-gradient.js';
import makeHalftoneShaderFromGradient from './helpers/make-halftone-shader-from-gradient.js';
import makeBackgroundShaderFromGradient from './helpers/make-background-shader-from-gradient.js';

export default 	{
	name: 'Seeds for the Trees',
	luminosityFunction: (luminosity) => {
		return sunflowerScale(luminosity);
	},
	shader: makeHalftoneShaderFromGradient('sunflowerGradient', sunflowerGradient),
	backgroundShader: makeBackgroundShaderFromGradient('sunflowerGradient', sunflowerGradient),
};