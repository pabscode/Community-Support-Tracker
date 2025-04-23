const form = document.getElementById("submissionForm");

document.getElementById("submissionForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const userName = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const emailPattern = /.+@.+\..+/;
    const charityName= document.getElementById("charity-name").value.trim();
    const experienceRating = document.querySelector('input[name="options"]:checked').value;
    const volunteerHours = document.getElementById("hours-quantity").value
    const volunteerDate = document.getElementById("specificDate").value

    if (!userName || !isNaN(userName) || !email || emailPattern.test(email) || !charityName || !experienceRating 
        || experienceRating === null || isNaN(volunteerHours) || !volunteerDate ) {
        alert("Please fill out all required fields correctly. Volunteer Hours amount must be a positive number.");
        return;
    }

    const charitySubmission = { "userName": `${userName}`, "userEmail": `${email}`,
        "charityName": `${charityName}`, "rating": `${experienceRating}`,
        "volunteerHours": `${volunteerHours}`, "volunteerDate": `${volunteerDate}`}

    console.log(charitySubmission)
});

form.addEventListener("reset", (event) => {
    form.reset();
});
