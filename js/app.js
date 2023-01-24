
    //comunicar botones y textareas a javascript
    var botonIniciar = document.getElementsByClassName("pantallaInicio__iniciar")[0];
    var botonAgregar = document.getElementsByClassName("pantallaInicio__agregar")[0];
    var botonCancelar = document.getElementById("botonCancelar");
    var botonGuardaryEmpezar=document.getElementById("botonGuardar");
    var ingresarPalabra=document.getElementsByClassName("pantallaAgregar__textarea")[0];
    var botonNuevoJuego=document.getElementById("botonNuevoJuego");
    var botonDesistir=document.getElementById("botonDesistir");
    var ingresarLetra=document.getElementsByClassName("ingresarNuevaLetra")[0];
    var mostrarErrores=document.getElementsByClassName("letrasEquivocadas")[0]

    //dibujar la horca
    var pantalla=document.querySelector("canvas");
    var pincel=pantalla.getContext("2d");
    pincel.strokeStyle = "#0A3871";
    pincel.lineCap = "round";

    //Variables necesarias para el juego
    var palabraSorteada="";
    var palabraSeparada="";
    var nuevaLetra="";
    var listaErrores=[];
    var errores=listaErrores.length;
    var letrasEncontradas=[];

    //lista de palabras inicial
    var listaDePalabras = ["CARTERO", "FRENAR", "AVION", "GLACIAR", "MERCADO", "LLORAR", "CIERVO", "FUENTE", "MOMIA", "COLUMNA"];

    //funciones mostrar-esconder
    function esconderInicio() {
        document.getElementsByClassName("pantallaInicio")[0].style.display = "none";
    }

    function mostrarInicio() {
        document.getElementsByClassName("pantallaInicio")[0].style.display = "flex";
    }

    function esconderIniciar(){
        document.getElementsByClassName("pantallaIniciar")[0].style.display = "none";
    }

    function mostrarIniciar() {
        document.getElementsByClassName("pantallaIniciar")[0].style.display = "flex";
    }

    function esconderAgregar() {
        document.getElementsByClassName("pantallaAgregar")[0].style.display = "none";
    }

    function mostrarAgregar() {
        document.getElementsByClassName("pantallaAgregar")[0].style.display = "flex";
    }

    //funciones botones
    function iniciarJuego() {
        reiniciarVariables();
        esconderInicio();
        mostrarIniciar();
        mostrarGuiones();
    }

    function agregarPalabra() {
        esconderInicio();
        mostrarAgregar();
    }

    function cancelar() {
        ingresarPalabra.value="";
        esconderAgregar();
        mostrarInicio();
    }

    function guardaryEmpezar(){
        var nuevaPalabra=ingresarPalabra.value.toUpperCase();
        var cantidadDeLetras=nuevaPalabra.split("");
        if(cantidadDeLetras.length<9&&cantidadDeLetras.length>0){
            listaDePalabras.push(nuevaPalabra);
            ingresarPalabra.value="";
            esconderAgregar();
            mostrarIniciar();
            mostrarGuiones();
        }else{
            alert("Ingresa una palabra con un maximo de 8 letras");
            ingresarPalabra.value="";
        }
    }

    function nuevoJuego(){
        reiniciarVariables();
        limpiarPantalla();
        mostrarGuiones();
        ingresarLetra.disabled=false;
    }

    function desistir(){
        esconderIniciar();
        mostrarInicio();
        reiniciarVariables();
        limpiarPantalla();
        ingresarLetra.disabled=false;
    }


    //funciones necesarias para el juego
    function sortearPalabra() {
        var aleatorio = Math.floor(Math.random() * listaDePalabras.length);
        palabraSorteada=listaDePalabras[aleatorio];
    }

    function mostrarGuiones() {
        sortearPalabra();
        palabraSeparada = palabraSorteada.split("");
        for (let i = 0; i < palabraSeparada.length; i++) {
            document.getElementsByClassName("letra")[i].style.display = "flex";
            document.getElementsByClassName("guion")[i].style.display = "flex";
        }
    }

    function comprobarLetra(){
        nuevaLetra=ingresarLetra.value.toUpperCase();
        var valorAscii=nuevaLetra.charCodeAt(0);
        if(valorAscii>64 && valorAscii<91){
            estaEnLaPalabra();
        }else{
        }
        ingresarLetra.value="";
    }

    function estaEnLaPalabra(){
       if(palabraSeparada.includes(nuevaLetra)){
            if(!(letrasEncontradas.includes(nuevaLetra))){
                letraCorrecta();
            }
        } else{
            letraIncorrecta();
        }
    }

    function letraCorrecta(){
        for (let i = 0; i < palabraSeparada.length; i++) {
            if(palabraSeparada[i]==nuevaLetra){
                document.getElementsByClassName("letra")[i].innerHTML=nuevaLetra;
                letrasEncontradas.push(nuevaLetra);
            }
        }
        ganoElJuego();
    }

    function letraIncorrecta(){
        if(!(listaErrores.includes(nuevaLetra))){
                listaErrores.push(nuevaLetra);
                errores=listaErrores.length;
                mostrarErrores.value=mostrarErrores.value+nuevaLetra;
            }
            dibujarHorca();     
    }

    function dibujarHorca(){
        switch(errores){
            case 1:
                pincel.lineWidth = 5;
                dibujarLinea(5,365,299,365);
                break;
            case 2:
                pincel.lineWidth = 4.5;
                dibujarLinea(85,365,85,5);
                break;
            case 3:
                dibujarLinea(85,5,258,5);
                break;
            case 4: 
                dibujarLinea(258,5,258,54.5);
                break;
            case 5: 
                pincel.beginPath();
                pincel.arc(258, 86, 31.5, 0, 2 * Math.PI);
                pincel.stroke(); 
                break;
            case 6:
                dibujarLinea(258,117.5,258,252.5);
                break;
            case 7: 
                dibujarLinea(258,117.5,223,180.5);
                break;
            case 8: 
                dibujarLinea(258,117.5,293,180.5);
                break;
            case 9: 
                dibujarLinea(258,252.5,223,315.5);
                break;
            case 10: 
                dibujarLinea(258,252.5,293,315.5);
                finDelJuego();
                break;
        }
    }

    function dibujarLinea(x1,y1,x2,y2){
        pincel.beginPath();
        pincel.moveTo(x1, y1);
        pincel.lineTo(x2, y2);
        pincel.stroke();
    }

    function finDelJuego(){
        pincel.fillStyle="red";
        pincel.font = "30px Inter";
        pincel.fillText("Fin del Juego!", 300, 180.5);
        ingresarLetra.disabled=true;
    }

    function ganoElJuego(){
        if(letrasEncontradas.length==palabraSeparada.length){
            pincel.fillStyle="green";
            pincel.font = "30px Inter";
            pincel.fillText("Ganaste,", 300, 180.5);
            pincel.fillText("Felicidades!", 300, 220);
            ingresarLetra.disabled=true;
        }
    }

    //funciones para limpiar
    function reiniciarVariables(){
        listaErrores=[];
        errores=listaErrores.length;
        letrasEncontradas=[];
    }
    
    function limpiarPantalla(){
        pincel.clearRect(0, 0, pantalla.width, pantalla.height);
        for (let i = 0; i < palabraSeparada.length; i++) {
            document.getElementsByClassName("letra")[i].innerHTML = "";
            document.getElementsByClassName("letra")[i].style.display="none";
            document.getElementsByClassName("guion")[i].style.display = "none";
        }
        mostrarErrores.value="";
    }

    ingresarLetra.onkeyup = comprobarLetra;

    //funcionalidad de los botones
    botonIniciar.onclick = iniciarJuego;
    botonAgregar.onclick = agregarPalabra;
    botonCancelar.onclick = cancelar;
    botonGuardaryEmpezar.onclick=guardaryEmpezar;
    botonNuevoJuego.onclick=nuevoJuego;
    botonDesistir.onclick=desistir;