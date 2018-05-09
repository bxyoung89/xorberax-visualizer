const black2RedScale = d3.scaleLinear().domain([0, 1]).range(['#000', '#f00']);
const miamiScale = d3.scaleLinear().domain([0, 1]).range(['#E13CB0', '#38B5E6']);
const rainbowScale = d3.scaleLinear().domain([0, 0.14, 0.28, 0.42, 0.56, 0.7, 0.84, 1]).range(['#9400D3', '#4B0082', '#0000ff', '#00ff00', '#ffff00', '#ff7f00', '#ff0000']);
const gameboyScale = d3.scaleLinear().domain([0, 0.33, 0.66, 1]).range(['#0f380f', '#306230', '#8bac0f', '#9bbc0f']);

const rainbowGradientFunction = `
	vec4 rainbowGradient(float stop) {
		vec4 color1 = vec4(0.5803921568627451, 0, 0.8274509803921568, 0.0);
		vec4 color2 = vec4(0.29411764705882354, 0, 0.5098039215686274, 0.0);
		vec4 color3 = vec4(0.0, 0.0, 1.0, 0.0);
		vec4 color4 = vec4(0.0, 1.0, 0.0, 0.0);
		vec4 color5 = vec4(1.0, 1.0, 0.0, 0.0);
		vec4 color6 = vec4(1.0, 0.4980392156862745, 0.0, 0.0);
		vec4 color7 = vec4(1.0, 0.0, 0.0, 0.0);
		if(stop == 0.0){
			return color1;
		}
		vec4 color = mix(color1, color2, smoothstep(0.0, .14, stop));
		color = mix(color, color3, smoothstep(.14, .28, stop));
		color = mix(color, color4, smoothstep(.28, .42, stop));
		color = mix(color, color5, smoothstep(.42, 0.56, stop));
		color = mix(color, color6, smoothstep(.56, .7, stop));
		color = mix(color, color7, smoothstep(.84, 1.0, stop));
		return vec4(stop * color[0], stop * color[1], stop * color[2], 1.0);
	}
`;

const getCenterPixelFunction = `
	vec2 getCenterPixel(vec2 calculatedPixel) {
		float squareSize = 5.0;
		float halfSquare = squareSize / 2.0;
		float centerX = floor(calculatedPixel[0] / squareSize) * squareSize + halfSquare;
		float centerY = floor(calculatedPixel[1] / squareSize) * squareSize + halfSquare;
		return vec2(centerX, centerY);
	}
`;

const getLuminosity = `
	float getLuminosity(vec4 color) {
		return 0.299 * color[0] + 0.587 * color[1] + 0.114 * color[2];
	}
`;

const getCenterPixelColor = `
	vec4 getCenterPixelColor(vec2 centerPixel) {
		vec2 transformedCenterPixel = vec2(centerPixel[0]/resolution[0], 1.0 - (centerPixel[1]/resolution[1]) );
		return texture2D(texture, transformedCenterPixel);
	}
`;

const getCalculatedPixel = `
	vec2 getCalculatedPixel(){
		float calculatedX = floor(vUv[0] * resolution[0]);
		float calculatedY = floor((1.0 - vUv[1]) * resolution[1]);
		return vec2(calculatedX, calculatedY);
	}
`;

const miamiGradient = `
	vec4 miamiGradient(float stop) {
		vec4 color1 = vec4(0.88235294117,0.23529411764,0.69019607843, 1.0);
		vec4 color2 = vec4(0.21960784313,0.70980392156,0.90196078431, 1.0);
		return mix(color1, color2, stop);
	}
`;

