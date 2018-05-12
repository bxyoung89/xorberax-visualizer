import rainbowScale from './scales/rainbow-scale.js';

export default {
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
};