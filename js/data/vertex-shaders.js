export default [
	{
		name: 'SUCH WEB. MUCH GL',
		shader: `
			varying vec2 vUv;

			void main() {
					vUv = uv;

					gl_Position =   projectionMatrix *
													modelViewMatrix *
													vec4(position,1.0);
			}
		`,
	}
];

/*
							<option value="basicLuminosity">Simple is Best</option>
							<option value="basicPaletteLuminosity">Simple Colors</option>
							<option value="paletteLuminosity" selected>Colorful</option>
							<option value="halfTone">Half Full</option>
 */