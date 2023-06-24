// Constante para completar la ruta de la API.
const ESTUDIANTE_API = 'business/privado/estudiantes.php';
// Constante para establecer el formulario de guardar para el estudiante.
const SAVE_FORM_E = document.getElementById('save-formE');
// Constante para establecer el formulario de guardar para el responsable.
const SAVE_FORM_R = document.getElementById('save-formR');
// Constantes para establecer el contenido de la tabla.
const TBODY_ROWS = document.getElementById('tbody-rows');
const RECORDS = document.getElementById('records');

document.addEventListener('DOMContentLoaded', () => {
    // Llamada a la función para llenar la tabla con los registros disponibles.
    fillTable();
    const TODAY = new Date();
    // Se declara e inicializa una variable para guardar el día en formato de 2 dígitos.
    let day = ('0' + TODAY.getDate()).slice(-2);
    // Se declara e inicializa una variable para guardar el mes en formato de 2 dígitos.
    var month = ('0' + (TODAY.getMonth() + 1)).slice(-2);
    // Se declara e inicializa una variable para guardar el año con la mayoría de edad.
    let year = TODAY.getFullYear() - 5;
    // Se declara e inicializa una variable para establecer el formato de la fecha.
    let date = `${year}-${month}-${day}`;
    // Se asigna la fecha como valor máximo en el campo del formulario.
    document.getElementById('nacimiento').max = date;

});

//Funcion de fillSelect pero adaptada para la lista de grados
async function fillList(filename, action, list, selected = null) {
    const JSON = await dataFetch(filename, action);
    let content = '';
    if (JSON.status) {
        JSON.dataset.forEach(row => {
            value = Object.values(row)[0];
            text = Object.values(row)[1];
            if (value != selected) {
                content += `<li><a class="dropdown-item" onclick="opcionGrado('${value}')">${text}</a></li>`;
            } else {
                content += `<li><a class="dropdown-item" onclick="opcionGrado('${value}')" class="active">${text}</a></li>`;
            }
        });
    } else {
        content += '<li><a class="dropdown-item">No hay opciones disponibles</a></li>';
    }
    document.getElementById(list).innerHTML = content;
}

// función para cambiar el valor del botón del parentesco y asignarle un valor a un input oculto de parentesco_responsable
function opcionParentesco(parentesco) {
    document.getElementById('parentesco').innerHTML = parentesco;
    document.getElementById('parentesco_responsable').value = parentesco;
}

function opcionGrado(grado) {
    document.getElementById('grado').innerHTML = grado;
    document.getElementById('grados_estudiante').value = grado;
}

// Método manejador de eventos para cuando se envía el formulario de guardar.
SAVE_FORM_R.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se verifica la acción a realizar.
    (document.getElementById('id_responsable').value) ? action = 'update' : action = 'createResponsable';
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SAVE_FORM_R);
    // Petición para guardar los datos del formulario.
    const JSON = await dataFetch(ESTUDIANTE_API, action, FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (JSON.status) {
        fillTable();

        sweetAlert(1, JSON.message, true);
    } else {
        sweetAlert(2, JSON.exception, false);
    }

});


// Método manejador de eventos para cuando se envía el formulario de guardar.
SAVE_FORM_E.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se verifica la acción a realizar.
    (document.getElementById('id_estudiante').value) ? action = 'updateEstudiante' : action = 'CreateEstudiante';
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SAVE_FORM_E);
    // Petición para guardar los datos del formulario.
    const JSON = await dataFetch(ESTUDIANTE_API, action, FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (JSON.status) {
        fillTable();
        sweetAlert(1, JSON.message, true);
    } else {
        sweetAlert(2, JSON.exception, false);
    }
});

/*
*   Función asíncrona para llenar la tabla con los registros disponibles.
*   Parámetros: form (objeto opcional con los datos de búsqueda).
*   Retorno: ninguno.
*/
async function fillTable(form = null) {
    // Se inicializa el contenido de la tabla.
    TBODY_ROWS.innerHTML = '';
    RECORDS.textContent = '';
    // Se verifica la acción a realizar.
    (form) ? action = 'search' : action = 'readAll';
    // Petición para obtener los registros disponibles.
    const JSON = await dataFetch(ESTUDIANTE_API, action, form);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (JSON.status) {
        // Se recorre el conjunto de registros fila por fila.
        JSON.dataset.forEach(row => {
            // Se crean y concatenan las filas de la tabla con los datos de cada registro.
            TBODY_ROWS.innerHTML += `  
                <tr>
                    <td>${row.apellido_estudiante}</td>
                    <td>${row.nombre_estudiante}</td>
                    <td>${row.grado}</td>
                    <td><button type="button" class="btn btn btn-floating btn-lg" data-mdb-toggle="modal" data-mdb-target="#myModal"><img src="../../recursos/iconos/conducta.png" alt=""></button></td>
                    <td><button type="button" class="btn btn btn-floating btn-lg" data-mdb-toggle="modal"data-mdb-target="#myModal2"><img src="../../recursos/iconos/notas.png" alt=""></button></td>
                    <td><button  onclick="openUpdate(${row.id_estudiante})" type="button" class="btn btn btn-floating btn-lg" data-mdb-toggle="modal"data-mdb-target="#ModalEstInfo"><img src="../../recursos/iconos/informacion.png" alt=""></button></td>
                </tr>
            `;
        });
        RECORDS.textContent = JSON.message;
    } else {
        sweetAlert(4, JSON.exception, true);
    }
}

