const inputslider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numberCheck = document.querySelector("#number");
const symbolscheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~!@#$%^&*()_+-={[}]\|:;"<,>.?/';

let password = "";
let passwordLength = 10;
let checkCount = 0;// string

handleSlider();

setIndicator("#ccc");
// set password length


function handleSlider(){
    inputslider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;

    const min = inputslider.min;
    const max = inputslider.max;
    inputslider.style.backgroundSize = ( (passwordLength - min)*100/(max - min)) + "% 100%";
}

function setIndicator(color){
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = 0px 0px 12px 1px ${color};
}

function getRndInteger(min, max){
    return Math.floor(Math.random() * (max-min) + min);
}

function generateRndNumber(){
    return getRndInteger(0,9);
}

function generateRndUppercase(){
    return String.fromCharCode(getRndInteger(65, 91));
}

function generateRndLowercase(){
    return String.fromCharCode(getRndInteger(97,123));
}

function generateRndSymbol(){
    const randnum = getRndInteger(0, symbols.length);
    return symbols.charAt(randnum);
}

function calStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;

    if(uppercaseCheck.checked){
        hasUpper = true;
    }
    if(lowercaseCheck.checked){
        hasLower = true;
    }
    if(numberCheck.checked){
        hasNum = true;
    }
    if(symbolscheck.checked){
        hasSym = true;
    }

    if(hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8){
        setIndicator("#0f0");
    } else if(
        (hasLower || hasUpper) && (hasNum || hasSym) && passwordLength >= 6){
        setIndicator("#ff0");
    } else{
        setIndicator("#f00");
    }
}

async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    }
    catch(e){
        copyMsg.innerText = "failed";
    }
    // to make copy wala span visible
    copyMsg.classList.add("active");

    setTimeout(() =>{
        copyMsg.classList.remove("active");
    }, 2000);
}

function shufflePassword(array){
    // fisher yates method
    for(let i=array.length-1; i>0; i--){
        const j = Math.floor(Math.random() * (i+1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach( (el) => (str += el));
    return str;
}

function handleCheckBoxChange(){
    checkCount = 0;
    allCheckBox.forEach( (checkbox) => {
        if(checkbox.checked)
            checkCount++;
    });

    // special case
    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();  
    }
}

allCheckBox.forEach( (checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange) 
})

inputslider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
})

copyBtn.addEventListener('click', () =>{
    if(passwordDisplay.value)
        copyContent();
})

generateBtn.addEventListener('click', () => {
    //none of the checkbox are selected
    if(checkCount === 0) return;

    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }

    console.log("starting the journey");
    // lets find out new password
    password = "";

    let funcArr = [];
    if(uppercaseCheck.checked)
        funcArr.push(generateRndUppercase);

    if(lowercaseCheck.checked)
        funcArr.push(generateRndLowercase);

    if(numberCheck.checked)
        funcArr.push(generateRndNumber);

    if(symbolscheck.checked)
        funcArr.push(generateRndSymbol);

    // compulsory addition
    for(let i=0; i<funcArr.length; i++){
        password += funcArr[i]();
    }

    console.log("compulsory additon done");

    //remaining addition
    for(let i=0; i<passwordLength-funcArr.length; i++){
        let randIndex = getRndInteger(0, funcArr.length);
        console.log("randIndex" + randIndex);

        password += funcArr[randIndex]();
    }

    console.log("remaing additon done");


    // shuffle the password
    password = shufflePassword(Array.from(password));
    console.log("shuffling done");


    //show in ui
    passwordDisplay.value = password;

    console.log("UI additon done");


    //calculate strength
    calStrength();
})