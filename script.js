document.addEventListener("DOMContentLoaded", function () {
    const passwordInput = document.getElementById("password");
    const strengthText = document.getElementById("strength");
    const progressBar = document.getElementById("progress");
    const suggestions = document.getElementById("suggestions");

    passwordInput.addEventListener("input", function () {
        const password = passwordInput.value;
        if (password.length === 0) {
            resetUI();
        } else {
            const strength = calculateStrength(password);
            updateUI(strength);
        }
    });

    function calculateStrength(password) {
        let score = 0;

        if (password.length >= 8) score++; 
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;

        return score;
    }

    function updateUI(score) {
        const levels = ["Weak", "Moderate", "Strong"];
        const colors = ["red", "orange", "green"];
        const classNames = ["weak", "moderate", "strong"];

        let level = Math.min(score, 2);  

        strengthText.textContent = `Strength: ${levels[level]}`;
        progressBar.style.width = `${(level + 1) * 40}%`;
        progressBar.className = `progress ${classNames[level]}`;
        progressBar.style.backgroundColor = colors[level];

        updateSuggestions(level);
    }

    function updateSuggestions(level) {
        const tips = [
            "Use at least 8 characters, including uppercase letters.",
            "Add numbers and special characters to strengthen.",
            "Great job! Your password is strong."
        ];
        suggestions.textContent = tips[level];
    }

    function resetUI() {
        strengthText.textContent = "Strength: ";
        progressBar.style.width = "0%";
        progressBar.className = "progress";
        progressBar.style.backgroundColor = "transparent";
        suggestions.textContent = "";
    }
});
