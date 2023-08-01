const btnNumero = document.getElementById("btnEnviarNumero");
const btnAnio = document.getElementById("btnEnviarAnio");

btnNumero.addEventListener('click', (e) => {
    e.preventDefault();
    let txtNumero = document.getElementById("txtNumero");
    let errores = document.getElementById("errores");
    //validamos el valor ingresato en el textBox encaso de ser algo diferente de un numero mostrara el error
    validarNumero(txtNumero.value) ? consultarApi(txtNumero, errores, "math") : desplegarError(errores, informacion);
})

btnAnio.addEventListener('click', (e) => {
    e.preventDefault();
    let txtAnio = document.getElementById("txtAnio");
    let errores = document.getElementById("errores");
    //validamos el valor ingresato en el textBox encaso de ser algo diferente de un numero mostrara el error
    validarNumero(txtAnio.value) ? consultarApi(txtAnio, errores, "year") : desplegarError(errores, informacion);
})

//validamos el dato para ver si es un numero
//retorna un booleano
const validarNumero = numero => numero.length > 0 && !isNaN(numero)

//Habilita el contenedor de errores y oculta el contenedor de informacion si es que estava activo
const desplegarError = (errores, informacion) => {
    errores.textContent = "No es un numero";
    errores.style.display = "block";
    informacion.style.display = "none";
}

const consultarApi = (datoTexbox, errores, typeResponse) => {
    let informacion = document.getElementById("informacion");

    errores.textContent = "";
    //consultamos la API
    fetch(`http://numbersapi.com/${datoTexbox.value}/${typeResponse}?json`)
        .then(response => response.json())
        //Obtenemos la respuesta
        .then(data => {
            informacion.textContent = data.text;
            informacion.style.display = "block";
            errores.style.display = "none";
            datoTexbox.value = "";
        })
        //Si es que ocurre un error imprimimos por consola el error
        .catch(error => console.error(error));
}