function products() {
    document.getElementById('cardHeader').innerHTML = '<h5>Lista de productos</h5>';
    const REQRES_ENDPOINT = 'https://reqres.in/api/unknown';
    
    fetch(REQRES_ENDPOINT, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'x-api-key': 'reqres-free-v1'
        }
    })
    .then((response) => {
        return response.json().then(
            data => {
                return {
                    status: response.status,
                    info: data,
                };
            }
        );
    })
    .then((result) => {
        console.log('resultado ', result);
        if (result.status === 200) {
            let listUsers = `
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Año</th>
                            <th scope="col">Código</th>
                            <th scope="col">Color</th>
                            <th scope="col">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
            result.info.data.forEach(element => {
                listUsers += `
                    <tr>
                        <td>${element.id}</td>
                        <td>${element.name}</td>
                        <td>${element.year}</td>
                        <td>${element.pantone_value}</td>
                        <td><input type='color' value='${element.color}' disabled /></td>
                        <td>
                            <button type="button" class="btn btn-outline-info" onclick="getProducts(${element.id})">
                                Ver
                            </button>
                        </td>
                    </tr>
                `;
            });
            listUsers += `
                    </tbody>
                </table>
            `;
            document.getElementById('info').innerHTML = listUsers;
        } else {
            document.getElementById('info').innerHTML = 'No existen productos en la base de datos.';
        }
    })
    .catch(error => {
        console.error('Error al obtener productos:', error);
        document.getElementById('info').innerHTML = 'Error al cargar los productos.';
    });
}

function getProducts(idColor) {
    // ✅ CORREGIDO: Se agregó la barra diagonal faltante
    const REQRES_ENDPOINT = "https://reqres.in/api/unknown/" + idColor;

    fetch(REQRES_ENDPOINT, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "x-api-key": "reqres-free-v1",
        },
    })
    .then((result) => {
        return result.json().then(
            data => {
                return {
                    status: result.status,
                    body: data
                };
            }
        );
    })
    .then((response) => {
        if (response.status === 200) {
            const element = response.body.data;
            const modalProduct = `
                <div class="modal fade" id="modalProduct" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Ver Producto</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        <div class="card">
                            <input type='color' value='${element.color}' disabled />
                            <div class="card-body">
                                <h5 class="card-title">Información del Producto:</h5>
                                <p class="card-text">ID: ${element.id}</p>
                                <p class="card-text">Nombre Color: ${element.name}</p>
                                <p class="card-text">Año: ${element.year}</p>
                                <p class="card-text">Código Pantone: ${element.pantone_value}</p>
                            </div>
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                      </div>
                    </div>
                  </div>
                </div>
            `;
            document.getElementById('viewModal').innerHTML = modalProduct;
            const modal = new bootstrap.Modal(document.getElementById('modalProduct'));
            modal.show();
        } else {
            document.getElementById('info').innerHTML = '<h3>No se encontró el producto en la API.</h3>';
        }
    })
    .catch(error => {
        console.error('Error al obtener producto:', error);
        document.getElementById('info').innerHTML = '<h3>Error al cargar el producto.</h3>';
    });
}