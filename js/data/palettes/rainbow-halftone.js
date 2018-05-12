import rainbowScale from './scales/rainbow-scale.js';
import rainbowGradientFunction from './helpers/rainbow-gradient-function.js';
import makeHalftoneShaderFromGradient from './helpers/make-halftone-shader-from-gradient.js';
import makeBackgroundShaderFromGradient from './helpers/make-background-shader-from-gradient.js';

export default {
	name: 'Rainbow Dots',
	luminosityFunction: (luminosity) => {
		return rainbowScale(luminosity);
	},
	shader: makeHalftoneShaderFromGradient('rainbowGradient', rainbowGradientFunction),
	backgroundShader: makeBackgroundShaderFromGradient('rainbowGradient', rainbowGradientFunction),
};