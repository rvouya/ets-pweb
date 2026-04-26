document.addEventListener('DOMContentLoaded', () => {
    const btnPromo = document.getElementById('btnPromo');
    const promoInput = document.getElementById('promoInput');
    const btnOrder = document.getElementById('btnOrder');
    const cutlerySwitch = document.getElementById('cutlerySwitch');

    // logika kode promo
    if (btnPromo && promoInput) {
        btnPromo.addEventListener('click', () => {
            const code = promoInput.value.trim().toUpperCase();
            if (code === '') {
                alert('Silakan masukkan kode promo terlebih dahulu.');
            } else {
                alert(`Kode promo "${code}" berhasil diterapkan!`);
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
                alert('Pesanan Anda berhasil dibuat! Menunggu konfirmasi restoran.');
                
                // kembalikan status tombol
                btnOrder.innerHTML = originalText;
                btnOrder.disabled = false;
            }, 1500);
        });
    }
});