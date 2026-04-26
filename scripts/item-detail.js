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
    const notesEl = document.querySelector(".notes-input");

    const addBtn = document.getElementById("add-to-cart-btn");

    if (window.basePrice !== undefined) {
        window.basePrice = item.price;
    }

    const sync = () => {
        nameEl.textContent = item.name;
        descEl.textContent = item.description;
        imageEl.src = item.image;
        imageEl.alt = item.name;
        priceEl.textContent = window.AppState.formatRupiah(item.price);
        if (typeof window.updateTotalPrice === 'function') {
            window.updateTotalPrice();
        }
    };

    addBtn.addEventListener("click", () => {
        const qtyEl = document.getElementById('qty-val');
        let finalQty = qtyEl ? parseInt(qtyEl.textContent) : 1;
        let finalNotes = notesEl ? notesEl.value.trim() : "";
        
        let addonsSelected = [];
        document.querySelectorAll('#addon-options .selected').forEach(addon => {
            addonsSelected.push(addon.querySelector('.option-name').textContent);
        });
        
        if(addonsSelected.length > 0) {
            finalNotes += (finalNotes ? " | " : "") + "Tambahan: " + addonsSelected.join(", ");
        }

        const portionSelected = document.querySelector('#portion-options .selected');
        let finalPrice = item.price;
        if(portionSelected) {
             finalPrice += parseInt(portionSelected.dataset.price || 0);
        }

        window.parent.postMessage(
            {
                type: "add-to-cart",
                payload: {
                    restaurantId: restaurant.id,
                    restaurantName: restaurant.name,
                    itemId: item.id,
                    name: item.name,
                    price: finalPrice,
                    image: item.image,
                    qty: finalQty,
                    notes: finalNotes
                }
            },
            "*"
        );
    });

    sync();
});
