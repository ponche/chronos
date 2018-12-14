let bigBen; 
let timeStart; 
let timeChrono = new Date; 
let tagChronoTime = document.querySelector("#timeChrono span") ; 
let theSandTime ; 

let tagButtonStart = document.querySelector("#buttonStart") ; 
let tagButtonReset = document.querySelector("#buttonReset") ; 
let tagButtonRun = document.querySelector("#buttonRun") ; 
let tagButtonStop = document.querySelector("#buttonStop") ; 

let hoursTime ; 
let minutesTime ; 
let secondesTime ; 
let milliSecondeTime ; 

function resetChrono()
{
    // a définir 
}
function stopChrono()
{
    clearInterval(theSandTime) ; 
    theSandTime = undefined ;  
    
}

function startChrono()
{
    // suppresion de intervall si déja un en cours  
    if(theSandTime != undefined)
    {
        clearInterval(theSandTime);
        theSandTime = undefined ; 
    }
    timeStart = new Date; 
    theSandTime = setInterval(updateChrono, 100) ; 
}
function runChrono()
{
    // on change le temps du départ 
    if(timeStart == undefined)
    {
        // demare le chrono a UTC 0 
        startChrono() ; 
    }
    bigBen = new Date ; 
    timeStart.setTime(bigBen.getTime() - timeChrono.getTime()) ; 
    // suppresion de intervall si déja un en cours  
    if(theSandTime != undefined)
    {
        clearInterval(theSandTime);
        theSandTime = undefined ; 
    }
    theSandTime = setInterval(updateChrono, 100) ; 
}

function updateChrono()
{
    bigBen = new Date; 
    timeChrono = new Date(bigBen.getTime() - timeStart.getTime()); 


    // ajoute des zero dans les valeur si neccessaire 
    hoursTime = timeChrono.getUTCHours() < 10 ? "0" + timeChrono.getUTCHours() : timeChrono.getUTCHours() ; 
    minutesTime = timeChrono.getMinutes() < 10 ? "0" + timeChrono.getMinutes() : timeChrono.getMinutes() ; 
    secondesTime = timeChrono.getSeconds() < 10 ? "0" + timeChrono.getSeconds() : timeChrono.getSeconds() ; 
    milliSecondeTime = timeChrono.getSeconds() < 10 ? "0" + timeChrono.getMilliseconds() : timeChrono.getMilliseconds() ; 

    tagChronoTime.innerHTML = hoursTime + ":" + minutesTime + ":" + secondesTime ; 



}


// ajout des Event Listener 
tagButtonStart.addEventListener("click", function(){
    startChrono() ; 
});

tagButtonStop.addEventListener("click", function(){
    stopChrono() ; 
}); 

tagButtonReset.addEventListener("click", function(){
    resetChrono() ; 
});

tagButtonRun.addEventListener("click", function(){
    runChrono() ; 
}); 


