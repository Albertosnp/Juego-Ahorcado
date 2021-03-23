/* Varible del display */
const display = document.getElementById("display");
/* Variable de boton comprobar */
const btnComprobar = document.getElementById("btnComprobar");
/* Variable del div donde se muestra la palabra */
const palabraJugada = document.getElementById("palabra");
/* variable para modificar div que contiene las imagenes */
const divImagenes = document.getElementById("imagen");
/* varibale del div que muestra el resultado de la partida */
const divResultado = document.getElementById("resultado");

/* Clase ahorcado */
class Ahorcado {
    /* Constructor */
    constructor() {
        this.intentos = 7; //intentos por partida maximo
        this.arrayPalabras = ["ASUS", "APPLE", "AORUS", "GIGABYTE","HP", "ACER","BENQ","LENOVO","LOGITECH"]; // almacena todas las palabras del juego
        this.palabraRandom = '';
        this.arrayDeletras = '';
        this.arrayAmostrar = [];//almacena los campos que tendra la palabra a mostrar
        divImagenes.innerHTML = "<img src='assets/img/img0.png' alt='imagen1'>";
    }
    /* metodo que extrae una palabra aleatoria del arrayPalabras y la asigna al atributo palabraRandom */
    fPalabraAleatoria = () => {
        let posicionRandom = Math.floor(Math.random() * this.arrayPalabras.length);//posicion aleatoria del array de palabras
        this.palabraRandom = this.arrayPalabras[posicionRandom];//Palabra aleatoria
        this.fSepararEnLetras();
    }
    /* se genera el array a mostrar para esa palabra */
    fGeneraArrayAmostrar = () => {
        let array = [];
        for (const letra of this.arrayDeletras)
            array.push(' _ ');
        this.arrayAmostrar = array;
    }
    /* funcion que separa la palabra random en un array de letras */
    fSepararEnLetras = () => {
        this.arrayDeletras = this.palabraRandom.split('');//La palabra se convierte en array de letras
        this.fGeneraArrayAmostrar();
    }

    /* Funcion que comprueba si la letra introducida esta en la palabra a adivinar */
    fComprobar = () => {
        if (this.intentos > 0) {
            let elemento = display.value.trim();//Elimina posibles espacios en blanco
            display.value = ''; //resetea el valor del display
            if (elemento.length>1) {
                if (elemento.toUpperCase() === this.palabraRandom.toUpperCase())
                    this.fMostrar(elemento);
                else{
                    this.fFinDePartida();
                    divImagenes.innerHTML = "<img src='assets/img/img6.png' alt='imagen6'>";
                } 
            }else{
                //bucle para comprobar si el elemento introducido por el usuario esta en la palabra
                //he utilizado for-of con el array.entries para que ademas de proporcionar el valor proporcione la posicion-index
                for (const [posicion, letra] of this.arrayDeletras.entries()) {
                    if (letra.toLocaleLowerCase() === elemento.toLocaleLowerCase())
                        this.arrayAmostrar[posicion] = letra; //Se cambia _ por la letra correspondiente    
                }
                //Si la letra introducida no esta en el array de la palabra, se resta un intento
                if (!this.arrayDeletras.includes(elemento.toUpperCase())){
                    this.intentos--;
                    switch (this.intentos) {
                        case 6:
                            divImagenes.innerHTML = "<img src='assets/img/img1.png' alt='imagen1'>";
                            break;
                        case 5:
                            divImagenes.innerHTML = "<img src='assets/img/img2.png' alt='imagen2'>";
                            break;
                        case 4:
                            divImagenes.innerHTML = "<img src='assets/img/img3.png' alt='imagen3'>";
                            break; 
                        case 3:
                            divImagenes.innerHTML = "<img src='assets/img/img4.png' alt='imagen4'>";
                            break;
                        case 2:
                            divImagenes.innerHTML = "<img src='assets/img/img5.png' alt='imagen5'>";
                            break;            
                        default:
                            divImagenes.innerHTML = "<img src='assets/img/img6.png' alt='imagen6'>";
                            this.fFinDePartida(); //funcion que muestra al jugador que ha perdido
                            break;
                    }
                }
                this.fMostrar();
            }
        }
    }
    /* Funcion que introduce en el div con id=palabra el contenido de aciertos y _ */
    fMostrar = (palabraCompleta = this.arrayAmostrar) => {
        let caja = "<p>";
        for (const letra of palabraCompleta) {
            caja += letra.toUpperCase();
        }
        caja += "</p>";
        palabraJugada.innerHTML = caja;

        /* COmprobacion - Salida si la palabra o el array es igual a la palabraRAndom */
        if (this.arrayAmostrar.join('').toUpperCase() === this.palabraRandom.toUpperCase()) 
            divResultado.innerHTML = "Has ganado!!😎";
        else if(typeof palabraCompleta === 'string') {
            if (palabraCompleta.toLocaleLowerCase() === this.palabraRandom.toLocaleLowerCase()) 
                divResultado.innerHTML = "Has ganado!!😎";
        }
    };
    
    /* Funcion que rellena el div con id="resultado", mostrando al jugador el mensaje de que ha perdido */
    fFinDePartida = () => {
        divResultado.innerHTML = "Has perdido ☹️";
    };
}

const partida = new Ahorcado();
partida.fPalabraAleatoria();
partida.fMostrar();
/* Evento de boton comprobar */
btnComprobar.addEventListener("click", function () { partida.fComprobar() });