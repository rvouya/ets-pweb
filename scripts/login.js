document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("login-form");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const nameInput = document.getElementById("name");
        const phoneInput = document.getElementById("phone");

        const name = nameInput.value.trim() || "Pengguna MABARYUK";
        const phone = phoneInput.value.trim();

        if (!phone) {
            phoneInput.focus();
            alert("Nomor HP wajib diisi.");
            return;
        }

        window.AppState.setUser({
            name,
            phone: `+62 ${phone.replace(/^\+?62\s*/, "")}`
        });

        const params = new URLSearchParams(window.location.search);
        const redirect = params.get("redirect") || "landing_page.html";
        window.location.href = redirect;
    });
});
