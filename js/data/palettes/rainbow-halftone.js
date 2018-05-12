import rainbowScale from './scales/rainbow-scale.js';
import getCenterPixelFunction from './helpers/get-center-pixel-function.js';
import getLuminosity from './helpers/get-luminosity.js';
import getCenterPixelColor from './helpers/get-center-pixel-color.js';
import getCalculatedPixel from './helpers/get-calculated-pixel.js';
import rainbowGradientFunction from './helpers/rainbow-gradient-function.js';

export default {
	name: 'Rainbow Dots',
	luminosityFunction: (luminosity) => {
		return rainbowScale(luminosity);
	},
	shader: `
			uniform sampler2D texture;
			uniform vec2 resolution;
			varying vec2 vUv;
			
			${getCenterPixelFunction}
			${getLuminosity}
			${getCenterPixelColor}
			${getCalculatedPixel}
			${rainbowGradientFunction}

			void main() {				
			  vec2 calculatedPixel = getCalculatedPixel();
			  vec2 centerPixel = getCenterPixel(calculatedPixel);
				vec4 tColor = getCenterPixelColor(centerPixel);
				float pixelDistance = distance(calculatedPixel, centerPixel);
				float luminosity = getLuminosity(tColor);
				
				vec4 resultColor = rainbowGradient(0.0);
				
				if(pixelDistance >= 1.6 && luminosity > 0.75){
				  resultColor = mix(rainbowGradient(0.0), rainbowGradient(luminosity), luminosity);
				}
				
				if(pixelDistance < 1.6 && luminosity > 0.5){
					float cappedLuminosity = max(1.0, (luminosity - 0.5) / 0.75);
				  resultColor = mix(rainbowGradient(0.0), rainbowGradient(cappedLuminosity), cappedLuminosity);
				}
			
				if(pixelDistance < 0.8 && luminosity > 0.25){
				float cappedLuminosity = max(1.0, (luminosity - 0.25) / 0.5);
					 resultColor = mix(rainbowGradient(0.0), rainbowGradient(cappedLuminosity), cappedLuminosity);
				}
		
				gl_FragColor = resultColor;
			}
			`,
	backgroundShader: `
		  void main() {
				gl_FragColor = vec4(0.5803921568627451, 0, 0.8274509803921568, 1.0);
		  }
		`,
};