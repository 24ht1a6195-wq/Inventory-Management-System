const defaultUsers = [
    { username: "sandhya", password: "adminpassword", role: "admin" },
    { username: "chinnari", password: "password123", role: "staff" }
];

function getRegisteredUsers() {
    const localUsers = localStorage.getItem("registeredUsers");
    return localUsers ? JSON.parse(localUsers) : [];
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const signUpForm = document.getElementById("signUpForm");
    const showSignUpBtn = document.getElementById("showSignUp");
    const showLoginBtn = document.getElementById("showLogin");
    const loginContainer = document.querySelector(".login-container");
    const signUpContainer = document.getElementById("signUpContainer");

    if (showSignUpBtn) {
        showSignUpBtn.addEventListener("click", (e) => {
            e.preventDefault();
            loginContainer.style.display = "none";
            signUpContainer.style.display = "block";
        });
    }

    if (showLoginBtn) {
        showLoginBtn.addEventListener("click", (e) => {
            e.preventDefault();
            signUpContainer.style.display = "none";
            loginContainer.style.display = "block";
        });
    }

    if (signUpForm) {
        signUpForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const newUsername = document.getElementById("newUsername").value.trim().toLowerCase();
            const newPassword = document.getElementById("newPassword").value.trim();

            const isDefault = defaultUsers.some(u => u.username === newUsername);
            const registeredUsers = getRegisteredUsers();
            const isRegistered = registeredUsers.some(u => u.username === newUsername);

            if (isDefault || isRegistered) {
                alert("Username already exists!");
                return;
            }

            registeredUsers.push({ username: newUsername, password: newPassword, role: "staff" });
            localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));

            alert("Registration Successful! Please Login.");
            signUpContainer.style.display = "none";
            loginContainer.style.display = "block";
            signUpForm.reset();
        });
    }

    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault(); 
            const usernameInput = document.getElementById("username").value.trim().toLowerCase();
            const passwordInput = document.getElementById("password").value.trim();

            const allUsers = [...defaultUsers, ...getRegisteredUsers()];
            const foundUser = allUsers.find(u => u.username === usernameInput && u.password === passwordInput);

            if (foundUser) {
                localStorage.setItem("currentUserRole", foundUser.role);
                localStorage.setItem("currentUsername", foundUser.username);
                alert(`Welcome ${foundUser.username}!`);
                window.location.href = "index.html"; 
            } else {
                alert("Invalid Username or Password!");
            }
        });
    }
});