const initialTexts = document.getElementById("initial-texts")

const start = document.getElementById("start")
const texts = document.getElementById("texts")

const showPhysicsChapters = document.getElementById("show-physics-chapters")
const showChemistryChapters = document.getElementById("show-chemistry-chapters")
const showBiologyChapters = document.getElementById("show-biology-chapters")

const allChapters = document.getElementById("alll-chapters")

const allPhysicsChapters = ["BM & Vectors", "Unit & Dimension", "Kinematics", "NLM & Friction", "Work, Energy & Power", "Circular Motion", "COM & Collision", "Rotational Motion", "Gravitation", "Fluid mechanics", "Thermal Physics", "Oscillation", "Wave Motion", "Electrostatics", "Current Electricity", "Capacitor", "Magnetism", "EMI", "AC", "EMW", "Ray Optics", "Wave Optics", "Modern Physics Ⅰ","Modern Physics ⅠⅠ","Modern Physics ⅠⅠⅠ", "Semiconductor"];
const allChemistryChapters = ["Mole Concept", "Atomic Structure", "Chemical Equilibrium", "Ionic Equilibrium", "Thermodynamics", "Redox Reactions", "Chemical Kinetics", "Solutions", "Electrochemistry", "IUPAC", "Isomerism", "GOC Ⅰ", "GOC Ⅱ", "Periodic Table", "Chemical Bonding", "p-Block", "d & f-Block", "Coordination Com"];
const allBiologyChapters = ["Living World", "Biological Classi", "Plant Kingdom", "Animal Kingdom", "Morphology", "Anatomy", "Animal Tissue", "Cell", "Cell Cycle", "Biomolecules", "Photosynthesis", "Respiration in Plants", "PGR", "Human Respiration", "Circulation", "Excretion", "Bones & Muscles", "Neural System", "Hormonal System", "Angiosperms", "Human Reproduction", "Reproductive Health", "POI & Variation", "MBOI", "Evolution", "HH & Disease", "Microbes", "Biotechnology Ⅰ", "Biotechnology Ⅱ", "Organisms & Pop", "Ecosystem", "Biodiversity & Con"];

function renderPhysicsChapters() {
  initialTexts.style.display = "none"
  texts.style.display = "block"
  start.style.display = "none"
  allChapters.innerHTML = ""
  allPhysicsChapters.forEach((chapter) => {
    const chapterCard = document.createElement("span")
    chapterCard.className = "card p";
    chapterCard.innerText = chapter;
    chapterCard.addEventListener("click", () => {
      if (chapterCard.classList.contains("selected")) {
        chapterCard.classList.remove("selected")
        start.style.display = "none"
        texts.style.display = "block"
      } else {
        const selectedCard = document.querySelector(".card.selected")
        if (selectedCard) {
          selectedCard.classList.remove("selected")
        }
        chapterCard.classList.add("selected");
        start.style.display = "block"
        texts.style.display = "none"
      }
    });
    allChapters.appendChild(chapterCard)
  })
}

function renderChemistryChapters() {
  initialTexts.style.display = "none"
  texts.style.display = "block"
  start.style.display = "none"
  allChapters.innerHTML = ""
  allChemistryChapters.forEach((chapter) => {
    const chapterCard = document.createElement("span")
    chapterCard.className = "card c";
    chapterCard.innerText = chapter;
    chapterCard.addEventListener("click", () => {
      if (chapterCard.classList.contains("selected")) {
        chapterCard.classList.remove("selected")
        start.style.display = "none"
        texts.style.display = "block"
      } else {
        const selectedCard = document.querySelector(".card.selected")
        if (selectedCard) {
          selectedCard.classList.remove("selected")
        }
        chapterCard.classList.add("selected");
        start.style.display = "block"
        texts.style.display = "none"
      }
    });
    allChapters.appendChild(chapterCard)
  })
}

function renderBiologyChapters() {
  initialTexts.style.display = "none"
  texts.style.display = "block"
  start.style.display = "none"
  allChapters.innerHTML = ""
  allBiologyChapters.forEach((chapter) => {
    const chapterCard = document.createElement("span")
    chapterCard.className = "card b";
    chapterCard.innerText = chapter;
    chapterCard.addEventListener("click", () => {
      if (chapterCard.classList.contains("selected")) {
        chapterCard.classList.remove("selected")
        start.style.display = "none"
        texts.style.display = "block"
      } else {
        const selectedCard = document.querySelector(".card.selected")
        if (selectedCard) {
          selectedCard.classList.remove("selected")
        }
        chapterCard.classList.add("selected");
        start.style.display = "block"
        texts.style.display = "none"
      }
    });
    allChapters.appendChild(chapterCard)
  })
}

showPhysicsChapters.addEventListener("click", renderPhysicsChapters)
showChemistryChapters.addEventListener("click", renderChemistryChapters)
showBiologyChapters.addEventListener("click", renderBiologyChapters)

start.addEventListener("click", () => {
  const selectedChapter = allChapters.querySelector(".card.selected")
  const chunaChapter = selectedChapter.innerText
  localStorage.setItem("refiningChapterName", JSON.stringify(chunaChapter))
  fetch(`database/questions/${chunaChapter}.json`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log(data); // Log the array of objects
      localStorage.setItem("refiningChapter", JSON.stringify(data))
    })
    .catch(error => {
      console.error('Error fetching the JSON file:', error);
    });

  window.location.href = "refining-chapter.html"
})
