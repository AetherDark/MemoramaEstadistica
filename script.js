const pairs = [
    { q: "Son aquellos fenómenos en los que no podemos predecir su resultado...", a: "Fenómenos aleatorios" },
    { q: "Son aquellos fenómenos en los que podemos predecir su resultado...", a: "Fenómenos deterministas" },
    { q: "Es un proceso aleatorio, razón entre casos favorables y posibles.", a: "Frecuencia relativa" },
    { q: "Fórmula de probabilidad clásica", a: "P(A) = Casos favorables / Casos posibles" },
    { q: "Es el conjunto de todos los posibles resultados de un experimento.", a: "Espacio muestral" },
    { q: "Evento que consiste en exactamente un resultado.", a: "Evento simple" },
    { q: "Si ocurre un evento, el otro no puede ocurrir al mismo tiempo.", a: "Eventos mutuamente excluyentes" },
    { q: "La probabilidad de que un evento ocurra dado que otro ha ocurrido.", a: "Probabilidad condicional" },
];

let cards = [];
let flippedCards = [];
let matchedPairs = 0;

// Duplicamos las preguntas y respuestas para hacer las cartas
pairs.forEach(pair => {
    cards.push({ text: pair.q, type: "question" });
    cards.push({ text: pair.a, type: "answer" });
});

// Mezclamos las cartas
cards = cards.sort(() => Math.random() - 0.5);

const board = document.getElementById("game-board");

// Creación de las cartas en el tablero
cards.forEach((cardData, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.index = index;
    card.dataset.type = cardData.type;
    card.textContent = "?";
    card.addEventListener("click", flipCard);
    board.appendChild(card);
});

function flipCard() {
    if (flippedCards.length >= 2) return;

    const card = this;
    const index = card.dataset.index;

    if (flippedCards.some(c => c.dataset.index === index)) return;

    card.textContent = cards[index].text;
    card.classList.add("flipped");

    flippedCards.push(card);

    if (flippedCards.length === 2) {
        setTimeout(checkMatch, 800);
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    const index1 = card1.dataset.index;
    const index2 = card2.dataset.index;

    const isMatch = (
        (cards[index1].type === "question" && cards[index2].type === "answer") ||
        (cards[index1].type === "answer" && cards[index2].type === "question")
    ) && pairs.some(p => 
        (p.q === cards[index1].text && p.a === cards[index2].text) ||
        (p.q === cards[index2].text && p.a === cards[index1].text)
    );

    if (isMatch) {
        card1.classList.add("matched");
        card2.classList.add("matched");
        matchedPairs++;

        if (matchedPairs === pairs.length) {
            setTimeout(() => alert("¡Ganaste! Has encontrado todas las parejas."), 500);
        }
    } else {
        card1.textContent = "?";
        card2.textContent = "?";
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
    }

    flippedCards = [];
}