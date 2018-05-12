import black2RedScale from './scales/black-2-red-scale.js';
import getCenterPixelFunction from './helpers/get-center-pixel-function.js';
import getLuminosity from './helpers/get-luminosity.js';
import getCenterPixelColor from './helpers/get-center-pixel-color.js';
import getCalculatedPixel from './helpers/get-calculated-pixel.js';

export default 	{
	name: 'VirtualBoy HalfTone',
	luminosityFunction: (luminosity) => {
		return black2RedScale(luminosity);
	},
	shader: `
			uniform sampler2D texture;
			uniform vec2 resolution;
			varying vec2 vUv;
			
			${getCenterPixelFunction}
			${getLuminosity}
			${getCenterPixelColor}
			${getCalculatedPixel}

			void main() {				
			  vec2 calculatedPixel = getCalculatedPixel();
			  vec2 centerPixel = getCenterPixel(calculatedPixel);
				vec4 tColor = getCenterPixelColor(centerPixel);
				float pixelDistance = distance(calculatedPixel, centerPixel);
				float luminosity = getLuminosity(tColor);
				
				vec4 resultColor = vec4(0.0, 0.0, 0.0, 0.0);
				
				if(pixelDistance >= 1.6 && luminosity > 0.75){
				  resultColor = mix(vec4(0.0, 0.0, 0.0, 0.0), vec4(1.0, 0.0, 0.0, 0.0), luminosity);
				}
				
				if(pixelDistance < 1.6 && luminosity > 0.5){
				  resultColor = mix(vec4(0.0, 0.0, 0.0, 0.0), vec4(1.0, 0.0, 0.0, 0.0), max(1.0, (luminosity - 0.5) / 0.75));
				}
			
				if(pixelDistance < 0.8 && luminosity > 0.25){
					 resultColor = mix(vec4(0.0, 0.0, 0.0, 0.0), vec4(1.0, 0.0, 0.0, 0.0), max(1.0, (luminosity - 0.25) / 0.5));
				}
		
				gl_FragColor = resultColor;
			}
			`,
	backgroundShader: `
		  void main() {
				gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
		  }
		`,
};