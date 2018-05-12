import bumblebeeScale from './scales/bumblebee-scale.js';
import bumblebeeGradient from './helpers/bumblebee-gradient.js';
import makeFragShaderFromGradient from './helpers/make-frag-shader-from-gradient.js';
import makeBackgroundShaderFromGradient from './helpers/make-background-shader-from-gradient.js';

export default 	{
	name: 'BLACK AND YELLO BLACK AND YELLO',
	luminosityFunction: (luminosity) => {
		return bumblebeeScale(luminosity);
	},
	shader: makeFragShaderFromGradient('bumblebeeGradient', bumblebeeGradient),
	backgroundShader: makeBackgroundShaderFromGradient('bumblebeeGradient', bumblebeeGradient),
};