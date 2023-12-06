function handleTabKey(event) {
    if (event.key === 'Tab') {
        event.preventDefault(); // Preventing the defaults behaviour of tab
        const elements = document.querySelectorAll('[tabindex]'); // Selects all the elements with the tabIndex attribute
        const thisIndex = Array.from(elements).indexOf(document.activeElement); // Converts the elements into an array and getting index of current element
        const nextIndex = (thisIndex + 1) % elements.length; // Used to go to next element and if its the last element, it goes back to the first
        elements[nextIndex].focus();
    }
}
document.addEventListener('keydown', handleTabKey);

function editRow(itemId, itemName, itemAmount) {
    const form = document.getElementById("popupForm");
    const overlay = document.getElementById("overlay");
    const closeFormButton = document.getElementById("closeForm");
    const editItemIdField = document.getElementById("editItemId");
    const incomeNameField = document.getElementById("IncomeName");
    const incomeAmountField = document.getElementById("IncomeAmount");

    // Set values of of fields in the edit form based on the values we are trying to edit
    editItemIdField.value = itemId;
    incomeNameField.value = itemName;
    incomeAmountField.value = itemAmount;

    // Displaying the form, overlay
    form.style.display = "block";
    overlay.style.display = "block";

    // If close button is clicked, the form, overlay should disappear
    closeFormButton.addEventListener("click", function () {
        form.style.display = "none";
        overlay.style.display = "none";
    });
}

function editRow2(itemId, itemName, itemAmount) {
    const form = document.getElementById("popupForm");
    const overlay = document.getElementById("overlay");
    const closeFormButton = document.getElementById("closeForm");
    const editItemIdField = document.getElementById("editItemId");
    const expenseNameField = document.getElementById("ExpenseName");
    const expenseAmountField = document.getElementById("ExpenseAmount");

    // Set values of of fields in the edit form based on the values we are trying to edit
    editItemIdField.value = itemId;
    expenseNameField.value = itemName;
    expenseAmountField.value = itemAmount;

    // Displaying the form, overlay
    form.style.display = "block";
    overlay.style.display = "block";

    // If close button is clicked, the form, overlay should disappear
    closeFormButton.addEventListener("click", function () {
        form.style.display = "none";
        overlay.style.display = "none";
    });
}

let outer = document.querySelector(".outer");
let number1 = document.querySelector(".number1");
let goalAmount = parseFloat(document.querySelector(".progress").getAttribute("data-goal-amount"));
let profitAmount = parseFloat(document.querySelector(".progress").getAttribute("data-profit"));
let number1StartValue = 0;
let speed = 2;
let realEnd;
// if both the profit and goal is 0 then there should be no progress
if (profitAmount<=0 || goalAmount==0){
    realEnd = 0;
}else{
    realEnd = parseInt((profitAmount/goalAmount)*100); // should calculate what percentage should be the progress
}

// Profit displayed should be to 2 decimal places and in pounds
number1.textContent = `£${profitAmount.toFixed(2)}`
let progress = setInterval(() => {

    // Progress start set
    outer.style.background = `conic-gradient(rgb(122, 73, 73) ${number1StartValue * 3.6}deg, white 0deg)`

    // progress should come to a stop at a point where the incrementing start value becomes the current end value
    if (number1StartValue==realEnd){
        clearInterval(progress)
    }
    number1StartValue++;
}, speed);

function validateForm1() {
    var name = document.getElementById("ExpenseName").value;
    var amount = document.getElementById("ExpenseAmount").value;
    // Checking if the length of the value is within the limits, validation
    if (name.length < 2 || name.length > 20) {
        alert("Expense name must be between 2 and 20 characters.");
        return false;
    }
    // Checking whether the amount entered is a number and that it is a positive number
    if (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
        alert("Expense amount must be a positive number.");
        return false;
    }
    alert("Expense added!");
    return true; 
}

function validateForm() {

    var name = document.getElementById("incomeName").value;
    var amount = document.getElementById("incomeAmount").value;
    // Checking if the length of the value is within the limits, validation
    if (name.length < 2 || name.length > 20) {
        alert("Income name must be between 2 and 20 characters.");
        return false;
    }
    // Checking whether the amount entered is a number and that it is a positive number
    if (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
        alert("Expense amount must be a positive number.");
        return false;
    }
    alert("Income added!");
    return true; 
}

function validateForm3() {

    var name = document.getElementById("GoalName").value;
    var amount = document.getElementById("goalAmount").value;
    // Checking if the length of the value is within the limits, validation
    if (name.length < 2 || name.length > 20) {
        alert("Goal name must be between 2 and 20 characters.");
        return false;
    }
    // Checking whether the amount entered is a number and that it is a positive number
    if (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
        alert("Goal amount must be a positive number.");
        return false;
    }
    alert("Goal Updated!");
    return true; 
}



function orders(){
    const form3 = document.getElementById("popupForm3");
    const overlay3 = document.getElementById("overlay3");
    const closeFormButton = document.getElementById("closeForm");
  
    // Displaying the form, overlay
    overlay3.style.display = "block";
    form3.style.display = "block";
    
  
    // If close button is clicked, the form, overlay should disappear
    closeFormButton.addEventListener("click", function () {
        form3.style.display = "none";
        overlay3.style.display = "none";
    });
  }