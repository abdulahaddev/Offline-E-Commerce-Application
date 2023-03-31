

var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;
window.IDBCursor = window.IDBCursor || window.webkitIDBCursor;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange;

var db;
var currentEdit = null;

var openReq = indexedDB.open('AmarTechShop', 1);
openReq.onupgradeneeded = function (e) {
	db = e.target.result;
	var store = db.createObjectStore('Products', { keyPath: 'id', autoIncrement: true });
	console.log(store);
	DatInit(store);
	
};

openReq.onsuccess = function (e) {
	db = e.target.result;
	console.log(db);
	readAll();

	//Add Data
	$('#add').click(function () {
		if ($('#product-title').val() != '' && $('#product-price').val() != '' && $('#product-image').val() != '' && $('#product-category').val() != '') {
			var tx = db.transaction(['Products'], 'readwrite');
			if (currentEdit == null) {
				var store = tx.objectStore('Products');
				var req = store.add({
					ProductTitle: $('#product-title').val(),
					ProductCategory: $('#product-category').val(),
					ProductPrice: $('#product-price').val(),
					ProductImage: $('#product-image').val(),
				});
				req.onsuccess = function () {
					console.log('Added data...');
					readAll();
				};
			}
			else {
				var store = tx.objectStore('Products');
				var req = store.put({
					ProductTitle: $('#product-title').val(),
					ProductCategory: $('#product-category').val(),
					ProductPrice: $('#product-price').val(),
					ProductImage: $('#product-image').val(),
					id: currentEdit.id
				});
				req.onsuccess = function () {
					console.log('Updated data...');
					readAll();
				};
			}
			$('#add').val('Add New');
			currentEdit = null;
		}
		else {
			alert('Please fill up the all fields!!!');
		}
	});
};

function readAll() {
	$('#tbl tbody').empty();
	var tx = db.transaction(['Products'], 'readonly');
	var req = tx.objectStore('Products').openCursor();
	req.onsuccess = function (e) {
		var cursor = e.target.result;
		if (!cursor) return;
		$('#tbl tbody').append(
			'<tr>' +
            '<td>' + cursor.value.ProductTitle + '</td>' +
            '<td>' + cursor.value.ProductCategory + '</td>' +
            '<td>' + cursor.value.ProductPrice + '</td>' +
            '<td>' + cursor.value.ProductImage + '</td>' +
            '<td>' + '<button type=\'button\' class=\'edit\' data-key=\'' + cursor.key + '\'>Edit</button>|<button type = \'button\' class=\'delete\' data-key=\'' + cursor.key + '\'>Delete</button>' + '</td>' +
            '</tr>'
		);
		cursor.continue();
	};
	req.onerror = function (err) {
		console.log(err);
	};
	//for delete
	tx.oncomplete = function () {
		$('.delete').click(function () {
			var id = $(this).attr('data-key');
			var row = $(this).parent().parent();
			var tx = db.transaction(['Products'], 'readwrite');
			var store = tx.objectStore('Products');
			var req = store.delete(parseInt(id));
			req.onsuccess = function (e) {
				console.log('Data deleted successfullly!!!!');
				row.remove();
			};
		});

		//For edit
		$('.edit').click(function (evt) {
			evt.preventDefault();
			fillForm($(this).attr('data-key'));
		});
	};
}

function fillForm(id) {
	var t = db.transaction(['Products'], 'readwrite');
	var objStore = t.objectStore('Products');
	var request = objStore.get(parseInt(id));
	request.onsuccess = function () {
		currentEdit = request.result;
		console.log(currentEdit);
		$('#product-title').val(currentEdit.ProductTitle);
		$('#product-category').val(currentEdit.ProductCategory);
		$('#product-price').val(currentEdit.ProductPrice);
		$('#product-image').val(currentEdit.ProductImage);
		$('#add').val('Update');
	};
}

