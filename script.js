const gridContainer = document.querySelector("#grid-container");
const resetButton = document.querySelector(".reset-button");
const resizeButton = document.querySelector(".resize-button");

function randomizeColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

let mouseDown = false;
document.body.onmousedown = () => { mouseDown = true };
document.body.onmouseup = () => { mouseDown = false };

function changeColor(event, box) {
    if (event.type === "mouseover" && !mouseDown) return;
    box.style.backgroundColor = randomizeColor();

    const curOpacity = parseFloat(box.style.opacity);
    if (curOpacity < 1) {
        box.style.opacity = `${curOpacity + 0.1}`;
    }
}

function calculateGridSize() {
    const gridBorderWidth = parseInt(getComputedStyle(gridContainer).borderWidth) * 2;
    return gridContainer.getBoundingClientRect().width - gridBorderWidth;
}

function makeGrid(gridSize) {
    gridContainer.innerHTML = "";
    console.log(getComputedStyle(gridContainer))
    const boxSize = calculateGridSize() / gridSize;

    for (let i = 0; i < gridSize * gridSize; i++) {
        const box = document.createElement("div");
        box.classList.add("box");
        box.style.width = `${boxSize}px`;
        box.style.height = `${boxSize}px`;
        box.style.opacity = "0.1";

        box.addEventListener("mouseover", e => {
            e.preventDefault();
            changeColor(e, box);
        });
        box.addEventListener("mousedown", e => {
            e.preventDefault();
            changeColor(e, box);
        });
        gridContainer.append(box);
    }
}

makeGrid(16);

resetButton.addEventListener("click", (e) => {
    const allBoxes = gridContainer.querySelectorAll(".box");
    allBoxes.forEach(box => {
        box.style.backgroundColor = "unset";
        box.style.opacity = "0.1";
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

