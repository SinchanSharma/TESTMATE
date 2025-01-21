        const dropdown = document.getElementById("dropdown");
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
        const currentCard = JSON.parse(localStorage.getItem('refiningChapter'));
        const currentCardName = JSON.parse(localStorage.getItem('refiningChapterName'));

        testName.innerHTML = `${currentCardName}`;

        function renderQuestionsJustFiguring() {
            const currentContent = currentCard[currentIndex];
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
                testQuestionfig.innerHTML = `<img src="database/figures/${currentContent.fig}">`;
            } else {
                testQuestionfig.style.display = 'none';
            }
           // Populate options
           if(currentContent.o1){
            optionItems.innerHTML = `
              <li id="o1"><span>(1)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span>${currentContent.o1}</span></li>
              <li id="o2"><span>(2)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span>${currentContent.o2}</span></li>
              <li id="o3"><span>(3)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span>${currentContent.o3}</span></li>
              <li id="o4"><span>(4)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span>${currentContent.o4}</span></li>
              `;
            }else{
                optionItems.innerHTML = `
              <li id="o1"><span>(1)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span><img src="database/figures/${currentContent.io1}"></span></li>
              <li id="o2"><span>(2)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span><img src="database/figures/${currentContent.io2}"></span></li>
              <li id="o3"><span>(3)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span><img src="database/figures/${currentContent.io3}"></span></li>
              <li id="o4"><span>(4)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span><img src="database/figures/${currentContent.io4}"></span></li>
              `;
            }
            const actualAns = currentContent.ans;
            Array.from(optionItems.children).forEach(li => {
                currentScore.innerText = ""
                li.classList.remove("correct-answer","wrong-answer");
                if (li.id === actualAns) {
                    li.classList.add("correct-answer")
                }
            });
        }

        function renderQuestionsToSolve() {
            const currentContent = currentCard[currentIndex];
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
                testQuestionfig.innerHTML = `<img src="database/figures/${currentContent.fig}">`;
            } else {
                testQuestionfig.style.display = 'none';
            }
            // Populate options
            if(currentContent.o1){
            optionItems.innerHTML = `
              <li id="o1"><span>(1)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span>${currentContent.o1}</span></li>
              <li id="o2"><span>(2)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span>${currentContent.o2}</span></li>
              <li id="o3"><span>(3)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span>${currentContent.o3}</span></li>
              <li id="o4"><span>(4)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span>${currentContent.o4}</span></li>
              `;              
            }else{
                optionItems.innerHTML = `
              <li id="o1"><span>(1)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span><img src="database/figures/${currentContent.io1}"></span></li>
              <li id="o2"><span>(2)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span><img src="database/figures/${currentContent.io2}"></span></li>
              <li id="o3"><span>(3)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span><img src="database/figures/${currentContent.io3}"></span></li>
              <li id="o4"><span>(4)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span><img src="database/figures/${currentContent.io4}"></span></li>
              `;
            }
            const actualAns = currentContent.ans;

            const listItems = Array.from(optionItems.children);
            listItems.forEach((liItem) => {
                liItem.classList.remove("correct-answer", "wrong-answer");
                currentScore.innerText = ""
                liItem.addEventListener("click", () => {
                    if (liItem.id === actualAns) {
                        liItem.classList.add("correct-answer")
                        currentScore.innerText = "correct"
                        currentScore.style.color = "green"
                    } else {
                        liItem.classList.add("wrong-answer")
                        listItems.forEach(item => {
                            if (item.id === actualAns) {
                                item.classList.add("correct-answer")
                            }
                        })
                        currentScore.innerText = "wrong"
                        currentScore.style.color = "red"
                    }
                    listItems.forEach(option => {
                        option.classList.add("disabled")
                    })
                })
            })  
        }
        // Event listeners for navigation buttons
        function nextQ() {
            if (currentIndex < currentCard.length - 1) {
                currentIndex++;
                if (dropdown.value === "fn1") {
                    renderQuestionsJustFiguring();
                } else if (dropdown.value === "fn2") {
                    renderQuestionsToSolve();
                }
            }
        }

        function prevQ() {
            if (currentIndex > 0) {
                currentIndex--;
                if (dropdown.value === "fn1") {
                    renderQuestionsJustFiguring();
                } else if (dropdown.value === "fn2") {
                    renderQuestionsToSolve();
                }
            }
        }


        nextBtn.addEventListener("click", nextQ);
        previousBtn.addEventListener("click", prevQ);

        document.addEventListener('keydown', function (event) {
            if (event.key === 'ArrowLeft') {
                event.preventDefault(); // Prevent the default behavior
                prevQ();
            } else if (event.key === 'ArrowRight') {
                event.preventDefault(); // Prevent the default behavior
                nextQ();
            }
        });

        doneBtn.addEventListener("click", () => {
            window.location.href = 'refining-lab.html';
        });

        window.onload = function () {
            renderQuestionsJustFiguring();
        };

        dropdown.addEventListener("change", () => {
            const selectedValue = dropdown.value;
            if (selectedValue === "fn1") {
                renderQuestionsJustFiguring();
            } else if (selectedValue === "fn2") {
                renderQuestionsToSolve();
            }
        });

    
