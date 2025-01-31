function changeImage(element) {
    const mainImage = document.getElementById('main-image');
    mainImage.src = element.src;
}




// // about.js

// let cart = [];
// let cartCount = 0;

// function addToCart() {
//     // جلب بيانات المنتج تلقائيًا من الصفحة
//     const productName = document.querySelector('.product-title').textContent.trim();
//     const productPriceText = document.querySelector('.product-price strong').textContent.trim();
//     const productPrice = parseFloat(productPriceText.replace(' AED', ''));

//     const product = {
//         name: productName,
//         price: productPrice,
//         quantity: 1
//     };

//     // التحقق من وجود المنتج في السلة
//     const existingProduct = cart.find(item => item.name === product.name);
//     if (existingProduct) {
//         existingProduct.quantity += 1;
//     } else {
//         cart.push(product);
//     }

//     cartCount += 1;
//     updateCartUI();
// }

// function updateCartUI() {
//     const cartItems = document.getElementById('cart-items');
//     const cartCountElement = document.getElementById('cart-count');
//     const cartTotalElement = document.getElementById('cart-total');
//     cartItems.innerHTML = '';

//     let total = 0;

//     cart.forEach(item => {
//         const cartItem = document.createElement('div');
//         cartItem.className = 'cart-item';
//         cartItem.innerHTML = `
//             <p>${item.name} - ${item.price} AED</p>
//             <div class="quantity-controls">
//                 <button onclick="decreaseQuantity('${item.name}')">-</button>
//                 <span>${item.quantity}</span>
//                 <button onclick="increaseQuantity('${item.name}')">+</button>
//             </div>
//             <button onclick="removeItem('${item.name}')">حذف</button>
//         `;
//         cartItems.appendChild(cartItem);

//         total += item.price * item.quantity;
//     });

//     cartCountElement.textContent = cartCount;
//     cartTotalElement.textContent = `الإجمالي: ${total.toFixed(2)} AED`;
// }

// function increaseQuantity(productName) {
//     const product = cart.find(item => item.name === productName);
//     if (product) {
//         product.quantity += 1;
//         cartCount += 1;
//         updateCartUI();
//     }
// }

// function decreaseQuantity(productName) {
//     const product = cart.find(item => item.name === productName);
//     if (product && product.quantity > 1) {
//         product.quantity -= 1;
//         cartCount -= 1;
//         updateCartUI();
//     }
// }

// function removeItem(productName) {
//     const productIndex = cart.findIndex(item => item.name === productName);
//     if (productIndex !== -1) {
//         cartCount -= cart[productIndex].quantity;
//         cart.splice(productIndex, 1);
//         updateCartUI();
//     }
// }

// function toggleCart() {
//     const cartSidebar = document.getElementById('cart-sidebar');
//     cartSidebar.classList.toggle('active');
// }

// function openOrderForm() {
//     const orderForm = document.getElementById('orderForm');
//     const orderDetails = document.getElementById('orderDetails');
//     orderDetails.innerHTML = '';

//     cart.forEach(item => {
//         const orderItem = document.createElement('p');
//         orderItem.textContent = `${item.name} - ${item.quantity} x ${item.price} AED`;
//         orderDetails.appendChild(orderItem);
//     });

//     orderForm.style.display = 'block';
// }

// function closeOrderForm() {
//     const orderForm = document.getElementById('orderForm');
//     orderForm.style.display = 'none';
// }

// function submitOrder() {
//     const userName = document.getElementById('userName').value;
//     const userAddress = document.getElementById('userAddress').value;
//     const userPhone = document.getElementById('userPhone').value;

//     if (userName && userAddress && userPhone) {
//         alert('تم إرسال الطلب بنجاح!');
//         cart = [];
//         cartCount = 0;
//         updateCartUI();
//         closeOrderForm();
//     } else {
//         alert('يرجى ملء جميع الحقول المطلوبة.');
//     }
// }










// function updateCartUI() {
//     const cartItems = document.getElementById('cart-items');
//     const cartCountElement = document.getElementById('cart-count');
//     const cartTotalElement = document.getElementById('cart-total');
//     cartItems.innerHTML = '';

//     let total = 0;

//     cart.forEach(item => {
//         const cartItem = document.createElement('div');
//         cartItem.className = 'cart-item';
//         cartItem.innerHTML = `
//             <div class="cart-item-image">
//                 <img src="${item.image}" alt="${item.name}" />
//             </div>
//             <div class="cart-item-details">
//                 <p class="cart-item-name">${item.name}</p>
//                 <p class="cart-item-price">${item.price} AED</p>
//                 <div class="quantity-controls">
//                     <button onclick="decreaseQuantity('${item.name}')">-</button>
//                     <span>${item.quantity}</span>
//                     <button onclick="increaseQuantity('${item.name}')">+</button>
//                 </div>
//                 <button class="remove-item" onclick="removeItem('${item.name}')">حذف</button>
//             </div>
//         `;
//         cartItems.appendChild(cartItem);

//         total += item.price * item.quantity;
//     });

//     cartCountElement.textContent = cartCount;
//     cartTotalElement.textContent = `الإجمالي: ${total.toFixed(2)} AED`;
// }

// function addToCart() {
//     // جلب بيانات المنتج تلقائيًا من الصفحة
//     const productName = document.querySelector('.product-title').textContent.trim();
//     const productPriceText = document.querySelector('.product-price strong').textContent.trim();
//     const productPrice = parseFloat(productPriceText.replace(' AED', ''));
//     const productImage = document.getElementById('main-image').src; // جلب صورة المنتج

//     const product = {
//         name: productName,
//         price: productPrice,
//         quantity: 1,
//         image: productImage // إضافة صورة المنتج
//     };

//     // التحقق من وجود المنتج في السلة
//     const existingProduct = cart.find(item => item.name === product.name);
//     if (existingProduct) {
//         existingProduct.quantity += 1;
//     } else {
//         cart.push(product);
//     }

//     cartCount += 1;
//     updateCartUI();
// }






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