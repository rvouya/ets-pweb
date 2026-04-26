document.addEventListener("DOMContentLoaded", () => {
    const authButton = document.getElementById("header-auth-btn");
    const profileTrigger = document.getElementById("header-profile-trigger");

    const searchInput = document.getElementById("search-input");
    const searchDropdown = document.getElementById("search-dropdown");
    const searchWrapper = document.getElementById("search-wrapper");

    const renderRecentSearches = () => {
        const container = document.getElementById("recent-search-container");
        if (!container) return;
        const searches = window.AppState.getRecentSearches();
        if (searches.length === 0) {
            container.innerHTML = '<span class="text-secondary small">Belum ada pencarian.</span>';
            return;
        }
        container.innerHTML = searches.map(s => `<button class="pill-btn" style="padding: 6px 16px; border-radius: 50px; border: 1px solid var(--outline-variant); background: var(--surface-container); color: var(--on-surface-variant); cursor: pointer;">${s}</button>`).join('');
        container.querySelectorAll('.pill-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                if(searchInput) {
                    searchInput.value = btn.textContent;
                    triggerSearch(btn.textContent);
                }
            });
        });
    };

    const triggerSearch = (term) => {
        term = term.toLowerCase().trim();
        const cards = document.querySelectorAll("#resto-menu-container .menu-card-item");
        cards.forEach((card) => {
            const nameEl = card.querySelector('h3');
            if (nameEl) {
                const name = nameEl.textContent.toLowerCase();
                card.style.display = name.includes(term) ? "block" : "none";
            }
        });
        if (term) {
            window.AppState.addRecentSearch(term);
            renderRecentSearches();
        }
        if(searchWrapper) searchWrapper.classList.remove("open");
        if(searchDropdown) searchDropdown.classList.add("d-none");
    };

    if(searchInput) {
        searchInput.addEventListener("focus", () => {
            if(searchDropdown) searchDropdown.classList.remove("d-none");
            if(searchWrapper) searchWrapper.classList.add("open");
            renderRecentSearches();
        });
        
        searchInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                triggerSearch(searchInput.value);
                searchInput.blur();
            }
        });
    }

    document.addEventListener("click", (event) => {
        if (searchWrapper && !searchWrapper.contains(event.target)) {
            if(searchDropdown) searchDropdown.classList.add("d-none");
            if(searchWrapper) searchWrapper.classList.remove("open");
        }
    });

    const restaurantTitle = document.getElementById("restaurant-title");
    const restaurantCuisine = document.getElementById("restaurant-cuisine");
    const restaurantRating = document.getElementById("restaurant-rating");
    const restaurantEtaDistance = document.getElementById("restaurant-eta-distance");
    const restaurantHours = document.getElementById("restaurant-hours");

    const menuContainer = document.getElementById("resto-menu-container");
    const basketArea = document.getElementById("basket-area");
    const basketItemCount = document.getElementById("basket-item-count");
    const basketTotalPrice = document.getElementById("basket-total-price");

    const modalOverlay = document.getElementById("item-detail-overlay");
    const modalFrame = document.getElementById("item-detail-frame");
    
    const profileOverlay = document.getElementById("profile-overlay");
    const profileDrawer = document.getElementById("profile-drawer");

    const params = new URLSearchParams(window.location.search);
    let restaurantId = params.get("restaurant") || window.AppState.loadState().selectedRestaurantId;
    
    // Validasi Restoran
    const allRestos = window.AppState.getRestaurants();
    const rawRestaurant = allRestos.find(r => r.id === restaurantId);
    
    if (!rawRestaurant) {
        alert("Maaf resto belum tersedia");
        window.location.href = "landing_page.html";
        return; // stop execution
    }
    
    const restaurant = rawRestaurant;
    window.AppState.setSelectedRestaurant(restaurant.id);

    const syncAuthUI = () => {
        const state = window.AppState.loadState();
        if (state.user) {
            if(authButton) {
                authButton.style.setProperty("display", "none", "important");
                authButton.classList.remove("d-md-block");
            }
            if(profileTrigger) {
                profileTrigger.classList.remove("d-none");
                profileTrigger.style.setProperty("display", "block", "important");
            }
        } else {
            if(authButton) {
                authButton.style.removeProperty("display");
                authButton.classList.add("d-md-block");
            }
            if(profileTrigger) {
                profileTrigger.classList.add("d-none");
                profileTrigger.style.removeProperty("display");
            }
        }
    };

    if(authButton) {
        authButton.addEventListener("click", () => {
            const redirect = encodeURIComponent(`restaurant.html?restaurant=${restaurant.id}`);
            window.location.href = `login.html?redirect=${redirect}`;
        });
    }

    if(profileTrigger) {
        profileTrigger.addEventListener("click", () => {
            const profileFrame = document.getElementById("profile-frame");
            if (profileFrame) profileFrame.setAttribute("src", "user_profile.html");
            if (profileOverlay) profileOverlay.classList.remove("d-none");
            if (profileDrawer) profileDrawer.classList.add("is-open");
        });
    }

    if (profileOverlay) {
        profileOverlay.addEventListener("click", () => {
            profileOverlay.classList.add("d-none");
            if (profileDrawer) profileDrawer.classList.remove("is-open");
        });
    }

    window.addEventListener("message", (event) => {
        if (!event.data || typeof event.data !== "object") return;

        if (event.data.type === "close-profile") {
            if (profileOverlay) profileOverlay.classList.add("d-none");
            if (profileDrawer) profileDrawer.classList.remove("is-open");
        }
        if (event.data.type === "logout-profile") {
            window.AppState.logout();
            syncAuthUI();
            if (profileOverlay) profileOverlay.classList.add("d-none");
            if (profileDrawer) profileDrawer.classList.remove("is-open");
        }
        if (event.data.type === "close-item-detail") {
            closeItemDetail();
        }
        if (event.data.type === "add-to-cart") {
            window.AppState.addToCart(event.data.payload);
            closeItemDetail();
            syncBasket();
            
            const activeFilterBtn = document.querySelector(".filter-btn-active");
            const filter = activeFilterBtn ? activeFilterBtn.dataset.filter : "all";
            const source = restaurant.menu;
            const filtered = filter === "all" ? source : source.filter((item) => item.category === filter);
            renderMenu(filtered);
        }
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
            button.innerHTML = `<span class="material-symbols-outlined fs-5 pointer-events-none">add</span> Tambah`;
            button.style.padding = "4px 12px";
            return;
        }

        button.innerHTML = `
            <span class="qty-circle material-symbols-outlined" data-role="minus" style="font-size: 16px; background:#f5ddd8; color:var(--primary); border-radius:50%; padding:2px;">remove</span>
            <span class="qty-value fw-bold text-dark mx-2 pointer-events-none" style="font-size:14px;">${entry.qty}</span>
            <span class="qty-circle material-symbols-outlined" data-role="plus" style="font-size: 16px; background:var(--primary); color:white; border-radius:50%; padding:2px;">add</span>
        `;
        button.style.padding = "4px 8px";
    };

    const renderMenu = (items) => {
        menuContainer.innerHTML = "";
        items.forEach((item, index) => {
            const col = document.createElement("div");
            col.className = "col-12 col-sm-6 col-md-6 col-lg-4 menu-card-item";
            col.dataset.category = item.category;
            
            const isBestSeller = item.category === "signature" && index === 0;
            const bestSellerBadge = isBestSeller ? `<div class="bestseller-badge">Best Seller</div>` : "";

            col.innerHTML = `
                <div class="menu-card" style="cursor: pointer; height: 100%; display: flex; flex-direction: column;">
                  <div class="menu-img-wrap">
                    <img src="${item.image}" alt="${item.name}" />
                    ${bestSellerBadge}
                  </div>
                  <div class="p-3 d-flex flex-column flex-grow-1">
                    <h3 class="fs-5 fw-bold mb-2">${item.name}</h3>
                    <p class="text-secondary small mb-3 flex-grow-1" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${item.description}</p>
                    <div class="d-flex align-items-center justify-content-between mt-auto">
                      <span class="fs-5 fw-bold" style="color: var(--primary);">${window.AppState.formatRupiah(item.price)}</span>
                      <button data-price="${item.price}" class="add-to-cart-btn" style="cursor: pointer; background: var(--surface); color: var(--primary); border: 1px solid var(--primary); border-radius: 20px; padding: 4px 12px; font-size: 14px; font-weight: 600; display: flex; align-items: center; gap: 4px; transition: all 0.2s;">
                        <span class="material-symbols-outlined fs-5">add</span> Tambah
                      </button>
                    </div>
                  </div>
                </div>
            `;
            
            const cardInner = col.querySelector('.menu-card');
            cardInner.addEventListener('click', (e) => {
                if(e.target.closest('.add-to-cart-btn')) return;
                openItemDetail(item);
            });
            
            const addBtn = col.querySelector('.add-to-cart-btn');
            setAddButtonUI(addBtn, item.id);
            
            addBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                
                const role = e.target.closest('[data-role]')?.getAttribute("data-role");
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
                    setAddButtonUI(addBtn, item.id);
                    syncBasket();
                    return;
                }

                if (!currentEntry) return;

                const nextQty = role === "plus" ? currentEntry.qty + 1 : currentEntry.qty - 1;
                window.AppState.updateCartQty(currentEntry.key, nextQty);
                setAddButtonUI(addBtn, item.id);
                syncBasket();
            });

            menuContainer.appendChild(col);
        });
    };

    const syncBasket = () => {
        const summary = window.AppState.getCartSummary();
        if (summary.totalItems < 1) {
            basketArea.classList.add("d-none");
            return;
        }
        basketArea.classList.remove("d-none");
        basketItemCount.textContent = `${summary.totalItems} Item`;
        basketTotalPrice.textContent = window.AppState.formatRupiah(summary.subtotal);
    };

    const openItemDetail = (item) => {
        const url = new URL("item_detail.html", window.location.href);
        url.searchParams.set("restaurant", restaurant.id);
        url.searchParams.set("item", item.id);
        modalFrame.setAttribute("src", url.toString());
        modalOverlay.classList.remove("d-none");
    };

    const closeItemDetail = () => {
        modalOverlay.classList.add("d-none");
        modalFrame.setAttribute("src", "about:blank");
    };

    modalOverlay.addEventListener("click", (event) => {
        if (event.target === modalOverlay) closeItemDetail();
    });

    basketArea.addEventListener("click", () => {
        const state = window.AppState.loadState();
        if (!state.user) {
            window.AppState.showLoginWarning("checkout.html");
            return;
        }
        window.location.href = "checkout.html";
    });

    const filterButtons = document.querySelectorAll(".filter-btn");
    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const filter = button.dataset.filter;
            filterButtons.forEach((btn) => {
                btn.classList.remove("filter-btn-active");
                btn.classList.add("filter-btn-inactive");
            });
            button.classList.add("filter-btn-active");
            button.classList.remove("filter-btn-inactive");

            const source = restaurant.menu;
            const filtered = filter === "all" ? source : source.filter((item) => item.category === filter);
            renderMenu(filtered);
        });
    });

    // Date & Time Picker Logic
    const dateBtn = document.getElementById("date-picker-btn");
    const dateDropdown = document.getElementById("date-dropdown");
    const selectedDate = document.getElementById("selected-date");

    const timeBtn = document.getElementById("time-picker-btn");
    const timeDropdown = document.getElementById("time-dropdown");
    const selectedTime = document.getElementById("selected-time");
    
    // Generate dates
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    dateDropdown.innerHTML = `
        <div class="dropdown-item-custom date-option" data-val="Today">Today</div>
        <div class="dropdown-item-custom date-option" data-val="Tomorrow">Tomorrow</div>
        <div class="dropdown-item-custom date-option border-0" data-val="${days[tomorrow.getDay() + 1 > 6 ? 0 : tomorrow.getDay() + 1]}">${days[tomorrow.getDay() + 1 > 6 ? 0 : tomorrow.getDay() + 1]}</div>
    `;

    // Generate times starting from now
    let timeHtml = `<div class="dropdown-item-custom time-option" data-val="Now">Now</div>`;
    let currentHour = today.getHours() + 1;
    for(let i=0; i<3; i++) {
        let h = currentHour + i;
        if(h > 23) h -= 24;
        let padH = h.toString().padStart(2, '0');
        timeHtml += `<div class="dropdown-item-custom time-option ${i==2?'border-0':''}" data-val="${padH}:00">${padH}:00</div>`;
    }
    
    timeDropdown.innerHTML = `
        <div style="max-height: 160px; overflow-y: auto;" class="hide-scrollbar">
            ${timeHtml}
        </div>
    `;

    const bindPickers = () => {
        document.querySelectorAll(".date-option").forEach((option) => {
            option.addEventListener("click", (event) => {
                event.stopPropagation();
                selectedDate.textContent = `Deliver date: ${option.dataset.val}`;
                dateDropdown.classList.add("d-none");
            });
        });
        document.querySelectorAll(".time-option").forEach((option) => {
            option.addEventListener("click", (event) => {
                event.stopPropagation();
                selectedTime.textContent = `Deliver time: ${option.dataset.val}`;
                timeDropdown.classList.add("d-none");
            });
        });
    };
    bindPickers();

    dateBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        dateDropdown.classList.toggle("d-none");
        timeDropdown.classList.add("d-none");
    });

    timeBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        timeDropdown.classList.toggle("d-none");
        dateDropdown.classList.add("d-none");
    });

    if (searchInput) {
        searchInput.addEventListener("focus", () => {
            if(searchDropdown) searchDropdown.classList.remove("d-none");
        });
    }

    document.addEventListener("click", (event) => {
        if (searchWrapper && searchDropdown && !searchWrapper.contains(event.target)) {
            searchDropdown.classList.add("d-none");
        }
        if(dateDropdown && !dateBtn.contains(event.target)) dateDropdown.classList.add("d-none");
        if(timeDropdown && !timeBtn.contains(event.target)) timeDropdown.classList.add("d-none");
    });

    renderMenu(restaurant.menu);
    syncBasket();
    syncAuthUI();
});
