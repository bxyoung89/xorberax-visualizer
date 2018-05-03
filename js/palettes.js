const black2RedScale = d3.scaleLinear().domain([0, 1]).range(['#000', '#f00']);

export default {
	black2Red: (luminosity) => {
		return black2RedScale(luminosity);
	}
};