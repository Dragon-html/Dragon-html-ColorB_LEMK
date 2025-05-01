let tablero = [];
let lado = 7; //Para partir de esta 
let turno = "player1";




function iniciarJuego() {
  lado = parseInt(document.getElementById("size").value);
  tablero = Array(lado).fill(null).map(() => Array(lado).fill(null));
  turno = "player1";
  dibujarTablero();
}

function dibujarTablero() {
  const contenedor = document.getElementById("board");
  contenedor.innerHTML = "";
  contenedor.style.gridTemplateColumns = `repeat(${lado}, 40px)`;

  for (let fila = 0; fila < lado; fila++) {
    for (let col = 0; col < lado; col++) {
      const celda = document.createElement("div");
      celda.className = "cell";
      if (tablero[fila][col]) {
        celda.classList.add(tablero[fila][col]);
      }
      celda.addEventListener("click", () => jugarCasilla(fila, col));
      contenedor.appendChild(celda);
    }
  }
}

function jugarCasilla(fila, col) {
  if (tablero[fila][col]) return;

  tablero[fila][col] = turno;
  capturarColores(fila, col);
  if (estaLleno()) {
    declararGanador();
    return;
  }
  turno = turno === "player1" ? "player2" : "player1";
  dibujarTablero();
}

function capturarColores(fila, col) {
  const enemigo = turno === "player1" ? "player2" : "player1";
  const direcciones = [
   [-1, 0], [1, 0], [0, -1], [0, 1]

  ];




//dx y dy es el desplazamiento en las direcciones
// r y c son las coordenadas de la celda
//ddx y ddy son las coordenadas de la celda próxima
//rr y cc la vecina de la vecina 

  for (const [dx, dy] of direcciones) {
    const r = fila + dx;
    const c = col + dy;

    if (dentroDelTablero(r, c) && tablero[r][c] === enemigo) {
      let rodeado = true;
      for (const [ddx, ddy] of direcciones) {
        const rr = r + ddx;
        const cc = c + ddy;
        if (dentroDelTablero(rr, cc) && tablero[rr][cc] !== turno) {
        rodeado = false;
        break;
        }
      }
      if (rodeado) {
        tablero[r][c] = turno;
      }
    }
  }
}



function dentroDelTablero(fila, col) {
  return fila >= 0 && fila < lado && col >= 0 && col < lado;
}



//Comprobar 
function estaLleno() {

  for (let fila = 0; fila < lado; fila++) {
    for (let col = 0; col < lado; col++) {
      if (!tablero[fila][col]) return false;
    }
  }
  return true;
}

// Función para declarar el ganador mediante un evento 
function declararGanador() {
  let puntos1 = 0;
  let puntos2 = 0;

  for (let fila = 0; fila < lado; fila++) {
    for (let col = 0; col < lado; col++) {
      if (tablero[fila][col] === "player1") puntos1++;
      else if (tablero[fila][col] === "player2") puntos2++;
   }
  }

  let mensaje = "";
  if (puntos1 > puntos2) {
    mensaje = "Gana el Jugador 1 (Rojo) 🔴";
  } else if (puntos2 > puntos1) {
    mensaje = "Gana el Jugador 2 (Azul) 🔵";
  } else {
    mensaje = "Empate";
  }

  alert(mensaje);
}
