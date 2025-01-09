    const syllabusPhyContainer = document.getElementById("syllabus-physics-container")
    const syllabusCheContainer = document.getElementById("syllabus-chemistry-container")
    const syllabusBioContainer = document.getElementById("syllabus-biology-container")
    const removePhy = document.getElementById("remove-my-physics")
    const removeChe = document.getElementById("remove-my-chemistry")
    const removeBio = document.getElementById("remove-my-biology")
    const addPhysicsChapter = document.getElementById("finally-add-physics");
    const addChemistryChapter = document.getElementById("finally-add-chemistry");
    const addBiologyChapter = document.getElementById("finally-add-biology");
    const addPhy = document.getElementById("add-phy");
    const addChe = document.getElementById("add-che");
    const addBio = document.getElementById("add-bio");
    const myPhyChapters = document.getElementById("my-phy-chapters");
    const myCheChapters = document.getElementById("my-che-chapters");
    const myBioChapters = document.getElementById("my-bio-chapters");
    const syllabusPhy = document.getElementById("phy-chapters");
    const syllabusChe = document.getElementById("che-chapters");
    const syllabusBio = document.getElementById("bio-chapters");

    addPhy.addEventListener("click",()=>{
      syllabusPhyContainer.style.display = "block";
    })
    addChe.addEventListener("click",()=>{
      syllabusCheContainer.style.display = "block";
    })
    addBio.addEventListener("click",()=>{
      syllabusBioContainer.style.display = "block";
    })

    const myPhysicsChapters = JSON.parse(localStorage.getItem("myPhysicsChapters")) || [];
    const myChemistryChapters = JSON.parse(localStorage.getItem("myChemistryChapters")) || [];
    const myBiologyChapters = JSON.parse(localStorage.getItem("myBiologyChapters")) || [];


    // Retrieve allChapters from localStorage or initialize it
    let allPhysicsChapters = JSON.parse(localStorage.getItem("allPhysicsChapters")) || ["BM & Vectors", "Unit & Dimension", "Kinematics", "NLM & Friction", "Work, Energy & Power", "Circular Motion", "COM & Collision", "Rotational Motion", "Gravitation", "Fluid mechanics", "Thermal Physics", "Oscillation", "Wave Motion", "Electrostatics", "Current Electricity", "Capacitor", "Magnetism", "EMI", "AC", "EMW", "Ray Optics", "Wave Optics", "Modern Physics", "Semiconductor"];
    let allChemistryChapters = JSON.parse(localStorage.getItem("allChemistryChapters")) || ["Mole Concept", "Atomic Structure", "Chemical Equilibrium", "Ionic Equilibrium", "Thermodynamics", "Redox Reactions", "Chemical Kinetics", "Solutions", "Electrochemistry", "IUPAC", "Isomerism", "GOC Ⅰ", "GOC Ⅱ", "Periodic Table", "Chemical Bonding", "p-Block", "d & f-Block", "Coordination Com"];
    let allBiologyChapters = JSON.parse(localStorage.getItem("allBiologyChapters")) || ["Living World", "Biological Classi", "Plant Kingdom", "Animal Kingdom", "Morphology", "Anatomy", "Animal Tissue", "Cell", "Cell Cycle", "Biomolecules", "Photosynthesis", "Respiration in Plants", "PGR", "Human Respiration", "Circulation", "Excretion", "Bones & Muscles", "Neural System", "Hormonal System", "Angiosperms", "Human Reproduction", "Reproductive Health", "POI & Variation", "MBOI", "Evolution", "HH & Disease", "Microbes", "Biotechnology Ⅰ", "Biotechnology Ⅱ", "Organisms & Pop", "Ecosystem", "Biodiversity & Con"];

    // Render all chapters
    function renderChapters() {
      syllabusPhy.innerHTML = ""; // Clear existing chapters
      for (let chapter of allPhysicsChapters) {
        const chapterCard = document.createElement("span");
        chapterCard.className = "chapter-card physics-card";
        chapterCard.innerHTML = `<p>${chapter}</p>`;
        chapterCard.addEventListener("click", () => {
          chapterCard.classList.toggle("selected");
        });
        syllabusPhy.appendChild(chapterCard);
      }


      myPhyChapters.innerHTML = "";
      for (let item of myPhysicsChapters) {
        const chapterC = document.createElement("span");
        chapterC.className = "chapter-card physics-card";
        chapterC.innerHTML = `<p>${item}</p>`;
        myPhyChapters.appendChild(chapterC);
        chapterC.addEventListener("click", () => {
          chapterC.classList.toggle("selected-to-remove");
          removePhy.style.display = "block";
        });
      }


      syllabusChe.innerHTML = ""; // Clear existing chapters
      for (let chapter of allChemistryChapters) {
        const chapterCard = document.createElement("span");
        chapterCard.className = "chapter-card chemistry-card";
        chapterCard.innerHTML = `<p>${chapter}</p>`;
        chapterCard.addEventListener("click", () => {
          chapterCard.classList.toggle("selected");
        });
        syllabusChe.appendChild(chapterCard);
      }


      myCheChapters.innerHTML = "";
      for (let item of myChemistryChapters) {
        const chapterC = document.createElement("span");
        chapterC.className = "chapter-card chemistry-card";
        chapterC.innerHTML = `<p>${item}</p>`;
        myCheChapters.appendChild(chapterC);
        chapterC.addEventListener("click", () => {
          chapterC.classList.toggle("selected-to-remove");
          removeChe.style.display = "block";
        });
      }

      syllabusBio.innerHTML = ""; // Clear existing chapters
      for (let chapter of allBiologyChapters) {
        const chapterCard = document.createElement("span");
        chapterCard.className = "chapter-card biology-card";
        chapterCard.innerHTML = `<p>${chapter}</p>`;
        chapterCard.addEventListener("click", () => {
          chapterCard.classList.toggle("selected");
        });
        syllabusBio.appendChild(chapterCard);
      }

      myBioChapters.innerHTML = "";
      for (let item of myBiologyChapters) {
        const chapterC = document.createElement("span");
        chapterC.className = "chapter-card biology-card";
        chapterC.innerHTML = `<p>${item}</p>`;
        myBioChapters.appendChild(chapterC);
        chapterC.addEventListener("click", () => {
          chapterC.classList.toggle("selected-to-remove");
          removeBio.style.display = "block";
        });
      }

    }


    // Handle Add Chapter Button Click
    addPhysicsChapter.addEventListener("click", () => {
      const selectedChapters = [];
      const chapterCards = syllabusPhy.querySelectorAll(".chapter-card.selected");

      chapterCards.forEach((card) => {
        selectedChapters.push(card.innerText.trim());
      });

      // Add selected chapters to myPhysicsChapters
      for (let chapter of selectedChapters) {
        if (!myPhysicsChapters.includes(chapter)) {
          myPhysicsChapters.push(chapter);
        }
      }

      // Remove selected chapters from the main list
      for (let chapter of selectedChapters) {
        const index = allPhysicsChapters.indexOf(chapter);
        if (index > -1) {
          allPhysicsChapters.splice(index, 1);
        }
      }
      saveChapters()
      saveAllChapters()
      renderChapters(); // Re-render the remaining chapters
    });

    addChemistryChapter.addEventListener("click", () => {
      const selectedChapters = [];
      const chapterCards = syllabusChe.querySelectorAll(".chapter-card.selected");

      chapterCards.forEach((card) => {
        selectedChapters.push(card.innerText.trim());
      });

      // Add selected chapters to myPhysicsChapters
      for (let chapter of selectedChapters) {
        if (!myChemistryChapters.includes(chapter)) {
          myChemistryChapters.push(chapter);
        }
      }

      // Remove selected chapters from the main list
      for (let chapter of selectedChapters) {
        const index = allChemistryChapters.indexOf(chapter);
        if (index > -1) {
          allChemistryChapters.splice(index, 1);
        }
      }
      saveChapters()
      saveAllChapters()
      renderChapters(); // Re-render the remaining chapters
    });

    addBiologyChapter.addEventListener("click", () => {
      const selectedChapters = [];
      const chapterCards = syllabusBio.querySelectorAll(".chapter-card.selected");

      chapterCards.forEach((card) => {
        selectedChapters.push(card.innerText.trim());
      });

      // Add selected chapters to myPhysicsChapters
      for (let chapter of selectedChapters) {
        if (!myBiologyChapters.includes(chapter)) {
          myBiologyChapters.push(chapter);
        }
      }

      // Remove selected chapters from the main list
      for (let chapter of selectedChapters) {
        const index = allBiologyChapters.indexOf(chapter);
        if (index > -1) {
          allBiologyChapters.splice(index, 1);
        }
      }
      saveChapters()
      saveAllChapters()
      renderChapters(); // Re-render the remaining chapters
    });

    // Handle to remove Chapter on Button Click
    removePhy.addEventListener("click", () => {
      const selectedChapters = [];
      const chapterCards = myPhyChapters.querySelectorAll(".chapter-card.selected-to-remove");

      chapterCards.forEach((card) => {
        selectedChapters.push(card.innerText.trim());
      });

      // Add selected chapters to myPhysicsChapters
      for (let chapter of selectedChapters) {
        if (!allPhysicsChapters.includes(chapter)) {
          allPhysicsChapters.push(chapter);
        }
      }

      // Remove selected chapters from the main list
      for (let chapter of selectedChapters) {
        const index = myPhysicsChapters.indexOf(chapter);
        if (index > -1) {
          myPhysicsChapters.splice(index, 1);
        }
      }
      saveChapters()
      saveAllChapters()
      renderChapters(); // Re-render chapters
    });

    removeChe.addEventListener("click", () => {
      const selectedChapters = [];
      const chapterCards = myCheChapters.querySelectorAll(".chapter-card.selected-to-remove");

      chapterCards.forEach((card) => {
        selectedChapters.push(card.innerText.trim());
      });

      // Add selected chapters to myPhysicsChapters
      for (let chapter of selectedChapters) {
        if (!allChemistryChapters.includes(chapter)) {
          allChemistryChapters.push(chapter);
        }
      }

      // Remove selected chapters from the main list
      for (let chapter of selectedChapters) {
        const index = myChemistryChapters.indexOf(chapter);
        if (index > -1) {
          myChemistryChapters.splice(index, 1);
        }
      }
      saveChapters()
      saveAllChapters()
      renderChapters(); // Re-render chapters
    });

    removeBio.addEventListener("click", () => {
      const selectedChapters = [];
      const chapterCards = myBioChapters.querySelectorAll(".chapter-card.selected-to-remove");

      chapterCards.forEach((card) => {
        selectedChapters.push(card.innerText.trim());
      });

      // Add selected chapters to myPhysicsChapters
      for (let chapter of selectedChapters) {
        if (!allBiologyChapters.includes(chapter)) {
          allBiologyChapters.push(chapter);
        }
      }

      // Remove selected chapters from the main list
      for (let chapter of selectedChapters) {
        const index = myBiologyChapters.indexOf(chapter);
        if (index > -1) {
          myBiologyChapters.splice(index, 1);
        }
      }
      saveChapters()
      saveAllChapters()
      renderChapters(); // Re-render chapters
    });

    // Save the updated allChapters to localStorage
    function saveAllChapters() {
      localStorage.setItem("allPhysicsChapters", JSON.stringify(allPhysicsChapters));
      localStorage.setItem("allChemistryChapters", JSON.stringify(allChemistryChapters));
      localStorage.setItem("allBiologyChapters", JSON.stringify(allBiologyChapters));
    }


    //save to localStorage
    function saveChapters() {
      localStorage.setItem("myPhysicsChapters", JSON.stringify(myPhysicsChapters));
      localStorage.setItem("myChemistryChapters", JSON.stringify(myChemistryChapters));
      localStorage.setItem("myBiologyChapters", JSON.stringify(myBiologyChapters));
    }


    // Initial render
    renderChapters();
