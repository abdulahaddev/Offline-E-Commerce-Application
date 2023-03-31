
$(document).ready(function () {
	var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

	window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;
	window.IDBCursor = window.IDBCursor || window.webkitIDBCursor;
	window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange;

	var db;
    
	var openReq = indexedDB.open('AmarTechShop', 1);
	openReq.onupgradeneeded = function (e) {
		db = e.target.result;
		var store = db.createObjectStore('Products', { keyPath: 'id', autoIncrement: true });
		console.log(store);
	};

	openReq.onsuccess = function (e) {
		db = e.target.result;
		console.log(db);
		loadProducts();
	};


	// Product search using search box

	$('#search-icon').on('click', function(){
		// alert('hello');
		var searchText = $('#search-box').val();

		$('#product-grid').empty();
		var tx = db.transaction(['Products'], 'readonly');
		var req = tx.objectStore('Products').openCursor();
		req.onsuccess = function (e) {
			var cursor = e.target.result;
			if (!cursor) return;
			if (cursor.value.ProductCategory == 'Modules' && cursor.value.ProductTitle.toLowerCase().includes(searchText.toLowerCase())){
				$('#product-grid').append(
					`<div class= "product-container" >
            <div class="product">
                <div class="product-card">
                    <img src="./Asset/Images/Products/${cursor.value.ProductImage}" onerror="this.onerror = null; this.src='./Asset/Images/Products/product-default-image.png'" alt="">
                </div>
                <div class="product-info">
                    <h3 class="product-title">${cursor.value.ProductTitle}</h3>
                    <label class="category-label">${cursor.value.ProductCategory}</label>
                    <span class="price">৳ ${cursor.value.ProductPrice}</span>
                    <button class="add-to-cart" data-product-id="${cursor.key}">Add to cart</button>
                </div>
            </div>
            </div>`
				);
			}
			cursor.continue();
		};
		req.onerror = function (err) {
			console.log(err);
		};

	});

	function loadProducts() {
		$('#product-grid').empty();
		var tx = db.transaction(['Products'], 'readonly');
		var req = tx.objectStore('Products').openCursor();
		req.onsuccess = function (e) {
			var cursor = e.target.result;
			if (!cursor) return;
			if(cursor.value.ProductCategory == 'Modules')
			{
				$('#product-grid').append(
					`<div class= "product-container" >
				<div class="product">
					<div class="product-card">
						<img src="./Asset/Images/Products/${cursor.value.ProductImage}" onerror="this.onerror = null; this.src='./Asset/Images/Products/product-default-image.png'" alt="">
					</div>
					<div class="product-info">
						<h3 class="product-title">${cursor.value.ProductTitle}</h3>
						<label class="category-label">${cursor.value.ProductCategory}</label>
						<span class="price">৳ ${cursor.value.ProductPrice}</span>
						<button class="add-to-cart" data-product-id="${cursor.key}">Add to cart</button>
					</div>
				</div>
				</div>`
				);
			}
			cursor.continue();
		};
		req.onerror = function (err) {
			console.log(err);
		};
	}
});

// Sticky header function

$(function(){
	$(window).scroll(function(){
		var topheader = $('.top-header');
		topheader.toggleClass('sticky', $(document).scrollTop() > 50);
	});

});

$(document).on('click', '.btn-view-cart', function () {
	window.location.href = './cart.html';
});
$(document).on('click', '.btn-check-out', function () {
	window.location.href = './checkout.html';
});