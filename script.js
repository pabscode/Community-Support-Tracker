const form = document.getElementById("submissionForm");

/* 
Submit button event listener that prevents default submission, clears previous
error messages and verifies that the form is valid prior to submission.
*/ 
form.addEventListener("submit", (event) => {
    event.preventDefault();

    const errorMessages = document.querySelectorAll(".error-message");
    for (const el of errorMessages) {
        el.remove();
    }

    if (validateForm()) {
        form.submit();
    } else {
        console.error("Form has errors");
    }
});
