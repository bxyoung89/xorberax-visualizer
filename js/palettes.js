const black2RedScale = d3.scaleLinear().domain([0, 1]).range(['#000', '#f00']);
const rainbowScale = d3.scaleLinear().domain([0, 0.14, 0.28, 0.42, 0.56, 0.7, 0.84, 1]).range(['#9400D3', '#4B0082', '#0000ff', '#00ff00', '#ffff00', '#ff7f00', '#ff0000']);

export default {
	black2Red: (luminosity) => {
		return black2RedScale(luminosity);
	},
	rainbow: (luminosity) => {
		return rainbowScale(luminosity);
	}
};