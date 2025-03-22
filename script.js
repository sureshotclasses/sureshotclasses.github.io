document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("registrationForm");
    const scriptURL = "https://script.google.com/macros/s/AKfycbzdvQthuVEgGVuurKRHq1wsJ55JgDhSqEdd2cTCiZ7eHlboEXdOWt_z6CGRdzKbqxQdmg/exec";  // Your actual Google Apps Script URL

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        let formData = new FormData(form);
        let jsonData = {};

        formData.forEach((value, key) => {
            jsonData[key] = value;
        });

        fetch(scriptURL, {
            method: "POST",
            body: JSON.stringify(jsonData),
            headers: { "Content-Type": "application/json" }
        })
        .then(response => response.text())
        .then(data => {
            alert("✅ Registration submitted successfully!");
            form.reset();
        })
        .catch(error => {
            console.error("❌ Error!", error);
            alert("⚠️ Failed to submit. Please try again.");
        });
    });
});
