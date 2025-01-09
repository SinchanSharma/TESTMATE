        const scoreContainer = document.getElementById("score-container");

        // Retrieve testCards from localStorage
        const testCards = JSON.parse(localStorage.getItem('testCards')) || [];

        function calculateTotalScore(card) {
            let totalScore = 0;

            // Skip if yourResponse is null
            if (!Array.isArray(card.yourResponse)) {
                return null;
            }

            // Loop through yourResponse array
            card.yourResponse.forEach((response, index) => {
                // Check if index exists in testContent
                if (index < card.testContent.length) {
                    const correctAnswer = card.testContent[index].ans;

                    if (response === null) {
                        // If response is null, 0 marks
                        totalScore += 0;
                    } else if (response === correctAnswer) {
                        // If response matches ans, +4 marks
                        totalScore += 4;
                    } else {
                        // If response does not match ans, -1 mark
                        totalScore -= 1;
                    }
                }
            });
            return totalScore;
        }

        function calculatePhyScore(card) {
            let phyScore = 0;

            // Skip if yourResponse is null
            if (!Array.isArray(card.yourResponse)) {
                return null;
            }

            // Loop through yourResponse array
            card.yourResponse.forEach((response, index) => {
                // Check if index exists in testContent
                if (index < Math.floor(card.testContent.length / 3)) {
                    const correctAnswer = card.testContent[index].ans;

                    if (response === null) {
                        // If response is null, 0 marks
                        phyScore += 0;
                    } else if (response === correctAnswer) {
                        // If response matches ans, +4 marks
                        phyScore += 4;
                    } else {
                        // If response does not match ans, -1 mark
                        phyScore -= 1;
                    }
                }
            });
            return phyScore;
        }

        function calculateCheScore(card) {
            let cheScore = 0;

            // Skip if yourResponse is null
            if (!Array.isArray(card.yourResponse)) {
                return null;
            }

            // Loop through yourResponse array
            card.yourResponse.forEach((response, index) => {
                // Check if index exists in testContent
                if (index >= Math.floor(card.testContent.length / 3) && index < Math.floor(card.testContent.length / 1.5)) {
                    const correctAnswer = card.testContent[index].ans;

                    if (response === null) {
                        // If response is null, 0 marks
                        cheScore += 0;
                    } else if (response === correctAnswer) {
                        // If response matches ans, +4 marks
                        cheScore += 4;
                    } else {
                        // If response does not match ans, -1 mark
                        cheScore -= 1;
                    }
                }
            });
            return cheScore;
        }

        function calculateBioScore(card) {
            let bioScore = 0;

            // Skip if yourResponse is null
            if (!Array.isArray(card.yourResponse)) {
                return null;
            }

            // Loop through yourResponse array
            card.yourResponse.forEach((response, index) => {
                // Check if index exists in testContent
                if (index >= Math.floor(card.testContent.length / 1.5) && index < card.testContent.length) {
                    const correctAnswer = card.testContent[index].ans;

                    if (response === null) {
                        // If response is null, 0 marks
                        bioScore += 0;
                    } else if (response === correctAnswer) {
                        // If response matches ans, +4 marks
                        bioScore += 4;
                    } else {
                        // If response does not match ans, -1 mark
                        bioScore -= 1;
                    }
                }
            });
            return bioScore;
        }

        function calculateCorrect(card) {
            let totalCorrect = 0;

            // Skip if yourResponse is null
            if (!Array.isArray(card.yourResponse)) {
                return null;
            }

            // Loop through yourResponse array
            card.yourResponse.forEach((response, index) => {
                // Check if index exists in testContent
                if (index < card.testContent.length) {
                    const correctAnswer = card.testContent[index].ans;

                    if (response === null) {
                        // If response is null, 0 marks
                        totalCorrect += 0;
                    } else if (response === correctAnswer) {
                        // If response matches ans, +4 marks
                        totalCorrect += 1;
                    } else {
                        // If response does not match ans, -1 mark
                        totalCorrect += 0;
                    }
                }
            });
            return totalCorrect;
        }

        function calculateIncorrect(card) {
            let totalIncorrect = 0;

            // Skip if yourResponse is null
            if (!Array.isArray(card.yourResponse)) {
                return null;
            }

            // Loop through yourResponse array
            card.yourResponse.forEach((response, index) => {
                // Check if index exists in testContent
                if (index < card.testContent.length) {
                    const correctAnswer = card.testContent[index].ans;

                    if (response === null) {
                        // If response is null, 0 marks
                        totalIncorrect += 0;
                    } else if (response === correctAnswer) {
                        // If response matches ans, +4 marks
                        totalIncorrect += 0;
                    } else {
                        // If response does not match ans, -1 mark
                        totalIncorrect += 1;
                    }
                }
            });
            return totalIncorrect;
        }

        function calculateLeft(card) {
            let totalLeft = 0;

            // Skip if yourResponse is null
            if (!Array.isArray(card.yourResponse)) {
                return null;
            }

            // Loop through yourResponse array
            card.yourResponse.forEach((response, index) => {
                // Check if index exists in testContent
                if (index < card.testContent.length) {
                    const correctAnswer = card.testContent[index].ans;

                    if (response === null) {
                        // If response is null, 0 marks
                        totalLeft += 1;
                    } else if (response === correctAnswer) {
                        // If response matches ans, +4 marks
                        totalLeft += 0;
                    } else {
                        // If response does not match ans, -1 mark
                        totalLeft += 0;
                    }
                }
            });
            return totalLeft;
        }



        function renderScores() {
            scoreContainer.innerHTML = ""; // Clear existing content

            testCards.forEach((card) => {
                const totalScore = calculateTotalScore(card);
                const phyScore = calculatePhyScore(card);
                const cheScore = calculateCheScore(card);
                const bioScore = calculateBioScore(card);
                const totalCorrect = calculateCorrect(card);
                const totalIncorrect = calculateIncorrect(card);
                const totalLeft = calculateLeft(card);

                if (totalScore !== null) {
                    const scoreBox = document.createElement("div");
                    scoreBox.className = "score-box";

                    scoreBox.innerHTML = `
                <span>Daily drills ${card.testNum}</span>
                <span>${card.testContent.length} Q</span>
                <span id="correct-ans">${totalCorrect}</span>
                <span id="incorrect-ans">${totalIncorrect}</span>
                <span id="left-quest">${totalLeft}</span>
                <span>${phyScore}/${Math.floor((card.testContent.length * 4) / 3)}</span>
                <span>${cheScore}/${Math.floor((card.testContent.length * 4) / 3)}</span>
                <span>${bioScore}/${Math.floor((card.testContent.length * 4) / 3)}</span>
                <span>${totalScore}/${Math.floor(card.testContent.length * 4)}</span>
                <button>Solution</button>
            `;

                    // Select the Solution button after it has been added to the DOM
                    const solutionButton = scoreBox.querySelector("button");

                    // Adding event listener for "Solution" button
                    solutionButton.addEventListener('click', () => {
                        // Store the card object in localStorage
                        localStorage.setItem('currentCard', JSON.stringify(card));

                        // Redirect to the test-solution.html page
                        window.location.href = 'test-solution.html';
                    });

                    scoreContainer.prepend(scoreBox);
                }
            });
        }


        // Initial rendering
        renderScores();
