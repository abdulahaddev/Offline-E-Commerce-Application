// indexedDB Load

var shoppingCart = (function () {

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
	return obj;
})();


function displayCart() {
	var cartArray = shoppingCart.listCart();
	var output = '';
	for (var i in cartArray) {
		output += 

			`<div class="c-cart-item">
				<div class="c-item-delete">
					<a href="#" id="c-cart-item-delete" data-name="${cartArray[i].name}"><i class="fa-solid fa-trash"></i></a>
				</div>
				<div class="c-item-image">
					<img src="./Asset/Images/Products/${cartArray[i].imagesrc}" alt="">
				</div>
				<div class="c-item-title">
					<h3>${cartArray[i].name}</h3>
				</div>
				<div class="c-item-price">
					<h4>৳ <span id="c-item-price">${cartArray[i].price}</span></h4>
				</div>
				<div class="c-item-counter">
					<button id="c-btn-minus" class="btn-minus" data-name="${cartArray[i].name}">-</button>
					<input id="c-input-counter" class="input-counter" value="${cartArray[i].count}" type="text" name="" id="" readonly>
					<button id="c-btn-plus" class="btn-plus" data-name="${cartArray[i].name}">+</button>
				</div>
				<div class="c-item-subtotal">
					<h3>৳ <span id="c-item-subtotal">${cartArray[i].count * cartArray[i].price}</span></h3>
				</div>
			</div>`;
	}
	
	$('#c-cart-item-container').html(output);
	$('#c-sidebar-subtotal').html(shoppingCart.totalCart());
	$('#c-sidebar-total').html(shoppingCart.totalCart() + 100);
	$('#c-top-counter').attr('data-count', shoppingCart.totalCount());
	
}

// Delete item button
$(document).on('click', '#c-cart-item-delete', function () {
	var name = $(this).data('name');
	shoppingCart.removeItemFromCartAll(name);
	displayCart();
});

// -1
$(document).on('click', '#c-btn-minus', function () {
	var name = $(this).data('name');
	shoppingCart.removeItemFromCart(name);
	displayCart();
});

// +1
$(document).on('click', '#c-btn-plus', function () {
	var name = $(this).data('name');
	shoppingCart.addItemToCart(name);
	displayCart();
});

$(document).on('click', '.btn-c-sidebar-checkout', function () {
	window.location.href = './checkout.html';
});

displayCart();