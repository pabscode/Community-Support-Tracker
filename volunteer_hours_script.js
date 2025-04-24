const form = document.getElementById("submissionForm");

loadVolunteerHistory();

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
    loadVolunteerHistory();
});

form.addEventListener("reset", () => {
    form.reset();
});

// function saveVolunteerEntry(username, email, charity, hoursWorked, dateWorked, rating){
//     if(localStorage.getItem("volunteerEntries") === null)
//     {
//         localStorage.setItem("volunteerEntries", `{"volunteerEntries":
//             [{"username":"${username}","email":"${email}",
//             "charity":"${charity}","hoursWorked":"${hoursWorked}",
//             "dateWorked":"${dateWorked}","rating":"${rating}"}]}`);
//     }
//     else{
//         let jsonString = localStorage.getItem("volunteerEntries");
//         let jsonObject = JSON.parse(jsonString);
//         let newJsonEntry = JSON.parse(`{"username":"${username}","email":"${email}",
//                                       "charity":"${charity}","hoursWorked":"${hoursWorked}",
//                                       "dateWorked":"${dateWorked}","rating":"${rating}"}`);

//         jsonObject.volunteerEntries.push(newJsonEntry);
//         console.log(jsonObject.volunteerEntries);
//         localStorage.setItem("volunteerEntries", JSON.stringify(jsonObject));
//     }
// }

function saveVolunteerEntry(username, email, charity, hoursWorked, dateWorked, rating){
    if(localStorage.getItem("volunteerEntries") === null)
    {
        localStorage.setItem("volunteerEntries", `{"volunteerEntries":
            [{"charity":"${charity}","hoursWorked":"${hoursWorked}",
            "dateWorked":"${dateWorked}","rating":"${rating}"}]}`);
    }
    else{
        let jsonString = localStorage.getItem("volunteerEntries");
        let jsonObject = JSON.parse(jsonString);
        let newJsonEntry = JSON.parse(`{"charity":"${charity}","hoursWorked":"${hoursWorked}",
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

    const table = document.getElementById("history-logs");
    table.innerHTML = "";

    for(let i = 0; i < volunteerHistory.length; i++){
        const tableEntry = document.createElement("tr");
        
        for(const key in volunteerHistory[i]){
            const value = volunteerHistory[i][key];
            const charityItem = document.createElement("td");
            charityItem.innerText = value;
            
            tableEntry.appendChild(charityItem);
        }

        const deleteButton = document.createElement("button")
        deleteButton.innerText = "Delete"
        tableEntry.appendChild(deleteButton);

        deleteButton.addEventListener("click", () =>{
            tableEntry.remove();
        })

        table.appendChild(tableEntry)
    }
}
