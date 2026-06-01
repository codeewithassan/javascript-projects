// const BASE_URL = ""
// const BASE_URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from}.min.json`

const dropdowns = document.querySelectorAll('.dropdown select');
const fromSelect = document.querySelector('select[name="from"]');
const toSelect = document.querySelector('select[name="to"]');
const msg = document.querySelector('#msg');
const input = document.querySelector('.amount input');
const btn = document.querySelector("form button");


const selectFlag = (element) => {
    let curCode = element.value.toUpperCase();
    let countryCode = countryList[curCode];

    if (countryCode) {
        let img = element.parentElement.querySelector('img');
        img.src = `https://flagsapi.com/${countryCode}/shiny/64.png`
    }
}
const populateMenus = async () => {
    try {
        const response = await fetch("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.min.json")
        let data = await response.json()
        // console.log(data);
        let allCurrencies = Object.keys(data.usd);
        for (select of dropdowns) {
            for (currency of allCurrencies) {
                let upperCurrency = currency.toUpperCase();
                if (upperCurrency in countryList) {
                    let countryCode = countryList[upperCurrency];
                    let newOption = document.createElement('option');
                    newOption.innerText = upperCurrency;
                    newOption.value = currency

                    if (select === fromSelect && currency === "usd") {
                        newOption.selected = true;
                    }
                    if (select === toSelect && currency === "pkr") {
                        newOption.selected = true;
                    }
                    select.append(newOption);
                }
            }
            selectFlag(select)

        }


    } catch (error) {
        console.log("Data not fetched! ", error);
    }
}
const getExchange = async (fromCurr, toCurr) => {
    try {
        let userVal = input.value;
        if(userVal === "" || userVal < 1 || userVal === NaN){
            userVal = 1;
            input.value = 1
        }

        let URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurr}.min.json`
        let response = await fetch(URL);
        const data = await response.json();

        let toRate = data[fromCurr][toCurr];
        let finalVal = userVal * toRate;
        
        msg.innerText = `${userVal} ${fromCurr.toUpperCase()} = ${finalVal.toFixed(2)} ${toCurr.toUpperCase()}`
        

    } catch (error) { 
        console.error("Calculation broken:", error); 
    };
}
populateMenus();
for (select of dropdowns) {
    select.addEventListener("change", (evt) => {
        selectFlag(evt.target);
    })
}
btn.addEventListener('click', (e)=>{
    e.preventDefault();

    getExchange(fromSelect.value , toSelect.value);
})
