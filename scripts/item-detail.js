document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const restaurantId = params.get("restaurant");
    const itemId = params.get("item");

    const restaurant = window.AppState.getRestaurantById(restaurantId);
    const item = window.AppState.getItemById(restaurant.id, itemId);

    const nameEl = document.getElementById("detail-name");
    const descEl = document.getElementById("detail-desc");
    const imageEl = document.getElementById("detail-image");
    const priceEl = document.getElementById("detail-price");
    const qtyEl = document.getElementById("detail-qty");
    const notesEl = document.getElementById("detail-notes");

    const decreaseBtn = document.getElementById("qty-decrease");
    const increaseBtn = document.getElementById("qty-increase");
    const closeBtn = document.getElementById("detail-close");
    const addBtn = document.getElementById("add-order");

    let qty = 1;

    const sync = () => {
        nameEl.textContent = item.name;
        descEl.textContent = item.description;
        imageEl.src = item.image;
        imageEl.alt = item.name;
        qtyEl.textContent = String(qty);
        priceEl.textContent = window.AppState.formatRupiah(item.price * qty);
    };

    decreaseBtn.addEventListener("click", () => {
        qty = Math.max(1, qty - 1);
        sync();
    });

    increaseBtn.addEventListener("click", () => {
        qty += 1;
        sync();
    });

    closeBtn.addEventListener("click", () => {
        window.parent.postMessage({ type: "close-item-detail" }, "*");
    });

    addBtn.addEventListener("click", () => {
        window.parent.postMessage(
            {
                type: "add-to-cart",
                payload: {
                    restaurantId: restaurant.id,
                    restaurantName: restaurant.name,
                    itemId: item.id,
                    name: item.name,
                    price: item.price,
                    image: item.image,
                    qty,
                    notes: notesEl.value.trim()
                }
            },
            "*"
        );
    });

    sync();
});
