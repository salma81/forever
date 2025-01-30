
const swiper = new Swiper('.swiper', {
    loop: true,   
    slidesPerView: 3,    // عرض 3 منتجات في الشاشات الكبيرة
    spaceBetween: 20,   
    pagination: {
        el: '.swiper-pagination',
        clickable: true,   
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {    
        320: {
            slidesPerView: 1,    
            spaceBetween: 10, 
        },
        640: {
            slidesPerView: 2,     
            spaceBetween: 15,
        },
        1024: {
            slidesPerView: 3,     
            spaceBetween: 20,
        },
    },
});


function toggleMenu() {
    const sideMenu = document.getElementById('sideMenu');
    sideMenu.classList.toggle('open');
}


document.addEventListener("DOMContentLoaded", () => {
    const cart = document.querySelector('#cart');
    const cartModalOverlay = document.querySelector('.cart-modal-overlay');
    const closeBtn = document.querySelector('#close-btn');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const productRows = document.querySelector('.product-rows');
    const cartQuantity = document.querySelector('.cart-quantity');
    const purchaseBtn = document.querySelector('#purchaseBtn');
    const orderForm = document.querySelector('.order-form');
    const sendOrderBtn = document.querySelector('#sendOrder');
    const userNameInput = document.querySelector('#userName');
    const userAddressInput = document.querySelector('#userAddress');
    const userPhoneInput = document.querySelector('#userPhone');
    const closeFormBtn = document.querySelector('#close-form-btn');
    const currencySelect = document.querySelector('#currency'); 
    const currencySymbolSpan = document.querySelector('.currency-symbol');

    let cartItems = [];
    let currentCurrency = 'AED';
    const exchangeRates = {
        AED: 1,
        USD: 0.27,
        SAR: 1.02
    };

    // إضافة منتجات للعربة
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const product = event.target.closest('.card-item');
            const priceText = product.querySelector('.price').innerText;
            const imageSrc = product.querySelector('img').src;
            const productName = product.querySelector('.product-name').innerText;
            const price = parseFloat(priceText.split(" ")[0]);
            const currency = priceText.split(" ")[1];
            addItemToCart(price, imageSrc, productName, currency);
        });
    });

    function addItemToCart(price, imageSrc, productName, currency) {
        const existingItem = cartItems.find(item => item.imageSrc === imageSrc);
        if (existingItem) {
            alert('This item has already been added to the cart');
            return;
        }

        const productRow = document.createElement('div');
        productRow.classList.add('product-row');
        productRow.innerHTML = `
            <img class="cart-image" src="${imageSrc}" alt="Product">
            <span class="cart-price">${convertPrice(price, currency, currentCurrency)} ${currentCurrency}</span>
            <input class="product-quantity" type="number" value="1" min="1">
            <button class="remove-btn">Remove</button>
        `;

        productRow.querySelector('.remove-btn').addEventListener('click', () => {
            removeItemFromCart(productRow);
        });

        productRow.querySelector('.product-quantity').addEventListener('change', (e) => {
            const quantity = parseInt(e.target.value);
            const item = cartItems.find(item => item.imageSrc === imageSrc);
            item.quantity = quantity;
            updateCartPrice();
        });

        productRows.appendChild(productRow);
        cartItems.push({ price, imageSrc, productName, currency, quantity: 1 });
        updateCartPrice();
        updateCartQuantity();
    }

    function removeItemFromCart(productRow) {
        const index = [...productRows.children].indexOf(productRow);
        cartItems.splice(index, 1);
        productRow.remove();
        updateCartPrice();
        updateCartQuantity();
    }

    function updateCartQuantity() {
        cartQuantity.textContent = cartItems.length;
    }

    function updateCartPrice() {
        let total = 0;
        cartItems.forEach(item => {
            total += item.quantity * convertPrice(item.price, item.currency, currentCurrency);
        });
        document.querySelector('.total-price').textContent = `${Math.round(total)} ${currentCurrency}`;

        // تحديث الأسعار في السلة
        const rows = document.querySelectorAll('.product-row');
        rows.forEach((row, index) => {
            const priceElement = row.querySelector('.cart-price');
            const item = cartItems[index];
            const newPrice = Math.round(convertPrice(item.price, item.currency, currentCurrency) * item.quantity);
            priceElement.textContent = `${newPrice} ${currentCurrency}`;
        });
    }

    function convertPrice(price, fromCurrency, toCurrency) {
        const basePrice = price / exchangeRates[fromCurrency];
        return basePrice * exchangeRates[toCurrency];
    }

    // تحديث العملة المختارة
    currencySelect.addEventListener('change', (e) => {
        currentCurrency = e.target.value;
        updateCartPrice();
    });

    // فتح واغلاق عربة التسوق
    cart.addEventListener('click', () => {
        cartModalOverlay.style.transform = cartModalOverlay.style.transform === 'translateX(0)' ? 'translateX(100%)' : 'translateX(0)';
    });

    closeBtn.addEventListener('click', () => {
        cartModalOverlay.style.transform = 'translateX(100%)';
    });

    purchaseBtn.addEventListener('click', () => {
        cartModalOverlay.style.transform = 'translateX(100%)';
        orderForm.style.display = 'block';
    });

    closeFormBtn.addEventListener('click', () => {
        orderForm.style.display = 'none';
    });

    sendOrderBtn.addEventListener('click', () => {
        const userName = userNameInput.value.trim();
        const userAddress = userAddressInput.value.trim();
        const userPhone = userPhoneInput.value.trim();

        if (!userName || !userAddress || !userPhone) {
            alert('يرجى ملء جميع الحقول');
            return;
        }

        let orderMessage = `تفاصيل الطلب:
        الاسم: ${userName}
        العنوان: ${userAddress}
        الهاتف: ${userPhone}
        المنتجات:`;

        cartItems.forEach(item => {
            orderMessage += `\n- المنتج: ${item.productName}\n  السعر: ${Math.round(convertPrice(item.price, item.currency, currentCurrency))} ${currentCurrency}\n  الكمية: ${item.quantity}`;
        });

        const totalOrderPrice = cartItems.reduce((total, item) => total + convertPrice(item.price, item.currency, currentCurrency) * item.quantity, 0);
        orderMessage += `\nإجمالي السعر: ${Math.round(totalOrderPrice)} ${currentCurrency}`;

        const phoneNumber = '201500380857';
        const encodedMessage = encodeURIComponent(orderMessage);
        const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        window.open(url, '_blank');

        orderForm.style.display = 'none';
        cartItems = [];
        productRows.innerHTML = '';
        updateCartPrice();
        updateCartQuantity();
    });
});


function toggleAnswer(item) {
    item.classList.toggle('open');
  }




  






