async function openUpdate(id) {
    // Se define una constante tipo objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('id_estudiante', id);
    // Petición para obtener los datos del registro solicitado.
    const JSON = await dataFetch(ESTUDIANTE_API, 'readOne', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (JSON.status) {
        // Se restauran los elementos del formulario.
        SAVE_FORM_E.reset();
        //se oculta la clave
        document.getElementById('clave').hidden = true;
        document.getElementById('nombre_clave').hidden = true;
        // Se inicializan los campos del formulario.
        document.getElementById('id_estudiante').value = JSON.dataset.id_estudiante;
        document.getElementById('nombre_estudiante').value = JSON.dataset.nombre_estudiante;
        document.getElementById('apellido_estudiante').value = JSON.dataset.apellido_estudiante;
        document.getElementById('nacimiento').value = JSON.dataset.fecha_nacimiento;
        document.getElementById('direccion_estudiante').value = JSON.dataset.direccion;
        document.getElementById('nie').value = JSON.dataset.nie;
        document.getElementById('usuario_estudiante').value = JSON.dataset.usuario_estudiante;
        document.getElementById('clave').value = JSON.dataset.clave;
        document.getElementById('grados_estudiante').value = JSON.dataset.id_grado;
        document.getElementById('grado').innerHTML = JSON.dataset.grado;
        if (JSON.dataset.estado) {
            document.getElementById('estados').checked = true;
        } else {
            document.getElementById('estados').checked = false;
        }
        fillList(ESTUDIANTE_API, 'readGrado', 'lectura', JSON.dataset.id_grado);
        // Se actualizan los campos para que las etiquetas (labels) no queden sobre los datos.
        document.getElementById('cancelar').hidden = true;
        document.getElementById('eliminar_estudiante').hidden = false;
        document.getElementById('eliminar_estudiante').value = openDelete(JSON.dataset.id_estudiante);

    } else {
        sweetAlert(2, JSON.exception, false);
    }
}

function openCreate() {
    // Se restauran los elementos del formulario.
    SAVE_FORM_E.reset();
    SAVE_FORM_R.reset();
    fillList(ESTUDIANTE_API, 'readGrado', 'lectura')
    document.getElementById('eliminar_estudiante').hidden = true;
}

/*
*   Función asíncrona para eliminar un registro.
*   Parámetros: id (identificador del registro seleccionado).
*   Retorno: ninguno.
*/
async function openDelete(id) {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Desea eliminar el estudiante de forma permanente?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Se define una constante tipo objeto con los datos del registro seleccionado.
        const FORM = new FormData();
        FORM.append('id_estudiante', id);
        // Petición para eliminar el registro seleccionado.
        const JSON = await dataFetch(ESTUDIANTE_API, 'deleteEstudiante', FORM);
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (JSON.status) {
            // Se carga nuevamente la tabla para visualizar los cambios.
            fillTable();
            // Se muestra un mensaje de éxito.
            sweetAlert(1, JSON.message, true);
        } else {
            sweetAlert(2, JSON.exception, false);
        }
    }
}

//Buscador
(function (document) {
    'buscador';

    var LightTableFilter = (function (Arr) {

        var _input;

        function _onInputEvent(e) {
            _input = e.target;
            var tables = document.getElementsByClassName(_input.getAttribute('data-table'));
            Arr.forEach.call(tables, function (table) {
                Arr.forEach.call(table.tBodies, function (tbody) {
                    Arr.forEach.call(tbody.rows, _filter);
                });
            });
        }

        function _filter(row) {
            var text = row.textContent.toLowerCase(), val = _input.value.toLowerCase();
            row.style.display = text.indexOf(val) === -1 ? 'none' : 'table-row';
        }

        return {
            init: function () {
                var inputs = document.getElementsByClassName('light-table-filter');
                Arr.forEach.call(inputs, function (input) {
                    input.oninput = _onInputEvent;
                });
            }
        };
    })(Array.prototype);

    document.addEventListener('readystatechange', function () {
        if (document.readyState === 'complete') {
            LightTableFilter.init();
        }
    });

})(document);

