let bill;
let percentage;
let people;

// Get the input bill element, adds a input event listener with a function 
// to retrieve the target value
document.getElementById('input_bill').addEventListener('input', (event) => {
    bill = event.target.value;
    displayTip();
});

// Get the input percentage element, adds a input event listener with a function 
// to retrieve the target value, clears any checked radio buttons
document.getElementById('percentage').addEventListener('input', (event) => {
    percentage = event.target.value;

    const radioButtons = document.querySelectorAll('input[name="tip"]');
    Array.from(radioButtons).forEach(radio => {
        if (radio.checked) {
            radio.checked = false;
        };
    });
});

// Gets all input radio elements, adds input event listeners with a function 
// to retrieve the target value
const radioButtons = document.querySelectorAll('input[name="tip"]');

Array.from(radioButtons).forEach(button => {
    button.addEventListener('change', (event) => {
        percentage = event.target.value;
        document.getElementById('percentage').value = "";

    });
});

// Get the input people element, adds a input event listener with a function 
// to retrieve the target value, function call to validate the input people field
document.getElementById('input_people').addEventListener('input', (event) => {
    people = event.target.value;
    validatePeopleInput()
});

// Gets the button element and adds a event listener with a function that clears
// all inputs and outputs in the UI
document.getElementById('button').addEventListener('click', () => {
    document.getElementById('input_bill').value = "";
    document.getElementById('input_people').value = "";
    document.getElementById('percentage').value = "";
    const radioButtons = document.querySelectorAll('input[name="tip"]');
    Array.from(radioButtons).forEach(radio => {
        if (radio.checked) {
            radio.checked = false;
        };
    });
    const tipElement = document.getElementById('tip');
    tipElement.innerHTML = "$0.00";

    const totalElement = document.getElementById('total');
    totalElement.innerHTML = "$0.00";
})

// Displays error styling and validation-text if input is 0, if not
// calculate tip
function validatePeopleInput() {
    const peopleInput = document.getElementById('input_people');
    const validationText = document.querySelector('.validation-text');

    if (peopleInput.value > 0) {
        peopleInput.setAttribute('data-error', 'inactive');
        validationText.style.display = 'none';
        displayTip()
    } else {
        peopleInput.setAttribute('data-error', 'active');
        validationText.style.display = 'block';
    }
}

// Formats number to correct currency and fixes the value to two decimals
function formatCurrency(value) {
    const fixedValue = value.toFixed(2)
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(fixedValue);
}

// Calculates and returns the result as an object
function calculateTip() {
    const tip = bill * (percentage / 100);
    const divideTip = tip / people;

    const divideBill = bill / people;

    const divideTotalAmount = divideTip + divideBill;

    return { tipAmount: formatCurrency(divideTip), total: formatCurrency(divideTotalAmount) }
}

// Retrieves result from calculation and updates UI depending on whether 
// the result is good or bad
function displayTip() {
    const { tipAmount, total } = calculateTip();

    const tipElement = document.getElementById('tip');
    const totalElement = document.getElementById('total');

    const IsNaN = total === "$NaN";

    if (!IsNaN) {
        tipElement.innerHTML = tipAmount;
        totalElement.innerHTML = total;
    } else {
        tipElement.innerHTML = "$0.00";
        totalElement.innerHTML = "$0.00";
    }
}