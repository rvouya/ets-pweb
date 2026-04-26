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
            image: "https://www.caramelandspice.com/wp-content/uploads/2022/05/072-Nasi-Goreng-Kampung-Indonesian-Fried-Rice-1-of-1.jpg",
            menu: [
                {
                    id: "ng-ayam",
                    name: "Nasi Goreng Ayam",
                    category: "signature",
                    description: "Nasi goreng smoky dengan suwiran ayam, telur, dan acar segar.",
                    price: 28000,
                    image: "https://www.caramelandspice.com/wp-content/uploads/2022/05/072-Nasi-Goreng-Kampung-Indonesian-Fried-Rice-1-of-1.jpg"
                },
                {
                    id: "ng-seafood",
                    name: "Nasi Goreng Seafood",
                    category: "signature",
                    description: "Nasi goreng seafood dengan udang, cumi, dan sambal bawang.",
                    price: 33000,
                    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1200&q=80"
                },
                {
                    id: "es-teh",
                    name: "Es Teh Jumbo",
                    category: "drinks",
                    description: "Teh melati dingin dengan porsi ekstra segar.",
                    price: 8000,
                    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1200&q=80"
                },
                {
                    id: "kerupuk",
                    name: "Kerupuk Udang",
                    category: "snacks",
                    description: "Kerupuk udang gurih renyah untuk pendamping nasi goreng.",
                    price: 7000,
                    image: "https://images.unsplash.com/photo-1620374645314-352f7f25ec6f?auto=format&fit=crop&w=1200&q=80"
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
            image: "https://images.bisnis.com/posts/2023/08/22/1687037/bakmi_gm_1692680061.jpg",
            menu: [
                {
                    id: "bakmi-ayam",
                    name: "Bakmi Ayam Jamur",
                    category: "signature",
                    description: "Mie kenyal dengan ayam jamur dan minyak bawang.",
                    price: 25000,
                    image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=1200&q=80"
                },
                {
                    id: "bakso-kuah",
                    name: "Bakso Kuah Urat",
                    category: "signature",
                    description: "Bakso urat kenyal dengan kuah kaldu hangat.",
                    price: 23000,
                    image: "https://images.unsplash.com/photo-1631452180539-96aca7d48617?auto=format&fit=crop&w=1200&q=80"
                },
                {
                    id: "es-jeruk",
                    name: "Es Jeruk Peras",
                    category: "drinks",
                    description: "Jeruk peras segar tanpa pengawet.",
                    price: 10000,
                    image: "https://images.unsplash.com/photo-1551024709-8f23befc6cf7?auto=format&fit=crop&w=1200&q=80"
                },
                {
                    id: "pangsit",
                    name: "Pangsit Goreng",
                    category: "snacks",
                    description: "Pangsit goreng isi ayam dengan saus mayo pedas.",
                    price: 15000,
                    image: "https://images.unsplash.com/photo-1617196033258-1f9f2c2ee511?auto=format&fit=crop&w=1200&q=80"
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
            image: "https://www.kokako.co.nz/cdn/shop/files/KC_ColdCup_Clear_AW_Sep202327.jpg?v=1707442592",
            menu: [
                {
                    id: "kopi-susu",
                    name: "Kopi Susu Aren",
                    category: "drinks",
                    description: "Espresso blend dengan susu creamy dan gula aren.",
                    price: 22000,
                    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80"
                },
                {
                    id: "matcha-latte",
                    name: "Matcha Latte",
                    category: "drinks",
                    description: "Matcha premium dengan susu segar.",
                    price: 24000,
                    image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=1200&q=80"
                },
                {
                    id: "croffle",
                    name: "Croffle Caramel",
                    category: "dessert",
                    description: "Croffle butter dengan caramel sauce.",
                    price: 18000,
                    image: "https://images.unsplash.com/photo-1621743478914-cc8a86d7e7b5?auto=format&fit=crop&w=1200&q=80"
                },
                {
                    id: "choco-cookie",
                    name: "Choco Chip Cookie",
                    category: "snacks",
                    description: "Cookie renyah dengan dark chocolate chips.",
                    price: 12000,
                    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=1200&q=80"
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
            image: "https://www.dapurkobe.co.id/wp-content/uploads/kulit-ayam-crispy-geprek.jpg",
            menu: [
                {
                    id: "geprek-original",
                    name: "Ayam Geprek Original",
                    category: "signature",
                    description: "Ayam crispy geprek sambal bawang level bebas.",
                    price: 24000,
                    image: "https://www.dapurkobe.co.id/wp-content/uploads/kulit-ayam-crispy-geprek.jpg"
                },
                {
                    id: "geprek-keju",
                    name: "Ayam Geprek Mozzarella",
                    category: "signature",
                    description: "Ayam geprek dengan lelehan mozzarella.",
                    price: 32000,
                    image: "https://images.unsplash.com/photo-1562967916-eb82221dfb92?auto=format&fit=crop&w=1200&q=80"
                },
                {
                    id: "es-milo",
                    name: "Es Milo Dino",
                    category: "drinks",
                    description: "Minuman cokelat dingin untuk pendamping ayam pedas.",
                    price: 14000,
                    image: "https://images.unsplash.com/photo-1588484695730-6e5b8e5e8c35?auto=format&fit=crop&w=1200&q=80"
                },
                {
                    id: "tahu-crispy",
                    name: "Tahu Crispy",
                    category: "snacks",
                    description: "Tahu goreng crispy dengan bumbu gurih pedas.",
                    price: 13000,
                    image: "https://images.unsplash.com/photo-1604908177073-1d6e58f8f0f7?auto=format&fit=crop&w=1200&q=80"
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
            image: "https://arengaindonesia.com/wp-content/uploads/2021/10/Martabak-telur-anti-gagal.jpg",
            menu: [
                {
                    id: "martabak-manis",
                    name: "Martabak Manis Cokelat Keju",
                    category: "dessert",
                    description: "Martabak manis tebal dengan topping cokelat dan keju.",
                    price: 45000,
                    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=80"
                },
                {
                    id: "martabak-telor",
                    name: "Martabak Telor Spesial",
                    category: "signature",
                    description: "Martabak telor daging sapi, daun bawang, dan telur premium.",
                    price: 42000,
                    image: "https://arengaindonesia.com/wp-content/uploads/2021/10/Martabak-telur-anti-gagal.jpg"
                },
                {
                    id: "teh-tarik",
                    name: "Teh Tarik Hangat",
                    category: "drinks",
                    description: "Teh tarik creamy untuk teman martabak.",
                    price: 12000,
                    image: "https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?auto=format&fit=crop&w=1200&q=80"
                },
                {
                    id: "pisang-keju",
                    name: "Pisang Keju",
                    category: "snacks",
                    description: "Pisang goreng dengan topping keju dan susu.",
                    price: 18000,
                    image: "https://images.unsplash.com/photo-1606925797303-3fd61f4ebea8?auto=format&fit=crop&w=1200&q=80"
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
            image: "https://asset.kompas.com/crops/D6Ellzm3Gr-3HX4fPOnOMw7TSys=/0x0:739x493/1200x800/data/photo/2020/04/26/5ea5419d24d7e.jpg",
            menu: [
                {
                    id: "salmon-roll",
                    name: "Salmon Roll",
                    category: "signature",
                    description: "Roll salmon segar dengan nori premium.",
                    price: 48000,
                    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1200&q=80"
                },
                {
                    id: "ebi-tempura",
                    name: "Ebi Tempura",
                    category: "snacks",
                    description: "Udang tempura crispy dengan dipping sauce.",
                    price: 38000,
                    image: "https://images.unsplash.com/photo-1607301405390-d831c242f59b?auto=format&fit=crop&w=1200&q=80"
                },
                {
                    id: "miso-soup",
                    name: "Miso Soup",
                    category: "drinks",
                    description: "Sup miso hangat dengan tofu dan wakame.",
                    price: 20000,
                    image: "https://images.unsplash.com/photo-1618841557871-b4664fbf0cb3?auto=format&fit=crop&w=1200&q=80"
                },
                {
                    id: "mochi",
                    name: "Mochi Ice Cream",
                    category: "dessert",
                    description: "Mochi lembut dengan isian es krim.",
                    price: 26000,
                    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=1200&q=80"
                }
            ]
        }
    ];

    const defaultState = {
        user: null,
        cart: [],
        selectedRestaurantId: RESTAURANTS[0].id
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
        getCartSummary
    };
})();
