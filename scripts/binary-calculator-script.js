class BinaryCalculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        this.currentOperand =
            this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation;
        const prev = parseInt(this.previousOperand, 2);
        const current = parseInt(this.currentOperand, 2);

        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '÷':
                computation = prev / current;
                break;
            case '×':
                computation = prev * current;
                break;
            default:
                return;
        }
        this.currentOperand = computation.toString(2);
        this.operation = undefined;
        this.previousOperand = '';
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText =
            this.currentOperand.toString(2);
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.previousOperand.toString(
                2
            )} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = '';
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const equalsButton = document.querySelector('[data-equals]');
const previousOperandTextElement = document.querySelector(
    '[data-previous-operand]'
);
const currentOperandTextElement = document.querySelector(
    '[data-current-operand]'
);

const binaryCalculator = new BinaryCalculator(
    previousOperandTextElement,
    currentOperandTextElement
);

numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        binaryCalculator.appendNumber(button.innerText);
        binaryCalculator.updateDisplay();
    });
});

operationButtons.forEach((button) => {
    button.addEventListener('click', () => {
        binaryCalculator.chooseOperation(button.innerText);
        binaryCalculator.updateDisplay();
    });
});

allClearButton.addEventListener('click', (button) => {
    binaryCalculator.clear();
    binaryCalculator.updateDisplay();
});

deleteButton.addEventListener('click', (button) => {
    binaryCalculator.delete();
    binaryCalculator.updateDisplay();
});

equalsButton.addEventListener('click', (button) => {
    binaryCalculator.compute();
    binaryCalculator.updateDisplay();
});
