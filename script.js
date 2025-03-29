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

// 🔹 Add "Back to Top" Button Logic at the END of script.js
window.onscroll = function () {
    const backToTopButton = document.getElementById("backToTop");
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
};

// 🔹 Smooth Scroll to Top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function toggleCourse(id) {
    const details = document.getElementById(id);
    if (details) {
      details.style.display = details.style.display === "block" ? "none" : "block";
    }
}

// 🔹 Auto-Sliding Testimonials
document.addEventListener("DOMContentLoaded", function () {
    let index = 0;
    const testimonials = document.querySelectorAll(".testimonial");
    
    function showTestimonial() {
        testimonials.forEach((t, i) => {
            t.style.transform = `translateX(-${index * 100}%)`;
        });
        index = (index + 1) % testimonials.length;
    }

    setInterval(showTestimonial, 3000); // Change every 3 seconds
});

// 🔹 Admissions Countdown Timer
document.addEventListener("DOMContentLoaded", function () {
    const targetDate = new Date("April 15, 2025 23:59:59").getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = targetDate - now;

        if (timeLeft > 0) {
            document.getElementById("days").innerText = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            document.getElementById("hours").innerText = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            document.getElementById("minutes").innerText = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            document.getElementById("seconds").innerText = Math.floor((timeLeft % (1000 * 60)) / 1000);
        } else {
            document.getElementById("countdown").innerHTML = "<h2>🎉 Admissions Now Closed!</h2>";
        }
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();
});

// Location Address
const address = "Sanche Darbar Sabji Mandi, V5GC+97 Lalganj, Bihar"; // Replace with your destination

const getDirectionsButton = document.querySelector('.get-directions-button');
getDirectionsButton.href = `https://www.google.com/maps/dir/?api=1&destination=${address}`;
