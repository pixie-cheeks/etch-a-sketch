const container = document.createElement('div');
container.classList = 'container';

for (i = 0; i < 16; i++) {
	/* 	const square = document.createElement('div');
		square.classList = 'square';
		container.appendChild(square); */
	const rowWrapper = document.createElement('div');
	rowWrapper.classList = 'row-wrapper';
	for (j = 0; j < 16; j++) {
		const square = document.createElement('div');
		square.classList = 'square';
		rowWrapper.append(square);
	}
	container.append(rowWrapper);
}

document.body.append(container);