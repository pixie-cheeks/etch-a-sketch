function gridDimensions(squaresPerSide) {
	for (i = 0; i < squaresPerSide; i++) {
		const columnWrapper = document.createElement('div');
		columnWrapper.classList = 'column-wrapper';
		for (j = 0; j < squaresPerSide; j++) {
			const square = document.createElement('div');
			square.classList = 'square';
			columnWrapper.append(square);
		}
		container.append(columnWrapper);
	}
}

function setEventListeners() {
	const columnWrappers = document.querySelectorAll('.column-wrapper');
	columnWrappers.forEach(squareDiv => {
		squareDiv.addEventListener('mouseover', hoverEffect);
	});
}

function removeGrid() {
	const columns = document.querySelectorAll('.column-wrapper');
	columns.forEach(element => element.remove());
}

function changeGrid(squaresPerSide) {
	removeGrid();
	gridDimensions(squaresPerSide);
	setEventListeners();
}

function randomNumber() {
	return Math.floor(Math.random() * 256);
}

function hoverEffect(event) {
	let rgbValue = `rgb(${randomNumber()}, ${randomNumber()}, ${randomNumber()})`;
	event.target.style.backgroundColor = rgbValue;
}

function manageSlider(event) {
	sliderText.value = event.target.value;
	let argument = parseInt(event.target.value);
	if (validationText.textContent === '') {
		changeGrid(argument);
	}
}

function inputValidation(event) {
	if (isNaN(+event.target.value)) {
		validationText.textContent = 'Only numbers are allowed.';
	} else if (+event.target.value < 1) {
		slider.value = event.target.value = 1;
		changeGrid(1);
		event.target.blur();
	} else if (+event.target.value > 100) {
		slider.value = event.target.value = 100;
		changeGrid(100);
		event.target.blur();
	} else {
		validationText.textContent = '';
	}
}

const container = document.createElement('div');
container.classList = 'container';
gridDimensions(16);
document.body.append(container);
setEventListeners();

const slider = document.querySelector('input[type="range"]');
const sliderText = document.querySelector('.text-input');
const validationText = document.querySelector('.input-validation');


slider.addEventListener('input', manageSlider);
sliderText.addEventListener('input', inputValidation);
sliderText.addEventListener('blur', event => {
	if (validationText.textContent === '') {
		slider.value = event.target.value;
		changeGrid(slider.value);
	}
});
sliderText.addEventListener('keydown', event => {
	if (event.key === 'Enter' && validationText.textContent === '') {
		slider.value = event.target.value;
		changeGrid(slider.value);
		sliderText.blur();
	}
})