function DatInit(store) {

    var textData = `[{"ProductTitle":"Arduino Uno R3","ProductCategory":"Arduino","ProductPrice":"150.00","ProductImage":"1.jpg"},
					{"ProductTitle":"Arduino Nano R3","ProductCategory":"Arduino","ProductPrice":"790.00","ProductImage":"2.jpg"},
					{"ProductTitle":"Arduino Mega 2560 R3","ProductCategory":"Arduino","ProductPrice":"1520.00","ProductImage":"3.jpg"},
					{"ProductTitle":"20×4 LCD Display (2004)","ProductCategory":"Display","ProductPrice":"530.00","ProductImage":"4.jpg"},
					{"ProductTitle":"16×2 LCD Display (1602)","ProductCategory":"Display","ProductPrice":"230.00","ProductImage":"5.jpg"},
					{"ProductTitle":"ATmega328P-PU Microcontroller","ProductCategory":"Microcontroller","ProductPrice":"320.00","ProductImage":"6.jpg"},
					{"ProductTitle":"RC522 13.56 Mhz RFID Reader","ProductCategory":"Modules","ProductPrice":"230.00","ProductImage":"7.jpg"},
					{"ProductTitle":"5V 4 Channel Relay Module","ProductCategory":"Modules","ProductPrice":"240.00","ProductImage":"8.jpg"},
					{"ProductTitle":"NE555 Timer IC","ProductCategory":"IC","ProductPrice":"16.00","ProductImage":"9.jpg"},
					{"ProductTitle":"L293D Motor Driver IC","ProductCategory":"IC","ProductPrice":"85.00","ProductImage":"10.jpg"},
					{"ProductTitle":"SIM900A GSM/GPRS Module","ProductCategory":"Wireless","ProductPrice":"1300.00","ProductImage":"11.jpg"},
					{"ProductTitle":"ESP8266 NodeMcu V3 Wifi Development Board","ProductCategory":"Wireless","ProductPrice":"550.00","ProductImage":"12.jpg"},
					{"ProductTitle":"DHT11 Temperature and Humidity Sensor","ProductCategory":"Sensors","ProductPrice":"140.00","ProductImage":"13.jpg"},
					{"ProductTitle":"Infrared Motion Sensor Switch","ProductCategory":"Sensors","ProductPrice":"790.00","ProductImage":"14.jpg"},
					{"ProductTitle":"HC-SR04 Ultrasonic Sensor","ProductCategory":"Sensors","ProductPrice":"900.00","ProductImage":"15.jpg"},
					{"ProductTitle":"Arduino Uno R3","ProductCategory":"Arduino","ProductPrice":"150.00","ProductImage":"1.jpg"},
					{"ProductTitle":"Arduino Nano R3","ProductCategory":"Arduino","ProductPrice":"790.00","ProductImage":"2.jpg"},
					{"ProductTitle":"Arduino Mega 2560 R3","ProductCategory":"Arduino","ProductPrice":"1520.00","ProductImage":"3.jpg"},
					{"ProductTitle":"20×4 LCD Display (2004)","ProductCategory":"Display","ProductPrice":"530.00","ProductImage":"4.jpg"},
					{"ProductTitle":"16×2 LCD Display (1602)","ProductCategory":"Display","ProductPrice":"230.00","ProductImage":"5.jpg"},
					{"ProductTitle":"ATmega328P-PU Microcontroller","ProductCategory":"Microcontroller","ProductPrice":"320.00","ProductImage":"6.jpg"},
					{"ProductTitle":"RC522 13.56 Mhz RFID Reader","ProductCategory":"Modules","ProductPrice":"230.00","ProductImage":"7.jpg"},
					{"ProductTitle":"5V 4 Channel Relay Module","ProductCategory":"Modules","ProductPrice":"240.00","ProductImage":"8.jpg"},
					{"ProductTitle":"NE555 Timer IC","ProductCategory":"IC","ProductPrice":"16.00","ProductImage":"9.jpg"},
					{"ProductTitle":"L293D Motor Driver IC","ProductCategory":"IC","ProductPrice":"85.00","ProductImage":"10.jpg"},
					{"ProductTitle":"SIM900A GSM/GPRS Module","ProductCategory":"Wireless","ProductPrice":"1300.00","ProductImage":"11.jpg"},
					{"ProductTitle":"ESP8266 NodeMcu V3 Wifi Development Board","ProductCategory":"Wireless","ProductPrice":"550.00","ProductImage":"12.jpg"},
					{"ProductTitle":"DHT11 Temperature and Humidity Sensor","ProductCategory":"Sensors","ProductPrice":"140.00","ProductImage":"13.jpg"},
					{"ProductTitle":"Infrared Motion Sensor Switch","ProductCategory":"Sensors","ProductPrice":"790.00","ProductImage":"14.jpg"},
					{"ProductTitle":"HC-SR04 Ultrasonic Sensor","ProductCategory":"Sensors","ProductPrice":"900.00","ProductImage":"15.jpg"}]
					`;
    var jsonArray = JSON.parse(textData);
    console.log(jsonArray);

    //var tx = db.transaction(['Products'], 'readwrite');
    //var store = tx.objectStore('Products');
    
    jsonArray.forEach(function (data) {
        var req = store.put(data);
        req.onsuccess = function () {
            console.log('data added !');
        };
        req.onerror = function () {
            console.log('error occured !');
        };
    });

}
