document.addEventListener("DOMContentLoaded", () => {
    const state = window.AppState.loadState();
    const nameEl = document.getElementById("profile-name");
    const phoneEl = document.getElementById("profile-phone");

    if (state.user) {
        nameEl.textContent = state.user.name;
        phoneEl.textContent = state.user.phone;
    }

    document.getElementById("profile-close").addEventListener("click", () => {
        window.parent.postMessage({ type: "close-profile" }, "*");
    });

    document.getElementById("profile-logout").addEventListener("click", () => {
        window.parent.postMessage({ type: "logout-profile" }, "*");
    });
});
