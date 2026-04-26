document.addEventListener("DOMContentLoaded", () => {
    const authButton = document.getElementById("auth-btn");
    const profileTrigger = document.getElementById("profile-trigger");
    const profileOverlay = document.getElementById("profile-overlay");
    const profileDrawer = document.getElementById("profile-drawer");
    const profileFrame = document.getElementById("profile-frame");
    const basketArea = document.getElementById("basket-area");
    const basketItemCount = document.getElementById("basket-item-count");
    const basketTotalPrice = document.getElementById("basket-total-price");

    const syncAuthUI = () => {
        const state = window.AppState.loadState();
        if (state.user) {
            authButton.classList.add("hidden");
            profileTrigger.classList.remove("hidden");
            profileTrigger.setAttribute("title", state.user.name);
        } else {
            authButton.classList.remove("hidden");
            profileTrigger.classList.add("hidden");
            closeProfileDrawer();
        }
    };

    const openProfileDrawer = () => {
        profileOverlay.classList.remove("hidden");
        profileDrawer.classList.add("is-open");
        profileFrame.setAttribute("src", "user_profile.html");
    };

    const closeProfileDrawer = () => {
        profileOverlay.classList.add("hidden");
        profileDrawer.classList.remove("is-open");
    };

    authButton.addEventListener("click", () => {
        window.location.href = "login.html?redirect=landing_page.html";
    });

    profileTrigger.addEventListener("click", openProfileDrawer);
    profileOverlay.addEventListener("click", closeProfileDrawer);

    window.addEventListener("message", (event) => {
        if (!event.data || typeof event.data !== "object") {
            return;
        }

        if (event.data.type === "close-profile") {
            closeProfileDrawer();
        }

        if (event.data.type === "logout-profile") {
            window.AppState.logout();
            syncAuthUI();
            closeProfileDrawer();
        }
    });

    const searchInput = document.getElementById("search-input");
    const searchDropdown = document.getElementById("search-dropdown");
    const searchWrapper = document.getElementById("search-wrapper");

    searchInput.addEventListener("focus", () => searchDropdown.classList.remove("hidden"));
    document.addEventListener("click", (event) => {
        if (!searchWrapper.contains(event.target)) {
            searchDropdown.classList.add("hidden");
        }
    });

    const catFilterBtns = document.querySelectorAll(".cat-filter-btn");
    const menuCards = document.querySelectorAll("#menu-cards-container .menu-card");

    catFilterBtns.forEach((button) => {
        button.addEventListener("click", () => {
            catFilterBtns.forEach((otherButton) => otherButton.classList.remove("is-active"));
            button.classList.add("is-active");

            const filter = button.getAttribute("data-filter");
            menuCards.forEach((card) => {
                const categories = card.getAttribute("data-category").split(" ");
                card.style.display = filter === "all" || categories.includes(filter) ? "block" : "none";
            });
        });
    });

    const restaurants = window.AppState.getRestaurants();
    menuCards.forEach((card, index) => {
        const restaurant = restaurants[index];
        if (!restaurant) {
            return;
        }

        card.dataset.restaurantId = restaurant.id;
        card.addEventListener("click", () => {
            window.AppState.setSelectedRestaurant(restaurant.id);
            window.location.href = `restaurant.html?restaurant=${restaurant.id}`;
        });
    });

    const faqButtons = document.querySelectorAll(".faq-button");
    faqButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const content = button.nextElementSibling;
            button.classList.toggle("is-open");
            content.classList.toggle("is-open");
        });
    });

    const syncBasket = () => {
        const summary = window.AppState.getCartSummary();

        if (summary.totalItems < 1) {
            basketArea.classList.add("hidden");
            return;
        }

        basketArea.classList.remove("hidden");
        basketItemCount.textContent = `${summary.totalItems} Item`;
        basketTotalPrice.textContent = window.AppState.formatRupiah(summary.subtotal);
    };

    basketArea.addEventListener("click", () => {
        window.location.href = "checkout.html";
    });

    syncAuthUI();
    syncBasket();

    const params = new URLSearchParams(window.location.search);
    const shouldOpenProfile = params.get("openProfile") === "1";
    if (shouldOpenProfile && window.AppState.loadState().user) {
        openProfileDrawer();
    }
});
