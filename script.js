document.addEventListener("DOMContentLoaded", function () {
    createSmoothScroller();
    const form = document.getElementById("registrationForm");
    
    // Use the direct Google Apps Script URL from the form's action attribute
    const scriptURL = form.getAttribute("action");
    
    // Replace the form submission code with this
form.addEventListener("submit", function (event) {
    event.preventDefault();
    
    // Client-side validation
    const formFields = Array.from(form.elements);
    let isValid = true;
    
    formFields.forEach(field => {
        if (field.hasAttribute('required') && !field.value.trim()) {
            isValid = false;
            field.classList.add('error');
            // Add error message
            const errorMsg = field.parentNode.querySelector('.error-message') || document.createElement('div');
            errorMsg.className = 'error-message';
            errorMsg.textContent = `${field.previousElementSibling.textContent.replace(':', '')} is required`;
            if (!field.parentNode.querySelector('.error-message')) {
                field.parentNode.appendChild(errorMsg);
            }
        } else {
            field.classList.remove('error');
            const errorMsg = field.parentNode.querySelector('.error-message');
            if (errorMsg) errorMsg.remove();
        }
    });
    
    if (!isValid) return;
    
    let formData = new FormData(form);
    
    // Display loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerText;
    submitButton.innerHTML = '<span class="spinner"></span> Submitting...';
    submitButton.disabled = true;
    
    // Show feedback to user
    const feedback = document.createElement('div');
    feedback.className = 'form-feedback';
    form.appendChild(feedback);
    
    fetch(scriptURL, {
        method: "POST",
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response;
    })
    .then(() => {
        feedback.className = 'form-feedback success';
        feedback.textContent = "✅ Registration submitted successfully!";
        form.reset();
        
        // Auto-remove success message after 5 seconds
        setTimeout(() => {
            feedback.remove();
        }, 5000);
    })
    .catch(error => {
        console.error("❌ Error!", error);
        feedback.className = 'form-feedback error';
        feedback.textContent = "⚠️ Failed to submit. Please try again.";
    })
    .finally(() => {
        // Reset button state
        submitButton.innerHTML = originalButtonText;
        submitButton.disabled = false;
    });
});
    
    // Rest of your existing script.js code
    
    // Back to Top Button Logic
    window.onscroll = function () {
        const backToTopButton = document.getElementById("backToTop");
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            backToTopButton.style.display = "block";
        } else {
            backToTopButton.style.display = "none";
        }
    };
});

// Preserve all your other functions
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

// Auto-Sliding Testimonials
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

// Admissions Countdown Timer
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
const address = "Sanche Darbar Sabji Mandi, V5GC+97 Lalganj, Bihar";
document.addEventListener("DOMContentLoaded", function () {
    const getDirectionsButton = document.querySelector('.get-directions-button');
    if (getDirectionsButton) {
        getDirectionsButton.href = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
    }
});

// Add to your script.js file
function createSmoothScroller() {
    const marquee = document.querySelector('.announcement-ticker');
    if (!marquee) return;
    
    const content = marquee.textContent;
    marquee.textContent = '';
    
    const scrollingText = document.createElement('div');
    scrollingText.className = 'scrolling-text';
    scrollingText.textContent = content + ' ' + content; // Duplicate content for continuous scroll
    
    marquee.appendChild(scrollingText);
    
    // Animation using requestAnimationFrame for better performance
    let position = 0;
    function animate() {
        position -= 0.5; // Adjust speed here
        if (position <= -scrollingText.offsetWidth / 2) {
            position = 0;
        }
        scrollingText.style.transform = `translateX(${position}px)`;
        requestAnimationFrame(animate);
    }
    
    // Start animation
    animate();
}

// Lazy Loading for Images
function setupLazyLoading() {
    // Check if browser supports IntersectionObserver
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });
        
        // Target all images with data-src attribute
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        document.querySelectorAll('img[data-src]').forEach(img => {
            img.src = img.getAttribute('data-src');
        });
    }
}

// Scroll Animation with IntersectionObserver
function setupScrollAnimations() {
    const sections = document.querySelectorAll('.section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        section.classList.add('section-hidden');
        sectionObserver.observe(section);
    });
}