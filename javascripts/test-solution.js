const qidContainer = document.getElementById("qid-container")
const fullscreenButton = document.getElementById("fullscreen-button");
const svgIcons = fullscreenButton.querySelectorAll("svg");
const testQuestionTag = document.getElementById("test-question-tag");
const testQuestionfig = document.getElementById("test-question-fig");
const currentScore = document.getElementById('current-score')
const physicsBtn = document.getElementById("physics-button");
const chemistryBtn = document.getElementById("chemistry-button");
const biologyBtn = document.getElementById("biology-button");
const testName = document.getElementById('test-name')
const nextBtn = document.getElementById("next-button");
const previousBtn = document.getElementById("previous-button");
const optionItems = document.getElementById("options-list");
const testQuestionNum = document.getElementById("test-question-num");
const testQuestionText = document.getElementById("test-question-text");
const doneBtn = document.getElementById("done-button");

// Initialize by showing only the fullscreen icon
svgIcons[1].style.display = "none";

fullscreenButton.addEventListener("click", () => {
    if (!document.fullscreenElement) {
        // Enter fullscreen mode
        document.documentElement.requestFullscreen();
        svgIcons[0].style.display = "none"; // Hide fullscreen icon
        svgIcons[1].style.display = "inline"; // Show fullscreen-exit icon
    } else {
        // Exit fullscreen mode
        document.exitFullscreen();
        svgIcons[1].style.display = "none"; // Hide fullscreen-exit icon
        svgIcons[0].style.display = "inline"; // Show fullscreen icon
    }
});

// Listen for fullscreen change events to ensure icons are updated
document.addEventListener("fullscreenchange", () => {
    if (document.fullscreenElement) {
        svgIcons[0].style.display = "none"; // Hide fullscreen icon
        svgIcons[1].style.display = "inline"; // Show fullscreen-exit icon
    } else {
        svgIcons[1].style.display = "none"; // Hide fullscreen-exit icon
        svgIcons[0].style.display = "inline"; // Show fullscreen icon
    }
});

let currentIndex = 0;

// Retrieve the stored card object from localStorage
const currentCard = JSON.parse(localStorage.getItem('currentCard'));
const testContent = currentCard.testContent

testName.innerText = `Daily Drill ${currentCard.testNum}`


function renderQuestion() {
    const currentContent = testContent[currentIndex];
    testQuestionNum.innerText = `${currentIndex + 1}.`;
    testQuestionText.innerText = currentContent.question;
    qidContainer.innerText = currentContent.qid;
    if (!currentContent.tag) {
        testQuestionTag.style.display = 'none';
    } else {
        testQuestionTag.style.display = 'block';
        testQuestionTag.innerText = `[${currentContent.tag}]`;
    };
    if (currentContent.fig !== null && currentContent.fig !== undefined) {
        testQuestionfig.style.display = 'block';
        testQuestionfig.innerHTML = `<img src="${currentContent.fig}">`;
    } else {
        testQuestionfig.style.display = 'none';
    }
    // Populate options
    optionItems.innerHTML = `
<li id="o1">1. ${currentContent.o1}</li>
<li id="o2">2. ${currentContent.o2}</li>
<li id="o3">3. ${currentContent.o3}</li>
<li id="o4">4. ${currentContent.o4}</li>
`;
    const actualAns = currentContent.ans;
    const myAns = currentCard.yourResponse[currentIndex];

    Array.from(optionItems.children).forEach(li => {
        li.classList.remove("wrong-answer", "actual-right-answer", "correct-answer");

        if (li.id === myAns && myAns !== actualAns) {
            li.classList.add("wrong-answer")
        } else if (li.id === actualAns && myAns !== actualAns) {
            li.classList.add("actual-right-answer")
        } else if (li.id === actualAns && myAns === null) {
            li.classList.add("actual-right-answer")
        } else if (li.id === actualAns && myAns === actualAns) {
            li.classList.add("correct-answer")
        }
    })

    if (myAns === actualAns) {
        currentScore.innerText = "+4";
        currentScore.style.color = "green";
    } else if (myAns === null) {
        currentScore.innerText = "0";
        currentScore.style.color = "black";
    } else {
        currentScore.innerText = "-1";
        currentScore.style.color = "red";
    }
}

// Event listeners for navigation buttons
nextBtn.addEventListener("click", nextQ);
previousBtn.addEventListener("click", prevQ);


function nextQ() {
    if (currentIndex < testContent.length - 1) {
        currentIndex++;
        renderQuestion();
    }
}

function prevQ() {
    if (currentIndex > 0) {
        currentIndex--;
        renderQuestion();
    }
}

document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') {
        prevQ();
    } else if (event.key === 'ArrowRight') {
        nextQ();
    }
});

physicsBtn.addEventListener("click", () => {
    currentIndex = 0;
    renderQuestion();

});

chemistryBtn.addEventListener("click", () => {
    currentIndex = Math.floor(testContent.length / 3);
    renderQuestion();

});

biologyBtn.addEventListener("click", () => {
    currentIndex = Math.floor((testContent.length / 3) * 2);
    renderQuestion();

});

doneBtn.addEventListener("click", () => {
    window.location.href = 'scoreboard.html';
});

renderQuestion()



