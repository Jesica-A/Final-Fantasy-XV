var productos_data = []

let productosAjaxCall = () => {
    return $.ajax({
        type: 'GET',
        beforeSend: function () { 
            $('#loader').removeClass('hidden')
        },
        url: "data/productos.json",
        dataType: "json",
        success: function (response) {
            for (const iterator of response) {
                productos_data.push(iterator)
            }
        },
        complete: function () { 
            $('#loader').addClass('hidden')
        },
    });
}

//API DOLAR
let dolar_Json = []

let dolarAjaxCall = () => {
    return $.ajax({
        url: "https://www.dolarsi.com/api/api.php?type=valoresprincipales",
        dataType: "json",
        success: function (response) {
            for (const iterator of response) {
                dolar_Json.push(iterator)
            }
        },
        
    });
}


let logoContainer = $('a.navbar-brand');
let logoUrl = "img/logo.svg";

let carritoContainer = $('li.carrito');
let carritoUrl = 'img/shopping-cart-solid.svg';

$(function () {

    $.get(logoUrl, null,
        function (data) {
            console.log(data);
            $("svg", data).prependTo(logoContainer);
        },
        'xml'
    );

    $.get(carritoUrl, null,
        function (data) {
            console.log(data);
            $("svg", data).prependTo(carritoContainer);
        },
        'xml'
    );

});