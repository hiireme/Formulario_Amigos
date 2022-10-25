let amigos = [];

let btnGuardar = document.querySelector("#btnGuardar");
let btnCancelar = document.querySelector("#btnCancelar");

let lista = document.querySelector(".listaAmigos");
let formulario = document.querySelector("#formulario");

pintar();

function limpiar() {
    formulario[0].value = "";
    formulario[1].value = "";
    formulario[2].value = "";
    formulario[3].value = "";
}

function pintar() {
    if (amigos.length > 0) {
        lista.innerHTML = "";
        amigos.forEach((contacto, index) => {
            let amigo = document.createElement("div");
            amigo.innerHTML = `<p>${contacto.nombre}</p><button class="muestraDetalles"><input type="hidden" value="${contacto.telefono}" />Detalles</button><button class="eliminarContacto" indice="${index}">Borrar</button>`;
            lista.appendChild(amigo);
        });
        let botones = document.getElementsByClassName("muestraDetalles");
        for (let i = 0; i < botones.length; i++) {
            const element = botones[i];
            element.addEventListener("click", () => {
                showdetallesAmigos(element.children[0].value);
            });
        }
        botones = document.getElementsByClassName("eliminarContacto");
        for (let i = 0; i < botones.length; i++) {
            const element = botones[i];
            element.addEventListener("click", () => {
                amigos.splice(element.getAttribute("indice"), 1);
                pintar();
            })
        }
    }
    else {
        lista.innerHTML = "<h2>No tenemos amigos</h2>";
    }
}

function showdetallesAmigos(tel) {
    let Detalles = document.getElementById("detallesAmigos");
    let amigo = amigos.find(a => {
        if (a.telefono == tel) {
            return a;
        }
    });

    Detalles.innerHTML = `<img src="${amigo.foto}"alt="">
    <h3>${amigo.nombre}</h3>
    <p><span>Telefono:</span>${amigo.telefono}</p>
    <p><span>Correo:</span>${amigo.correo}</p>
    <button id="btncerrar">Cerrar</button>`;
    Detalles.classList.remove("oculto");

    let btncerrar = document.querySelector("#btncerrar");
    btncerrar.addEventListener("click", (event) => {
        Detalles.classList.add("oculto")
    });
}

btnCancelar.addEventListener("click", (event) => {
    limpiar();
    event.preventDefault();
});

btnGuardar.addEventListener("click", (event) => {

    let contacto = {
        nombre: formulario["nombre"].value,
        telefono: formulario["telefono"].value,
        correo: formulario["correo"].value,
        foto: formulario["foto"].value,
    };

    
    camposTexto = document.getElementById("formulario").elements;
    if (camposTexto["nombre"].value == ''
        && camposTexto["nombre"].type == 'text') {
        alert("El campo " + camposTexto["nombre"].name + " está vacio y es OBLIGATORIO");
        return false
    };

    if (camposTexto["telefono"].value == ''
        && camposTexto["telefono"].type == 'text') {
        alert("El campo " + camposTexto["telefono"].name + " está vacio y es OBLIGATORIO");
        return false
    };

    if (camposTexto["correo"].value == ''
        && camposTexto["correo"].type == 'mail') {
        alert("El campo " + camposTexto["correo"].name + " está vacio y es OBLIGATORIO");
        return false
    };

    if (camposTexto["foto"].value == ''
        && camposTexto["foto"].type == 'text') {
        alert("El campo " + camposTexto["foto"].name + " está vacio y es OBLIGATORIO");
        return false
    };

    amigos.push(contacto);
    pintar();
    event.preventDefault();
    limpiar();

});
