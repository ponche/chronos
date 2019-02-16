let bigBen;
let timeStart;
let timeChrono = new Date;
let tagChronoTime = document.querySelector("#timeChrono span");
let tagPrintZone = document.querySelector("#printZone");
let theSandTime;

let tagButtonStart = document.querySelector("#buttonStart");
let tagButtonReset = document.querySelector("#buttonReset");
let tagButtonRun = document.querySelector("#buttonRun");
let tagButtonStop = document.querySelector("#buttonStop");
let tagInputNameCourse = document.querySelector("#inputNameCourse");
let tagButtonSubmitSave = document.querySelector("#buttonSubmitSaveCourse");

// variable lock reset before reset 
let savedCourse = false;

let listeCourse = [];

let hoursTime;
let minutesTime;
let secondesTime;
let milliSecondeTime;

function resetChrono() {
    // si l'utlisateur n'as pas save, on demande si veut faire faire le reset 
    if (!savedCourse) {
        if (!confirm("Vous n'avez pas sauvegarde la course, etes vous sur du Reset ? "))
            return;

    }
    // on change les button 
    tagButtonReset.classList.add("alpha");
    tagButtonRun.classList.add("alpha");
    tagButtonStart.classList.remove("alpha");
    // on remet le compteur à zéro 
    tagChronoTime.innerHTML = "00:00:00";
}
function stopChrono() {
    clearInterval(theSandTime);
    theSandTime = undefined;

}

function startChrono() {
    // le chrono demarre on considère qui n'as pas fait de sauvegarde 
    savedCourse = false;
    // suppresion de intervall si déja un en cours  
    if (theSandTime != undefined) {
        clearInterval(theSandTime);
        theSandTime = undefined;
    }
    timeStart = new Date;
    theSandTime = setInterval(updateChrono, 100);
}
function runChrono() {
    // on change le temps du départ 
    if (timeStart == undefined) {
        // demare le chrono a UTC 0 
        startChrono();
    }
    bigBen = new Date;
    timeStart.setTime(bigBen.getTime() - timeChrono.getTime());
    // suppresion de intervall si déja un en cours  
    if (theSandTime != undefined) {
        clearInterval(theSandTime);
        theSandTime = undefined;
    }
    theSandTime = setInterval(updateChrono, 100);
}

function updateChrono() {
    bigBen = new Date;
    timeChrono = new Date(bigBen.getTime() - timeStart.getTime());


    // ajoute des zero dans les valeur si neccessaire 
    hoursTime = timeChrono.getUTCHours() < 10 ? "0" + timeChrono.getUTCHours() : timeChrono.getUTCHours();
    minutesTime = timeChrono.getMinutes() < 10 ? "0" + timeChrono.getMinutes() : timeChrono.getMinutes();
    secondesTime = timeChrono.getSeconds() < 10 ? "0" + timeChrono.getSeconds() : timeChrono.getSeconds();
    milliSecondeTime = timeChrono.getSeconds() < 10 ? "0" + timeChrono.getMilliseconds() : timeChrono.getMilliseconds();

    tagChronoTime.innerHTML = hoursTime + ":" + minutesTime + ":" + secondesTime;



}

// save course in array
function saveCourse() {
    let nameCourse = tagInputNameCourse.value;
    let temps = timeChrono;
    listeCourse.push({ name: nameCourse, time: temps });
    localStorage.setItem("dataCourse", JSON.stringify(listeCourse));
    tagInputNameCourse.value = "";
    savedCourse = true;
    loadDataCourses();
}
function deleteCourse(index) {
    listeCourse.splice(index, 1);
    localStorage.setItem("dataCourse", JSON.stringify(listeCourse));
    drawListCourse();
}



function loadDataCourses() {
    dataStorage = JSON.parse(localStorage.getItem("dataCourse"));
    if (dataStorage != null) {
        listeCourse = dataStorage;
    }
    drawListCourse();
}
function createTagCourseTime(nameCourse, timeCourse, idCourse) {
    var tagScoreCourse = document.createElement("div");
    tagScoreCourse.classList.add("scoreCourse");

    // trash logo 
    var tagTrashButton = document.createElement("img");
    tagTrashButton.src = "img/logoTrash.png";
    tagTrashButton.alt = "logo trash";
    tagTrashButton.id = idCourse;
    tagTrashButton.classList.add("logo-trash");

    // course name 
    var tagNameCourse = document.createElement("span");
    tagNameCourse.innerHTML = nameCourse;

    // course time 
    var tagTimeCourse = document.createElement("span");
    tagTimeCourse.innerHTML = timeCourse;

    // add event listener on delete button 
    tagTrashButton.addEventListener("click", function (event) {
        deleteCourse(event.target.id);
    })

    // assembly 
    tagScoreCourse.appendChild(tagTrashButton);
    tagScoreCourse.appendChild(tagNameCourse);
    tagScoreCourse.appendChild(tagTimeCourse);

    return tagScoreCourse;


}
function drawListCourse() {
    tagPrintZone.innerHTML = "";
    listeCourse.forEach(function (course, index) {
        var time = new Date(course.time)
        var sec = time.getSeconds();
        var min = time.getMinutes();
        var hour = time.getUTCHours();
        stringTime = hour + ":" + min + ":" + sec;
        tagPrintZone.appendChild(createTagCourseTime(course.name, stringTime, index));
    })
}


// ajout des Event Listener 
tagButtonStart.addEventListener("click", function () {
    startChrono();
    tagButtonStart.classList.add("alpha");
    tagButtonStop.classList.remove("alpha");
});

tagButtonStop.addEventListener("click", function () {
    stopChrono();
    tagButtonStop.classList.add("alpha");
    tagButtonRun.classList.remove("alpha");
    tagButtonReset.classList.remove("alpha");
});

tagButtonReset.addEventListener("click", function () {
    resetChrono();
    // tagButtonReset.classList.add("alpha");
    // tagButtonRun.classList.add("alpha");
    // tagButtonStart.classList.remove("alpha");

});

tagButtonRun.addEventListener("click", function () {
    runChrono();
    tagButtonRun.classList.add("alpha");
    tagButtonReset.classList.add("alpha");
    tagButtonStop.classList.remove("alpha");

});

tagButtonSubmitSave.addEventListener("click", function () {
    saveCourse();
})



// after DOM is load 
loadDataCourses(); 
