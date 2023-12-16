

const BASE_URL ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const selectors=document.querySelectorAll('.select-container select');
let imgs=document.querySelectorAll('img');
const exchange=document.querySelector('button');
const fromCurr = document.querySelector(".from-dropdown select");
const toCurr = document.querySelector(".to-dropdown select");
const massage=document.querySelector('.msg');




for( let selector of selectors){
    for(let county in countryList){
        
        let newOption=document.createElement('option');
        newOption.innerText=county;
        newOption.value=county;
        if(selector.name=='from' && county=='USD'){
            newOption.selected='USD'
        }else if(selector.name=='to' && county=='INR'){
            newOption.selected='INR'
        }
        selector.append(newOption);
    }
    selector.addEventListener('change',(evt)=>{
        updateFlag(evt.target);
    })
}

const updateFlag=(element)=>{
    let curCode=element.value;
    let countryCode=countryList[curCode];
    let newSourceCode=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector('img');
    img.src=newSourceCode;
    
}

const exchangeUpdate= async ()=>{

    let amount=document.querySelector('.amount input');
    let amt=amount.value;
    if(amt<1 || amt==''){
        amt = 1;
        amount.value = "1";
    }
    const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let resopone=await fetch(URL)
    let data=await resopone.json();
    let rate = data[toCurr.value.toLowerCase()];
    let finalAmount=rate* parseInt(amt);

    massage.innerText=`${amt} ${fromCurr.value} == ${finalAmount} ${toCurr.value}`;
}

exchange.addEventListener('click', (evt)=>{
    evt.preventDefault();
    exchangeUpdate();
    
});

window.addEventListener('load',()=>{
    exchangeUpdate();
})

