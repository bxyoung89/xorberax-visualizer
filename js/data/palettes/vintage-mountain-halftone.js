import vintageMountainScale from './scales/vintage-mountain-scale.js';
import vintageMountainGradient from './helpers/vintage-mountain-gradient.js';
import makeHalftoneShaderFromGradient from './helpers/make-halftone-shader-from-gradient.js';
import makeBackgroundShaderFromGradient from './helpers/make-background-shader-from-gradient.js';

export default 	{
	name: 'Seattle Rain',
	luminosityFunction: (luminosity) => {
		return vintageMountainScale(luminosity);
	},
	shader: makeHalftoneShaderFromGradient('vintageMountainGradient', vintageMountainGradient),
	backgroundShader: makeBackgroundShaderFromGradient('vintageMountainGradient', vintageMountainGradient),
};