import gameboyScale from './scales/gameboy-scale.js';
import gameboyGradient from './helpers/gameboy-gradient.js';
import makeHalftoneShaderFromGradient from './helpers/make-halftone-shader-from-gradient.js';
import makeBackgroundShaderFromGradient from './helpers/make-background-shader-from-gradient.js';

export default 	{
	name: 'GameBoy Micro',
	luminosityFunction: (luminosity) => {
		return gameboyScale(luminosity);
	},
	shader: makeHalftoneShaderFromGradient('gameboyGradient', gameboyGradient),
	backgroundShader: makeBackgroundShaderFromGradient('gameboyGradient', gameboyGradient),
};