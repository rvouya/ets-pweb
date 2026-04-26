(function () {
    const STORAGE_KEY = "mabaryuk_state";

    const RESTAURANTS = [
        {
            id: "nasi-goreng-gila",
            name: "Nasi Goreng Gila Mpok Mumun",
            subtitle: "Nasi Goreng, Indonesian",
            cuisine: "Indonesian, Casual, Rice",
            rating: 4.8,
            eta: "25 mins",
            distance: "1.2 km",
            openingHours: "Today 10:00-21:00",
            deliveryFee: 10000,
            image: "../assets/images/nasi_goreng_gila.jpg",
            menu: [
                {
                    id: "ng-ayam",
                    name: "Nasi Goreng Ayam",
                    category: "signature",
                    description: "Nasi goreng smoky dengan suwiran ayam, telur, dan acar segar.",
                    price: 28000,
                    image: "../assets/images/nasi_goreng_gila.jpg"
                },
                {
                    id: "ng-seafood",
                    name: "Nasi Goreng Seafood",
                    category: "signature",
                    description: "Nasi goreng seafood dengan udang, cumi, dan sambal bawang.",
                    price: 33000,
                    image: "../assets/images/nasi_goreng_seafood.jpg"
                },
                {
                    id: "es-teh",
                    name: "Es Teh Jumbo",
                    category: "drinks",
                    description: "Teh melati dingin dengan porsi ekstra segar.",
                    price: 8000,
                    image: "../assets/images/es_teh_manis_jumbo.jpg"
                },
                {
                    id: "kerupuk",
                    name: "Kerupuk Udang",
                    category: "snacks",
                    description: "Kerupuk udang gurih renyah untuk pendamping nasi goreng.",
                    price: 7000,
                    image: "../assets/images/kerupuk_udang.png"
                }
            ]
        },
        {
            id: "bakmi-soerja",
            name: "Bakmi Soerja",
            subtitle: "Noodles, Chinese Indonesian",
            cuisine: "Noodles, Chinese Indonesian",
            rating: 4.6,
            eta: "15 mins",
            distance: "1.0 km",
            openingHours: "Today 09:00-22:00",
            deliveryFee: 8000,
            image: "../assets/images/bakmi_soerja.jpg",
            menu: [
                {
                    id: "bakmi-ayam",
                    name: "Bakmi Ayam Jamur",
                    category: "signature",
                    description: "Mie kenyal dengan ayam jamur dan minyak bawang.",
                    price: 25000,
                    image: "../assets/images/bakmi_ayam_jamur.jpg"
                },
                {
                    id: "bakso-kuah",
                    name: "Bakso Kuah Urat",
                    category: "signature",
                    description: "Bakso urat kenyal dengan kuah kaldu hangat.",
                    price: 23000,
                    image: "../assets/images/bakso_kuah_urat.jpg"
                },
                {
                    id: "es-jeruk",
                    name: "Es Jeruk Peras",
                    category: "drinks",
                    description: "Jeruk peras segar tanpa pengawet.",
                    price: 10000,
                    image: "../assets/images/jeruk_peras.png"
                },
                {
                    id: "pangsit",
                    name: "Pangsit Goreng",
                    category: "snacks",
                    description: "Pangsit goreng isi ayam dengan saus mayo pedas.",
                    price: 15000,
                    image: "../assets/images/pangsit_goreng.png"
                }
            ]
        },
        {
            id: "kopi-janji-manis",
            name: "Kopi Janji Manis",
            subtitle: "Beverages, Coffee",
            cuisine: "Beverages, Coffee",
            rating: 4.9,
            eta: "10 mins",
            distance: "0.8 km",
            openingHours: "Today 08:00-23:00",
            deliveryFee: 5000,
            image: "../assets/images/kopi_janji_manis.jpg",
            menu: [
                {
                    id: "kopi-susu",
                    name: "Kopi Susu Aren",
                    category: "drinks",
                    description: "Espresso blend dengan susu creamy dan gula aren.",
                    price: 22000,
                    image: "../assets/images/kopi_susu_aren.jpg"
                },
                {
                    id: "matcha-latte",
                    name: "Matcha Latte",
                    category: "drinks",
                    description: "Matcha premium dengan susu segar.",
                    price: 24000,
                    image: "../assets/images/matcha_latte.jpg"
                },
                {
                    id: "croffle",
                    name: "Croffle Caramel",
                    category: "dessert",
                    description: "Croffle butter dengan caramel sauce.",
                    price: 18000,
                    image: "../assets/images/croffle_caramel.jpg"
                },
                {
                    id: "choco-cookie",
                    name: "Choco Chip Cookie",
                    category: "snacks",
                    description: "Cookie renyah dengan dark chocolate chips.",
                    price: 12000,
                    image: "../assets/images/choco_chip_cookie.jpg"
                }
            ]
        },
        {
            id: "geprek-jomama",
            name: "Geprek Jomama",
            subtitle: "Ayam, Indonesian",
            cuisine: "Ayam, Indonesian",
            rating: 4.6,
            eta: "5 mins",
            distance: "0.6 km",
            openingHours: "Today 10:00-22:00",
            deliveryFee: 12000,
            image: "../assets/images/ayam_geprek_original.jpg",
            menu: [
                {
                    id: "geprek-original",
                    name: "Ayam Geprek Original",
                    category: "signature",
                    description: "Ayam crispy geprek sambal bawang level bebas.",
                    price: 24000,
                    image: "../assets/images/ayam_geprek_original.jpg"
                },
                {
                    id: "geprek-keju",
                    name: "Ayam Geprek Mozzarella",
                    category: "signature",
                    description: "Ayam geprek dengan lelehan mozzarella.",
                    price: 32000,
                    image: "../assets/images/ayam_geprek_mozzarella.jpg"
                },
                {
                    id: "es-milo",
                    name: "Es Milo Dino",
                    category: "drinks",
                    description: "Minuman cokelat dingin untuk pendamping ayam pedas.",
                    price: 14000,
                    image: "../assets/images/es_milo_dino.png"
                },
                {
                    id: "tahu-crispy",
                    name: "Tahu Crispy",
                    category: "snacks",
                    description: "Tahu goreng crispy dengan bumbu gurih pedas.",
                    price: 13000,
                    image: "../assets/images/tahu_crispy.png"
                }
            ]
        },
        {
            id: "martabak-pekalongan",
            name: "Martabak Pekalongan",
            subtitle: "Street Food, Dessert",
            cuisine: "Street Food, Dessert",
            rating: 4.7,
            eta: "18 mins",
            distance: "2.1 km",
            openingHours: "Today 16:00-00:00",
            deliveryFee: 65000,
            image: "../assets/images/martabak_telor_spesial.jpg",
            menu: [
                {
                    id: "martabak-manis",
                    name: "Martabak Manis Cokelat Keju",
                    category: "dessert",
                    description: "Martabak manis tebal dengan topping cokelat dan keju.",
                    price: 45000,
                    image: "../assets/images/martabak_manis_cokelat_keju.jpg"
                },
                {
                    id: "martabak-telor",
                    name: "Martabak Telor Spesial",
                    category: "signature",
                    description: "Martabak telor daging sapi, daun bawang, dan telur premium.",
                    price: 42000,
                    image: "../assets/images/martabak_telor_spesial.jpg"
                },
                {
                    id: "teh-tarik",
                    name: "Teh Tarik Hangat",
                    category: "drinks",
                    description: "Teh tarik creamy untuk teman martabak.",
                    price: 12000,
                    image: "../assets/images/teh_tarik_hangat.jpg"
                },
                {
                    id: "pisang-keju",
                    name: "Pisang Keju",
                    category: "snacks",
                    description: "Pisang goreng dengan topping keju dan susu.",
                    price: 18000,
                    image: "../assets/images/pisang_keju.png"
                }
            ]
        },
        {
            id: "sushi-nay",
            name: "Sushi Nay",
            subtitle: "Seafood, Japanese",
            cuisine: "Seafood, Japanese",
            rating: 4.8,
            eta: "30 mins",
            distance: "3.4 km",
            openingHours: "Today 11:00-22:00",
            deliveryFee: 45000,
            image: "../assets/images/sushi_nay.jpg",
            menu: [
                {
                    id: "salmon-roll",
                    name: "Salmon Roll",
                    category: "signature",
                    description: "Roll salmon segar dengan nori premium.",
                    price: 48000,
                    image: "../assets/images/salmon_roll.jpg"
                },
                {
                    id: "ebi-tempura",
                    name: "Ebi Tempura",
                    category: "snacks",
                    description: "Udang tempura crispy dengan dipping sauce.",
                    price: 38000,
                    image: "../assets/images/ebi_tempura.jpg"
                },
                {
                    id: "miso-soup",
                    name: "Miso Soup",
                    category: "drinks",
                    description: "Sup miso hangat dengan tofu dan wakame.",
                    price: 20000,
                    image: "../assets/images/miso_soup.jpg"
                },
                {
                    id: "mochi",
                    name: "Mochi Ice Cream",
                    category: "dessert",
                    description: "Mochi lembut dengan isian es krim.",
                    price: 26000,
                    image: "../assets/images/mochi_ice_cream.jpg"
                }
            ]
        }
    ];

    const defaultState = {
        user: null,
        cart: [],
        selectedRestaurantId: RESTAURANTS[0].id,
        recentSearches: []
    };

    function parseState(raw) {
        try {
            return raw ? JSON.parse(raw) : { ...defaultState };
        } catch (error) {
            return { ...defaultState };
        }
    }

    function loadState() {
        const state = parseState(localStorage.getItem(STORAGE_KEY));
        if (!Array.isArray(state.cart)) {
            state.cart = [];
        }
        if (!Array.isArray(state.recentSearches)) {
            state.recentSearches = [];
        }
        if (!state.selectedRestaurantId) {
            state.selectedRestaurantId = RESTAURANTS[0].id;
        }
        return state;
    }

    function saveState(nextState) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
    }

    function updateState(mutator) {
        const current = loadState();
        const next = mutator(current) || current;
        saveState(next);
        return next;
    }

    function formatRupiah(value) {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0
        })
            .format(value)
            .replace("IDR", "Rp");
    }

    function setUser(user) {
        return updateState((state) => {
            state.user = user;
            return state;
        });
    }

    function logout() {
        return updateState((state) => {
            state.user = null;
            return state;
        });
    }

    function setSelectedRestaurant(restaurantId) {
        return updateState((state) => {
            state.selectedRestaurantId = restaurantId;
            return state;
        });
    }

    function getRestaurants() {
        return RESTAURANTS;
    }

    function getRestaurantById(restaurantId) {
        return RESTAURANTS.find((restaurant) => restaurant.id === restaurantId) || RESTAURANTS[0];
    }

    function getItemById(restaurantId, itemId) {
        const restaurant = getRestaurantById(restaurantId);
        return restaurant.menu.find((item) => item.id === itemId) || restaurant.menu[0];
    }

    function addToCart(payload) {
        return updateState((state) => {
            const key = [payload.restaurantId, payload.itemId, payload.notes || ""].join("::");
            const existing = state.cart.find((entry) => entry.key === key);
            if (existing) {
                existing.qty += payload.qty;
            } else {
                state.cart.push({
                    key,
                    restaurantId: payload.restaurantId,
                    restaurantName: payload.restaurantName,
                    itemId: payload.itemId,
                    name: payload.name,
                    price: payload.price,
                    image: payload.image,
                    notes: payload.notes || "",
                    qty: payload.qty
                });
            }
            return state;
        });
    }

    function updateCartQty(key, nextQty) {
        return updateState((state) => {
            state.cart = state.cart
                .map((entry) => (entry.key === key ? { ...entry, qty: nextQty } : entry))
                .filter((entry) => entry.qty > 0);
            return state;
        });
    }

    function clearCart() {
        return updateState((state) => {
            state.cart = [];
            return state;
        });
    }

    function getRecentSearches() {
        return loadState().recentSearches;
    }

    function addRecentSearch(term) {
        if (!term || term.trim() === "") return;
        return updateState((state) => {
            const cleanTerm = term.trim();
            state.recentSearches = state.recentSearches.filter(t => t.toLowerCase() !== cleanTerm.toLowerCase());
            state.recentSearches.unshift(cleanTerm);
            if (state.recentSearches.length > 5) {
                state.recentSearches.pop();
            }
            return state;
        });
    }

    function getCartSummary() {
        const state = loadState();
        const subtotal = state.cart.reduce((sum, entry) => sum + entry.price * entry.qty, 0);
        const totalItems = state.cart.reduce((sum, entry) => sum + entry.qty, 0);

        return {
            cart: state.cart,
            subtotal,
            totalItems
        };
    }

    function showLoginWarning(redirectUrl = "checkout.html", onCancelUrl = null) {
        let modalEl = document.getElementById("loginWarningModal");
        if (!modalEl) {
            const modalHtml = `
            <div class="modal fade" id="loginWarningModal" tabindex="-1" aria-labelledby="loginWarningLabel" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content border-0 rounded-4 shadow-lg p-3 text-center" style="color: #251915;">
                  <div class="modal-body d-flex flex-column align-items-center gap-3">
                    <span class="material-symbols-outlined" style="font-size: 64px; font-variation-settings: 'FILL' 1; color: #ff724c;">lock</span>
                    <h3 class="fs-4 fw-bold mb-1" id="loginWarningLabel">Ups! Belum Login Nih</h3>
                    <p class="text-secondary mb-0">Kamu harus login terlebih dahulu ya untuk bisa melakukan pesanan dan melanjutkan.</p>
                    <div class="d-flex gap-2 w-100 mt-3">
                      <button type="button" class="btn flex-grow-1" id="loginWarningCancelBtn" style="background: #ffe9e4; color: #58413b; border-radius: 50px; font-weight: 700;" data-bs-dismiss="modal">Nanti Saja</button>
                      <button type="button" class="btn flex-grow-1 text-white" id="loginWarningConfirmBtn" style="background: #ff724c; border-radius: 50px; font-weight: 700;">Login Sekarang</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>`;
            document.body.insertAdjacentHTML('beforeend', modalHtml);
            modalEl = document.getElementById("loginWarningModal");
        }
        
        const confirmBtn = document.getElementById("loginWarningConfirmBtn");
        const cancelBtn = document.getElementById("loginWarningCancelBtn");
        
        const newConfirmBtn = confirmBtn.cloneNode(true);
        confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);
        newConfirmBtn.addEventListener("click", () => {
            window.location.href = 'login.html?redirect=' + encodeURIComponent(redirectUrl);
        });

        const newCancelBtn = cancelBtn.cloneNode(true);
        cancelBtn.parentNode.replaceChild(newCancelBtn, cancelBtn);
        newCancelBtn.addEventListener("click", () => {
            if (onCancelUrl) {
                window.location.href = onCancelUrl;
            }
        });
        
        if (onCancelUrl) {
            modalEl.addEventListener('hidden.bs.modal', function onHidden() {
                window.location.href = onCancelUrl;
                modalEl.removeEventListener('hidden.bs.modal', onHidden);
            });
        }

        const modal = new bootstrap.Modal(modalEl);
        modal.show();
    }

    window.AppState = {
        STORAGE_KEY,
        loadState,
        saveState,
        updateState,
        formatRupiah,
        setUser,
        logout,
        setSelectedRestaurant,
        getRestaurants,
        getRestaurantById,
        getItemById,
        addToCart,
        updateCartQty,
        clearCart,
        getCartSummary,
        showLoginWarning,
        getRecentSearches,
        addRecentSearch
    };
})();
