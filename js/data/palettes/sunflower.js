import sunflowerScale from './scales/sunflower-scale.js';
import sunflowerGradient from './helpers/sunflower-gradient.js';
import makeFragShaderFromGradient from './helpers/make-frag-shader-from-gradient.js';
import makeBackgroundShaderFromGradient from './helpers/make-background-shader-from-gradient.js';

export default 	{
	name: 'Sunflower',
	luminosityFunction: (luminosity) => {
		return sunflowerScale(luminosity);
	},
	shader: makeFragShaderFromGradient('sunflowerGradient', sunflowerGradient),
	backgroundShader: makeBackgroundShaderFromGradient('sunflowerGradient', sunflowerGradient),
};