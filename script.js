const gridContainer = document.querySelector("#grid-container");
const resetButton = document.querySelector(".reset-button");
const resizeButton = document.querySelector(".resize-button");

function makeGrid(gridSize) {
    gridContainer.innerHTML = "";
    const boxSize = 800 / gridSize;

    for (let i = 0; i < gridSize * gridSize; i++) {
        const box = document.createElement("div");
        box.classList.add("box");
        box.style.width = `${boxSize}px`;
        box.style.height = `${boxSize}px`;
        gridContainer.append(box);
    }

    const allBoxes = gridContainer.querySelectorAll(".box");
    allBoxes.forEach(box => {
        box.addEventListener("mouseover", e => {
            // console.log("hovered over " + box.getAttribute("class"));
            box.style.backgroundColor = "black";
        });
    });
}

makeGrid(16);

resetButton.addEventListener("click", (e) => {
    const allBoxes = gridContainer.querySelectorAll(".box");
    allBoxes.forEach(box => {
        box.style.backgroundColor = "unset";
    });
});

resizeButton.addEventListener("click", (e) => {
    const gridPrompt = parseInt(prompt("Enter grid size:"));

    if (!gridPrompt) {
        return;
    }

    if (gridPrompt > 2 && gridPrompt <= 100) {
        makeGrid(gridPrompt);
    } else {
        alert("Grid size must be between 2 and including 100!");

    }
});

