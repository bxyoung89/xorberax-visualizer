const black2RedScale = d3.scaleLinear().domain([0, 1]).range(['#000', '#f00']);
const miamiScale = d3.scaleLinear().domain([0, 1]).range(['#E13CB0', '#38B5E6']);
const rainbowScale = d3.scaleLinear().domain([0, 0.14, 0.28, 0.42, 0.56, 0.7, 0.84, 1]).range(['#9400D3', '#4B0082', '#0000ff', '#00ff00', '#ffff00', '#ff7f00', '#ff0000']);
const gameboyScale = d3.scaleLinear().domain([0, 0.33, 0.66, 1]).range(['#0f380f', '#306230', '#8bac0f', '#9bbc0f']);

export default [
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
				gl_FragColor = vec4(luminosity * themeColor[0], luminosity * themeColor[1], luminosity * themeColor[2], 0.0);
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
				vec3 color = mix(color1, color2, smoothstep(0.0, .14, luminosity));
				color = mix(color, color3, smoothstep(.14, .28, luminosity));
				color = mix(color, color4, smoothstep(.28, .42, luminosity));
				color = mix(color, color5, smoothstep(.42, 0.56, luminosity));
				color = mix(color, color6, smoothstep(.56, .7, luminosity));
				color = mix(color, color7, smoothstep(.84, 1.0, luminosity));
				gl_FragColor = vec4(luminosity * color[0], luminosity * color[1], luminosity * color[2], 0.0);
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
				gl_FragColor = vec4(luminosity * color[0], luminosity * color[1], luminosity * color[2], 0.0);
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
			void main() {
				vec4 tColor = texture2D( texture, vUv );
				float luminosity = 0.299 * tColor[0] + 0.587 * tColor[1] + 0.114 * tColor[2];
				vec3 color1 = vec3(0.88235294117,0.23529411764,0.69019607843);
  			vec3 color2 = vec3(0.21960784313,0.70980392156,0.90196078431);

  			vec3 color = mix(color1,color2,luminosity);
				gl_FragColor = vec4(color[0], color[1], color[2], 1.0);
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
				gl_FragColor = vec4(luminosity * color[0], luminosity * color[1], luminosity * color[2], 0.0);
			}
			`,
	},
];