document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const closeBtn = document.getElementById('closeBtn');

    // menangani pengiriman formulir
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const phoneInput = document.getElementById('phone').value;
            
            // validasi dasar
            if (phoneInput.trim() === '') {
                alert('Silakan masukkan nomor HP Anda.');
                return;
            }

            console.log('mencoba masuk dengan nomor telepon: +62', phoneInput);
            
            // simpan nomor telepon
            localStorage.setItem('loginPhone', `+62 ${phoneInput}`);
            
            // alihkan ke halaman checkout
            window.location.href = 'checkout.html';
        });
    }

    // menangani tombol tutup
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            console.log('tombol tutup diklik');
            alert('Tombol tutup diklik!');
        });
    }
});