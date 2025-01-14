class Box {
    constructor(color, x, y, number) {
        this.color = color;
        this.x = x;
        this.y = y;
        this.number = number;
        this.element = null; // DOM element
    }

    // explain function
    render(container) {
        this.element = document.createElement("section");
        this.element.className = "box";
        this.element.style.backgroundColor = this.color;
        this.element.style.left = `${this.x}px`; // what is this?
        this.element.style.top = `${this.y}px`; // what is this?
        this.element.textContent = this.number;
        container.appendChild(this.element);
    }

    hideNumber() {
        if (this.element) {
            this.element.textContent = "";
        }
    }

    // explain function
    updatePosition(x,y) {
        this.x = x;
        this.y = y;
        if(this.element) {
            this.element.style.left = `${x}px`;
            this.element.style.top = `${y}px`;
        }
    }
}

class Game {
    constructor(n) {
        this.n = n;
        this.boxes = [];
    }

    createBoxes(container) {
        const boxWidth = 10 * 16; // Convert 10em to pixels
        const totalWidth = container.offsetWidth;
        const spacing = (totalWidth - this.n * boxWidth) / (this.n + 1); // --> (empty space) / (n + 1)
    
        for (let i = 0; i < this.n; i++) {
            const color = this.generateRandomColor();
            const x = spacing + i * (boxWidth + spacing); // Calculate x position for each box
            const y = 20; // Fixed y position near the top of the container
    
            const box = new Box(color, x, y, i + 1);
    
            box.render(container);
            this.boxes.push(box);
        }
    }

    generateRandomColor() {
        // number (150 ~ 256) for brighter color
        const randomBright = () =>
            Math.floor(Math.random() * (256 - 150) + 150);

        const r = randomBright();
        const g = randomBright();
        const b = randomBright();

        return `rgb(${r},${g},${b})`;
    }

    shuffleBoxes(container) {
        for (let i = 0; i < this.n; i++) {
            setTimeout(() => {
                this.boxes.forEach((box) => {
                    const x = Math.random() * (container.offsetWidth - (10 * 16));
                    const y = Math.random() * (container.offsetHeight - (10 * 16));
                    box.updatePosition(x, y);
                    console.log("Position updated for box: "+box.number);
                    if (i == this.n-1) {
                        setTimeout(() => this.hideBoxNumbers(), 1000);
                    }
                })
            }, i * 2000);
        }
    }

    hideBoxNumbers() {
        this.boxes.forEach((box) => box.hideNumber());
    }
}

// Suggested by ChatGPT OpenAI
class UI {
    constructor() {
        this.container = document.querySelector("#box-container");
        this.input = document.querySelector("#input");
        this.button = document.querySelector("#button");
    }

    initialize() {
        this.button.addEventListener("click", () => this.startGame());
    }

    
    startGame() {
        const n = parseInt(this.input.value);
        if (isNaN(n) || n < 3 || n > 7) {
            alert("Number must be between 3 and 7.");
            return;
        }
        const game = new Game(n);
        this.container.innerHTML = ""; // Clear previous boxes
        game.createBoxes(this.container);
        // wait n seconds
        setTimeout(() => {
            game.shuffleBoxes(this.container);
        }, n * 1000);
    }
}

function main() {
    const ui = new UI()
    ui.initialize()
}

main();