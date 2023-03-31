

// cart sidebar open & close start
    
var cartbox = $('#cart-box');
var cartsidebar = $('#cart-sidebar');
var transparentcover = $('#transparent-cover');

function opensidebar() {
	cartsidebar.toggleClass('sidebar-open');
	transparentcover.addClass('sidebar-on');
}
function closesidebar() {
	cartsidebar.removeClass('sidebar-open');
	transparentcover.removeClass('sidebar-on');
}

cartbox.click(function (e) {
	e.preventDefault();
	opensidebar();
});

$('#sidebar-btn-close').click(function (e) {
	e.preventDefault();
	closesidebar();
        
});

transparentcover.click(function (e) {
	e.preventDefault();
	closesidebar();
        
});


// cart sidebar open & close end
