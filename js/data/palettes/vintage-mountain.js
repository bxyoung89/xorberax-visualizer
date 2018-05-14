import vintageMountainScale from './scales/vintage-mountain-scale.js';
import vintageMountainGradient from './helpers/vintage-mountain-gradient.js';
import makeFragShaderFromGradient from './helpers/make-frag-shader-from-gradient.js';
import makeBackgroundShaderFromGradient from './helpers/make-background-shader-from-gradient.js';

export default 	{
	name: 'Vintage Mountain',
	luminosityFunction: (luminosity) => {
		return vintageMountainScale(luminosity);
	},
	shader: makeFragShaderFromGradient('vintageMountainGradient', vintageMountainGradient),
	backgroundShader: makeBackgroundShaderFromGradient('vintageMountainGradient', vintageMountainGradient),
};