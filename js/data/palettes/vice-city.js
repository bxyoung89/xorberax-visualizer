import miamiScale from './scales/miami-scale.js';
import miamiGradient from './helpers/miami-gradient.js';
import makeFragShaderFromGradient from './helpers/make-frag-shader-from-gradient.js';
import makeBackgroundShaderFromGradient from './helpers/make-background-shader-from-gradient.js';

export default 	{
	name: 'Vice City',
	luminosityFunction: (luminosity) => {
		return miamiScale(luminosity);
	},
	shader: makeFragShaderFromGradient('miamiGradient', miamiGradient),
	backgroundShader: makeBackgroundShaderFromGradient('miamiGradient', miamiGradient),
};