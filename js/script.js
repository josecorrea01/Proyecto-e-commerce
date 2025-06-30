$(document).ready(function(){
  const productos = [
    { id: 1, nombre: "Camiseta", precio: 10000, img: "assets/img/prod1.jpg" },
    { id: 2, nombre: "Pantalón", precio: 15000, img: "assets/img/prod2.jpg" },
    { id: 3, nombre: "Zapatos", precio: 20000, img: "assets/img/prod3.jpg" }
  ];

  let carrito = [];

  function mostrarProductos(filtrados = productos) {
    $('#contenedor-productos').html("");
    filtrados.forEach(prod => {
      $('#contenedor-productos').append(`
        <div class="col-md-4 producto">
          <div class="card">
            <img src="\${prod.img}" class="card-img-top" alt="\${prod.nombre}">
            <div class="card-body">
              <h5 class="card-title">\${prod.nombre}</h5>
              <p class="card-text">Precio: \$\${prod.precio}</p>
              <button class="btn btn-primary agregar" data-id="\${prod.id}">Agregar al carrito</button>
            </div>
          </div>
        </div>
      `);
    });
  }

  function actualizarCarrito() {
    if (carrito.length === 0) {
      $('#contenido-carrito').html("<p>No hay productos en el carrito.</p>");
    } else {
      let html = "<ul class='list-group'>";
      carrito.forEach(item => {
        html += "<li class='list-group-item'>"+item.nombre+" - $"+item.precio+"</li>";
      });
      html += "</ul>";
      $('#contenido-carrito').prepend(html);
    }
  }

  $(document).on('click', '.agregar', function(){
    const id = $(this).data('id');
    const producto = productos.find(p => p.id === id);
    carrito.push(producto);
    alert(producto.nombre + " agregado al carrito.");
  });

  $('#verCarrito').click(function(){
    actualizarCarrito();
    $('#modalCarrito').modal('show');
  });

  $('#buscador').on('input', function(){
    const texto = $(this).val().toLowerCase();
    const filtrados = productos.filter(p => p.nombre.toLowerCase().includes(texto));
    mostrarProductos(filtrados);
  });

  $('#form-compra').submit(function(e){
    e.preventDefault();
    const nombre = $('#nombre').val();
    const email = $('#email').val();
    const direccion = $('#direccion').val();
    const metodo = $('#metodoPago').val();
    if (nombre && email && direccion && metodo) {
      alert("¡Gracias por tu compra, " + nombre + "!");
      carrito = [];
      $('#modalCarrito').modal('hide');
      $('#form-compra')[0].reset();
    }
  });

  mostrarProductos();
});
