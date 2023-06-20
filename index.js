var players = [];
        var currentNumberIndex = 0;
        var gameStarted = false;
        var gameOver = false;
        var generateCardsButton = document.getElementById("generate-cards-button");
        var startGameButton = document.getElementById("start-game-button");
        var winnerMessage = document.getElementById("winner-message");
        var drawnNumbersContainer = document.getElementById("drawn-numbers");

        function addPlayer() {
          var playerNameInput = document.getElementById("player-name");
          var playerName = playerNameInput.value;

          if (playerName.trim() === "") {
            alert("Por favor, insira o nome do jogador.");
            return;
          }

          players.push({
            name: playerName,
            card: null,
            hasBingo: false
          });

          playerNameInput.value = "";
        }
        
        function generateUniqueRandomNumbers(min, max, count) {
          var numbers = [];
          while (numbers.length < count) {
            var number = Math.floor(Math.random() * (max - min + 1)) + min;
            if (!numbers.includes(number)) {
              numbers.push(number);
            }
          }
          return numbers;
        }

        function generateBingoCard() {
          var bingoCardsContainer = document.getElementById("bingo-cards-container");
          bingoCardsContainer.innerHTML = "";

          for (var i = 0; i < players.length; i++) {
            var player = players[i];

            var bingoCardContainer = document.createElement("div");
            bingoCardContainer.classList.add("player-card"); /* Adiciona classe para criar um container para cada jogador */

            var bingoCard = document.createElement("div");
            bingoCard.classList.add("bingo-card");

            var numbers = generateUniqueRandomNumbers(1, 70, 25);

            for (var j = 0; j < 25; j++) {
              var bingoNumber = document.createElement("div");
              bingoNumber.classList.add("bingo-number");
              if (j === 12) {
                bingoNumber.innerText = "X";
                bingoNumber.classList.add("green");
              } else {
                bingoNumber.innerText = numbers[j];
              }
              bingoCard.appendChild(bingoNumber);
            }

            player.card = bingoCard;

            var playerName = document.createElement("h3");
            playerName.innerText = player.name;

            bingoCardContainer.appendChild(playerName); /* Adiciona o nome do jogador antes da cartela */
            bingoCardContainer.appendChild(bingoCard);
            bingoCardsContainer.appendChild(bingoCardContainer);
          }
        }

        function resetGame() {
          players = [];
          currentNumberIndex = 0;
          gameStarted = false;
          gameOver = false;
          var bingoCardsContainer = document.getElementById("bingo-cards-container");
          bingoCardsContainer.innerHTML = "";
          var winnerMessage = document.getElementById("winner-message");
          winnerMessage.innerText = "";
          drawnNumbersContainer.innerText = "";

          generateCardsButton.disabled = false; // Habilita o botão de gerar cartela
          startGameButton.disabled = false; // Habilita o botão de começar o jogo
        }

        function startGame() {
          if (players.length === 0) {
            alert("Adicione jogadores e gere as cartelas antes de começar o jogo.");
            return;
          }

          gameStarted = true;

          startGameButton.disabled = true; // Desabilita o botão de começar o jogo
          generateCardsButton.disabled = true; // Desabilita o botão de gerar cartela

          var bingoNumbers = generateUniqueRandomNumbers(1, 70, 70);

          nextNumber(bingoNumbers);
        }

        function nextNumber(bingoNumbers) {
  if (currentNumberIndex < bingoNumbers.length) {
    var number = bingoNumbers[currentNumberIndex];
    currentNumberIndex++;

    if (currentNumberIndex === 1) {
      drawnNumbersContainer.innerText = "Números sorteados: ";
    }

    markNumber(number);
    drawnNumbersContainer.innerText += number + " ";

    if (currentNumberIndex % 6 === 0) {
      drawnNumbersContainer.innerText += "\n";
    }

    if (!gameOver) {
      setTimeout(function() {
        nextNumber(bingoNumbers);
      }, 1000);
    }
  } else {
    gameOver = true;
    checkWinner();
  }
}




        function markNumber(number) {
          var bingoCards = document.querySelectorAll(".bingo-card");

          bingoCards.forEach(function(bingoCard) {
            var bingoNumbers = bingoCard.querySelectorAll(".bingo-number");

            bingoNumbers.forEach(function(bingoNumber) {
              if (bingoNumber.innerText == number && !bingoNumber.classList.contains("green")) {
                bingoNumber.classList.add("green");
                checkCardCompleted(bingoCard);

              }
            });
          });
        }

            function checkCardCompleted(bingoCard) {
      var bingoNumbers = bingoCard.querySelectorAll(".bingo-number:not(.green)");
      if (bingoNumbers.length === 0 && !gameOver) {
        var playerName = bingoCard.parentNode.querySelector("h3").innerText; // Atualiza para pegar o nome do jogador corretamente
        winnerMessage.innerText = "O jogador " + playerName + " venceu o bingo!";
        gameOver = true;
      }
    }


        document.getElementById("add-player-button").addEventListener("click", addPlayer);
        document.getElementById("generate-cards-button").addEventListener("click", generateBingoCard);
        document.getElementById("reset-button").addEventListener("click", resetGame);
        document.getElementById("start-game-button").addEventListener("click", startGame);
