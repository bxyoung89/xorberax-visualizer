export default (gradientFunctionName, gradientFunction) => {
	return `
			uniform sampler2D texture;
			varying vec2 vUv;
			
			${gradientFunction}
			
			void main() {
				gl_FragColor = ${gradientFunctionName}(0.0);
			}
			`;
};