/* prepear Select Tip btns */
let tipBtns = document.querySelectorAll(".container .inputs-controller .types input");
tipBtns.forEach((element)=>{
    element.addEventListener("click",(event)=>{
        tipBtnsEvent(event.currentTarget);
    })
})

let resetBtn = document.getElementById("resetBtn");
resetBtn.onclick = ()=>{
    //console.log(event);
    console.log("l");
    inputBill.value = 0;
    inputPeopleNumber = 0;
    document.querySelectorAll(".container .active").classList.remove("active");
}
console.log(resetBtn);
resetBtn.addEventListener("click",(event)=>{
    console.log(event);
    console.log("l");
    inputBill.value = 0;
    inputPeopleNumber = 0;
    document.querySelectorAll(".container .active").classList.remove("active");
})
/* set up input field validation */
let inputs = document.querySelectorAll(".input-data");
let inputBill = document.getElementById("bill");
let inputPeopleNumber = document.getElementById("people-number");
inputs.forEach((element)=>{
      element.addEventListener("input", (event) => {
        const inputValue = event.target.value;
        const lastChar = inputValue.charAt(inputValue.length - 1);
        const regex = /^[0-9]*\.?[0-9]*$/;

        if (!regex.test(inputValue)) {
            // Remove the last character from the input field
            event.target.value = inputValue.slice(0, -1);
        }

        if (element.id === "bill" && element.value.length > 0){
            if(inputPeopleNumber.value === "0"){
                toggelInputWrongValStyle(inputPeopleNumber)
            }
            // everting okay do calculation
            else{
                let percentge = document.querySelector(".container .types .active");
                if (percentge !== null){
                    let tipAmount =  document.getElementById("tip-amount");
                    let total =  document.getElementById("total");
                    tipAmount.innerHTML = toFixed((parseFloat(element.value) * parseFloat(percentge.value) / 100) / parseInt(inputPeopleNumber.value),2)
                    total.innerHTML = parseFloat(element.value)  / parseInt(inputPeopleNumber.value)

                }
            }
        }
        else if (element.id === "people-number"){
            //element.value = element.value.length > 0?
            if (element.value.length < 1){
                element.value = 0;
            }
            toggelInputWrongValStyle(inputPeopleNumber,false)
        }


        if (inputBill.value.length < 1){
            resetBtn.classList.add("disabled");
            resetBtn.setAttribute("disabled",true);
        }
        else{
            resetBtn.classList.remove("disabled");
            resetBtn.setAttribute("disabled",false);
        }
      })
})

function tipBtnsEvent(element){
    //remove active class from other child inputs
    tipBtns.forEach((element)=>{
        if (element.classList.contains("active")){
            element.classList.remove("active");
        }
    })
    element.classList.add("active");
}

function toggelInputWrongValStyle(element,set = true){
    wrongInput = element.parentElement.parentElement.querySelector(".wrong-input")
    if(set){
        wrongInput.style.display = "inline"
        element.style.cssText = " border: 1px solid red;"
    }
    else{
        wrongInput.style.display = "none"
        element.style.cssText = " border: none;"
    }
}

const toFixed = (n, fixed) => `${n}`.match(new RegExp(`^-?\\d+(?:\.\\d{0,${fixed}})?`))[0];