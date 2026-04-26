document.addEventListener("DOMContentLoaded", () => {
    const authButton = document.getElementById("header-auth-btn");
    const profileTrigger = document.getElementById("header-profile-trigger");

    const searchInput = document.getElementById("search-input");
    const searchDropdown = document.getElementById("search-dropdown");
    const searchWrapper = document.getElementById("search-wrapper");

    const restaurantTitle = document.getElementById("restaurant-title");
    const restaurantCuisine = document.getElementById("restaurant-cuisine");
    const restaurantRating = document.getElementById("restaurant-rating");
    const restaurantEtaDistance = document.getElementById("restaurant-eta-distance");
    const restaurantHours = document.getElementById("restaurant-hours");

    const menuContainer = document.getElementById("menu-container");
    const basketArea = document.getElementById("basket-area");
    const basketItemCount = document.getElementById("basket-item-count");
    const basketTotalPrice = document.getElementById("basket-total-price");

    const modalOverlay = document.getElementById("item-detail-overlay");
    const modalFrame = document.getElementById("item-detail-frame");

    const params = new URLSearchParams(window.location.search);
    const restaurantId = params.get("restaurant") || window.AppState.loadState().selectedRestaurantId;
    const restaurant = window.AppState.getRestaurantById(restaurantId);
    window.AppState.setSelectedRestaurant(restaurant.id);

    const syncAuthUI = () => {
        const state = window.AppState.loadState();
        if (state.user) {
            authButton.classList.add("hidden");
            profileTrigger.classList.remove("hidden");
        } else {
            authButton.classList.remove("hidden");
            profileTrigger.classList.add("hidden");
        }
    };

    authButton.addEventListener("click", () => {
        const redirect = encodeURIComponent(`../restaurant.html?restaurant=${restaurant.id}`);
        window.location.href = `pages/login.html?redirect=${redirect}`;
    });

    profileTrigger.addEventListener("click", () => {
        window.location.href = "landing_page.html?openProfile=1";
    });

    restaurantTitle.textContent = `${restaurant.name} - Jakarta Selatan`;
    restaurantCuisine.textContent = restaurant.cuisine;
    restaurantRating.textContent = restaurant.rating.toString();
    restaurantEtaDistance.textContent = `${restaurant.eta} • ${restaurant.distance}`;
    restaurantHours.textContent = restaurant.openingHours;

    const findQuickCartEntry = (itemId) => {
        const state = window.AppState.loadState();
        return state.cart.find(
            (entry) =>
                entry.restaurantId === restaurant.id &&
                entry.itemId === itemId &&
                (!entry.notes || entry.notes.trim() === "")
        );
    };

    const setAddButtonUI = (button, itemId) => {
        const entry = findQuickCartEntry(itemId);

        if (!entry) {
            button.classList.remove("qty-mode");
            button.innerHTML = `<span class="btn-label">Tambahkan</span>`;
            return;
        }

        button.classList.add("qty-mode");
        button.innerHTML = `
            <span class="qty-circle" data-role="minus">-</span>
            <span class="qty-value">${entry.qty}</span>
            <span class="qty-circle" data-role="plus">+</span>
        `;
    };

    const renderMenu = (items) => {
        menuContainer.innerHTML = "";

        const fallbackImage =
            "data:image/svg+xml;charset=UTF-8," +
            encodeURIComponent(
                `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 520'><rect width='800' height='520' fill='#f5ddd8'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#ab3514' font-family='Plus Jakarta Sans, Arial' font-size='28'>Image not available</text></svg>`
            );

        items.forEach((item) => {
            const card = document.createElement("div");
            card.className = "menu-card native-card";
            card.dataset.category = item.category;
            card.innerHTML = `
                <div class="native-card-image-wrap">
                    <img class="native-card-image" src="${item.image}" alt="${item.name}" />
                </div>
                <div class="native-card-content">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <div class="native-card-footer">
                        <span>${window.AppState.formatRupiah(item.price)}</span>
                        <button type="button" class="add-to-cart-btn"><span class="btn-label">Tambahkan</span></button>
                    </div>
                </div>
            `;

            const imageEl = card.querySelector(".native-card-image");
            imageEl.addEventListener("error", () => {
                imageEl.src = fallbackImage;
            });

            const addButton = card.querySelector(".add-to-cart-btn");
            setAddButtonUI(addButton, item.id);

            addButton.addEventListener("click", (event) => {
                event.preventDefault();
                event.stopPropagation();

                const role = event.target.getAttribute("data-role");
                const currentEntry = findQuickCartEntry(item.id);

                if (!role && !currentEntry) {
                    window.AppState.addToCart({
                        restaurantId: restaurant.id,
                        restaurantName: restaurant.name,
                        itemId: item.id,
                        name: item.name,
                        price: item.price,
                        image: item.image,
                        qty: 1,
                        notes: ""
                    });
                    setAddButtonUI(addButton, item.id);
                    syncBasket();
                    return;
                }

                if (!currentEntry) {
                    return;
                }

                const nextQty = role === "plus" ? currentEntry.qty + 1 : currentEntry.qty - 1;
                window.AppState.updateCartQty(currentEntry.key, nextQty);
                setAddButtonUI(addButton, item.id);
                syncBasket();
            });

            card.addEventListener("click", (event) => {
                if (event.target.closest(".add-to-cart-btn")) {
                    return;
                }
                event.preventDefault();
                openItemDetail(item);
            });

            menuContainer.appendChild(card);
        });
    };

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

    const openItemDetail = (item) => {
        const url = new URL("item_detail.html", window.location.href);
        url.searchParams.set("restaurant", restaurant.id);
        url.searchParams.set("item", item.id);

        modalFrame.setAttribute("src", url.toString());
        modalOverlay.classList.remove("hidden");
    };

    const closeItemDetail = () => {
        modalOverlay.classList.add("hidden");
        modalFrame.setAttribute("src", "about:blank");
    };

    window.addEventListener("message", (event) => {
        if (!event.data || typeof event.data !== "object") {
            return;
        }

        if (event.data.type === "close-item-detail") {
            closeItemDetail();
            return;
        }

        if (event.data.type === "add-to-cart") {
            window.AppState.addToCart(event.data.payload);
            closeItemDetail();
            syncBasket();

            const activeFilterBtn = document.querySelector(".filter-btn.is-active") || document.querySelector(".filter-btn");
            const activeFilter = activeFilterBtn ? activeFilterBtn.dataset.filter : "all";
            const source = restaurant.menu;
            const filtered = activeFilter === "all" ? source : source.filter((item) => item.category === activeFilter);
            renderMenu(filtered);
        }
    });

    modalOverlay.addEventListener("click", (event) => {
        if (event.target === modalOverlay) {
            closeItemDetail();
        }
    });

    basketArea.addEventListener("click", () => {
        window.location.href = "pages/checkout.html";
    });

    const filterButtons = document.querySelectorAll(".filter-btn");
    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const filter = button.dataset.filter;
            filterButtons.forEach((btn) => btn.classList.remove("is-active"));
            button.classList.add("is-active");

            const source = restaurant.menu;
            const filtered = filter === "all" ? source : source.filter((item) => item.category === filter);
            renderMenu(filtered);
        });
    });

    const dateBtn = document.getElementById("date-picker-btn");
    const dateDropdown = document.getElementById("date-dropdown");
    const dateOptions = document.querySelectorAll(".date-option");
    const selectedDate = document.getElementById("selected-date");

    const timeBtn = document.getElementById("time-picker-btn");
    const timeDropdown = document.getElementById("time-dropdown");
    const timeOptions = document.querySelectorAll(".time-option");
    const selectedTime = document.getElementById("selected-time");

    dateBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        dateDropdown.classList.toggle("hidden");
        timeDropdown.classList.add("hidden");
    });

    timeBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        timeDropdown.classList.toggle("hidden");
        dateDropdown.classList.add("hidden");
    });

    dateOptions.forEach((option) => {
        option.addEventListener("click", (event) => {
            event.stopPropagation();
            selectedDate.textContent = `Deliver date: ${option.dataset.val}`;
            dateDropdown.classList.add("hidden");
        });
    });

    timeOptions.forEach((option) => {
        option.addEventListener("click", (event) => {
            event.stopPropagation();
            selectedTime.textContent = `Deliver time: ${option.dataset.val}`;
            timeDropdown.classList.add("hidden");
        });
    });

    searchInput.addEventListener("focus", () => searchDropdown.classList.remove("hidden"));
    document.addEventListener("click", (event) => {
        if (!searchWrapper.contains(event.target)) {
            searchDropdown.classList.add("hidden");
        }
        dateDropdown.classList.add("hidden");
        timeDropdown.classList.add("hidden");
    });

    renderMenu(restaurant.menu);
    if (filterButtons[0]) {
        filterButtons[0].classList.add("is-active");
    }
    syncBasket();
    syncAuthUI();
});
