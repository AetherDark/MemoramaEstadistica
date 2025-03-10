// Definimos las preguntas y respuestas para el memorama
const pairs = [
    { type: "p1", text: "Son aquellos fenómenos en los que no podemos predecir su resultado." },
    { type: "p1", text: "Fenómenos aleatorios" },

    { type: "p2", text: "Es un proceso aleatorio, razón entre el número de casos favorables y el número de casos posibles." },
    { type: "p2", text: "Probabilidad clásica" },

    { type: "p3", text: "Es la estructura axiomática de la probabilidad, se basa en teoría de conjuntos." },
    { type: "p3", text: "Teoría de conjuntos" },

    { type: "p4", text: "Si cuando ocurre un evento, el otro no puede ocurrir y viceversa." },
    { type: "p4", text: "Eventos mutuamente excluyentes" },

    { type: "p5", text: "Es cualquier acción o proceso cuyo resultado está sujeto a incertidumbre." },
    { type: "p5", text: "Experimento aleatorio" },

    { type: "p6", text: "Es la recopilación de resultados contenidos en el espacio muestral." },
    { type: "p6", text: "Evento" }
];

// Barajar las cartas aleatoriamente
pairs.sort(() => Math.random() - 0.5);

const board = document.getElementById("board");
let selectedCards = [];
let matchedPairs = 0;

// Función para crear las cartas en el tablero
function createBoard() {
    pairs.forEach((pair, index) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.index = index;
        card.dataset.type = pair.type;

        const cardInner = document.createElement("div");
        cardInner.classList.add("card-inner");

        const cardFront = document.createElement("div");
        cardFront.classList.add("card-front");
        cardFront.textContent = "?";

        const cardBack = document.createElement("div");
        cardBack.classList.add("card-back");
        cardBack.textContent = pair.text;

        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);

        card.addEventListener("click", () => flipCard(card));
        board.appendChild(card);
    });
}

// Función para voltear la carta
function flipCard(card) {
    if (!card.classList.contains("flipped") && selectedCards.length < 2) {
        card.classList.add("flipped");
        selectedCards.push(card);

        if (selectedCards.length === 2) {
            checkMatch();
        }
    }
}

// Función para verificar si las cartas coinciden
function checkMatch() {
    const [card1, card2] = selectedCards;

    if (card1.dataset.type === card2.dataset.type) {
        // Si coinciden, las dejamos volteadas
        card1.classList.add("matched");
        card2.classList.add("matched");
        matchedPairs++;

        // Si el usuario encuentra todas las parejas, mostramos un mensaje
        if (matchedPairs === pairs.length / 2) {
            setTimeout(() => {
                alert("¡Felicidades! Has encontrado todas las parejas.");
            }, 500);
        }
    } else {
        // Si no coinciden, las volteamos de nuevo después de un tiempo
        setTimeout(() => {
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
        }, 1000);
    }

    // Reiniciamos la selección
    selectedCards = [];
}

// Iniciar el juego
createBoard();