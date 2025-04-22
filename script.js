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