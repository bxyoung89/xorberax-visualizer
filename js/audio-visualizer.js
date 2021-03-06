const elementId = 'audio-visualization';

const numberOfFrequencies = 1024;

class AudioVisualizer {
	constructor(){
		this.element = document.getElementById(elementId);
		this.updateVariables();
	}

	updateVariables() {
		this.element.innerHTML = '';
		this.totalWidth = this.element.clientWidth;
		this.totalHeight = this.element.clientHeight;
		this.svg = d3.select(`#${elementId}`).append('svg').attr('width', this.totalWidth).attr('height', this.totalHeight);
		this.barWidth = (this.totalWidth / numberOfFrequencies);
		this.heightScale = d3.scaleLinear().domain([0,255]).range([0, this.totalHeight]);
		this.rectFillColor = '#FFF';
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
			})
			.attr('fill', this.rectFillColor);

		this.svg.selectAll('rect')
			.data(frequencyData)
			.attr('y', (d, i) => {
				return this.totalHeight  - this.heightScale(d);
			})
			.attr('height', (d, i) => {
				return this.heightScale(d);
			})
			.attr('fill', this.rectFillColor);
	}

	setRectFillColor(newColor){
		this.rectFillColor = newColor;
	}
}


export default new AudioVisualizer();