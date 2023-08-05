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

function numFromRGB(string) {
	return string.replace(/\D+/g, ' ').trim().split(' ');
}

function decimalLength(numberString) {
	return numberString.replace(/\d+\.?(\d*)/, '$1').length;
}

function deciMath(num1, num2, operand) {
	let numOne = num1.toString();
	let numTwo = num2.toString();

	let precision = 1;
	if (decimalLength(numOne) > decimalLength(numTwo)) {
		precision += decimalLength(numOne); 
	} else {
		precision += decimalLength(numTwo);
	}

	switch (operand) {
		case '+':
			return (numOne * 10 ** precision + numTwo * 10 ** precision) / 10 ** precision;
		case '-':
			console.log(precision);
			return (numOne * 10 ** precision - numTwo * 10 ** precision) / 10 ** precision;
		case '*':
			return (numOne * 10 ** precision * numTwo * 10 ** precision) / 10 ** precision;
		case '/':
			return (numOne * 10 ** precision / numTwo * 10 ** precision) / 10 ** precision;
		default: 
			return 'error from decMath';
	}
}

function hoverEffect(event) {
	const squareDiv = event.target;
	if (!squareDiv.classList.contains('activated')) {
		let rgbValue = `rgb(${randomNumber()}, ${randomNumber()}, ${randomNumber()})`;
		squareDiv.style.backgroundColor = rgbValue;
		squareDiv.classList.add('activated');
		squareDiv.id = numFromRGB(rgbValue).map(element => element / 10).join('-');
	} else {
		let subtractArray = squareDiv.id.split('-');
		let rgbArray = numFromRGB(squareDiv.style.backgroundColor);
		let newRGB = `rgb(${deciMath(rgbArray[0], subtractArray[0], '-')},` +
			` ${deciMath(rgbArray[1], subtractArray[1], '-')},` +
			` ${deciMath(rgbArray[2], subtractArray[2], '-')})`;
		squareDiv.style.backgroundColor = newRGB;
		console.log(newRGB);
	}
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