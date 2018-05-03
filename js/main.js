import getImage from './get-image.js';

console.log('hello!');

getImage('pimp-hank-with-money.json').then((json) => {
	const contentElement = document.getElementById('content');
	contentElement.innerHTML = json;
});