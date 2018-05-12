import huskyScale from './scales/husky-scale.js';
import huskyGradient from './helpers/husky-gradient.js';
import makeFragShaderFromGradient from './helpers/make-frag-shader-from-gradient.js';
import makeBackgroundShaderFromGradient from './helpers/make-background-shader-from-gradient.js';

export default 	{
	name: 'Printer Friendly',
	luminosityFunction: (luminosity) => {
		return huskyScale(luminosity);
	},
	shader: makeFragShaderFromGradient('huskyGradient', huskyGradient),
	backgroundShader: makeBackgroundShaderFromGradient('huskyGradient', huskyGradient),
};