function changeImage(element) {
    const mainImage = document.getElementById('main-image');
    mainImage.src = element.src;
}



// دالة لتحميل عربة التسوق من الذاكرة المحلية
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// دالة إضافة المنتج إلى العربة
function addToCart() {
    const product = {
        name: document.querySelector('.product-title').innerText,
        price: parseFloat(document.querySelector('.product-price strong').innerText.split(' ')[0]),
        image: document.getElementById('main-image').src,
        quantity: 1
    };

    const existingItem = cart.find(item => item.name === product.name);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push(product);
    }

    saveCart();
    updateCartCount();
    renderCartItems();
}

// تحديث عدد العناصر في العربة
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;
}

// عرض العناصر في العربة
function renderCartItems() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    
    let total = 0;
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" width="50">
            <div>
                <h4>${item.name}</h4>
                <p>${item.price} AED x ${item.quantity} = ${itemTotal} AED</p>
                <input type="number" min="1" value="${item.quantity}" data-index="${index}">
                <button onclick="removeCartItem(${index})">إزالة</button>
            </div>
        `;

        itemElement.querySelector('input').addEventListener('change', function() {
            const newQty = parseInt(this.value);
            if (newQty >= 1) {
                cart[index].quantity = newQty;
                saveCart();
                renderCartItems();
                updateCartCount();
            }
        });
        
        cartItems.appendChild(itemElement);
    });
    
    document.getElementById('cart-total').innerHTML = `الإجمالي<br>${total} AED`;
}

// إزالة عنصر من العربة
function removeCartItem(index) {
    cart.splice(index, 1);
    saveCart();
    renderCartItems();
    updateCartCount();
}

// تبديل عرض العربة
function toggleCart() {
    document.getElementById('cart-sidebar').classList.toggle('active');
}

// إدارة نموذج الطلب
function openOrderForm() {
    // إغلاق السلة عند فتح نموذج الطلب
    document.getElementById('cart-sidebar').classList.remove('active');
    
    document.getElementById('orderForm').style.display = 'block';
    document.getElementById('orderDetails').innerHTML = cart
        .map(item => `${item.name} (${item.quantity} x ${item.price} AED)`)
        .join('<br>');
}

function closeOrderForm() {
    document.getElementById('orderForm').style.display = 'none';
}

// إرسال الطلب عبر واتساب
function submitOrder() {
    const name = document.getElementById('userName').value;
    const address = document.getElementById('userAddress').value;
    const phone = document.getElementById('userPhone').value;
    
    if (!name || !address || !phone) {
        alert('يرجى ملء جميع الحقول المطلوبة');
        return;
    }
    
    const message = `طلب جديد%0A%0Aالاسم: ${name}%0Aالعنوان: ${address}%0Aالهاتف: ${phone}%0A%0Aالمنتجات:%0A${cart
        .map(item => `- ${item.name} (${item.quantity} x ${item.price} AED)`).join('%0A')}%0A%0Aالإجمالي: ${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)} AED`;
    
    window.open(`https://wa.me/201500380857?text=${message}`, '_blank');
    
    // تفريغ العربة بعد الطلب
    cart = [];
    saveCart();
    updateCartCount();
    renderCartItems();
    closeOrderForm();
}

// تهيئة أولية عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    renderCartItems();
    updateCartCount();
});

