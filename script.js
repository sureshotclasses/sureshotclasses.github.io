document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registrationForm");

    // 🔹 Load `config.json` to get Web App URL & Google Sheet ID
    fetch("./config.json")
        .then(response => response.json())
        .then(config => {
            const scriptURL = config.GOOGLE_APPS_SCRIPT_WEB_APP_URL;
            const sheetId = config.GOOGLE_SHEET_ID;

            form.addEventListener("submit", function (event) {
                event.preventDefault();

                // 🔹 Validate required fields
                const requiredFields = ["name", "father_name", "mother_name", "address", "study", "mobile"];
                let valid = true;

                requiredFields.forEach(field => {
                    const input = document.getElementById(field);
                    if (!input.value.trim()) {
                        valid = false;
                        input.style.border = "2px solid red"; // Highlight missing fields
                    } else {
                        input.style.border = ""; // Remove highlight if field is filled
                    }
                });

                if (!valid) {
                    alert("⚠️ Please fill in all required fields before submitting.");
                    return;
                }

                let formData = new FormData(form);
                let jsonData = { sheetId: sheetId }; // Include Google Sheet ID in request

                formData.forEach((value, key) => {
                    jsonData[key] = value;
                });

                // 🔹 Send form data to Google Apps Script
                fetch(scriptURL, {
                    method: "POST",
                    mode: "cors",
                    body: JSON.stringify(jsonData),
                    headers: { "Content-Type": "application/json" }
                })
                .then(response => response.json())
                .then(data => {
                    if (data.result === "Success") {
                        alert("✅ Registration submitted successfully!");
                        form.reset();
                    } else {
                        throw new Error(data.message);
                    }
                })
                .catch(error => {
                    console.error("❌ Error!", error);
                    alert("⚠️ Failed to submit. Please try again.");
                });
            });
        })
        .catch(error => console.error("❌ Failed to load config", error));
});
