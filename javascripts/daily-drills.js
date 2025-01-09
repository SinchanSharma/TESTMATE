        const dropdown = document.getElementById('dropdown');
        const genBtn = document.getElementById('gen-button');
        const cardContainer = document.querySelector('.card-container');
        let testNum = 1;
        let subQ = 10;

        dropdown.addEventListener('change', () => {
            subQ = dropdown.value;
        });

        // Function to fetch data from a JSON file
        const fetchData = async (filePath) => {
            const response = await fetch(filePath);
            return response.json();
        };

        // Function to fetch and combine questions from multiple JSON files, then get 10 random questions
        const getRandomQuestionsFromFiles = async (filePaths) => {
            let combinedData = [];

            // Fetch and combine data from all files
            for (const filePath of filePaths) {
                const data = await fetchData("database/questions/" + filePath + ".json");
                combinedData = [...combinedData, ...data];
            }

            // Shuffle combined data and pick 10 random questions
            const shuffled = combinedData.sort(() => 0.5 - Math.random());
            return shuffled.slice(0, subQ);
        };

        // File paths categorized by subjects
        const physicsFiles = JSON.parse(localStorage.getItem("myPhysicsChapters")) || [];
        const chemistryFiles = JSON.parse(localStorage.getItem("myChemistryChapters")) || [];
        const biologyFiles = JSON.parse(localStorage.getItem("myBiologyChapters")) || [];

        console.log(physicsFiles);
        

        // Function to load test content from all categorized JSON files
        const loadTestContent = async () => {
            const phyQuestions = await getRandomQuestionsFromFiles(physicsFiles);
            const cheQuestions = await getRandomQuestionsFromFiles(chemistryFiles);
            const bioQuestions = await getRandomQuestionsFromFiles(biologyFiles);

            // Combine questions from all subjects
            return [...phyQuestions, ...cheQuestions, ...bioQuestions];
        };



        // Load existing test cards from local storage on page load
        const loadTestCards = () => {
            const storedCards = JSON.parse(localStorage.getItem('testCards')) || [];
            storedCards.forEach(card => {
                addCardToDOM(card.testNum, card.testDate, card.testDetail, card.yourResponse);
            });
            testNum = storedCards.length + 1; // Update testNum based on stored cards
        };

        const addCardToDOM = (num, date, detail, response = null) => {
            const testCard = document.createElement('div');
            testCard.className = 'card';

            const buttonText = response === null ? "START" : "DONE";
            const buttonClass = response === null ? "test-condition" : "final-condition";
            const buttonDisabled = response === null ? "" : "disabled";

            testCard.innerHTML = ` 
        <div class="test-num">Daily drills ${num}</div>
        <div class="test-date">${date}</div>
        <div class="test-details">${detail} Questions</div>
        <button class="${buttonClass}" data-num="${num}" data-date="${date}" data-details="${detail}" ${buttonDisabled}>${buttonText}</button>`;
            cardContainer.prepend(testCard);
        };

        const saveCardToLocalStorage = (num, date, detail, content) => {
            const storedCards = JSON.parse(localStorage.getItem('testCards')) || [];
            storedCards.push({
                testNum: num,
                testDate: date,
                testDetail: detail,
                testContent: content,
                yourResponse: null // Add yourResponse with default value null
            });
            localStorage.setItem('testCards', JSON.stringify(storedCards));
        };

        // Redirect to live.html and log test card data
        const handleStartClick = (e) => {
            if (e.target.classList.contains('test-condition')) {
                const testNum = e.target.getAttribute('data-num');
                const testDate = e.target.getAttribute('data-date');
                const testDetail = e.target.getAttribute('data-details');

                // Retrieve the test card's data from local storage
                const storedCards = JSON.parse(localStorage.getItem('testCards')) || [];
                const currentTest = storedCards.find(card => card.testNum === parseInt(testNum));

                // Store clicked test card data temporarily for live.html
                localStorage.setItem('currentTest', JSON.stringify(currentTest));
                // Redirect to live.html
                window.location.href = 'live-test.html';
            }
        };

        genBtn.addEventListener("click", async () => {
            if(physicsFiles.length === 0 || chemistryFiles.length === 0 || biologyFiles.length === 0 ){
            alert("please add atleast one chapter from each subject in My chapters section!")
            return;
        }
            // Check how many test cards with "START" button are present
            const storedCards = JSON.parse(localStorage.getItem('testCards')) || [];
            const activeTestCards = storedCards.filter(card => card.yourResponse === null); // Filter by "START" condition

            if (activeTestCards.length >= 3) {
                alert('Attempt previous tests first');
                return; // Prevent new test card creation
            }

            const today = new Date();
            const formattedDate = today.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            });

            const testDetails = Math.floor(subQ * 3);

            // Load test content
            const testContent = await loadTestContent();

            // Add card to DOM
            addCardToDOM(testNum,formattedDate, testDetails );

            // Save card to local storage
            saveCardToLocalStorage(testNum, formattedDate, testDetails, testContent);

            testNum++;
        });

        // Attach event listener for dynamically created "START" buttons
        cardContainer.addEventListener('click', handleStartClick);

        // Initialize the app by loading test cards from local storage
        loadTestCards();