const gameboyGradient = `
	vec4 gameboyGradient(float stop) {
		vec4 color1 = vec4(0.058823529411764705, 0.2196078431372549, 0.058823529411764705, 0.0);
		vec4 color2 = vec4(0.18823529411764706, 0.3843137254901961, 0.18823529411764706, 0.0);
		vec4 color3 = vec4(0.5450980392156862, 0.6745098039215687, 0.058823529411764705, 0.0);
		vec4 color4 = vec4(0.6078431372549019, 0.7372549019607844, 0.058823529411764705, 0.0);
		if(stop == 0.0){
			return color1;
		}
		vec4 color = mix(color1, color2, smoothstep(0.0, .33, stop));
		color = mix(color, color3, smoothstep(.33, .66, stop));
		color = mix(color, color4, smoothstep(.66, 1.0, stop));
		return vec4(stop * color[0], stop * color[1], stop * color[2], 1.0);
	}
`;

export default [
	{
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
	},
	{
		name: 'VirtualBoy',
		luminosityFunction: (luminosity) => {
			return black2RedScale(luminosity);
		},
		shader: `
			uniform sampler2D texture;
			varying vec2 vUv;
			void main() {
				vec4 tColor = texture2D( texture, vUv );
				float luminosity = 0.299 * tColor[0] + 0.587 * tColor[1] + 0.114 * tColor[2];
				vec4 themeColor = vec4(1.0, 0.0, 0.0, 0.0);
				gl_FragColor = vec4(luminosity * themeColor[0], luminosity * themeColor[1], luminosity * themeColor[2], 1.0);
			}
			`,
		backgroundShader: `
		  void main() {
				gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
		  }
		`,
	},
	{
		name: 'All \'o Dem',
		luminosityFunction: (luminosity) => {
			return rainbowScale(luminosity);
		},
		shader: `
			uniform sampler2D texture;
			varying vec2 vUv;
			
			${rainbowGradientFunction}
			
			void main() {
				vec4 tColor = texture2D( texture, vUv );
				float luminosity = 0.299 * tColor[0] + 0.587 * tColor[1] + 0.114 * tColor[2];
				gl_FragColor = rainbowGradient(luminosity);
			}
			`,
		backgroundShader: `
		  void main() {
				gl_FragColor = vec4(0.5803921568627451, 0, 0.8274509803921568, 1.0);
		  }
		`,
	},
	{
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
	},
	{
		name: 'Ti esrever dna ti pilf, nwod gniht ym tup',
		luminosityFunction: (luminosity) => {
			return rainbowScale(1 - luminosity);
		},
		shader: `
			uniform sampler2D texture;
			varying vec2 vUv;
			void main() {
				vec4 tColor = texture2D( texture, vUv );
				float luminosity = 0.299 * tColor[0] + 0.587 * tColor[1] + 0.114 * tColor[2];
				vec3 color1 = vec3(0.5803921568627451, 0, 0.8274509803921568);
				vec3 color2 = vec3(0.29411764705882354, 0, 0.5098039215686274);
				vec3 color3 = vec3(0, 0, 1);
				vec3 color4 = vec3(0, 1, 0);
				vec3 color5 = vec3(1, 1, 0);
				vec3 color6 = vec3(1, 0.4980392156862745, 0);
				vec3 color7 = vec3(1, 0, 0);
				vec3 color = mix(color7, color6, smoothstep(0.0, .14, luminosity));
				color = mix(color, color5, smoothstep(.14, .28, luminosity));
				color = mix(color, color4, smoothstep(.28, .42, luminosity));
				color = mix(color, color3, smoothstep(.42, 0.56, luminosity));
				color = mix(color, color2, smoothstep(.56, .7, luminosity));
				color = mix(color, color1, smoothstep(.84, 1.0, luminosity));
				gl_FragColor = vec4(luminosity * color[0], luminosity * color[1], luminosity * color[2], 1.0);
			}
			`,
		backgroundShader: `
		  void main() {
				gl_FragColor = vec4(0.5803921568627451, 0, 0.8274509803921568, 1.0);
		  }
		`,
	},
	{
		name: 'Vice City',
		luminosityFunction: (luminosity) => {
			return miamiScale(luminosity);
		},
		shader: `
			uniform sampler2D texture;
			varying vec2 vUv;
			
			${getLuminosity}
			${miamiGradient}
			
			void main() {
				vec4 tColor = texture2D( texture, vUv );
				float luminosity = getLuminosity(tColor);
				gl_FragColor = miamiGradient(luminosity);
			}
			`,
		backgroundShader: `
		  void main() {
				gl_FragColor = vec4(0.88235294117,0.23529411764,0.69019607843, 1.0);
		  }
		`,
	},
	{
		name: 'Dat Heat',
		luminosityFunction: (luminosity) => {
			return miamiScale(luminosity);
		},
		shader: `
			uniform sampler2D texture;
			uniform vec2 resolution;
			varying vec2 vUv;
			
			${getCenterPixelFunction}
			${getLuminosity}
			${getCenterPixelColor}
			${getCalculatedPixel}
			${miamiGradient}

			void main() {				
			  vec2 calculatedPixel = getCalculatedPixel();
			  vec2 centerPixel = getCenterPixel(calculatedPixel);
				vec4 tColor = getCenterPixelColor(centerPixel);
				float pixelDistance = distance(calculatedPixel, centerPixel);
				float luminosity = getLuminosity(tColor);
				
				vec4 resultColor = miamiGradient(0.0);
				
				if(pixelDistance >= 1.6 && luminosity > 0.75){
				  resultColor = mix(miamiGradient(0.0), miamiGradient(1.0), luminosity);
				}
				
				if(pixelDistance < 1.6 && luminosity > 0.5){
				  resultColor = mix(miamiGradient(0.0), miamiGradient(1.0), max(1.0, (luminosity - 0.5) / 0.75));
				}
			
				if(pixelDistance < 0.8 && luminosity > 0.25){
					 resultColor = mix(miamiGradient(0.0), miamiGradient(1.0), max(1.0, (luminosity - 0.25) / 0.5));
				}
		
				gl_FragColor = resultColor;
			}
			`,
		backgroundShader: `
		  void main() {
				gl_FragColor = vec4(0.5803921568627451, 0, 0.8274509803921568, 1.0);
		  }
		`,
	},
	{
		name: 'THIS AIN\'T NO GAME, BOY',
		luminosityFunction: (luminosity) => {
			return gameboyScale(luminosity);
		},
		shader: `
			uniform sampler2D texture;
			varying vec2 vUv;
			void main() {
				vec4 tColor = texture2D( texture, vUv );
				float luminosity = 0.299 * tColor[0] + 0.587 * tColor[1] + 0.114 * tColor[2];
				vec3 color1 = vec3(0.058823529411764705, 0.2196078431372549, 0.058823529411764705);
				vec3 color2 = vec3(0.18823529411764706, 0.3843137254901961, 0.18823529411764706);
				vec3 color3 = vec3(0.5450980392156862, 0.6745098039215687, 0.058823529411764705);
				vec3 color4 = vec3(0.6078431372549019, 0.7372549019607844, 0.058823529411764705);
				vec3 color = mix(color1, color2, smoothstep(0.0, .33, luminosity));
				color = mix(color, color3, smoothstep(.33, .66, luminosity));
				color = mix(color, color4, smoothstep(.66, 1.0, luminosity));
				gl_FragColor = vec4(luminosity * color[0], luminosity * color[1], luminosity * color[2], 1.0);
			}
			`,
		backgroundShader: `
		  void main() {
				gl_FragColor = vec4(0.058823529411764705, 0.2196078431372549, 0.058823529411764705, 1.0);
		  }
		`,
	},
	{
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
	},
	{
		name: 'Pixelated',
		luminosityFunction: (luminosity) => {
			return black2RedScale(luminosity);
		},
		shader: `
			uniform sampler2D texture;
			uniform vec2 resolution;
			varying vec2 vUv;
			void main() {
			  float calculatedX = floor(vUv[0] * resolution[0]);
			  float calculatedY = floor((1.0 - vUv[1]) * resolution[1]);
			  float nearestX = floor(calculatedX / 10.0) * 10.0 + 5.0;
			  float nearestY = floor(calculatedY / 10.0) * 10.0 + 5.0;
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
	},
];