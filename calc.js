const billInput = document.getElementById('bill');
const gridButtons = document.querySelectorAll('.grid-button');
const customInput = document.querySelector('.custom-grid');
const peopleInput = document.querySelector('.ppl-input');
const tipDollar = document.getElementById("tip-amount-dollar");
const totalDollar = document.getElementById("total-amount-dollar");
const pplMsg = document.getElementById('ppl-msg');
const reset = document.getElementById('reset-btn');
const active = document.querySelector('.active-btn');


billInput.addEventListener("input", billInputCalc);
peopleInput.addEventListener("input", peopleInputCalc);
customInput.addEventListener("input", customInputCalc);


tipDollar.innerHTML = '$' + (0.0).toFixed(2);
totalDollar.innerHTML = '$' + (0.0).toFixed(2);

tipDollar.style.fontSize = "2em";
totalDollar.style.fontSize = "2em";


let billValue;
let peopleValue;
let tipValue;


function billInputCalc(){
    billValue = parseFloat(billInput.value);
    calculateTip();
}

function peopleInputCalc(){
    peopleValue = parseFloat(peopleInput.value);
    calculateTip();
}

gridButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if(button.classList.contains("active")){
            button.classList.remove("active");
            tipValue = undefined;
        } else{
            gridButtons.forEach((btn) => btn.classList.remove("active"));
            button.classList.add("active");
            tipValue = parseFloat(button.innerHTML) / 100;
            calculateTip();
        }
    });
});

function customInputCalc(){
    tipValue = parseFloat(customInput.value / 100);

    gridButtons.forEach(function(btn){
        btn.classList.remove("active");
    });
    calculateTip();
}

function calculateTip(){
    if(peopleValue >= 1){
        let tipAmount = (billValue * tipValue) / peopleValue;
        let total = tipAmount + (billValue / peopleValue);
        tipDollar.innerHTML = '$' + tipAmount.toFixed(2);
        totalDollar.innerHTML = '$' + total.toFixed(2);
    }
}

peopleInput.addEventListener("change", () => {
    if(peopleValue <= 0){
        pplMsg.style.display = "block";
        peopleInput.style.border = "2px solid #DC9488";
    }else{
        peopleValue;
        calculateTip();
        pplMsg.style.display = "none";
        peopleInput.style.border = "none";
    }
})

reset.addEventListener('click', () => {
    billInput.value = '';
    peopleInput.value = '';
    customInput.value = '';
    tipDollar.innerHTML = '$' + (0.0).toFixed(2);
    totalDollar.innerHTML = '$' + (0.0).toFixed(2);
    gridButtons.forEach((button) => button.classList.remove("active"));
    pplMsg.style.display = "none";
    peopleInput.style.border = "none";
    billValue = undefined;
    peopleValue = undefined;
    tipValue = undefined;
})