/*
*   CONTROLADOR DE USO GENERAL EN TODAS LAS PÁGINAS WEB.
*/

// Constante para establecer la ruta del servidor.
const SERVER_URL = 'http://localhost/Apredu/api/';  

/*
*   Función para mostrar un mensaje de confirmación. Requiere la librería sweetalert para funcionar.
*   Parámetros: message (mensaje de confirmación).
*   Retorno: resultado de la promesa.
*/
function confirmAction(message) {
    return swal({
        title: 'Advertencia',
        text: message,
        icon: 'warning',
        closeOnClickOutside: false,
        closeOnEsc: false,
        buttons: {
            cancel: {
                text: 'No',
                value: false,
                visible: true,
                className: 'red accent-1'
            },
            confirm: {
                text: 'Sí',
                value: true,
                visible: true,
                className: 'grey darken-1'
            }
        }
    });
}

/*
*   Función para manejar los mensajes de notificación al usuario.
*   Parámetros: type (tipo de mensaje), text (texto a mostrar), timer (uso de temporizador) y url (valor opcional con la ubicación de destino).
*   Retorno: ninguno.
*/
function sweetAlert(type, text, timer, url = null) {
    // Se compara el tipo de mensaje a mostrar.
    switch (type) {
        case 1:
            title = 'Éxito';
            icon = 'success';
            break;
        case 2:
            title = 'Error';
            icon = 'error';
            break;
        case 3:
            title = 'Advertencia';
            icon = 'warning';
            break;
        case 4:
            title = 'Aviso';
            icon = 'info';
    }
    // Se define un objeto con las opciones principales para el mensaje.
    let options = {
        title: title,
        text: text,
        icon: icon,
        closeOnClickOutside: false,
        closeOnEsc: false,
        button: {
            text: 'Aceptar',
            className: 'cyan'
        }
    };
    // Se verifica el uso del temporizador.
    (timer) ? options.timer = 3000 : options.timer = null;
    // Se muestra el mensaje. Requiere la librería sweetalert para funcionar.
    swal(options).then(() => {
        if (url) {
            // Se direcciona a la página web indicada.
            location.href = url
        }
    });
}

/*
*   Función asíncrona para cargar las opciones en un select de formulario.
*   Parámetros: filename (nombre del archivo), action (acción a realizar), select (identificador del select en el formulario) y selected (dato opcional con el valor seleccionado).
*   Retorno: ninguno.
*/
async function fillSelect(filename, action, select,Tittle, selected = null) {
    // Petición para obtener los datos.
    const JSON = await dataFetch(filename, action);
    let content = '';
      
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje.
    if (JSON.status) {
        content += `<option selected>${Tittle}</option>`;
        // Se recorre el conjunto de registros fila por fila a través del objeto row.
        JSON.dataset.forEach(row => {
            // Se obtiene el dato del primer campo.
            value = Object.values(row)[0];
            // Se obtiene el dato del segundo campo.
            text = Object.values(row)[1];
            // Se verifica cada valor para enlistar las opciones.
            if (value != selected) {
                content += `<option value="${value}">${text}</option>`;
            } else {
                content += `<option value="${value}" selected>${text}</option>`;
            }
        });
    } else {
        content += '<option>No hay opciones disponibles</option>';
    }
    // Se agregan las opciones a la etiqueta select mediante el id.
    document.getElementById(select).innerHTML = content;
    // Se inicializa el componente Select del formulario para que funcione el menú de opciones.
    
}

async function fillSelect2(filename, action, select, data =null, selected = null) {
    // Petición para obtener los datos.
    const FORM = new FormData();
    FORM.append('data', data);
    const JSON = await dataFetch(filename, action, FORM);
    let content = '';
     
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje.
    if (JSON.status) {
        content += `<option selected>Seleccione una opción</option>`;
        // Se recorre el conjunto de registros fila por fila a través del objeto row.
        JSON.dataset.forEach(row => {
            // Se obtiene el dato del primer campo.
            value = Object.values(row)[0];
            // Se obtiene el dato del segundo campo.
            text = Object.values(row)[1];
            // Se verifica cada valor para enlistar las opciones.
            if (value != selected) {
                content += `<option value="${value}">${text}</option>`;
            } else {
                content += `<option value="${value}" selected>${text}</option>`;
            }
        });
    } else {
        content += '<option>No hay opciones disponibles</option>';
    }
    // Se agregan las opciones a la etiqueta select mediante el id.
    document.getElementById(select).innerHTML = content;
    // Se inicializa el componente Select del formulario para que funcione el menú de opciones.
    
}

