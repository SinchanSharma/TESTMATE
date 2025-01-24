const buttonContainer = document.querySelector(".all-chapters-button-container")

const showAllPhysics = document.getElementById("show-all-physics")
const showAllChemistry = document.getElementById("show-all-chemistry")
const showAllBiology = document.getElementById("show-all-biology")

const removePhysics = document.getElementById("remove-physics")
const removeChemistry = document.getElementById("remove-chemistry")
const removeBiology = document.getElementById("remove-biology")

const myPhysics = document.getElementById("my-physics")
const myChemistry = document.getElementById("my-chemistry")
const myBiology = document.getElementById("my-biology")

const allChapters = document.getElementById("all-chapters")


const myPhysicsChapters = JSON.parse(localStorage.getItem("myPhysicsChapters")) || [];
const myChemistryChapters = JSON.parse(localStorage.getItem("myChemistryChapters")) || [];
const myBiologyChapters = JSON.parse(localStorage.getItem("myBiologyChapters")) || [];

// Retrieve allChapters from localStorage or initialize it
let allPhysicsChapters = JSON.parse(localStorage.getItem("allPhysicsChapters")) || ["BM & Vectors", "Unit & Dimension", "Kinematics", "NLM & Friction", "Work, Energy & Power", "Circular Motion", "COM & Collision", "Rotational Motion", "Gravitation", "Fluid mechanics", "Thermal Physics", "Oscillation", "Wave Motion", "Electrostatics", "Current Electricity", "Capacitor", "Magnetism", "EMI", "AC", "EMW", "Ray Optics", "Wave Optics", "Modern Physics Ⅰ","Modern Physics ⅠⅠ","Modern Physics ⅠⅠⅠ", "Semiconductor"];
let allChemistryChapters = JSON.parse(localStorage.getItem("allChemistryChapters")) || ["Mole Concept", "Atomic Structure", "Chemical Equilibrium", "Ionic Equilibrium", "Thermodynamics", "Redox Reactions", "Chemical Kinetics", "Solutions", "Electrochemistry", "IUPAC", "Isomerism", "GOC Ⅰ", "GOC Ⅱ", "Periodic Table", "Chemical Bonding", "p-Block", "d & f-Block", "Coordination Com"];
let allBiologyChapters = JSON.parse(localStorage.getItem("allBiologyChapters")) || ["Living World", "Biological Classi", "Plant Kingdom", "Animal Kingdom", "Morphology", "Anatomy", "Animal Tissue", "Cell", "Cell Cycle", "Biomolecules", "Photosynthesis", "Respiration in Plants", "PGR", "Human Respiration", "Circulation", "Excretion", "Bones & Muscles", "Neural System", "Hormonal System", "Angiosperms", "Human Reproduction", "Reproductive Health", "POI & Variation", "MBOI", "Evolution", "HH & Disease", "Microbes", "Biotechnology Ⅰ", "Biotechnology Ⅱ", "Organisms & Pop", "Ecosystem", "Biodiversity & Con"];

function renderMyChapters() {
    myPhysics.innerHTML = ""
    myPhysicsChapters.forEach(chapter => {
        const chapterCard = document.createElement("span")
        chapterCard.className = "my-card p"
        chapterCard.innerText = chapter
        myPhysics.appendChild(chapterCard)
        chapterCard.addEventListener("click", () => {
            chapterCard.classList.toggle("s2-remove");
            const anySelected = !!myPhysics.querySelector(".s2-remove");
            removePhysics.style.display = anySelected ? "block" : "none";
        });

    })

    myChemistry.innerHTML = ""
    myChemistryChapters.forEach(chapter => {
        const chapterCard = document.createElement("span")
        chapterCard.className = "my-card c"
        chapterCard.innerText = chapter
        myChemistry.appendChild(chapterCard)
        chapterCard.addEventListener("click", () => {
            chapterCard.classList.toggle("s2-remove")
            const anySelected = !!myChemistry.querySelector(".s2-remove")
            removeChemistry.style.display = anySelected ? "block" : "none"
        })
    })

    myBiology.innerHTML = ""
    myBiologyChapters.forEach(chapter => {
        const chapterCard = document.createElement("span")
        chapterCard.className = "my-card b"
        chapterCard.innerText = chapter
        myBiology.appendChild(chapterCard)
        chapterCard.addEventListener("click", () => {
            chapterCard.classList.toggle("s2-remove")
            const anySelected = !!myBiology.querySelector(".s2-remove")
            removeBiology.style.display = anySelected ? "block" : "none"
        })
    })

}


function renderAllPhysics() {
    buttonContainer.innerHTML = ""
    allChapters.innerHTML = ""
    allPhysicsChapters.forEach(chapter => {
        const chapterCard = document.createElement("span")
        chapterCard.className = "card p"
        chapterCard.innerText = chapter
        allChapters.appendChild(chapterCard)
        chapterCard.addEventListener("click", () => {
            chapterCard.classList.toggle("s2-add")
        })
    });
    const addNewPhysics = document.createElement("button")
    addNewPhysics.innerText = "ADD"
    addNewPhysics.className = "add-button"
    buttonContainer.appendChild(addNewPhysics)
    addNewPhysics.addEventListener("click", () => {
        const selectedChapters = []
        const chapterCards = allChapters.querySelectorAll(".card.p.s2-add")

        chapterCards.forEach((card) => {
            selectedChapters.push(card.innerText)
        })

        selectedChapters.forEach(item => {
            if (!myPhysicsChapters.includes(item)) {
                myPhysicsChapters.push(item)
            }
        })
        selectedChapters.forEach(item => {
            const index = allPhysicsChapters.indexOf(item)
            if (index > -1) {
                allPhysicsChapters.splice(index, 1)
            }
        })
        saveAllChapters()
        saveChapters()
        renderMyChapters()
        renderAllPhysics()
    })
    removePhysics.style.display = "none"
}

