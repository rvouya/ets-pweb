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
            authButton.style.setProperty("display", "none", "important");
            authButton.classList.remove("d-md-block");
            profileTrigger.classList.remove("d-none");
            profileTrigger.style.setProperty("display", "block", "important");
            profileTrigger.setAttribute("title", state.user.name);
        } else {
            authButton.style.removeProperty("display");
            authButton.classList.add("d-md-block");
            profileTrigger.classList.add("d-none");
            profileTrigger.style.removeProperty("display");
            closeProfileDrawer();
        }
    };

    const openProfileDrawer = () => {
        profileOverlay.classList.remove("d-none");
        profileDrawer.classList.add("is-open");
        profileFrame.setAttribute("src", "user_profile.html");
    };

    const closeProfileDrawer = () => {
        profileOverlay.classList.add("d-none");
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

    searchInput.addEventListener("focus", () => {
        searchDropdown.classList.remove("d-none");
        searchWrapper.classList.add("open");
        renderRecentSearches();
    });
    
    document.addEventListener("click", (event) => {
        if (!searchWrapper.contains(event.target)) {
            searchDropdown.classList.add("d-none");
            searchWrapper.classList.remove("open");
        }
    });

    const catFilterBtns = document.querySelectorAll(".cat-filter-btn");
    const menuItems = document.querySelectorAll("#menu-cards-container .menu-card-item");

    const renderRecentSearches = () => {
        const container = document.getElementById("recent-search-container");
        if (!container) return;
        const searches = window.AppState.getRecentSearches();
        if (searches.length === 0) {
            container.innerHTML = '<span class="text-secondary small">Belum ada pencarian.</span>';
            return;
        }
        container.innerHTML = searches.map(s => `<button class="pill-btn">${s}</button>`).join('');
        container.querySelectorAll('.pill-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                searchInput.value = btn.textContent;
                triggerSearch(btn.textContent);
            });
        });
    };

    const triggerSearch = (term) => {
        term = term.toLowerCase().trim();
        menuItems.forEach((item) => {
            const nameEl = item.querySelector('h3');
            if (nameEl) {
                const name = nameEl.textContent.toLowerCase();
                item.style.display = name.includes(term) ? "block" : "none";
            }
        });
        if (term) {
            window.AppState.addRecentSearch(term);
            renderRecentSearches();
        }
        searchDropdown.classList.add("d-none");
        searchWrapper.classList.remove("open");
    };

    searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            triggerSearch(searchInput.value);
            searchInput.blur();
        }
    });

    catFilterBtns.forEach((button) => {
        button.addEventListener("click", () => {
            catFilterBtns.forEach((otherButton) => otherButton.classList.remove("is-active"));
            button.classList.add("is-active");

            const filter = button.getAttribute("data-filter");
            menuItems.forEach((item) => {
                const categories = item.getAttribute("data-category").split(" ");
                item.style.display = filter === "all" || categories.includes(filter) ? "block" : "none";
            });
        });
    });

    const restaurants = window.AppState.getRestaurants();
    menuItems.forEach((item, index) => {
        const restaurant = restaurants[index];
        if (!restaurant) {
            return;
        }

        const foodCard = item.querySelector(".food-card");
        if (foodCard) {
            foodCard.dataset.restaurantId = restaurant.id;
            foodCard.addEventListener("click", () => {
                window.AppState.setSelectedRestaurant(restaurant.id);
                window.location.href = `restaurant.html?restaurant=${restaurant.id}`;
            });
        }
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
        if (!basketArea || !basketItemCount || !basketTotalPrice) return;
        const summary = window.AppState.getCartSummary();

        if (summary.totalItems < 1) {
            basketArea.classList.add("d-none");
            return;
        }

        basketArea.classList.remove("d-none");
        basketItemCount.textContent = `${summary.totalItems} Item`;
        basketTotalPrice.textContent = window.AppState.formatRupiah(summary.subtotal);
    };

    if (basketArea) {
        basketArea.addEventListener("click", () => {
            const state = window.AppState.loadState();
            if (!state.user) {
                window.AppState.showLoginWarning("checkout.html");
                return;
            }
            window.location.href = "checkout.html";
        });
    }

    syncAuthUI();
    syncBasket();

    const params = new URLSearchParams(window.location.search);
    const shouldOpenProfile = params.get("openProfile") === "1";
    if (shouldOpenProfile && window.AppState.loadState().user) {
        openProfileDrawer();
    }
});
