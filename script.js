const container = document.createElement('div');
container.classList = 'container';

for (i = 0; i < 16; i++) {
	const columnWrapper = document.createElement('div');
	columnWrapper.classList = 'column-wrapper';
	for (j = 0; j < 16; j++) {
		const square = document.createElement('div');
		square.classList = 'square';
		columnWrapper.append(square);
	}
	container.append(columnWrapper);
}

document.body.append(container);

function hoverEffect(event) {
	event.target.classList.add('hover');
}

const rowWrappers = document.querySelectorAll('.column-wrapper');
rowWrappers.forEach(squareDiv => {
	squareDiv.addEventListener('mouseover', hoverEffect);
	// squareDiv.addEventListener('mouseleave', removeHoverEffect);
});