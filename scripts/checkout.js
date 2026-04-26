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
    const balanceText = document.getElementById('user-balance-text');

    let appliedDiscount = 0;
    let finalTotal = 0;
    
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
                        <div class="text-end d-flex flex-column align-items-end gap-2">
                            <p class="price-text text-on-surface mb-0">${window.AppState.formatRupiah(item.price * item.qty)}</p>
                            <div class="d-flex align-items-center gap-3 border rounded-pill px-2 py-1" style="background-color: var(--surface-container); border-color: var(--outline-variant) !important;">
                                <span class="material-symbols-outlined fs-6 text-secondary" style="cursor: pointer;" onclick="updateItemQty('${item.key}', -1)">remove</span>
                                <span class="label-bold text-on-surface" style="min-width: 16px; text-align: center; font-size: 14px;">${item.qty}</span>
                                <span class="material-symbols-outlined fs-6 text-primary-container" style="cursor: pointer; color: var(--primary-container);" onclick="updateItemQty('${item.key}', 1)">add</span>
                            </div>
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
        
        finalTotal = summary.subtotal + deliveryFee + serviceFee - appliedDiscount;
        totalPrice.textContent = window.AppState.formatRupiah(Math.max(0, finalTotal));
        
        // Show balance
        if(balanceText) {
            const currentBalance = state.user.balance || 150000;
            balanceText.textContent = `Saldo: ${window.AppState.formatRupiah(currentBalance)}`;
            if (finalTotal > currentBalance) {
                balanceText.classList.add("text-danger");
            } else {
                balanceText.classList.remove("text-danger");
            }
        }
    }
    
    window.updateItemQty = (itemKey, change) => {
        const summary = window.AppState.getCartSummary();
        const cartItem = summary.cart.find(i => i.key === itemKey);
        if (cartItem) {
            window.AppState.updateCartQty(itemKey, cartItem.qty + change);
            renderCart();
        }
    };
    
    renderCart();

    function showPromoModal(title, msg, isError = false) {
        const modalEl = document.getElementById('promoModal');
        if (modalEl) {
            document.getElementById('promoModalLabel').textContent = title;
            document.getElementById('promoModalMsg').textContent = msg;
            const icon = document.getElementById('promoModalIcon');
            if (isError) {
                icon.textContent = 'error';
                icon.className = 'material-symbols-outlined text-danger';
            } else {
                icon.textContent = 'local_offer';
                icon.className = 'material-symbols-outlined text-success';
            }
            new bootstrap.Modal(modalEl).show();
        } else {
            alert(msg);
        }
    }

    // logika kode promo
    if (btnPromo && promoInput) {
        btnPromo.addEventListener('click', () => {
            const code = promoInput.value.trim().toUpperCase();
            if (code === '') {
                showPromoModal('Oops!', 'Silakan masukkan kode promo terlebih dahulu.', true);
            } else if (code === 'MABAR50' || code === 'DISKON50') {
                const summary = window.AppState.getCartSummary();
                appliedDiscount = Math.min(summary.subtotal * 0.5, 35000);
                discountPrice.textContent = '-' + window.AppState.formatRupiah(appliedDiscount);
                renderCart();
                showPromoModal('Yeay!', `Kode promo "${code}" berhasil diterapkan!`);
            } else if (code === 'DISKON15' || code === 'POTONG15') {
                appliedDiscount = 15000;
                discountPrice.textContent = '-' + window.AppState.formatRupiah(appliedDiscount);
                renderCart();
                showPromoModal('Asyik!', `Kode promo "${code}" berhasil diterapkan! Diskon Rp 15.000.`);
            } else {
                showPromoModal('Oops!', `Kode promo "${code}" tidak valid.`, true);
            }
        });
    }

    // logika promo buttons (tiket)
    const promoBtns = document.querySelectorAll('.promo-ticket-btn');
    promoBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const type = btn.getAttribute('data-promo-type');
            const summary = window.AppState.getCartSummary();
            const state = window.AppState.loadState();
            
            let discount = 0;
            let promoName = "";
            
            if (type === 'diskon50') {
                if (summary.subtotal < 50000) {
                    showPromoModal('Oops!', 'Minimum transaksi Rp 50.000 untuk menggunakan promo ini.', true);
                    return;
                }
                discount = Math.min(summary.subtotal * 0.5, 35000);
                promoName = "Diskon 50%";
            } else if (type === 'freeongkir') {
                const restaurant = window.AppState.getRestaurantById(state.selectedRestaurantId);
                discount = restaurant ? restaurant.deliveryFee : 10000;
                promoName = "Gratis Ongkir";
            } else if (type === 'bogo') {
                const hasKopi = summary.cart.some(item => item.name.toLowerCase().includes('kopi susu'));
                if (!hasKopi) {
                    showPromoModal('Oops!', 'Anda harus membeli Kopi Susu Aren untuk menggunakan promo ini.', true);
                    return;
                }
                discount = 22000; // Harga Kopi Susu Aren
                promoName = "Buy 1 Get 1 Kopi";
            }
            
            appliedDiscount = discount;
            discountPrice.textContent = '-' + window.AppState.formatRupiah(appliedDiscount);
            renderCart();
            showPromoModal('Asyik!', `Promo "${promoName}" berhasil diterapkan! Diskon: ${window.AppState.formatRupiah(discount)}`);
            
            // Set input value just for visual feedback
            if (promoInput) promoInput.value = promoName.toUpperCase();
        });
    });

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
            const state = window.AppState.loadState();
            const currentBalance = state.user.balance || 150000;
            
            if (finalTotal > currentBalance) {
                const topupModalEl = document.getElementById('topupModal');
                if(topupModalEl) {
                    const topupModal = new bootstrap.Modal(topupModalEl);
                    topupModal.show();
                } else {
                    alert('Saldo tidak cukup. Silakan Top Up terlebih dahulu.');
                }
                return;
            }

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