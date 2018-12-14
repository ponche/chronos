let bigBen; 
let timeStart; 
let timeChrono = new Date; 
let tagChronoTime = document.querySelector("#timeChrono span") ; 
let theSandTime ; 

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
    // dans le doute faire un detruit tous 
    
}

function startChrono()
{
    timeStart = new Date; 
    theSandTime = setInterval(updateChrono, 100) ; 
}
function runChrono()
{
    // on change le temps du départ 
    bigBen = new Date ; 
    timeStart.setTime(bigben.getTime() - timeChrono.getTime()) ; 
    theSandTime = setInterval(updateChrono, 100) ; 
}

function updateChrono()
{
    bigBen = new Date; 
    timeChrono = new Date(bigBen.getTime() - timeStart.getTime()); 


    // ajoute des zero dans les valeur si neccessaire 
    hoursTime = timeChrono.getHours() < 10 ? "0" + timeChrono.getHours() : timeChrono.getHours() ; 
    minutesTime = timeChrono.getMinutes() < 10 ? "0" + timeChrono.getMinutes() : timeChrono.getMinutes() ; 
    secondesTime = timeChrono.getSeconds() < 10 ? "0" + timeChrono.getSeconds() : timeChrono.getSeconds() ; 
    milliSecondeTime = timeChrono.getSeconds() < 10 ? "0" + timeChrono.getMilliseconds() : timeChrono.getMilliseconds() ; 

    tagChronoTime.innerHTML = hoursTime + ":" + minutesTime + ":" + secondesTime ; 



}