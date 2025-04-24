const form = document.getElementById("submissionForm");

document.getElementById("submissionForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const userName = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const charityName= document.getElementById("charity-name").value.trim();
    const experienceRating = document.querySelector('input[name="options"]:checked').value;
    const volunteerHours = document.getElementById("hours-quantity").value;
    const volunteerDate = document.getElementById("specificDate").value;

    if (!userName || !isNaN(userName) || !email || !charityName || !experienceRating 
        || experienceRating === null || isNaN(volunteerHours) || !volunteerDate ) {
        alert("Please fill out all required fields correctly. Volunteer Hours amount must be a positive number.");
        return;
    }
    saveVolunteerEntry(userName, email, charityName, volunteerHours,
                       volunteerDate, experienceRating);
});

form.addEventListener("reset", () => {
    form.reset();
});

function saveVolunteerEntry(username, email, charity, hoursWorked, dateWorked, rating){
    if(localStorage.getItem("volunteerEntries") === null)
    {
        localStorage.setItem("volunteerEntries", `{"volunteerEntries":
            [{"username":"${username}","email":"${email}",
            "charity":"${charity}","hoursWorked":"${hoursWorked}",
            "dateWorked":"${dateWorked}","rating":"${rating}"}]}`);
    }
    else{
        let jsonString = localStorage.getItem("volunteerEntries");
        let jsonObject = JSON.parse(jsonString);
        let newJsonEntry = JSON.parse(`{"username":"${username}","email":"${email}",
                                      "charity":"${charity}","hoursWorked":"${hoursWorked}",
                                      "dateWorked":"${dateWorked}","rating":"${rating}"}`);

        jsonObject.volunteerEntries.push(newJsonEntry);
        console.log(jsonObject.volunteerEntries);
        localStorage.setItem("volunteerEntries", JSON.stringify(jsonObject));
    }
}

function loadVolunteerHistory(){
    let volunteerEntryObject = localStorage.getItem("volunteerEntries");

    if(volunteerEntryObject === null)
        return;

    let volunteerHistory = JSON.parse(volunteerEntryObject).volunteerEntries;
}
