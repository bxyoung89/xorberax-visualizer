import getLuminosity from './get-luminosity.js';
import getCenterPixelFunction from "./get-center-pixel-function.js";
import getCalculatedPixel from "./get-calculated-pixel.js";
import getCenterPixelColor from "./get-center-pixel-color.js";

export default (gradientFunctionName, gradientFunction) => {
	return `
			uniform sampler2D texture;
			uniform vec2 resolution;
			varying vec2 vUv;
			
			${getCenterPixelFunction}
			${getLuminosity}
			${getCenterPixelColor}
			${getCalculatedPixel}
			${gradientFunction}

			void main() {				
			  vec2 calculatedPixel = getCalculatedPixel();
			  vec2 centerPixel = getCenterPixel(calculatedPixel);
				vec4 tColor = getCenterPixelColor(centerPixel);
				float pixelDistance = distance(calculatedPixel, centerPixel);
				float luminosity = getLuminosity(tColor);
				
				vec4 resultColor = ${gradientFunctionName}(0.0);
				
				if(pixelDistance >= 1.6 && luminosity > 0.75){
				  resultColor = ${gradientFunctionName}(luminosity);
				}
				
				if(pixelDistance < 1.6 && luminosity > 0.5){
					float cappedLuminosity = max(1.0, (luminosity - 0.5) / 0.75);
				  resultColor = ${gradientFunctionName}(luminosity);
				}
			
				if(pixelDistance < 0.8 && luminosity > 0.25){
				float cappedLuminosity = max(1.0, (luminosity - 0.25) / 0.5);
					 resultColor = ${gradientFunctionName}(luminosity);
				}
		
				gl_FragColor = resultColor;
			}
			`;
};