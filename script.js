const answerScreen = document.querySelector(".answer-screen");
let placeHolder = "0";
let totalAmount = 0;
let previousMathSymbol;

//determines if either a number button or a symbol button is being clicked
function buttonClick (value) {
    if (isNaN(parseInt(value))) {
        symbolStorage(value);
    } else {
        numberStorage(value);
    }
    renderScreenText();
};

//the numbers displayed on thr screen
function numberStorage (number) {
    if (placeHolder === "0") {
        placeHolder = number;
    } else {
        placeHolder += number;
    }
};

// converting the placeholder string into a number. Otherwise the math won't work
function mathMachine(value) {
    if (placeHolder === "0") {
        return;
    }

    const integerNumber = parseInt(placeHolder);

    if (totalAmount === 0) {
        totalAmount = integerNumber;
    } else {
        renderMath(integerNumber);
    }

    previousMathSymbol = value;
    placeHolder = "0";
};

// initialize math
function renderMath(integerNumber) {
    if (previousMathSymbol === "+") {
        totalAmount += integerNumber;
    } else if (previousMathSymbol === "-") {
        totalAmount -= integerNumber;
    } else if (previousMathSymbol === "x") {
        totalAmount *= integerNumber;
    } else if (previousMathSymbol === "÷") {
        totalAmount /= integerNumber;
    }
}

// set up different scenarios depending on which symbol button is being clicked
function symbolStorage (symbol) {
    switch (symbol) {
        case "C":
            placeHolder = "0";
            break;
        case "←":
            backSpace();
            break;
        case "=":
            if(previousMathSymbol === null) {
                return;
            }
            renderMath(parseInt(placeHolder));
            previousMathSymbol = null;
            placeHolder = "" + totalAmount;
            totalAmount = 0;
            break;
        case "+":
        case "-":
        case "x":
        case "÷":
            mathMachine(symbol);
            break;
    }
};

// initialzing the backspace button
function backSpace () {
    if (placeHolder.length === 1) {
        placeHolder = "0";
    } else {
        placeHolder = placeHolder.substring(0, placeHolder.length - 1);
    }
}

//initializing the calculator
function initializeCalculator () {
    const calcButtons = document.querySelectorAll(".calc-button");
    calcButtons.forEach(function (button) {
        button.addEventListener("click", (e) => {
            buttonClick(e.target.innerText);
        });
    });
};

// numbers appearing on the screen
function renderScreenText () {
    answerScreen.innerText = placeHolder;
}

initializeCalculator();
