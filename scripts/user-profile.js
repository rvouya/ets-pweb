document.addEventListener("DOMContentLoaded", () => {
    const state = window.AppState.loadState();
    const nameEl = document.getElementById("user-name");
    const phoneEl = document.getElementById("user-phone");

    if (state.user) {
        nameEl.textContent = state.user.name;
        phoneEl.textContent = state.user.phone;
    }

    document.getElementById("close-profile-btn").addEventListener("click", () => {
        window.parent.postMessage({ type: "close-profile" }, "*");
    });

    document.getElementById("logout-btn").addEventListener("click", () => {
        window.parent.postMessage({ type: "logout-profile" }, "*");
    });
});
