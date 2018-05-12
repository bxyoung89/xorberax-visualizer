import rainbowScale from './scales/rainbow-scale.js';
import rainbowGradientFunction from './helpers/rainbow-gradient-function.js';
import makeFragShaderFromGradient from './helpers/make-frag-shader-from-gradient.js';
import makeBackgroundShaderFromGradient from './helpers/make-background-shader-from-gradient.js';

export default {
	name: 'All \'o Dem',
	luminosityFunction: (luminosity) => {
		return rainbowScale(luminosity);
	},
	shader: makeFragShaderFromGradient('rainbowGradient', rainbowGradientFunction),
	backgroundShader: makeBackgroundShaderFromGradient('rainbowGradient', rainbowGradientFunction),
};