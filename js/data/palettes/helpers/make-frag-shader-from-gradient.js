import getLuminosity from './get-luminosity.js';

export default (gradientFunctionName, gradientFunction) => {
	return `
			uniform sampler2D texture;
			varying vec2 vUv;
			
			${getLuminosity}
			${gradientFunction}
			
			void main() {
				vec4 tColor = texture2D( texture, vUv );
				float luminosity = getLuminosity(tColor);
				gl_FragColor = ${gradientFunctionName}(luminosity);
			}
			`;
};