// Como estan organizadas las cartas
// 2C = 2 of Clubs      (Treboles)
// 2D = 2 of Diamonds   (Diamantes)
// 2H = 2 of Hearts     (Corazones)
// 2S = 2 of Spades     (Pica)

// acá es donde estan las cartas listas para dar
let deck = [];
// tipos de letras de las cartas
const tipos = ["C", "D", "H", "S"];
// cartas que no son numeros
const especiales = ["A", "J", "Q", "K"];
let puntosJugador = 0;
let puntosComputadora = 0;

// Referencias al HTML
const btnPedir = document.querySelector("#btnPedir");
const btnDetener = document.querySelector("#btnDetener");
const btnNuevo = document.querySelector("#btnNuevo");

const puntosJugadorHTML = document.querySelectorAll("small")[0];
const puntosComputadoraHTML = document.querySelectorAll("small")[1];

const divJugadorCartas = document.querySelector("#jugador-cartas");
const divComputadoraCartas = document.querySelector("#computadora-cartas");

// Con esta funcion creo una nueva barajas (seria como mezclar y tener el maso listo para dar)
const crearDeck = () => {
  let deck = [];
  for (let i = 2; i <= 10; i++) {
    for (const tipo of tipos) {
      deck.push(`${i}${tipo}`);
    }
  }

  for (const especial of especiales) {
    for (const tipo of tipos) {
      deck.push(`${especial}${tipo}`);
    }
  }
  deck = _.shuffle(deck);
  return deck;
};

const pedirCarta = () => {
  // antes tengo que preguntar si tengo cartas en el deck
  if (deck.length === 0) {
    throw "No hay cartas en la baraja";
  }
  // saco de la baraja la ultima carta y la retorno
  const carta = deck.pop();
  return carta;
};

const valorCarta = (carta) => {
  const valor = carta.substring(0, carta.length - 1);
  return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
};

const borrarCartas = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

// turno computadora
const turnoComputadora = (puntosMinimos) => {
  do {
    const carta = pedirCarta();
    puntosComputadora += valorCarta(carta);
    puntosComputadoraHTML.innerText = puntosComputadora;
    // creo la carta
    const imgCarta = document.createElement("img");
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add("carta");
    divComputadoraCartas.append(imgCarta);
    if (puntosMinimos > 21) {
      break;
    }
  } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);
  setTimeout(() => {
    // aca evaluo la situación de los puntos
    if (puntosComputadora === puntosMinimos) {
      alert("Nadie gana :(");
    } else if (puntosMinimos > 21) {
      alert("Computadora Gana");
    } else if (puntosComputadora > 21) {
      alert("Jugador Gana");
    } else {
      alert("Computadora Gana");
    }
  }, 500);
};

// Eventos de las referencias al HTML
btnPedir.addEventListener("click", () => {
  const carta = pedirCarta();
  puntosJugador += valorCarta(carta);
  puntosJugadorHTML.innerText = puntosJugador;
  // creo la carta
  const imgCarta = document.createElement("img");
  imgCarta.src = `assets/cartas/${carta}.png`;
  imgCarta.classList.add("carta");
  divJugadorCartas.append(imgCarta);
  if (puntosJugador > 21) {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
  } else if (puntosJugador == 21) {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
  }
});

btnDetener.addEventListener("click", () => {
  btnPedir.disabled = true;
  btnDetener.disabled = true;
  turnoComputadora(puntosJugador);
});

btnNuevo.addEventListener("click", () => {
  // habilito botones
  btnPedir.disabled = false;
  btnDetener.disabled = false;
  // borro cartas
  borrarCartas(divComputadoraCartas);
  borrarCartas(divJugadorCartas);
  // reset puntajes
  puntosJugador = 0;
  puntosComputadora = 0;
  // pongo en cero los puntos
  puntosJugadorHTML.innerText = puntosJugador;
  puntosComputadoraHTML.innerText = puntosComputadora;
  // creo una baraja nueva
  deck = crearDeck();
  // borrar todas las cartas
});

deck = crearDeck();
