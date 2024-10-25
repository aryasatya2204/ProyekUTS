// // Function to clean and format the price string into a number
// function extractPrice(priceString) {
//     return parseFloat(priceString.replace(/[^0-9,-]+/g, '').replace(',', '.'));
// }

// // Mengambil data produk dari sessionStorage
// const product = JSON.parse(sessionStorage.getItem('selectedProduct'));

// // Jika data produk ada, tampilkan di halaman
// if (product) {
//     document.getElementById('product-image').src = product.image || '/api/placeholder/400/400';
//     document.getElementById('product-title').textContent = product.title || 'Nama Produk';
//     document.getElementById('product-price').textContent = product.price || 'Harga tidak tersedia';
//     document.getElementById('product-original-price').textContent = product.originalPrice || '';
//     document.getElementById('product-rating').textContent = product.rating || '0';
//     document.getElementById('product-sold').textContent = product.sold || '0';
//     document.getElementById('product-description').textContent = product.description || 'Deskripsi tidak tersedia';
// }

// // Mengelola jumlah produk
// let quantity = 1;
// const quantityElement = document.getElementById('quantity');

// document.getElementById('quantity-decrease').addEventListener('click', () => {
//     quantity = Math.max(1, quantity - 1);
//     quantityElement.textContent = quantity;
// });

// document.getElementById('quantity-increase').addEventListener('click', () => {
//     quantity += 1;
//     quantityElement.textContent = quantity;
// });

// // Function to update the cart count in the navbar
// function updateCartCount() {
//     let cart = JSON.parse(localStorage.getItem('cart')) || [];
//     const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
//     document.getElementById('cart-count').textContent = totalItems;
// }

// // Function to show temporary notification
// function showNotification() {
//     const notification = document.createElement('div');
//     notification.style.cssText = `
//         position: fixed;
//         top: 20px;
//         right: 20px;
//         background-color: #4CAF50;
//         color: white;
//         padding: 15px 25px;
//         border-radius: 5px;
//         z-index: 1000;
//         transition: opacity 0.5s;
//     `;
//     notification.textContent = 'Produk berhasil ditambahkan ke keranjang';
//     document.body.appendChild(notification);

//     // Fade out and remove after 2 seconds
//     setTimeout(() => {
//         notification.style.opacity = '0';
//         setTimeout(() => {
//             document.body.removeChild(notification);
//         }, 500);
//     }, 2000);
// }

// // Tombol tambah ke keranjang
// document.getElementById('add-to-cart').addEventListener('click', () => {
//     let cart = JSON.parse(localStorage.getItem('cart')) || [];
//     const productPrice = extractPrice(product.price);
//     const cartItem = {
//         ...product,
//         price: productPrice,
//         quantity: quantity
//     };

//     const existingProduct = cart.find(item => item.title === product.title);
//     if (existingProduct) {
//         existingProduct.quantity += quantity;
//     } else {
//         cart.push(cartItem);
//     }

//     localStorage.setItem('cart', JSON.stringify(cart));
//     updateCartCount();
//     showNotification(); // Tampilkan notifikasi yang akan hilang otomatis
// });

// // Initialize cart count when the page loads
// document.addEventListener('DOMContentLoaded', updateCartCount);

// // Tombol beli sekarang
// document.getElementById('buy-now').addEventListener('click', () => {
//     alert(`Melanjutkan ke pembayaran dengan ${quantity} produk`);
// });

// // Navigasi ke halaman keranjang saat ikon keranjang diklik
// document.querySelector('.nav-link.me-3').addEventListener('click', (e) => {
//     e.preventDefault();
//     window.location.href = 'cart-page.html';
// });


// Function to clean and format the price string into a number
function extractPrice(priceString) {
    return parseFloat(priceString.replace(/[^0-9,-]+/g, '').replace(',', '.'));
}

// Tunggu hingga halaman sepenuhnya dimuat sebelum mengakses elemen DOM
document.addEventListener('DOMContentLoaded', () => {
    // Mengambil data produk dari sessionStorage
    const product = JSON.parse(sessionStorage.getItem('selectedProduct'));
    
    // Mengambil referensi semua elemen yang diperlukan
    const productImage = document.getElementById('product-image');
    const productTitle = document.getElementById('product-title');
    const productPrice = document.getElementById('product-price');
    const productOriginalPrice = document.getElementById('product-original-price');
    const productRating = document.getElementById('product-rating');
    const productSold = document.getElementById('product-sold');
    const productDescription = document.getElementById('product-description');
    const addToCartBtn = document.getElementById('add-to-cart');
    const buyNowBtn = document.getElementById('buy-now');
    const cartLink = document.querySelector('.nav-link.me-3');
    const quantityDecreaseBtn = document.getElementById('quantity-decrease');
    const quantityIncreaseBtn = document.getElementById('quantity-increase');
    const quantityElement = document.getElementById('quantity');

    // Validasi keberadaan elemen sebelum menggunakannya
    if (product) {
        if (productImage) productImage.src = product.image || '/api/placeholder/400/400';
        if (productTitle) productTitle.textContent = product.title || 'Nama Produk';
        if (productPrice) productPrice.textContent = product.price || 'Harga tidak tersedia';
        if (productOriginalPrice) productOriginalPrice.textContent = product.originalPrice || '';
        if (productRating) productRating.textContent = product.rating || '0';
        if (productSold) productSold.textContent = product.sold || '0';
        if (productDescription) productDescription.textContent = product.description || 'Deskripsi tidak tersedia';
    } else {
        console.warn('Tidak ada data produk yang tersedia');
    }

    // Mengelola jumlah produk
    let quantity = 1;
    
    if (quantityElement) {
        quantityElement.textContent = quantity;
    }

    if (quantityDecreaseBtn) {
        quantityDecreaseBtn.addEventListener('click', () => {
            quantity = Math.max(1, quantity - 1);
            if (quantityElement) quantityElement.textContent = quantity;
        });
    }

    if (quantityIncreaseBtn) {
        quantityIncreaseBtn.addEventListener('click', () => {
            quantity += 1;
            if (quantityElement) quantityElement.textContent = quantity;
        });
    }

    // Event listener untuk tombol tambah ke keranjang
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const productPrice = product ? extractPrice(product.price) : 0;
            const cartItem = {
                ...product,
                price: productPrice,
                quantity: quantity
            };

            const existingProduct = cart.find(item => item.title === product.title);
            if (existingProduct) {
                existingProduct.quantity += quantity;
            } else {
                cart.push(cartItem);
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            showNotification();
        });
    }

    // Event listener untuk tombol beli sekarang
    if (buyNowBtn) {
        buyNowBtn.addEventListener('click', () => {
            alert(`Melanjutkan ke pembayaran dengan ${quantity} produk`);
        });
    }

    // Event listener untuk navigasi ke keranjang
    if (cartLink) {
        cartLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'cart-page.html';
        });
    }

    // Initialize cart count
    updateCartCount();
});

// Function to update the cart count in the navbar
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.textContent = totalItems;
    }
}

// Function to show temporary notification
function showNotification() {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #4CAF50;
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        z-index: 1000;
        transition: opacity 0.5s;
    `;
    notification.textContent = 'Produk berhasil ditambahkan ke keranjang';
    document.body.appendChild(notification);

    // Fade out and remove after 2 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 2000);
}