document.getElementById("electricianBtn").addEventListener("click", function() {
    showLoginForm("Electrician");
});

document.getElementById("customerBtn").addEventListener("click", function() {
    showLoginForm("Customer");
});

function showLoginForm(role) {
    document.getElementById("roleTitle").innerText = role + " Login";
    document.getElementById("loginForm").style.display = "block";
    document.querySelector(".role-selection").style.display = "none";
}