function renderAllChemistry() {
    buttonContainer.innerHTML = ""
    allChapters.innerHTML = ""
    allChemistryChapters.forEach(chapter => {
        const chapterCard = document.createElement("span")
        chapterCard.className = "card c"
        chapterCard.innerText = chapter
        allChapters.appendChild(chapterCard)
        chapterCard.addEventListener("click", () => {
            chapterCard.classList.toggle("s2-add")
        })
    });
    const addNewChemistry = document.createElement("button")
    addNewChemistry.innerText = "ADD"
    addNewChemistry.className = "add-button"
    buttonContainer.appendChild(addNewChemistry)
    addNewChemistry.addEventListener("click", () => {
        const selectedChapters = []
        const chapterCards = allChapters.querySelectorAll(".card.c.s2-add")

        chapterCards.forEach((card) => {
            selectedChapters.push(card.innerText)
        })

        selectedChapters.forEach(item => {
            if (!myChemistryChapters.includes(item)) {
                myChemistryChapters.push(item)
            }
        })
        selectedChapters.forEach(item => {
            const index = allChemistryChapters.indexOf(item)
            if (index > -1) {
                allChemistryChapters.splice(index, 1)
            }
        })
        saveAllChapters()
        saveChapters()
        renderMyChapters()
        renderAllChemistry()
    })
    removeChemistry.style.display = "none"
}

function renderAllBiology() {
    buttonContainer.innerHTML = ""
    allChapters.innerHTML = ""
    allBiologyChapters.forEach(chapter => {
        const chapterCard = document.createElement("span")
        chapterCard.className = "card b"
        chapterCard.innerText = chapter
        allChapters.appendChild(chapterCard)
        chapterCard.addEventListener("click", () => {
            chapterCard.classList.toggle("s2-add")
        })
    });
    const addNewBiology = document.createElement("button")
    addNewBiology.innerText = "ADD"
    addNewBiology.className = "add-button"
    buttonContainer.appendChild(addNewBiology)
    addNewBiology.addEventListener("click", () => {
        const selectedChapters = []
        const chapterCards = allChapters.querySelectorAll(".card.b.s2-add")

        chapterCards.forEach((card) => {
            selectedChapters.push(card.innerText)
        })

        selectedChapters.forEach(item => {
            if (!myBiologyChapters.includes(item)) {
                myBiologyChapters.push(item)
            }
        })
        selectedChapters.forEach(item => {
            const index = allBiologyChapters.indexOf(item)
            if (index > -1) {
                allBiologyChapters.splice(index, 1)
            }
        })
        saveAllChapters()
        saveChapters()
        renderMyChapters()
        renderAllBiology()
    })
    removeBiology.style.display = "none"
}

showAllPhysics.addEventListener("click", () => {
    renderAllPhysics()
    goDown()
})
showAllChemistry.addEventListener("click", () => {
    renderAllChemistry()
    goDown()
})
showAllBiology.addEventListener("click", () => {
    renderAllBiology()
    goDown()
})

function goDown() {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth", // Optional: adds a smooth scrolling effect
    });
}

removePhysics.addEventListener("click", () => {
    const selectedChapters = [];
    const chapterCards = myPhysics.querySelectorAll(".my-card.p.s2-remove")

    chapterCards.forEach((card) => {
        selectedChapters.push(card.innerText)
    })
    selectedChapters.forEach(item => {
        if (!allPhysicsChapters.includes(item)) {
            allPhysicsChapters.push(item)
        }
    })
    selectedChapters.forEach(item => {
        const index = myPhysicsChapters.indexOf(item)
        if (index > -1) {
            myPhysicsChapters.splice(index, 1)
        }
    })
    saveAllChapters()
    saveChapters()
    renderMyChapters()
    renderAllPhysics()
    goDown()
})
removeChemistry.addEventListener("click", () => {
    const selectedChapters = [];
    const chapterCards = myChemistry.querySelectorAll(".my-card.c.s2-remove")

    chapterCards.forEach((card) => {
        selectedChapters.push(card.innerText)
    })
    selectedChapters.forEach(item => {
        if (!allChemistryChapters.includes(item)) {
            allChemistryChapters.push(item)
        }
    })
    selectedChapters.forEach(item => {
        const index = myChemistryChapters.indexOf(item)
        if (index > -1) {
            myChemistryChapters.splice(index, 1)
        }
    })
    saveAllChapters()
    saveChapters()
    renderMyChapters()
    renderAllChemistry()
    goDown()
})
removeBiology.addEventListener("click", () => {
    const selectedChapters = [];
    const chapterCards = myBiology.querySelectorAll(".my-card.b.s2-remove")

    chapterCards.forEach((card) => {
        selectedChapters.push(card.innerText)
    })
    selectedChapters.forEach(item => {
        if (!allBiologyChapters.includes(item)) {
            allBiologyChapters.push(item)
        }
    })
    selectedChapters.forEach(item => {
        const index = myBiologyChapters.indexOf(item)
        if (index > -1) {
            myBiologyChapters.splice(index, 1)
        }
    })
    saveAllChapters()
    saveChapters()
    renderMyChapters()
    renderAllBiology()
    goDown()
})

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

renderMyChapters()
