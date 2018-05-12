import classicTritoneGradient from './helpers/classic-tritone-gradient.js';
import makeHalftoneShaderFromGradient from './helpers/make-halftone-shader-from-gradient.js';
import makeBackgroundShaderFromGradient from './helpers/make-background-shader-from-gradient.js';

export default 	{
	name: 'Try Hard Style',
	luminosityFunction: (luminosity) => {
		if(luminosity < 0.33){
			return '#000';
		}
		if(luminosity > 0.66){
			return '#fff';
		}
		return '#f00';
	},
	shader: makeHalftoneShaderFromGradient('classicTritoneGradient', classicTritoneGradient),
	backgroundShader: makeBackgroundShaderFromGradient('classicTritoneGradient', classicTritoneGradient),
};