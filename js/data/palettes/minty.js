import mintyScale from './scales/minty-scale.js';
import mintyGradient from './helpers/minty-gradient.js';
import makeFragShaderFromGradient from './helpers/make-frag-shader-from-gradient.js';
import makeBackgroundShaderFromGradient from './helpers/make-background-shader-from-gradient.js';

export default 	{
	name: 'Minty',
	luminosityFunction: (luminosity) => {
		return mintyScale(luminosity);
	},
	shader: makeFragShaderFromGradient('mintyGradient', mintyGradient),
	backgroundShader: makeBackgroundShaderFromGradient('mintyGradient', mintyGradient),
};