document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const closeBtn = document.getElementById('closeBtn');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const phoneInput = document.getElementById('phone').value;
            
            if (phoneInput.trim() === '') {
                alert('Silakan masukkan nomor HP Anda.');
                return;
            }

            console.log('mencoba masuk dengan nomor telepon: +62', phoneInput);
            
            localStorage.setItem('loginPhone', `+62 ${phoneInput}`);
            
            window.location.href = 'checkout.html';
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            console.log('tombol tutup diklik');
            alert('Tombol tutup diklik!');
        });
    }
});