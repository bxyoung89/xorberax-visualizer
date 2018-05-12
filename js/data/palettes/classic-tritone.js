import classicTritoneGradient from './helpers/classic-tritone-gradient.js';
import makeFragShaderFromGradient from './helpers/make-frag-shader-from-gradient.js';
import makeBackgroundShaderFromGradient from './helpers/make-background-shader-from-gradient.js';

export default 	{
	name: 'Tasty Tritips',
	luminosityFunction: (luminosity) => {
		if(luminosity < 0.33){
			return '#000';
		}
		if(luminosity > 0.66){
			return '#fff';
		}
		return '#f00';
	},
	shader: makeFragShaderFromGradient('classicTritoneGradient', classicTritoneGradient),
	backgroundShader: makeBackgroundShaderFromGradient('classicTritoneGradient', classicTritoneGradient),
};