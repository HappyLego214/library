const courseCard = document.querySelectorAll(".course-card");
const cardContainer = document.querySelector(".card-container");
const siteName = document.querySelector(".inputName");
const siteURL = document.querySelector(".inputURL");
const totalLes = document.querySelector(".inputTotalLes");
const takenLes = document.querySelector(".inputTakenLes");
const lesStatus = document.querySelector(".inputStatus");
const btnAddChar = document.querySelector(".btnAdd");

let statBtn = document.querySelectorAll('.stat-button');
let library = [];

class course {
    constructor(name, url, totalLessons, takenLessons, status) {
        this.name = name
        this.url = url
        this.totalLessons = totalLessons
        this.takenLessons = takenLessons
        this.status = status
    }

    active() {
        return (this.status ? this.status = "Active" : this.status = "Inactive");
    }
}

btnAddChar.addEventListener('click', (event) => {
    event.preventDefault();
    let newCourse = new course(siteName.value, siteURL.value, totalLes.value, takenLes.value, lesStatus.checked);
    addCharToSelection(newCourse);
    loadNew(library);
});

function addCharToSelection(course) {
    library.push(course);
}

function loadStored(array) {
    for (let i = 0; i < array.length; i++) {
        createCard(array[i].name, array[i].url, array[i].totalLessons, array[i].takenLessons, array[i].status);
    }
}

function loadNew(array) {
    let newCourse = array[array.length - 1];
    newCourse.active();
    createCard(newCourse.name, newCourse.url, newCourse.totalLessons, newCourse.takenLessons, newCourse.status);
}

function createCard(name, url, totalLessons, takenLessons, status) {

    // CARD BODY

    const newCard = document.createElement('div');
    newCard.className = "course-card" ;
    newCard.id = name;
    cardContainer.append(newCard);

    const newStat = document.createElement('div');
    newStat.className = "course-stats";
    newCard.append(newStat);

    // LIST VIEW

    const newUL = document.createElement('ul');
    newStat.append(newUL)

    // NAME

    const newNameLabel = document.createElement('label');
    newNameLabel.textContent = "Name:";
    newNameLabel.setAttribute('for', 'name');
    newUL.append(newNameLabel);

    const newName = document.createElement('li');
    newName.className = 'name';
    newUL.append(newName);

    // URL

    const newURL = document.createElement('a');
    newURL.href = url;
    newURL.textContent = name;
    newName.append(newURL);

    // TOTAL LESSONS

    const newTotalLesLabel = document.createElement('label');
    newTotalLesLabel.textContent = 'Total Lessons:';
    newTotalLesLabel.setAttribute('for', 'total-lessons');
    newUL.append(newTotalLesLabel);

    const newTotalLes = document.createElement('li');
    newTotalLes.className = 'total-lessons';
    newTotalLes.textContent = totalLessons;
    newUL.append(newTotalLes);

    // TAKEN LESSONS

    const newTakenLesLabel = document.createElement('label');
    newTakenLesLabel.textContent = 'Taken Lessons:';
    newTakenLesLabel.setAttribute('for', 'taken-lessons');
    newUL.append(newTakenLesLabel);

    const newTakenLes = document.createElement('li');
    newTakenLes.className = 'taken-lessons';
    newTakenLes.textContent = takenLessons;
    newUL.append(newTakenLes);

    // STATUS

    const newStatBtn = document.createElement('button');
    newStatBtn.textContent = status;
    newStatBtn.className = 'stat-button';
    newStat.append(newStatBtn);
}

// FIX BUTTON ACTIVE/INACTIVE STATE

document.addEventListener('click', function(e) {
    const target = e.target.closest(".stat-button");
    if(target) {
        let btnMainParentID = target.parentElement.parentElement.id;
        let cardProperty = library.find(element => element.name == btnMainParentID);

        if (cardProperty.status == "Active") {
            cardProperty.status = false;

        } else if (cardProperty.status == "Inactive") {
            cardProperty.status = true;
        }
        cardProperty.active();
        target.textContent = cardProperty.status;
    }
})

// active character

let ex = new course("TheOdinProject", "https://www.theodinproject.com/dashboard", "131", "27", true);
ex.active();

let ze = new course("Harvard CS50", "https://learning.edx.org/course/course-v1:HarvardX+CS50+X/home", "14", "0", false);
ze.active();

addCharToSelection(ex);
addCharToSelection(ze);
loadStored(library);

