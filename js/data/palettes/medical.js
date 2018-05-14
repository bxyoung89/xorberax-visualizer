import medicalScale from './scales/medical-scale.js';
import medicalGradient from './helpers/medical-gradient.js';
import makeFragShaderFromGradient from './helpers/make-frag-shader-from-gradient.js';
import makeBackgroundShaderFromGradient from './helpers/make-background-shader-from-gradient.js';

export default 	{
	name: 'MEDIC!!!',
	luminosityFunction: (luminosity) => {
		return medicalScale(luminosity);
	},
	shader: makeFragShaderFromGradient('medicalGradient', medicalGradient),
	backgroundShader: makeBackgroundShaderFromGradient('medicalGradient', medicalGradient),
};