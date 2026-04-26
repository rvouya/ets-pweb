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

    const menuContainer = document.getElementById("menu-cards-container");
    const emptyStateMsg = document.getElementById("empty-state-msg");

    const renderRestaurants = () => {
        if (!menuContainer) return;
        const restaurants = window.AppState.getRestaurants();
        menuContainer.innerHTML = "";
        
        restaurants.forEach(resto => {
            let catClass = "nasi";
            if (resto.cuisine.toLowerCase().includes("noodle") || resto.cuisine.toLowerCase().includes("bakso")) catClass = "mie_bakso";
            if (resto.cuisine.toLowerCase().includes("ayam")) catClass = "ayam";
            if (resto.cuisine.toLowerCase().includes("seafood")) catClass = "seafood";
            if (resto.cuisine.toLowerCase().includes("beverage")) catClass = "minuman";
            if (resto.cuisine.toLowerCase().includes("dessert")) catClass = "dessert";

            const html = `
            <div class="col-12 col-md-6 col-lg-4 menu-card-item" data-category="${catClass}">
              <div class="food-card" style="cursor: pointer;" data-restaurant-id="${resto.id}">
                <div class="food-card-img">
                  <img alt="${resto.name}" src="${resto.image}" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'" />
                  <div class="rating-badge"><span class="material-symbols-outlined" style="color: var(--secondary-container); font-size: 18px;">star</span> <b>${resto.rating}</b></div>
                </div>
                <div class="p-4">
                  <h3 class="fs-5 fw-bold mb-1">${resto.name}</h3>
                  <p class="text-secondary small mb-3">${resto.subtitle || resto.cuisine}</p>
                  <div class="d-flex align-items-center gap-3 text-secondary small mb-3">
                    <div class="d-flex align-items-center gap-1"><span class="material-symbols-outlined fs-6">two_wheeler</span>${resto.eta}</div>
                    <div style="width:4px; height:4px; background:#ccc; border-radius:50%;"></div>
                    <div class="d-flex align-items-center gap-1"><span class="material-symbols-outlined fs-6">attach_money</span>${window.AppState.formatRupiah(resto.deliveryFee)}</div>
                  </div>
                </div>
              </div>
            </div>`;
            menuContainer.insertAdjacentHTML("beforeend", html);
        });

        const cards = document.querySelectorAll(".food-card");
        cards.forEach(card => {
            card.addEventListener("click", () => {
                const rid = card.getAttribute("data-restaurant-id");
                window.AppState.setSelectedRestaurant(rid);
                window.location.href = `restaurant.html?restaurant=${rid}`;
            });
        });
    };

    renderRestaurants();

    const catFilterBtns = document.querySelectorAll(".filter-btn");

    const checkEmptyState = () => {
        const items = document.querySelectorAll("#menu-cards-container .menu-card-item");
        let visibleCount = 0;
        items.forEach(item => {
            if (item.style.display !== "none") visibleCount++;
        });
        if (visibleCount === 0) {
            emptyStateMsg.classList.remove("d-none");
        } else {
            emptyStateMsg.classList.add("d-none");
        }
    };

    const triggerSearch = (term) => {
        term = term.toLowerCase().trim();
        const items = document.querySelectorAll("#menu-cards-container .menu-card-item");
        items.forEach((item) => {
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
        checkEmptyState();
    };

    searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            triggerSearch(searchInput.value);
            searchInput.blur();
        }
    });

    catFilterBtns.forEach((button) => {
        button.addEventListener("click", () => {
            catFilterBtns.forEach((otherButton) => {
                otherButton.classList.remove("filter-btn-active");
                otherButton.classList.add("filter-btn-inactive");
            });
            button.classList.remove("filter-btn-inactive");
            button.classList.add("filter-btn-active");

            const items = document.querySelectorAll("#menu-cards-container .menu-card-item");
            const filter = button.getAttribute("data-filter");
            items.forEach((item) => {
                const categories = item.getAttribute("data-category").split(" ");
                item.style.display = filter === "all" || categories.includes(filter) ? "block" : "none";
            });
            checkEmptyState();
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
