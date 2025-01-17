const qidContainer = document.getElementById("qid-container")
const fullscreenButton = document.getElementById("fullscreen-button");
const svgIcons = fullscreenButton.querySelectorAll("svg");
const testQuestionTag = document.getElementById("test-question-tag");
const testQuestionfig = document.getElementById("test-question-fig");
const physicsBtn = document.getElementById("physics-button");
const chemistryBtn = document.getElementById("chemistry-button");
const biologyBtn = document.getElementById("biology-button");
const testTimer = document.getElementById("test-timer")
const testName = document.getElementById('test-name')
const nextBtn = document.getElementById("next-button");
const previousBtn = document.getElementById("previous-button");
const optionItems = document.getElementById("options-list");
const testQuestionNum = document.getElementById("test-question-num");
const testQuestionText = document.getElementById("test-question-text");
const submitBtn = document.getElementById("submit-button");


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

//const testContent = JSON.parse(localStorage.getItem("currentTest")).testContent;
const currentTest = JSON.parse(localStorage.getItem('currentTest'));
const testContent = currentTest.testContent;
testName.innerText = `Daily Drill ${currentTest.testNum}`

// Initialize the myResponse array
let myResponse = Array(testContent.length).fill(null);

// Function to render the current question
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
    <li data-option="o1"><span>(1)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span>${currentContent.o1}</span></li>
    <li data-option="o2"><span>(2)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span>${currentContent.o2}</span></li>
    <li data-option="o3"><span>(3)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span>${currentContent.o3}</span></li>
    <li data-option="o4"><span>(4)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span>${currentContent.o4}</span></li>
  `;

  // Restore the previously selected option
  const selectedOption = myResponse[currentIndex];
  if (selectedOption) {
    const optionToActivate = [...optionItems.children].find(
      (li) => li.dataset.option === selectedOption
    );
    if (optionToActivate) optionToActivate.classList.add("active");
  }
}

optionItems.addEventListener("click", (event) => {
  // Check if the clicked element is an LI or any child of LI (like SPAN)
  const selectedOption = event.target.closest("li");

  if (selectedOption) {
    const optionCode = selectedOption.dataset.option;

    // Check if the clicked option is already active
    if (selectedOption.classList.contains("active")) {
      // Deselect the option
      selectedOption.classList.remove("active");
      myResponse[currentIndex] = null; // Set the response to null
    } else {
      // Remove active class from all options
      [...optionItems.children].forEach((li) => li.classList.remove("active"));

      // Mark the selected option as active and update the response
      selectedOption.classList.add("active");
      myResponse[currentIndex] = optionCode;
    }
  }
});

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

// Event listener for the submit button


// Initial render
renderQuestion();
//const submitBtn = document.getElementById("submit-button");
const popupOverlay = document.getElementById("popup-overlay");
const confirmationPopup = document.getElementById("confirmation-popup");
const yesButton = document.getElementById("yes-button");
const noButton = document.getElementById("no-button");

// Show the popup when Submit is clicked
submitBtn.addEventListener("click", () => {
  popupOverlay.style.display = "block";
  confirmationPopup.style.display = "block";
});

// Handle Yes button click
yesButton.addEventListener("click", submitTest);

let timeInSeconds = testContent.length * 60;

function updateTimer() {
  let minutes = Math.floor(timeInSeconds / 60);
  let seconds = timeInSeconds % 60;
  testTimer.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

  if (timeInSeconds === 0) {
    submitTest();
    alert("TIME's UP")
  } else {
    timeInSeconds--;
    setTimeout(updateTimer, 1000);
  }
  if (timeInSeconds < 179) {
    testTimer.style.color = "red";
  }
}

function submitTest() {
  if (currentTest) {
    // Update the yourResponse key's value to "attempted"
    currentTest.yourResponse = myResponse;

    // Update the full testCards array in local storage
    const allTestCards = JSON.parse(localStorage.getItem('testCards')) || [];
    const updatedTestCards = allTestCards.map(card =>
      card.testNum === currentTest.testNum ? currentTest : card
    );

    localStorage.setItem('testCards', JSON.stringify(updatedTestCards));

    // Update the currentTest object in local storage
    localStorage.setItem('currentTest', JSON.stringify(currentTest));

    console.log('Updated Test Card:', currentTest);
    console.log('All Test Cards:', updatedTestCards);
  } else {
    console.log('No test card data found to update.');
  }
  window.location.href = "scoreboard.html";

};


// Handle No button click
noButton.addEventListener("click", () => {
  popupOverlay.style.display = "none";
  confirmationPopup.style.display = "none";
});
updateTimer();



