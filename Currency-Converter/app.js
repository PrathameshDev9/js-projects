let BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}`; 



const btn = document.querySelector("form button");
const dropdowns = document.querySelectorAll(".dropdown select")
const fromCurrency = document.querySelector(".from select")
const toCurrency = document.querySelector(".to select"); 
const msg = document.querySelector(".msg"); 


// console.log(dropdowns);
const updateFlag = (element) => {
    let currencyCode = element.value ; 
    // console.log(currencyCode);
    
    let countryCode = countryList[currencyCode] ; 
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png` ;
    let img = element.parentElement.querySelector("img"); 
    img.src = newSrc ; 
}



for(let val of dropdowns){
    for( currCode in countryList ){
        //console.log( `Code for ${currCode} is : ${countryList[currCode]} `);
        let newOption = document.createElement("option"); 
        newOption.innerText = currCode ; 
        newOption.value = currCode ;  
        if(val.name === "from" && currCode === "USD"){
            newOption.selected = true;     
        } else if (val.name === "to" && currCode === "INR"){
            newOption.selected = true ; 
        }
        
        val.append(newOption);    
    
        val.addEventListener("change", (evt) => {
            updateFlag(evt.target)
        }); 
    }
    
    
}


const UpdateExchangeRate = async ()=> {
    let amount = document.querySelector(".amount input"); 
    let amtval = amount.value ; 
    // console.log(typeof(amtval), amtval);
    if(amtval === "" || amtval < 1){
        amtval = 1 ; 
        amount.value = "1"; 
    }

    let URL = `${BASE_URL}/pair/${fromCurrency.value.toUpperCase()}/${toCurrency.value.toUpperCase()}`; 
   


    let response = await fetch(URL); 
    let res = await response.json(); 
    console.log(res);
    
    let rate = res.conversion_rate ; 
    console.log(rate);

    let finalRate = amtval * rate ; 
    msg.innerText = `${amtval} ${fromCurrency.value} = ${finalRate} ${toCurrency.value}`; 
        
}



btn.addEventListener("click", (evt)=>{
    evt.preventDefault(); 
    UpdateExchangeRate(); 
})
 

