// Event Listener for the donationForm

document.getElementById("donationForm").addEventListener("submit", (event) => {
    event.preventDefault();

    // Validate if the Charity Name is not blank
    const charityName = document.getElementById("charityName").value.trim();
    
    //Ensure the Donation Amount is a number
    const donationAmount = parseFloat(document.getElementById("donationAmount").value);
    const donationDate = document.getElementById("donationDate").value;
    const donorMessage = document.getElementById("donorMessage").value.trim();


    if (!charityName || isNaN(donationAmount) || donationAmount <= 0 || !donationDate) {
        alert("Please fill out all required fields correctly. Donation amount must be a positive number.");
        return;
    }

    const donationData = {
        charityName: charityName,
        //formats the string into two decimal places
        donationAmount: donationAmount.toFixed(2),
        donationDate: donationDate,
        donorMessage: donorMessage
    }

    document.getElementById("confirmationMessage").innerText = "Donation Sent!";

    console.log("Donation Data", donationData)
});

const form = document.getElementById("submissionForm");
/* 
Submit button event listener that prevents default submission, clears previous
error messages and verifies that the form is valid prior to submission.
*/ 
document.getElementById("submissionForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const errorMessages = document.querySelectorAll(".error-message");
    for (const el of errorMessages) {
        el.remove();
    }

    if (validateForm()) {
        storeData();
        //console.log(charitySubmission)
    } else {
        console.error("Form has errors");
    }
});

// different input checking for the form
function validateForm() {
    let isFormValid = true;

// Checks that the first name is not empty or numbers
    const userName = document.getElementById("name");

    if (userName.value === "") {
        showInputError(userName, "Please enter a first name. ");
        isFormValid = false;
    }

    else if (!isNaN(userName.value)) {
        showInputError(userName, "Please use letters. ");
        isFormValid = false;
    }
// Validates the email entered

    const emailInputElement = document.getElementById("email");
    const emailInputValue = emailInputElement.value;

    const emailPattern = /.+@.+\..+/;

    if (emailInputElement.value === "") {
        showInputError(emailInputElement, "Please enter an email address. ");
        isFormValid = false;
    }

    else if (!emailPattern.test(emailInputValue)) {
        showInputError(emailInputElement, "Please enter a valid email address.");
        isFormValid = false;
    }

// Checks that the first name is not empty or numbers
const charityName = document.getElementById("charity-name");

if (charityName.value === "") {
    showInputError(charityName, "Please enter a Charity name. ");
    isFormValid = false;
}

else if (!isNaN(charityName.value)) {
    showInputError(charityName, "Please use letters. ");
    isFormValid = false;
}

// Validates Radio Buttons
    const radioSelected = document.getElementById("option1"); 
    const radioSelected2 = document.getElementById("option2");
    const radioSelected3 = document.getElementById("option3");
    const radioSelected4 = document.getElementById("option4");
    const radioSelected5 = document.getElementById("option5");

    if (!radioSelected.checked && !radioSelected2.checked && !radioSelected3.checked 
        && !radioSelected4.checked && !radioSelected5.checked) {
        showInputError(radioSelected,"Please select an option.");
        isFormValid = false;
    }

// Checks that the quantity is not empty or letters

    const amountNumber = document.getElementById("hours-quantity");

    if (amountNumber.value === "") {
        showInputError(amountNumber, "Please enter an number. ");
        isFormValid = false;
    }

    return isFormValid;
}

// Appends the error messages
function showInputError(inputElement, message) {
    const container = inputElement.closest(".input-container");
    const errorDisplay = document.createElement("span");
    errorDisplay.innerText = message;
    errorDisplay.className = "error-message";
    errorDisplay.setAttribute("role", "alert");

    container.appendChild(errorDisplay);
}

form.addEventListener("reset", (event) => {

    const errorMessages = document.querySelectorAll(".error-message");
    for (const el of errorMessages) {
        el.remove();
    }

    form.reset();

});

function storeData() {
    let userName = document.getElementById("name").value
    let email = document.getElementById("email").value
    let charityName= document.getElementById("charity-name").value
    let experienceRating = document.querySelector('input[name="options"]:checked').value;
    let volunteerHours = document.getElementById("hours-quantity").value
    let volunteerDate = document.getElementById("specificDate").value

    const charitySubmission = { "userName": `${userName}`, "userEmail": `${email}`,
         "charityName": `${charityName}`, "rating": `${experienceRating}`,
          "volunteerHours": `${volunteerHours}`, "volunteerDate": `${volunteerDate}`}
    
    console.log(charitySubmission)

    // localStorage.setItem("charitysubmission", JSON.stringify(charitySubmission));
}
