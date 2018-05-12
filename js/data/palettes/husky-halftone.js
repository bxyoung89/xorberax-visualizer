import huskyScale from './scales/husky-scale.js';
import huskyGradient from './helpers/husky-gradient.js';
import makeHalftoneShaderFromGradient from './helpers/make-halftone-shader-from-gradient.js';
import makeBackgroundShaderFromGradient from './helpers/make-background-shader-from-gradient.js';

export default 	{
	name: 'A billion and one Dalmatians',
	luminosityFunction: (luminosity) => {
		return huskyScale(luminosity);
	},
	shader: makeHalftoneShaderFromGradient('huskyGradient', huskyGradient),
	backgroundShader: makeBackgroundShaderFromGradient('huskyGradient', huskyGradient),
};