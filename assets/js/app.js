// Como estan organizadas las cartas
// 2C = 2 of Clubs      (Treboles)
// 2D = 2 of Diamonds   (Diamantes)
// 2H = 2 of Hearts     (Corazones)
// 2S = 2 of Spades     (Pica)

// acá es donde estan las cartas listas para dar
let deck = [];
// tipos de letras de las cartas
const tipos = ['C', 'D', 'H', 'S'];
// cartas que no son numeros
const especiales = ['A', 'J', 'Q', 'K']

// Con esta funcion creo una nueva barajas (seria como mezclar y tener el maso listo para dar)
const crearDeck = () => {

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
}

const pedirCarta = () => {
    // antes tengo que preguntar si tengo cartas en el deck
    if (deck.length === 0) {
        throw 'No hay cartas en la baraja'
    }
    // saco de la baraja la ultima carta y la retorno
    const carta = deck.pop();
    return carta;
}

crearDeck();