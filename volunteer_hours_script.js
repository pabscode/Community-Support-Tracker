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
    saveVolunteerEntry(charityName, volunteerHours,
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

function saveVolunteerEntry(charity, hoursWorked, dateWorked, rating){
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
    let volunteerEntryString = localStorage.getItem("volunteerEntries");

    const totalHoursText = document.getElementById("total-hours");

    let totalHours = 0;
    totalHoursText.innerText = 0;

    if(volunteerEntryString === null)
        return;

    let volunteerHistory = JSON.parse(volunteerEntryString).volunteerEntries;

    const table = document.getElementById("history-logs");
    
    table.innerHTML = "";

    for(let i = 0; i < volunteerHistory.length; i++){
        const tableEntry = document.createElement("tr");

        for(const key in volunteerHistory[i]){
            const value = volunteerHistory[i][key];
            const charityItem = document.createElement("td");
            charityItem.innerText = value;
            
            tableEntry.appendChild(charityItem);

            console.log(key)
            if(String(key) == "hoursWorked")
                totalHours += Number(value);
        }

        const deleteButton = document.createElement("button")
        deleteButton.innerText = "Delete"
        tableEntry.appendChild(deleteButton);

        deleteButton.addEventListener("click", () =>{
            tableEntry.remove();

            volunteerHistory.splice(i, 1);
            if(volunteerHistory.length == 0){
                localStorage.removeItem("volunteerEntries");
            }
            else{
                localStorage.setItem("volunteerEntries", `{"volunteerEntries":
                    ${JSON.stringify(volunteerHistory)}}`);
                console.log(localStorage.getItem("volunteerEntries"));
            }
            //reloading the volunteer history will ensure the indexes
            //are up to date and not deleting the wrong elements.
            loadVolunteerHistory();
        })

        table.appendChild(tableEntry)
        console.log(localStorage.getItem("volunteerEntries"));
    }
    totalHoursText.innerText = totalHours;
}
