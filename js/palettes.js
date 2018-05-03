const black2RedScale = d3.scaleLinear().domain([0, 1]).range(['#000', '#f00']);
const miamiScale = d3.scaleLinear().domain([0, 1]).range(['#E13CB0', '#38B5E6']);
const rainbowScale = d3.scaleLinear().domain([0, 0.14, 0.28, 0.42, 0.56, 0.7, 0.84, 1]).range(['#9400D3', '#4B0082', '#0000ff', '#00ff00', '#ffff00', '#ff7f00', '#ff0000']);
const gameboyScale = d3.scaleLinear().domain([0, 0.33, 0.66, 1]).range(['#0f380f', '#306230', '#8bac0f', '##9bbc0f']);

export default {
	black2Red: (luminosity) => {
		return black2RedScale(luminosity);
	},
	rainbow: (luminosity) => {
		return rainbowScale(luminosity);
	},
	miami: (luminosity) => {
		return miamiScale(luminosity);
	},
	gameboy: (luminosity) => {
		return gameboyScale(luminosity);
	},
};