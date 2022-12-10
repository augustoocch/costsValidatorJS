const presupuesto = document.querySelector('#total');
const rest = document.querySelector('#restante');
const formGasto = document.querySelector('#agregar-gasto');
const listadoGasto = document.querySelector('#gastos');
const btnSend = document.querySelector('.btn');
let gasto = document.querySelector('#gasto');
let cant = document.querySelector('#cantidad');
let total;
let gastoActual = 0;
let resto

//  INITIAL VALIDATION  ------------------------------------------------------------------------------------------//

validacionInicial();
function validacionInicial() {

    const formInicio = prompt('Ingrese su presupuesto');

    if (Number.isInteger(+formInicio) && formInicio > 0) {
        return total = formInicio;
    } else {
        alert("Variable incorrecta");
        validacionInicial();
    }
}

// CREATE CLASSES ------------------------------------------------------------------------------------------//

class Presupuesto {
    constructor(total) {
        this.total = total;
    }
}

class Restante {
    constructor () {
        this.gastoActual = gastoActual;
        this.total = total;
    }
     
    calculoRest() {
        resto = this.total - this.gastoActual;
        return resto; 
    }
}

// DEFINE OBJECTS AND ASING VALUES------------------------------------------------------------------------------------------//

valores()
function valores() {
    let p = new Presupuesto(total);
    presupuesto.innerHTML = Object.values(p);

    let g = new Restante();
    rest.innerHTML = g.calculoRest();
    
    changeColor();
    validateMin();
}


// CREATE MAP AND PUT PRICE ------------------------------------------------------------------------------------------//

let arrayProductos = new Map();

formGasto.addEventListener('submit', (e)=> {
    e.preventDefault();

    if (gasto.value == '' || isNaN(cant.value) || cant.value == '' || cant.value == 0 || gasto.value == null || cant.value == null) {
        showMessage("Campos invalidos", "error");
        valores();
        reset();
    } else {
        arrayProductos.set(gasto.value, cant.value);
        gastoActual = parseInt(gastoActual) + parseInt(cant.value);
        eliminar = document.querySelectorAll('.eliminar');
        showMessage("Gasto agregado correctamente", "exito");
        listadoAdd(gasto.value, cant.value);
        removeElement();
        valores();
        reset();
    }
})

// INSERT INTO DOM ------------------------------------------------------------------------------------------//

function listadoAdd(gasto, cant) {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    let listadoUl= document.querySelector('.list-group');
    const span1 = document.createElement('p');
    const span2 = document.createElement('p');
    span1.innerText = gasto;
    span2.innerText = "$" + cant;
    li.append(span1);
    li.append(span2);
    const x = document.createElement('p');
    x.className = "eliminar";
    x.innerText = "X";
    li.append(x);
    listadoUl.append(li);
}

// ELIMINAR ELEMENTO ------------------------------------------------------------------------------------------//

function removeElement() {
    let eliminar = document.querySelectorAll('.eliminar');
    eliminar.forEach( actionDelete => {
        actionDelete.addEventListener('click', ()=> {
            arrayProductos.delete(actionDelete.previousElementSibling.previousElementSibling.innerText);
            actionDelete.parentElement.remove();
            mapaNuevo();
        })
    })
}  

// NEW MAP, NEW VALUE FOR THE OBJECT ------------------------------------------------------------------------------------------//

function mapaNuevo() {
    let sumaMapa = 0;
    arrayProductos.forEach(mapa => {
       sumaMapa = parseInt(sumaMapa) + parseInt(mapa);
    })
    gastoActual = sumaMapa;
    valores();
}

//  MESSAGE IN SCREEN ------------------------------------------------------------------------------------------//

function showMessage(mensaje, tipo) {
    if(document.querySelector('.mensajeMostrar')){
        exit();
    } else {
        const head = document.querySelector('.primario');
        const div = document.createElement('div');
        div.className = ('text-center', 'alert', 'mensajeMostrar');

        if(tipo === 'error') {
            div.classList.add('alert-danger');
        } else {
            div.classList.add('alert-success');
        }
        div.textContent = mensaje;
        head.insertBefore(div, formGasto);

        setTimeout( ()=> {
            document.querySelector('.mensajeMostrar').remove();
        },3000);
    }
}

//  RESET  FORM------------------------------------------------------------------------------------------//

function reset () {
    formGasto.reset();
}

// VALIDATE MIN QTY------------------------------------------------------------------------------------------//

function validateMin () {
    if(resto <= 0) {
        btnSend.disabled = true;
        btnSend.classList.add('opacity-50', 'cursor-not-allowed');
        btnSend.classList.remove('btn-primary');
    } else {
        btnSend.classList.add('btn-primary');
        btnSend.classList.remove('opacity-50', 'cursor-not-allowed');
        btnSend.disabled = false;
    }  
}

// CHANGE BOX COLOR DEPENDING ON QTY ------------------------------------------------------------------------------------------//

function changeColor() {
    const selectorRest = document.querySelector('.restante');
        if(resto < (total*0.5) && resto >= (total*0.25)) {
            selectorRest.classList.add("alert-warning");
            if(selectorRest.classList.contains('alert-success') || selectorRest.classList.contains('alert-danger')) {
                selectorRest.classList.remove('alert-success', 'alert-danger');
            }
        }
        if(resto < (total*0.25)) {
            selectorRest.classList.add("alert-danger");
            if(selectorRest.classList.contains('alert-success') || selectorRest.classList.contains('alert-warning')) {
                selectorRest.classList.remove('alert-success', 'alert-warning');
            }
        }
        if(resto >= (total*0.5)) {
            selectorRest.classList.add('alert-success');
            if(selectorRest.classList.contains('alert-danger') || selectorRest.classList.contains('alert-warning')) {
                selectorRest.classList.remove('alert-danger', 'alert-warning');
            }
        }

}









 