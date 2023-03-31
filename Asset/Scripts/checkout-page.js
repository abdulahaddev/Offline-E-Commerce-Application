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

	$('#c-sidebar-subtotal').html(shoppingCart.totalCart());
	$('#c-sidebar-total').html(shoppingCart.totalCart() + 100);
	$('#c-top-counter').attr('data-count', shoppingCart.totalCount());
}

displayCart();

    $(document).on('click', '#cart-box', function (e) {
            e.preventDefault();
            window.location.href = './cart.html';
        });