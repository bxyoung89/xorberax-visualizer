import gameboyScale from './scales/gameboy-scale.js';
import gameboyGradient from './helpers/gameboy-gradient.js';
import makeFragShaderFromGradient from './helpers/make-frag-shader-from-gradient.js';
import makeBackgroundShaderFromGradient from './helpers/make-background-shader-from-gradient.js';

export default 	{
	name: 'THIS AIN\'T NO GAME, BOY',
	luminosityFunction: (luminosity) => {
		return gameboyScale(luminosity);
	},
	shader: makeFragShaderFromGradient('gameboyGradient', gameboyGradient),
	backgroundShader: makeBackgroundShaderFromGradient('gameboyGradient', gameboyGradient),
};