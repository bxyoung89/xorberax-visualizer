export default {
	name: 'BIG AND CHUNKY, EXTRA FUNKY',
	luminosityFunction: (luminosity, imageData) => {
		const index = Math.round(luminosity * (imageData.colors.length - 1));
		return imageData.colors[index];
	},
	shader: `
			uniform sampler2D texture;
			uniform vec2 resolution;
			varying vec2 vUv;
			void main() {
				float squareSize = 20.0;
				float halfSquare = squareSize / 2.0;
			  float calculatedX = floor(vUv[0] * resolution[0]);
			  float calculatedY = floor((1.0 - vUv[1]) * resolution[1]);
			  float nearestX = floor(calculatedX / squareSize) * squareSize + halfSquare;
			  float nearestY = floor(calculatedY / squareSize) * squareSize + halfSquare;
			  vec2 convertedPixel = vec2(nearestX/resolution[0], 1.0 - (nearestY/resolution[1]) );
				vec4 tColor = texture2D( texture, convertedPixel );
				gl_FragColor = tColor;
			}
			`,
	backgroundShader: `
		  void main() {
				gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
		  }
		`,
};