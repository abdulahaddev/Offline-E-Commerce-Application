// indexedDB Load


var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;
window.IDBCursor = window.IDBCursor || window.webkitIDBCursor;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange;

var db;
var currentEdit = null;

var openReq = indexedDB.open('AmarTechShop', 1);

openReq.onsuccess = function (e) {
	db = e.target.result;
};


// ************************************************
// Shopping Cart API
// ************************************************
var shoppingCart = (function () {
	// =============================
	// Private methods and propeties
	// =============================
	cart = [];

	// Constructor
	function Item(name, price, imagesrc, count) {
		this.name = name;
		this.price = price;
		this.imagesrc = imagesrc;
		this.count = count;
	}

	// Save cart
	function saveCart() {
		localStorage.setItem('shoppingCart', JSON.stringify(cart));
	}

	// Load cart
	function loadCart() {
		cart = JSON.parse(localStorage.getItem('shoppingCart'));
	}
	if (localStorage.getItem('shoppingCart') != null) {
		loadCart();
	}


	// =============================
	// Public methods and propeties
	// =============================
	var obj = {};

	// Add to cart
	obj.addItemToCart = function (name, price, imagesrc, count) {
		for (var item in cart) {
			if (cart[item].name === name) {
				cart[item].count++;
				saveCart();
				return;
			}
		}
		var item = new Item(name, price, imagesrc, count);
		cart.push(item);
		saveCart();
	};
	// Set count from item
	obj.setCountForItem = function (name, count) {
		for (var i in cart) {
			if (cart[i].name === name) {
				cart[i].count = count;
				break;
			}
		}
	};
	// Remove item from cart
	obj.removeItemFromCart = function (name) {
		for (var item in cart) {
			if (cart[item].name === name) {
				cart[item].count--;
				if (cart[item].count === 0) {
					cart.splice(item, 1);
				}
				break;
			}
		}
		saveCart();
	};

	// Remove all items from cart
	obj.removeItemFromCartAll = function (name) {
		for (var item in cart) {
			if (cart[item].name === name) {
				cart.splice(item, 1);
				break;
			}
		}
		saveCart();
	};

	// Clear cart
	obj.clearCart = function () {
		cart = [];
		saveCart();
	};

	// Count cart 
	obj.totalCount = function () {
		var totalCount = 0;
		for (var item in cart) {
			totalCount += cart[item].count;
		}
		return totalCount;
	};

	// Total cart
	obj.totalCart = function () {
		var totalCart = 0;
		for (var item in cart) {
			totalCart += cart[item].price * cart[item].count;
		}
		return Number(totalCart.toFixed(2));
	};

	// List cart
	obj.listCart = function () {
		var cartCopy = [];
		for (i in cart) {
			item = cart[i];
			itemCopy = {};
			for (p in item) {
				itemCopy[p] = item[p];

			}
			itemCopy.total = Number(item.price * item.count).toFixed(2);
			cartCopy.push(itemCopy);
		}
		return cartCopy;
	};

	// cart : Array
	// Item : Object/Class
	// addItemToCart : Function
	// removeItemFromCart : Function
	// removeItemFromCartAll : Function
	// clearCart : Function
	// countCart : Function
	// totalCart : Function
	// listCart : Function
	// saveCart : Function
	// loadCart : Function
	return obj;
})();


// *****************************************
// Triggers / Events
// ***************************************** 
// Add item


$(document).on('click', '.add-to-cart', function (event) {
	event.preventDefault();
	var productId = $(this).data('product-id');

	var transaction = db.transaction(['Products'], 'readwrite');
	var objStore = transaction.objectStore('Products');
    
	var request = objStore.get(parseInt(productId));

	request.onsuccess = function(){
		var result = request.result;
		var name = result.ProductTitle;
		var price = Number(result.ProductPrice);
		var imagesrc = result.ProductImage;
		shoppingCart.addItemToCart(name, price, imagesrc, 1);
		displayCart();
	};
	$('#cart-box').click();
});

// Clear items
$('.clear-cart').click(function () {
	shoppingCart.clearCart();
	displayCart();
});


function displayCart() {
	var cartArray = shoppingCart.listCart();
	var output = '';
	for (var i in cartArray) {
		output += 

        `<div class="cart-item">
            <div class="item-image">
                <img src="./Asset/Images/Products/${cartArray[i].imagesrc}" alt="">
            </div>
            <div class="item-info">
                <h4 class="item-title">${cartArray[i].name}</h4>
                <div class="item-counter">
                    <button class="btn-minus" data-name="${cartArray[i].name}">-</button>
                    <input class="input-counter" value="${cartArray[i].count}" type="text" name="" id="" readonly>
                    <button class="btn-plus" data-name="${cartArray[i].name}">+</button>
                </div>
                <div class="item-quantity-price"><span>${cartArray[i].count} x </span><span class="amount">৳ ${cartArray[i].price}</span></div>
            </div>
            <div class="item-cancel">
                <i class="delete-item fa-solid fa-trash" data-name="${cartArray[i].name}"></i>
            </div>
        </div>`;
	}
	$('.cart-body').html(output);
	$('.cart-subtotal .subtotal').html(shoppingCart.totalCart());
	$('#cart-box .fa-stack[data-count]').attr('data-count', shoppingCart.totalCount());
}

// Delete item button
$(document).on('click', '.item-cancel .delete-item', function () {
	var name = $(this).data('name');
	shoppingCart.removeItemFromCartAll(name);
	displayCart();
});

// -1
$(document).on('click', '.item-counter .btn-minus', function () {
	var name = $(this).data('name');
	shoppingCart.removeItemFromCart(name);
	displayCart();
});

// +1
$(document).on('click', '.item-counter .btn-plus', function () {
	var name = $(this).data('name');
	shoppingCart.addItemToCart(name);
	displayCart();
});

// Item count input
$('.show-cart').on('change', '.item-count', function () {
	var name = $(this).data('name');
	var count = Number($(this).val());
	shoppingCart.setCountForItem(name, count);
	displayCart();
});

displayCart();