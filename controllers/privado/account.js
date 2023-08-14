/*
*   Controlador de uso general en las páginas web del sitio privado.
*   Sirve para manejar las plantillas del encabezado y pie del documento.
*/

// Constante para completar la ruta de la API.
const USER_API = 'business/privado/usuarios.php';
// Constantes para obtener la etiqueta donde va el usuario
const NAVBAR = document.getElementById('navbar');
// Método manejador de eventos para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    // Petición para obtener en nombre del usuario que ha iniciado sesión.
    const JSON = await dataFetch(USER_API, 'getSession');
     
    // Se verifica si el usuario está autenticado, de lo contrario se envía a iniciar sesión.
    if (JSON.session) {
        // Se comprueba si existe un alias definido para el usuario, de lo contrario se muestra un mensaje con la excepción.
        if (JSON.status) {

            NAVBAR.innerHTML = `        
            <!-- Navbar -->
            <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <!-- Container wrapper -->
            <div class="container">
                <!-- Navbar brand -->
                <a class="img_navbar" href="principal.html">
                    <img src="../../recursos/logo.png" style="width: 9rem;" alt="">
                </a>

                <!-- Toggle button -->
                <button class="navbar-toggler" type="button" data-mdb-toggle="collapse"
                    data-mdb-target="#navbarButtonsExample" aria-controls="navbarButtonsExample" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <i class="fas fa-bars"></i>
                </button>
                <div class="collapse navbar-collapse" id="navbarRightAlignExample">
                    <!-- Left links -->
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="principal.html">Dashboard</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link active dropdown-toggle doce" href="#" id="navbarDropdownMenuLink" role="button"
                                data-mdb-toggle="dropdown" aria-expanded="false">
                                Mantenimientos
                            </a>
                            <ul class="dropdown-menu doce" aria-labelledby="navbarDropdownMenuLink">
                                <li>
                                    <a class="dropdown-item doce" href="grados.html">Grados</a>
                                </li>
                                <li>
                                    <a class="dropdown-item doce" href="asignaturas.html">Asignaturas</a>
                                </li>
                                <li>
                                    <a class="dropdown-item doce" href="trimestres.html">Trimestres escolares</a>
                                </li>
                            </ul>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link active dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button"
                                data-mdb-toggle="dropdown" aria-expanded="false">
                                Docentes
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <li>
                                    <a class="dropdown-item doce" href="empleados.html">Personal académico</a>
                                </li>
                                <li>
                                    <a class="dropdown-item " href="actividades.html">Actividades</a>
                                </li>
                                
                            </ul>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link active dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button"
                                data-mdb-toggle="dropdown" aria-expanded="false">
                                Estudiantes
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <li>
                                    <a class="dropdown-item doce" href="estudiantes.html">Alumnos</a>
                                </li>
                                <li>
                                    <a class="dropdown-item doce" href="responsables.html">Responsables</a>
                                </li>
                                <li>
                                    <a class="dropdown-item" href="fichas.html">Fichas de conducta</a>
                                </li>
                                <li>
                                    <a class="dropdown-item" href="notas_ingresar.html">Notas</a>
                                </li>
                            </ul>
                        </li>
                        <li class="nav-item">
                        </li>
                    </ul>
                    <!-- Left links -->
                </div>
                <div class="dropdown">
                    <a class="dropdown-toggle d-flex align-items-center hidden-arrow" href="#"
                        id="navbarDropdownMenuAvatar" role="button" data-mdb-toggle="dropdown" aria-expanded="false">
                        <img src="../../recursos/iconos/usuario.png" class="rounded-circle" height="25"
                            alt="Black and White Portrait of a Man" loading="lazy" />
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuAvatar">
                        <li>
                            <a class="dropdown-item" id="userActive" class="nav-link active">${JSON.usuario}</a>
                                <a class="dropdown-item">cargo: ${JSON.tipo}</a>
                                <a class="dropdown-item" onclick="logOut()">Cerrar sesión</a>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- Collapsible wrapper -->
            </div>
            <!-- Container wrapper -->
        </nav>`;

            //si el nivel de usuario es docente se ocultan los menus respectivos
            if(JSON.id_cargo == 2){
                 
                menus = document.getElementsByClassName('doce');
                for (let i = 0; i < menus.length; i++) {
                    menus[i].hidden = true;
                    
                }
            }
            // Se inicializa el componente Dropdown para que funcione la lista desplegable en los menús.
        } else {
            sweetAlert(3, JSON.exception, false, 'index.html');
            JSON = await dataFetch(USER_API, 'logOut');
            location.href = 'index.html';
        }
    }
    else if (location.pathname == '/Apredu/vistas/privado/index.html') {
        // Se inicializa el componente Tooltip para que funcionen las sugerencias textuales.
    } else {
        location.href = 'index.html';
    }
    // Se comprueba si la página web es la principal, de lo contrario se direcciona a iniciar sesión
}
);