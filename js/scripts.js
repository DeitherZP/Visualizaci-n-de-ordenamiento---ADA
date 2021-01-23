'use strict'

var ArrayInsertSort = new Array(6);
var ArrayMergeSort = new Array(6);

function GeneraArreglo(){
    var i = 0;
    while(i != ArrayInsertSort.length){
        var numero = Math.floor(Math.random() * 6) + 1;
        var esRepetido = false;
        while(!esRepetido){
            for(var j = 0; j < i; j++){
                if(numero == ArrayInsertSort[j]){
                    esRepetido = true;
                    break;
                }
            }
            if(!esRepetido){
                ArrayInsertSort[i] = numero;
                ArrayMergeSort[i] = numero;
                i++;
            }
        }
    }
    MostrarArrayIS();
    MostrarArrayMS();
    activarboton();
    var boton = document.querySelectorAll(".styleboton");
    boton[1].disabled = true;
}

function activarboton(){
    var boton = document.querySelectorAll(".styleboton");
    for(var i = 0; i < boton.length; i++){
        boton[i].disabled = false;
    }
}

function MostrarArrayIS(){
    var ArrayIS = document.querySelectorAll(".txtIS");
    var i;
    for(i = 0; i < ArrayInsertSort.length; i++){
        ArrayIS[i].value = ArrayInsertSort[i];
    }
}

function MostrarArrayMS(){
    var ArrayMS = document.querySelectorAll(".txtMS");
    var i;
    for(i = 0; i < ArrayMergeSort.length; i++){
        ArrayMS[i].value = ArrayMergeSort[i];
    }
}

function animaInsertSort(arr, index){
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

function recorre(index){
    var ArrayIS = document.querySelectorAll(".txtIS");
    var posicion = ArrayIS[index].getBoundingClientRect();
    var t = setInterval(desplaza, 10);
    var pos = 0;
    function desplaza(){
        if(pos >= (-(posicion.left - posicion.right))){
            clearInterval(t);
        } else{
            pos++;
            ArrayIS[index].style.left = pos+'px';
        }
    }
}

function InsertSort(){
    var boton = document.querySelectorAll(".styleboton");
    boton[0].disabled = true;
    var j;
    var aux;
    for(var i= 0; i < ArrayInsertSort.length; i++){
        aux = ArrayInsertSort[i];
        animaInsertSort(".txtIS", i);
        j = i - 1;
        while((j >= 0) && (aux < ArrayInsertSort[j])){
            ArrayInsertSort[j + 1] = ArrayInsertSort[j];
            //recorre(j);
            j--;
        }
        ArrayInsertSort[j + 1] = aux;
    }
    MostrarArrayIS();
}

function LlamaMergeSort(){
    Divide(ArrayMergeSort, 0, ArrayMergeSort.length - 1);
}

function Divide(ArrayMergeSort, Izquierda, Derecha){
    if(Izquierda < Derecha){
        var Mitad = parseInt((Izquierda + Derecha) / 2);
        Divide(ArrayMergeSort, Izquierda, Mitad);
        Divide(ArrayMergeSort, Mitad + 1, Derecha);
        MergeSort(ArrayMergeSort, Izquierda, Mitad, Derecha);
    }
}

function MergeSort(ArrayMergeSort, Izquierda, Mitad, Derecha){
    var boton = document.querySelectorAll(".styleboton");
    boton[2].disabled = true;
    var Arr1 = Mitad - Izquierda + 1;
    var Arr2 = Derecha - Mitad;
    var ArrayIzquierdo = new Array(Arr1);
    var ArrayDerecho = new Array(Arr2);
    for(var i = 0; i < Arr1; i++){
        ArrayIzquierdo[i] = ArrayMergeSort[Izquierda + i];
    }
    for(var j = 0; j < Arr2; j++){
        ArrayDerecho[j] = ArrayMergeSort[Mitad + j + 1];
    }
    var i = 0;
    var j = 0;
    var k = Izquierda;
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
    while(i < Arr1){
        ArrayMergeSort[k] = ArrayIzquierdo[i];
        i++;
        k++;
    }
    while(j < Arr2){
        ArrayMergeSort[k] = ArrayDerecho[j];
        j++;
        k++;
    }
    for(var i = 0; i < ArrayMergeSort.length; i++){
        animaInsertSort(".txtMS", i);
    }
    MostrarArrayMS();
}