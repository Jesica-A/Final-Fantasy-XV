window.onload = function () {
    // Variables
    let $items = document.querySelector('#items');
    let carrito = [];
    let total = 0;
    let $carrito = document.querySelector('#carrito');
    let $total = document.querySelector('#total');
    let $botonVaciar = document.querySelector('#boton-vaciar');
    let $botonComprar = document.querySelector('#boton-comprar');

    // Funciones
    function renderItems() {
        for (let info of products) {
            let cItem = document.createElement('div');
            cItem.classList.add( 'col-sm-6');

            let cItemCardBody = document.createElement('div');
            cItemCardBody.classList.add('card-body');

            let cItemTitle = document.createElement('h5');
            cItemTitle.classList.add('card-title');
            cItemTitle.textContent = info['name'];

            let cItemImagen = document.createElement('img');
            cItemImagen.classList.add('img-fluid');
            cItemImagen.setAttribute('src', info['img']);

            let cItemPrecio = document.createElement('p');
            cItemPrecio.classList.add('card-text');
            cItemPrecio.textContent = '$' + info['price'];

            let cItemBoton = document.createElement('button');
            cItemBoton.classList.add('btn', 'btn-primary');
            cItemBoton.textContent = 'Agregar';
            cItemBoton.setAttribute('marcador', info['id']);
            cItemBoton.addEventListener('click', agregarCarrito);

            cItemCardBody.appendChild(cItemImagen);
            cItemCardBody.appendChild(cItemTitle);
            cItemCardBody.appendChild(cItemPrecio);
            cItemCardBody.appendChild(cItemBoton);
            cItem.appendChild(cItemCardBody);
            $items.appendChild(cItem);
        }
    }

    function agregarCarrito () {
        carrito.push(this.getAttribute('marcador'))

        calcularTotal();
        renderizarCarrito();
    }

    function renderizarCarrito() {
        $carrito.textContent = '';
        let carritoSinDuplicados = [...new Set(carrito)];
        carritoSinDuplicados.forEach(function (item, indice) {
            let miItem = products.filter(function(itemBaseDatos) {
                return itemBaseDatos['id'] == item;
            });

            let numeroUnidadesItem = carrito.reduce(function (total, itemId) {
                return itemId === item ? total += 1 : total;
            }, 0);

            let cItem = document.createElement('li');
            cItem.classList.add('text-right', 'mx-2');
            cItem.textContent = `${numeroUnidadesItem} x ${miItem[0]['name']} - $${miItem[0]['price']}`;

            let miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'btn-danger', 'mx-1');
            miBoton.textContent = 'X';
            miBoton.style.marginLeft = '1rem';
            miBoton.setAttribute('item', item);
            miBoton.addEventListener('click', borrarItemCarrito);

            cItem.appendChild(miBoton);
            $carrito.appendChild(cItem);
        });
    }

    function borrarItemCarrito() {
        let id = this.getAttribute('item');
        carrito = carrito.filter(function (carritoId) {
            return carritoId !== id;
        });

        renderizarCarrito();
        calcularTotal();
    }

    function calcularTotal() {
        total = 0;
        for (let item of carrito) {
            let miItem = products.filter(function(itemBaseDatos) {
                return itemBaseDatos['id'] == item;
            });
            total = total + miItem[0]['price'];
        }

        let totalDosDecimales = total.toFixed(2);

        $total.textContent = totalDosDecimales;
    }

    function vaciarCarrito() {
        carrito = [];

        renderizarCarrito();
        calcularTotal();
    }

    // Eventos
    $botonVaciar.addEventListener('click', vaciarCarrito);

    // Inicio
    renderItems();
} 