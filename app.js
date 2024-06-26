const base_URL = "https://v6.exchangerate-api.com/v6/c8a3a6a21e97eacd3095372d/latest";

const dropdowns = document.querySelectorAll(".dropdown select");

const btn = document.querySelector("form button");

const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

const msg = document.querySelector(".msg");

document.addEventListener("load", () => {
    updateExchangeRate();
})

for(let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode ==="USD"){
            newOption.selected = "selected";
        } 
        else if(select.name === "to" && currCode ==="INR"){
            newOption.selected = "selected";
        }
        select.appendChild(newOption);
    }

    select.addEventListener("change", (evt) =>{
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
})

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal ==="" || amtVal<0){
        amtVal.Val = 0;
        amount.value="0";
    }

    const URL = `${base_URL}/${fromCurr.value.toUpperCase()}`;
    let response = await fetch(URL);
    let data = await response.json();
    console.log(data);
    let rate = data["conversion_rates"];
    let finalRate = rate[toCurr.value];
    console.log(rate);
    console.log(toCurr.value);
    
    console.log(finalRate);

    let finalAmount = amtVal*finalRate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}` ;
}
