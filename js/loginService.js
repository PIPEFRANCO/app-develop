document.getElementById('loginForm').addEventListener('submit', function(e){
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    let tipoAlerta = '';
    if(email === '' & password === ''){
        console.log('Por favor completar todos los campos')
        tipoAlerta = 'warning'
    } else if (email === 'prueba@gmail.com' && password === '123456') {
        console.log('Inicio de sesion exitoso')
        tipoAlerta = 'success'
    } else {
        console.log('Correo o contraseña incorrectos.')
        tipoAlerta = 'danger'
    }
    let alerta = `
    <div class="alert alert-${tipoAlerta} alert-dismissible fade show" role="alert">
    ${mensaje}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`;
}  
);