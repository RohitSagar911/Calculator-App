const display = document.querySelector(".display");
const OperationKeys = document.querySelectorAll(".n1-key")
const delKey = document.getElementById("del-key")
const resetKey = document.getElementById("reset-key")
const ctrlKeys = document.querySelectorAll(".ctrl-keys");
const equalKey = document.getElementById('eq-key')
const click1 = new Audio();
const themeRadio = document.querySelectorAll(".theme-radio")
click1.src = "./sounds/click1.mp3";
// sound 2 
const click2 = new Audio();
click2.src = "./sounds/click2.mp3";
// sound 3
const click3 = new Audio();
click3.src = "./sounds/click3.mp3";
let currentInput = "";

const allowedKeys = [
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
    "+", "-", "*", "/", ".", "=", "Enter", "Backspace",
    "ArrowLeft", "ArrowRight", "Delete"
];

// }
function evaluate() {
    try {
        const result = Function(`return ${currentInput}`)();
        display.value = result;
        display.placeholder = "";
        currentInput = result.toString();
    } catch (error) {
        display.value = "";
        display.placeholder = "Error";
        currentInput = "";
    }
}

// Calculator Display Logic

display.addEventListener("keydown", (e) => {
        e.preventDefault(); // Block unwanted keys
});
OperationKeys.forEach((key) => {
    key.addEventListener("click", () => {
        let value = key.textContent;

        if (value == "x") {
            value = "*"; // convert 'x' to '*'
        }
       
        currentInput += value;         
        display.value = currentInput;  

        click2.currentTime = 0;
        click2.play();
    });
});


// delete key logic 
delKey.addEventListener("click", () => {
    currentInput = currentInput.slice(0,-1);
    display.value = currentInput
    click1.currentTime = 0; //for replaying audio
    click1.play()
});


//reset key logic  
resetKey.addEventListener("click", () => {
        display.value = "";
        currentInput = "";
        display.placeholder = "";
        click3.currentTime = 0; //for replaying audio
        click3.play()
    });

// eq key 

equalKey.addEventListener("click", () => {
    click3.currentTime = 0;
    click3.play();
    evaluate();
});



// theme toggle logic 

themeRadio.forEach(radio =>{
    radio.addEventListener('change',changeTheme);
})
function changeTheme(event){
    const selectedRadio = event.target
    if(selectedRadio.checked){
        // removes unneccesary classes from the body tag
        document.body.classList.remove('theme-1','theme-2',"theme-3");
        // adds desired theme class 
        document.body.classList.add(selectedRadio.value);
    }
}