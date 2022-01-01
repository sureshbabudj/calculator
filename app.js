
let secondInputEntered = false;
let first = null;
let result = null;
let operation = null;
const root = document.querySelector('.calc');

const display = document.createElement('div');
display.classList.add('display');
root.appendChild(display);

const inputWrap = document.createElement('div');
inputWrap.classList.add('input-wrap');
root.appendChild(inputWrap);

const numberWrap = document.createElement('div');
numberWrap.classList.add('number-wrap');
inputWrap.appendChild(numberWrap);

const opsWrap = document.createElement('div');
opsWrap.classList.add('ops-wrap');
inputWrap.appendChild(opsWrap);

const options = ['AC', '+/-', '%'];
for (let i of options) {
	const optElm = document.createElement('div');
	optElm.classList.add('number');
	optElm.classList.add('option');
	optElm.addEventListener('click', numberClick);
	optElm.innerText = i;
	numberWrap.appendChild(optElm);
}

for (let i = 1; i < 10; i++) {
	const numberElm = document.createElement('div');
	numberElm.classList.add('number');
	numberElm.classList.add('input');
	numberElm.addEventListener('click', numberClick);
	numberElm.innerText = i;
	numberWrap.appendChild(numberElm);
}

const misc = ['.', 0, '00'];
for (let i of misc) {
	const numberElm = document.createElement('div');
	numberElm.classList.add('number');
	numberElm.classList.add('misc');
	numberElm.addEventListener('click', numberClick);
	numberElm.innerText = i;
	numberWrap.appendChild(numberElm);
}

const ops = ['+', '-', 'X', '/', '='];
for (let i of ops) {
	const opsElm = document.createElement('div');
	opsElm.classList.add('ops');
	if (i === '=') {
		opsElm.classList.add('result');
	}
	opsElm.addEventListener('click', numberClick);
	opsElm.innerText = i;
	opsWrap.appendChild(opsElm);
}

function numberClick(e) {
	if (e.target.classList.contains('input')) {
		handleInput(e)
	}
	if (e.target.classList.contains('misc')) {
		handleMisc(e);
	}
	if (e.target.classList.contains('option')) {
		handleOption(e);
	}
	if (e.target.classList.contains('ops') && !e.target.classList.contains('result')) {
		handleOperation(e);
	}
	if (e.target.classList.contains('result')) {
		handleResult();
	}
}

function handleNumberParsing(input) {
	if (input.includes('.')) {
		return parseFloat(input);
	} else {
		return parseInt(input);
	}
}

function handleInput(e) {
	if (result) {
		reset();
	}
	if (handleNumberParsing(display.innerText) === 0) {
		display.innerText = '';
	}
	if (operation && !secondInputEntered) {
		display.innerText = e.target.innerText;
		secondInputEntered = true;
	} else {
		display.innerText += e.target.innerText;
	}
}

function handleMisc(e) {
	switch (e.target.innerText) {
		case '.': 
			handleDecimal(e);
			break;
		case '0': 
			if (handleNumberParsing(display.innerText) === 0) {
				return;
			}
			handleInput(e);
			break;
		case '00': 
			if (handleNumberParsing(display.innerText) === 0) {
				return;
			}
			handleZeros(e);
			break;
	}
}

function handleOption(e) {
	switch (e.target.innerText) {
		case 'AC': 
			reset();
			break;
		case '+/-': 
			toggleNegative();
			break;
		case '%': 
			percentage();
			break;
	}
}

function handleOperation(e) {
	if (operation && !secondInputEntered) {
		operation = null;
	}
	if (operation && first) {
		handleResult();
	}
	operation = e.target.innerText;
	first = handleNumberParsing(display.innerText);
	result = null;
}

function handleResult() {
	doResult();
	display.classList.add('hide');
	setTimeout(() => {
		display.classList.remove('hide');
		display.innerText = result;
	}, 150);
	
}

function doOpration() {
	switch (operation) {
		case '+': 
			add();
			break;
		case '-': 
			subtract();
			break;
		case 'X': 
			multiply();
			break;
		case '/': 
			divide();
			break;
	}
}

function handleDecimal(e) {
	if (!display.innerText || !!first || first === 0) {
		display.innerText = '0.';
		secondInputEntered = true;
	} else if (display.innerText.includes('.')) {
		return;
	} else {
		handleInput(e);
	}
}

function handleZeros(e) {
	if (!display.innerText) {
		return;
	} else {
		handleInput(e)
	}
}

function reset() {
	first, second = null;
	result = null;
	operation = null;
	display.innerText = '';
	secondInputEntered = false;
}

function toggleNegative() {
	display.innerText = handleNumberParsing(display.innerText) * -1;
}

function percentage() {
	display.innerText = handleNumberParsing(display.innerText) / 100;
}

function add() {
	result = first + handleNumberParsing(display.innerText);
}

function subtract() {
	result = first - handleNumberParsing(display.innerText);
}

function multiply() {
	result = first * handleNumberParsing(display.innerText);
}

function divide() {
	result = first / handleNumberParsing(display.innerText);
}

function doResult() {
	doOpration();
	operation = null;
	secondInputEntered = false;
}