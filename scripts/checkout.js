document.addEventListener('DOMContentLoaded', () => {
    const btnPromo = document.getElementById('btnPromo');
    const promoInput = document.getElementById('promoInput');
    const btnOrder = document.getElementById('btnOrder');
    const cutlerySwitch = document.getElementById('cutlerySwitch');
    
    // elements for rendering cart
    const itemsContainer = document.getElementById('checkout-items-container');
    const subtotalText = document.getElementById('subtotal-text');
    const subtotalPrice = document.getElementById('subtotal-price');
    const deliveryFeePrice = document.getElementById('delivery-fee-price');
    const discountPrice = document.getElementById('discount-price');
    const totalPrice = document.getElementById('total-price');

    let appliedDiscount = 0;
    
    function renderCart() {
        if (!window.AppState) return;
        
        const state = window.AppState.loadState();
        if (!state.user) {
            window.AppState.showLoginWarning("checkout.html", "landing_page.html");
            return;
        }
        
        const summary = window.AppState.getCartSummary();
        const restaurantId = state.selectedRestaurant;
        const restaurant = window.AppState.getRestaurantById(restaurantId);
        
        let deliveryFee = restaurant ? restaurant.deliveryFee : 0;
        
        itemsContainer.innerHTML = '';
        
        if (summary.cart.length === 0) {
            itemsContainer.innerHTML = '<p class="text-center body-md text-on-surface-variant my-4">Keranjang kosong</p>';
            btnOrder.disabled = true;
        } else {
            btnOrder.disabled = false;
            summary.cart.forEach((item, index) => {
                const isLast = index === summary.cart.length - 1;
                const borderClass = isLast ? '' : 'border-bottom custom-border-color';
                
                // create item element
                const itemHTML = `
                    <div class="d-flex gap-3 align-items-center py-3 ${borderClass}">
                        <div class="item-img-container flex-shrink-0">
                            <img src="${item.image || '../assets/images/nasi_goreng_spesial.png'}" alt="${item.name}" class="w-100 h-100 object-fit-cover rounded" />
                        </div>
                        <div class="flex-grow-1">
                            <h3 class="body-lg text-on-surface mb-1">${item.name}</h3>
                            ${item.options && item.options.length > 0 ? `<p class="body-md text-on-surface-variant mb-0">${item.options.join(', ')}</p>` : ''}
                        </div>
                        <div class="text-end">
                            <p class="price-text text-on-surface mb-1">${window.AppState.formatRupiah(item.price)}</p>
                            <p class="label-bold text-on-surface-variant mb-0">${item.qty}x</p>
                        </div>
                    </div>
                `;
                itemsContainer.insertAdjacentHTML('beforeend', itemHTML);
            });
        }
        
        // update summary
        const serviceFee = 4000;
        subtotalText.textContent = `Subtotal (${summary.totalItems} item)`;
        subtotalPrice.textContent = window.AppState.formatRupiah(summary.subtotal);
        deliveryFeePrice.textContent = window.AppState.formatRupiah(deliveryFee);
        
        const total = summary.subtotal + deliveryFee + serviceFee - appliedDiscount;
        totalPrice.textContent = window.AppState.formatRupiah(Math.max(0, total));
    }
    
    renderCart();

    // logika kode promo
    if (btnPromo && promoInput) {
        btnPromo.addEventListener('click', () => {
            const code = promoInput.value.trim().toUpperCase();
            if (code === '') {
                alert('Silakan masukkan kode promo terlebih dahulu.');
            } else if (code === 'MABAR50' || code === 'DISKON50') {
                const summary = window.AppState.getCartSummary();
                appliedDiscount = Math.min(summary.subtotal * 0.5, 35000);
                discountPrice.textContent = '-' + window.AppState.formatRupiah(appliedDiscount);
                renderCart();
                alert(`Kode promo "${code}" berhasil diterapkan!`);
            } else {
                alert(`Kode promo "${code}" tidak valid.`);
            }
        });
    }

    // logika opsi alat makan
    if (cutlerySwitch) {
        cutlerySwitch.addEventListener('change', (e) => {
            if (e.target.checked) {
                console.log('pengguna meminta alat makan.');
            } else {
                console.log('pengguna memilih untuk tidak menggunakan alat makan demi menghemat plastik.');
            }
        });
    }

    // logika pemesanan
    if (btnOrder) {
        btnOrder.addEventListener('click', () => {
            console.log('memproses pesanan...');
            
            // tambahkan status memuat
            const originalText = btnOrder.innerHTML;
            btnOrder.innerHTML = `
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Memproses...
            `;
            btnOrder.disabled = true;

            // simulasi penundaan
            setTimeout(() => {
                // Show Bootstrap modal
                const modalEl = document.getElementById('successModal');
                if (modalEl) {
                    const successModal = new bootstrap.Modal(modalEl);
                    successModal.show();
                    window.AppState.clearCart();
                    
                    const btnBackToHome = document.getElementById('btnBackToHome');
                    if (btnBackToHome) {
                        btnBackToHome.addEventListener('click', () => {
                            window.location.href = '../landing_page.html';
                        });
                    }
                } else {
                    alert('Pesanan Anda berhasil dibuat! Menunggu konfirmasi restoran.');
                    window.AppState.clearCart();
                    window.location.href = '../landing_page.html';
                }
            }, 1500);
        });
    }
});