/*
*   Función para generar un gráfico de barras verticales.
*   Parámetros: canvas (identificador de la etiqueta canvas), xAxis (datos para el eje X), yAxis (datos para el eje Y), legend (etiqueta para los datos) y title (título del gráfico).
*   Retorno: ninguno.
*/
function barGraph(canvas, xAxis, yAxis, legend, title) {
    // Se declara un arreglo para guardar códigos de colores en formato hexadecimal.
    let colors = [];
    // Se generan códigos hexadecimales de 6 cifras de acuerdo con el número de datos a mostrar y se agregan al arreglo.
    xAxis.forEach(() => {
        colors.push('#' + (Math.random().toString(16)).substring(2, 8));
    });
    // Se establece el contexto donde se mostrará el gráfico, es decir, se define la etiqueta canvas a utilizar.
    const context = document.getElementById(canvas).getContext('2d');
    // Se crea una instancia para generar el gráfico con los datos recibidos. Requiere la librería chart.js para funcionar.
    const chart = new Chart(context, {
        type: 'bar',
        data: {
            labels: xAxis,
            datasets: [{
                label: legend,
                data: yAxis,
                borderColor: '#000000',
                borderWidth: 1,
                backgroundColor: colors,
                barPercentage: 1
            }]
        },
        options: {
           // aspectRatio: 1,
            plugins: {
                title: {
                    display: true,
                    text: title
                },
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    ticks: {
                        beginAtZero: true,
                        stepSize: 1
                    }
                }
            }
        }
    });
}
/*
*   Función para generar un gráfico de pastel.
*   Parámetros: canvas (identificador de la etiqueta canvas), legends (valores para las etiquetas), values (valores de los datos) y title (título del gráfico).
*   Retorno: ninguno.
*/
function pieGraph(canvas, legends, values, title) {
    let colors = [];
    values.forEach(() => {
        colors.push('#' + (Math.random().toString(16)).substring(2, 8));
    });
    const context = document.getElementById(canvas).getContext('2d');
    const chart = new Chart(context, {
        type: 'pie',
        data: {
            labels: legends,
            datasets: [{
                data: values,
                backgroundColor: colors
            }]
        },
        options: {
            responsive: true, // Controla la escalabilidad del gráfico
            maintainAspectRatio: false, // No mantiene proporciones
            width: 300, // Ancho deseado
            height: 100, // Altura deseada
            plugins: {
                title: {
                    display: true,
                    text: title
                }
            }
        }
    });
}


/*
*   Función asíncrona para cerrar la sesión del usuario.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
async function logOut() {
     
    // Se muestra un mensaje de confirmación y se captura la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Está seguro de cerrar la sesión?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
         
        // Petición para eliminar la sesión.
        const JSON = await dataFetch(USER_API, 'logOut');
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (JSON.status) {
            sweetAlert(1, JSON.message, true, 'index.html');
        } else {
            sweetAlert(2, JSON.exception, false);
        }
    }
}

/*
*   Función asíncrona para intercambiar datos con el servidor.
*   Parámetros: filename (nombre del archivo), action (accion a realizar) y form (objeto opcional con los datos que serán enviados al servidor).
*   Retorno: constante tipo objeto con los datos en formato JSON.
*/
async function dataFetch(filename, action, form = null) {
    // Se define una constante tipo objeto para establecer las opciones de la petición.
    const OPTIONS = {};
    // Se determina el tipo de petición a realizar.
    if (form) {
        OPTIONS.method = 'post';
        OPTIONS.body = form;
    } else {
        OPTIONS.method = 'get';
    }
    try {
        // Se declara una constante tipo objeto con la ruta específica del servidor.
        const PATH = new URL(SERVER_URL + filename);
        // Se agrega un parámetro a la ruta con el valor de la acción solicitada.
        PATH.searchParams.append('action', action);
        // Se define una constante tipo objeto con la respuesta de la petición.
        const RESPONSE = await fetch(PATH.href, OPTIONS);
        // Se retorna el resultado en formato JSON.
        return await RESPONSE.json();
    } catch (error) {
        // Se muestra un mensaje en la consola del navegador web cuando ocurre un problema.
        console.log(error);
    }
}