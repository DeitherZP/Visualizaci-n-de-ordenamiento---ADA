'use strict'

var ArrayInsertSort = new Array(6);
var ArrayMergeSort = new Array(6);

//Nos permitira generar numeros aletorios para los arrays
function GeneraArreglo(){
    var i = 0;
    while(i != ArrayInsertSort.length){
	//genera números aletoriamente del 1 hasta el 6
        var numero = Math.floor(Math.random() * 6) + 1;
        var esRepetido = false;
        while(!esRepetido){
            for(var j = 0; j < i; j++){
		        //Comprubea si no existen números repetidos en el array
		        //Esto para que el arreglo no tenga números repetidos
                if(numero == ArrayInsertSort[j]){
                    esRepetido = true;
                    break;
                }
            }
	        //SI no encuentra nuemeros repetidos, procede almacenarlos en sus respectivos array
            if(!esRepetido){
                ArrayInsertSort[i] = numero;
                ArrayMergeSort[i] = numero;
                i++;
            }
        }
    }
    //Se llama a las funciones que permiten mostrar los nuemeros en las cajas de textos
    MostrarArrayIS();
    MostrarArrayMS();

    //Lama al metodo que permite activar los botones
    activarboton();

    //Bloquea el boton de "Generar arreglo" esto para impedir cambios durante la anumación
    var boton = document.querySelectorAll(".styleboton");
    boton[1].disabled = true;
}

//funcion que permite activar los botones
function activarboton(){
    var boton = document.querySelectorAll(".styleboton");
    for(var i = 0; i < boton.length; i++){
        boton[i].disabled = false;
    }
}

//funcion que permite mostrar el arreglo insert sort
function MostrarArrayIS(){
    var ArrayIS = document.querySelectorAll(".txtIS");
    var i;
    for(i = 0; i < ArrayInsertSort.length; i++){
        ArrayIS[i].value = ArrayInsertSort[i];
    }
}

//funcion que permite mostrar el arreglo merge sort
function MostrarArrayMS(){
    var ArrayMS = document.querySelectorAll(".txtMS");
    var i;
    for(i = 0; i < ArrayMergeSort.length; i++){
        ArrayMS[i].value = ArrayMergeSort[i];
    }
}

//Da la animación de desplazamiento
function animaSort(arr, index){
    var Array = document.querySelectorAll(arr);
    var posicion = Array[index].getBoundingClientRect();
    var t = setInterval(desplaza, 10);
    var pos = 0;
    function desplaza(){
        if(pos >= (-(posicion.top - posicion.bottom)) - 10){
            clearInterval(t);
        } else{
            pos++;
            Array[index].style.top = pos+'px';
        }
    }
    Array[index].style.background = "aqua";
}

//Ordena los valores mediante insert sort
function InsertSort(){
    //Nos permite bloquear el boton de ordenar para insert sort
    var boton = document.querySelectorAll(".styleboton");
    boton[0].disabled = true;
    var j;
    var aux;
    //For que nos permitira recorrer el array
    for(var i= 0; i < ArrayInsertSort.length; i++){
        aux = ArrayInsertSort[i];//Extraer el primer valor a ordenar
        animaSort(".txtIS", i);
        j = i - 1;
        while((j >= 0) && (aux < ArrayInsertSort[j])){//Bucle repetitivo que nos ayuda a encontrar la posicion del valor extraido
            ArrayInsertSort[j + 1] = ArrayInsertSort[j];//Muve los valores de la izquierda del espacio vacio a la derecha
            j--;
        }
        ArrayInsertSort[j + 1] = aux;//Inserta el valor extraido al inicio en su respectivo lugar
    }
    //Llama a la función que permite mostrar el arreglo insert sort
    MostrarArrayIS();
}

//Llama a la funcion de que permite ejcutar todo el ordenamiento mezcla
//Lo hace de esta manera debido a que se llama por medio de HTML
function LlamaMergeSort(){
    Divide(ArrayMergeSort, 0, ArrayMergeSort.length - 1);
}

//Esta funcion permite dividir el arreglo
function Divide(ArrayMergeSort, Izquierda, Derecha){
    if(Izquierda < Derecha){
	//Encuentra el punto medio del vector.
        var Mitad = parseInt((Izquierda + Derecha) / 2);

	//Divide la primera y segunda mitad (llamada recursiva).
        Divide(ArrayMergeSort, Izquierda, Mitad);
        Divide(ArrayMergeSort, Mitad + 1, Derecha);

	//Llama al metodo MergeSort para unir las mitades.
        MergeSort(ArrayMergeSort, Izquierda, Mitad, Derecha);
    }
}

//Llama a la funcion que permite mezclar el algoritmo y ordenarlo
function MergeSort(ArrayMergeSort, Izquierda, Mitad, Derecha){
    //bloquea el boton que ordena el merge sort
    var boton = document.querySelectorAll(".styleboton");
    boton[2].disabled = true;

    //Encuentra el tamaño de los sub-vectores para unirlos.
    var Arr1 = Mitad - Izquierda + 1;
    var Arr2 = Derecha - Mitad;

    //Vectores temporales.
    var ArrayIzquierdo = new Array(Arr1);
    var ArrayDerecho = new Array(Arr2);

    //Copia los datos a los arrays temporales.
    for(var i = 0; i < Arr1; i++){
        ArrayIzquierdo[i] = ArrayMergeSort[Izquierda + i];
    }
    for(var j = 0; j < Arr2; j++){
        ArrayDerecho[j] = ArrayMergeSort[Mitad + j + 1];
    }

    /* Une los vectorestemporales. */

    //Índices inicial del primer y segundo sub-vector.
    var i = 0;
    var j = 0;

    //Índice inicial del sub-vector arr[].
    var k = Izquierda;

    //Ordenamiento.
    while(i < Arr1 && j < Arr2){
        if(ArrayIzquierdo[i] <= ArrayDerecho[j]){
            ArrayMergeSort[k] = ArrayIzquierdo[i];
            i++;
        } else{
            ArrayMergeSort[k] = ArrayDerecho[j];
            j++;
        }
        k++;
    }

    //Comprueba si hay elementos por ordenar, de ser así
    //copia los elementos restantes de ArrayIzquierdo[].
    while(i < Arr1){
        ArrayMergeSort[k] = ArrayIzquierdo[i];
        i++;
        k++;
    }

    //Copiar los elementos restantes de ArrayDerecho[].
    while(j < Arr2){
        ArrayMergeSort[k] = ArrayDerecho[j];
        j++;
        k++;
    }

    //Recorre las cajas de texto y les da la animación que muestra que esran ordenadas 
    for(var i = 0; i < ArrayMergeSort.length; i++){
        //Llama a la funcion que permite la animacion
        animaSort(".txtMS", i);
    }
    //Muestra los valores del array merge sort
    MostrarArrayMS();
}