import gameboyScale from './scales/gameboy-scale.js';
import gameboyGradient from './helpers/gameboy-gradient.js';
import getCenterPixelFunction from './helpers/get-center-pixel-function.js';
import getLuminosity from './helpers/get-luminosity.js';
import getCenterPixelColor from './helpers/get-center-pixel-color.js';
import getCalculatedPixel from './helpers/get-calculated-pixel.js';

export default 	{
	name: 'GameBoy Micro',
	luminosityFunction: (luminosity) => {
		return gameboyScale(luminosity);
	},
	shader: `
			uniform sampler2D texture;
			uniform vec2 resolution;
			varying vec2 vUv;
			
			${getCenterPixelFunction}
			${getLuminosity}
			${getCenterPixelColor}
			${getCalculatedPixel}
			${gameboyGradient}

			void main() {				
			  vec2 calculatedPixel = getCalculatedPixel();
			  vec2 centerPixel = getCenterPixel(calculatedPixel);
				vec4 tColor = getCenterPixelColor(centerPixel);
				float pixelDistance = distance(calculatedPixel, centerPixel);
				float luminosity = getLuminosity(tColor);
				
				vec4 resultColor = gameboyGradient(0.0);
				
				if(pixelDistance >= 1.6 && luminosity > 0.75){
				  resultColor = mix(gameboyGradient(0.0), gameboyGradient(luminosity), luminosity);
				}
				
				if(pixelDistance < 1.6 && luminosity > 0.5){
					float cappedLuminosity = max(1.0, (luminosity - 0.5) / 0.75);
				  resultColor = mix(gameboyGradient(0.0), gameboyGradient(cappedLuminosity), cappedLuminosity);
				}
			
				if(pixelDistance < 0.8 && luminosity > 0.25){
				float cappedLuminosity = max(1.0, (luminosity - 0.25) / 0.5);
					 resultColor = mix(gameboyGradient(0.0), gameboyGradient(cappedLuminosity), cappedLuminosity);
				}
		
				gl_FragColor = resultColor;
			}
			`,
	backgroundShader: `
		  void main() {
				gl_FragColor = vec4(0.058823529411764705, 0.2196078431372549, 0.058823529411764705, 1.0);
		  }
		`,
};