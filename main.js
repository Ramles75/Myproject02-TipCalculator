document.addEventListener("DOMContentLoaded", function () {
    const billAmount = document.getElementById("bill");
    const numberOfPeople = document.getElementById("people");
    const customTipPercentage = document.getElementById("custom");
    const billTipAmount = document.getElementById("tipAmount");
    const billTotalPerPerson = document.getElementById("total");
    const resetButton = document.getElementById("resetBtn");
    const tipButtons = document.querySelectorAll(".tip-btns button");

    tipButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            if (billAmount.value === "" || isNaN(parseFloat(billAmount.value))) return;
            
            let peopleCount = parseInt(numberOfPeople.value);
            if (isNaN(peopleCount) || peopleCount <= 0) peopleCount = 1;

            calculateTip(
                parseFloat(billAmount.value),
                parseInt(e.target.innerText),
                peopleCount
            );

            tipButtons.forEach(btn => btn.classList.remove('selected'));
            e.target.classList.add('selected');

            customTipPercentage.value = ""; 
            customTipPercentage.disabled = true; 
        });
    });

    customTipPercentage.addEventListener("blur", (e) => {
        if (billAmount.value === "" || isNaN(parseFloat(billAmount.value))) {
            resetEveryThing();
            return;
        }
        let peopleCount = parseInt(numberOfPeople.value);
        if (isNaN(peopleCount) || peopleCount <= 0) peopleCount = 1;
        calculateTip(
            parseFloat(billAmount.value),
            parseFloat(e.target.value),
            peopleCount
        );

        tipButtons.forEach(btn => btn.disabled = true); 
    });

    customTipPercentage.addEventListener("input", () => {
        tipButtons.forEach((button) => {
            button.disabled = true;
        });
    });

    customTipPercentage.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            if (billAmount.value === "" || isNaN(parseFloat(billAmount.value))) {
                resetEveryThing();
                return;
            }
            let peopleCount = parseInt(numberOfPeople.value);
            if (isNaN(peopleCount) || peopleCount <= 0) peopleCount = 1;
            calculateTip(
                parseFloat(billAmount.value),
                parseFloat(customTipPercentage.value),
                peopleCount
            );

            tipButtons.forEach(btn => btn.disabled = true); 
        }
    });

    numberOfPeople.addEventListener("blur", (e) => {
        if (billAmount.value === "" || isNaN(parseFloat(billAmount.value))) {
            resetEveryThing();
            return;
        }
        let peopleCount = parseInt(e.target.value);
        if (isNaN(peopleCount) || peopleCount <= 0) e.target.value = "";
        calculateTip(
            parseFloat(billAmount.value),
            parseFloat(customTipPercentage.value),
            peopleCount
        );
    });

    resetButton.addEventListener("click", resetEveryThing);

    function calculateTip(billAmount, tipPercentage, numberOfPeople) {
        let tipAmount = (billAmount * (tipPercentage / 100)) / numberOfPeople;
        let tip = Math.floor(tipAmount * 100) / 100;
        tip = tip.toFixed(2);

        let totalAmount = (tipAmount * numberOfPeople + billAmount) / numberOfPeople;
        totalAmount = totalAmount.toFixed(2);

        billTipAmount.innerHTML = `$${tip}`;
        billTotalPerPerson.innerHTML = `$${totalAmount}`;
    }

    function resetEveryThing() {
        billTipAmount.innerHTML = "$0.00";
        billTotalPerPerson.innerHTML = "$0.00";
        billAmount.value = "";
        numberOfPeople.value = "";
        customTipPercentage.value = "";

        tipButtons.forEach((button) => {
            button.disabled = false;
            button.classList.remove('selected');
        });

        customTipPercentage.disabled = false;
    }
});
