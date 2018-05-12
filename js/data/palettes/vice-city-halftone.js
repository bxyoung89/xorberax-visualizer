import miamiScale from './scales/miami-scale.js';
import miamiGradient from './helpers/miami-gradient.js';
import makeHalftoneShaderFromGradient from './helpers/make-halftone-shader-from-gradient.js';
import makeBackgroundShaderFromGradient from './helpers/make-background-shader-from-gradient.js';

export default {
	name: 'Dat Heat',
	luminosityFunction: (luminosity) => {
		return miamiScale(luminosity);
	},
	shader: makeHalftoneShaderFromGradient('miamiGradient', miamiGradient),
	backgroundShader: makeBackgroundShaderFromGradient('miamiGradient', miamiGradient),
};