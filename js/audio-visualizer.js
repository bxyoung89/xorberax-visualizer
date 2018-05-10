const elementId = 'audio-visualization';

const numberOfFrequencies = 1024;
const spacing = 3;

class AudioVisualizer {
	constructor(){
		this.element = document.getElementById(elementId);
		this.totalWidth = this.element.clientWidth;
		this.totalHeight = this.element.clientHeight;
		this.svg = d3.select(`#${elementId}`).append('svg').attr('width', this.totalWidth).attr('height', this.totalHeight);
		this.barWidth = (this.totalWidth / numberOfFrequencies);
		this.heightScale = d3.scaleLinear().domain([0,255]).range([0, this.totalHeight]);
	}

	animate(frequencyData){
		this.svg.selectAll('rect')
			.data(frequencyData)
			.enter()
			.append('rect')
			.attr('x', (d, i) => {
				return i * this.barWidth;
			})
			.attr('y', (d, i) => {
				return this.totalHeight  - this.heightScale(d);
			})
			.attr('width', this.barWidth)
			.attr('height', (d, i) => {
				return this.heightScale(d);
			});

		this.svg.selectAll('rect')
			.data(frequencyData)
			.transition()
			.attr('y', (d, i) => {
				return this.totalHeight  - this.heightScale(d);
			})
			.attr('height', (d, i) => {
				return this.heightScale(d);
			});
	}
}


export default new AudioVisualizer();