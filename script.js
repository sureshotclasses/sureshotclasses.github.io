document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registrationForm");

    fetch("./config.json")
        .then(response => response.json())
        .then(config => {
            const scriptURL = config.GOOGLE_APPS_SCRIPT_WEB_APP_URL;

            form.addEventListener("submit", function (event) {
                event.preventDefault();

                let formData = new FormData(form);
                let jsonData = {}; 

                formData.forEach((value, key) => {
                    jsonData[key] = value;
                });

                fetch(scriptURL, {
                    method: "POST",
                    mode: "cors",
                    body: JSON.stringify(jsonData),
                    headers: { 
                        "Content-Type": "application/json"
                    }
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
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
