(() => {
  "use strict";

  let deck = [];

  const tipos = ["C", "D", "H", "S"];
  const especiales = ["A", "J", "Q", "K"];

  let puntosJugadores = [];

  // Referencias al HTML
  const btnPedir = document.querySelector("#btnPedir");
  const btnDetener = document.querySelector("#btnDetener");
  const btnNuevo = document.querySelector("#btnNuevo");

  const puntosHTML = document.querySelectorAll("small");
  const divCartasJugadores = document.querySelectorAll(".divCartas");

  // funcion para inicializar el juego
  const inicializarJuego = (numJugadores = 2) => {
    deck = crearDeck();
    for (let i = 0; i < numJugadores; i++) {
      puntosJugadores.push(0);
    }
  };

  // Nueva baraja
  const crearDeck = () => {
    deck = [];
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
    return _.shuffle(deck);
  };

  // Sacar una carta
  const pedirCarta = () => {
    if (deck.length === 0) {
      throw "No hay cartas en la baraja";
    }
    return deck.pop();
  };

  // devuelve el puntaje de la carta
  const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
  };

  // elimino las carta de la pantalla
  const borrarCartas = (element) => {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  };

  // Turno 0 = primero jugador y el ultimo la computadora
  const acumularPuntos = (carta, turno) => {
    puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
    puntosHTML[turno].innerText = puntosJugadores[turno];
    return puntosJugadores[turno];
  };

  const crearCarta = (carta, turno) => {
    // creo la carta en el DOM
    const imgCarta = document.createElement("img");
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add("carta");
    divCartasJugadores[turno].append(imgCarta);
  };

  // turno computadora
  const turnoComputadora = (puntosMinimos) => {
    do {
      const carta = pedirCarta();

      acumularPuntos(carta, puntosJugadores.length - 1);
      crearCarta(carta, puntosJugadores.length - 1);

      if (puntosMinimos > 21) {
        break;
      }
    } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);

    // se podria usar otra cosa como una ventana modal por ejemplo !!!! TODO !!!!!!!!!!!!!!!!!!!!!!!!!!!!
    setTimeout(() => {
      if (puntosComputadora === puntosMinimos) {
        alert("Nadie gana :(");
      } else if (puntosMinimos > 21) {
        alert("Computadora Gana");
      } else if (puntosComputadora > 21) {
        alert("Jugador Gana");
      } else {
        alert("Computadora Gana");
      }
    }, 100);
  };

  // Eventos de las referencias al HTML
  btnPedir.addEventListener("click", () => {
    const carta = pedirCarta();
    const puntosJugador = acumularPuntos(carta, 0);
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
    inicializarJuego();
    // habilito botones
    btnPedir.disabled = false;
    btnDetener.disabled = false;
    // borro cartas
    borrarCartas(divCartasJugadores);
    // reset puntajes
    // puntosJugador = 0;
    // puntosComputadora = 0;
    // pongo en cero los puntos
    puntosHTML.innerText = 0;
    // creo una baraja nueva
    deck = crearDeck();
    // borrar todas las cartas
  });
})();
