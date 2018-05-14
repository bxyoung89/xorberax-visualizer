import medicalScale from './scales/medical-scale.js';
import medicalGradient from './helpers/medical-gradient.js';
import makeHalftoneShaderFromGradient from './helpers/make-halftone-shader-from-gradient.js';
import makeBackgroundShaderFromGradient from './helpers/make-background-shader-from-gradient.js';

export default 	{
	name: 'Red Kross',
	luminosityFunction: (luminosity) => {
		return medicalScale(luminosity);
	},
	shader: makeHalftoneShaderFromGradient('medicalGradient', medicalGradient),
	backgroundShader: makeBackgroundShaderFromGradient('medicalGradient', medicalGradient),
};