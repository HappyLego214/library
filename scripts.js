const cardContainer = document.querySelector(".card-container");
const siteName = document.querySelector(".inputName");
const siteURL = document.querySelector(".inputURL");
const totalLes = document.querySelector(".inputTotalLes");
const takenLes = document.querySelector(".inputTakenLes");
const lesStatus = document.querySelector(".inputStatus");
const btnPopModal = document.querySelector(".popModal");
const btnCloseModal = document.querySelector(".closeModal");
const cmContainer = document.querySelector(".creation-menu-container");
const creationMenu = document.querySelector(".creation-menu");
const btnAddCard = document.querySelector(".btnAdd");

let statBtn = document.querySelectorAll('.stat-button');
let library = [];

btnPopModal.addEventListener('click', () => {
    cmContainer.style.display = "flex";
});


btnCloseModal.addEventListener('click', () => {
    cmContainer.style.display = "none";
})



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

btnAddCard.addEventListener('click', (event) => {
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
    newCard.dataset.name = name;
    cardContainer.append(newCard);

    const newStat = document.createElement('div');
    newStat.className = "course-stats";
    newCard.append(newStat);

    // CARD TITLE

    const cardTitleContainer = document.createElement('div');
    cardTitleContainer.className = "cardTitleContainer"
    newStat.append(cardTitleContainer);

        // TITLE

        const cardTitle = document.createElement('h2');
        cardTitleContainer.append(cardTitle);

        const cardTitleURL = document.createElement('a');
        cardTitleURL.href = url;
        cardTitleURL.textContent = name;
        cardTitle.append(cardTitleURL);

    // CARD INFO CONTAINER

    const cardInfoContainer = document.createElement('div');
    cardInfoContainer.className = "cardInfoContainer";
    newStat.append(cardInfoContainer);

    // CARD LESSON CONTAINER

    const cardLessonsContainer = document.createElement('div');
    cardLessonsContainer.className = "cardLessonsContainer";
    cardInfoContainer.append(cardLessonsContainer);

        // TOTAL LESSONS

        const cardTotalLessons = document.createElement('div');
        cardTotalLessons.className = "cardTotalLessons";
        cardLessonsContainer.append(cardTotalLessons);

        const cardTotalLesTitle = document.createElement('h3');
        cardTotalLesTitle.textContent = "Total Lessons";
        cardTotalLessons.append(cardTotalLesTitle);

        const cardTotalLesNum = document.createElement('h1');
        cardTotalLesNum.textContent = totalLessons;
        cardTotalLessons.append(cardTotalLesNum);

        // TAKEN LESSONS

        const cardTakenLessons = document.createElement('div');
        cardTakenLessons.className = "cardTakenLessons";
        cardLessonsContainer.append(cardTakenLessons);

        const cardTakenLesTitle = document.createElement('h3');
        cardTakenLesTitle.textContent = "Taken Lessons";
        cardTakenLessons.append(cardTakenLesTitle);

        const cardTakenLesNum = document.createElement('h1');
        cardTakenLesNum.textContent = takenLessons;
        cardTakenLessons.append(cardTakenLesNum);

    // CARD MENU CONTAINER

    const cardMenuContainer = document.createElement('div');
    cardMenuContainer.className = "cardMenuContainer";
    cardInfoContainer.append(cardMenuContainer);

        // COMPLETION RATE DISPLAY

        const newCompRate = document.createElement('h1');
        let CompRate = completionRate(takenLessons, totalLessons)
        newCompRate.textContent = `${CompRate}%`
        cardMenuContainer.append(newCompRate)

    //  CARD BUTTON CONTAINER

    const newBtnContainer = document.createElement('div');
    newBtnContainer.className = 'cardBtnContainer';
    newStat.append(newBtnContainer);

        // STATUS BUTTON

        const newStatBtn = document.createElement('button');
        newStatBtn.textContent = status;
        newStatBtn.className = 'stat-button card-tool';
        newBtnContainer.append(newStatBtn);

        // DELETE BUTTON

        const newDeleteBtn = document.createElement('button');
        newDeleteBtn.className = 'del-button card-tool';
        newDeleteBtn.textContent = 'Delete Card';
        newBtnContainer.append(newDeleteBtn);

        // INCREMENT CONTAINER

        const newIncrementContainer = document.createElement('div');
        newIncrementContainer.className = 'cardIncrementContainer';
        newStat.append(newIncrementContainer);

        // INCREMENT LESSON

        const nextIncrement = document.createElement('button');
        nextIncrement.textContent = "Increase Progress";
        nextIncrement.className = 'increment-button card-tool';
        newIncrementContainer.append(nextIncrement);

        // DECREMENT LESSON

        const nextDecrement = document.createElement('button');
        nextDecrement.textContent = "Decrease Progress";
        nextDecrement.className = 'decrement-button card-tool';
        newIncrementContainer.append(nextDecrement);

}

// DELETE CARD

cardContainer.addEventListener('click', function(e) {
    const target = e.target.closest(".del-button");
    if (target) {
        let topNode = e.target.closest('.course-card');
        let libName = library.findIndex(element => element.name == topNode.dataset.name)
        library.splice(libName);
        topNode.replaceChildren();
        topNode.remove();
    }
});

// BUTTON ACTIVE/INACTIVE STATE

cardContainer.addEventListener('click', function(e) {
    const target = e.target.closest(".stat-button");
    if(target) {

        let identifier = e.target.closest('.course-card');
        let cardProperty = library.find(element => element.name == identifier.dataset.name);

        if (cardProperty.status == "Active") {
            cardProperty.status = false;


        } else if (cardProperty.status == "Inactive") {
            cardProperty.status = true;
        }

        cardProperty.active();
        target.textContent = cardProperty.status;
    }
});

// TAKEN LESSONS INCREMENT
    
cardContainer.addEventListener('click', function(e) {
    const increment = e.target.closest(".increment-button");
    const decrement = e.target.closest(".decrement-button");

    if (increment) {
        const identifier = e.target.closest('.course-card');
        const cardIndex = library.findIndex(element => element.name == identifier.dataset.name);
        const cardTakenLessons = parseInt(library[cardIndex].takenLessons) + 1;
        const cardTotalLessons = parseInt(library[cardIndex].totalLessons);

        if  (cardTakenLessons <= cardTotalLessons) {

            library[cardIndex].takenLessons = cardTakenLessons;

            let takenLessonTag = identifier.getElementsByClassName('cardTakenLessons');
            takenLessonTag[0].lastChild.textContent = cardTakenLessons;

            let completionRateTag = identifier.getElementsByClassName('cardMenuContainer');
            let newCompRate = completionRate(cardTakenLessons, cardTotalLessons);
            completionRateTag[0].lastChild.textContent = `${newCompRate}%`
        }

    } else if (decrement) {
        const identifier = e.target.closest('.course-card');
        const cardIndex = library.findIndex(element => element.name == identifier.dataset.name);
        const cardTakenLessons = parseInt(library[cardIndex].takenLessons) - 1;
        const cardTotalLessons = parseInt(library[cardIndex].totalLessons);

        if (cardTakenLessons >= 0) {
            
            library[cardIndex].takenLessons = cardTakenLessons;

            let takenLessonTag = identifier.getElementsByClassName('cardTakenLessons');
            takenLessonTag[0].lastChild.textContent = cardTakenLessons;

            let completionRateTag = identifier.getElementsByClassName('cardMenuContainer');
            let newCompRate = completionRate(cardTakenLessons, cardTotalLessons);
            completionRateTag[0].lastChild.textContent = `${newCompRate}%`
        }
    }
});

// COMPLETION RATE

function completionRate(takenLessons, totalLessons) {
    let perc = Math.trunc((takenLessons / totalLessons) * 100)
    return perc;
}

// active character

let ex = new course("TheOdinProject", "https://www.theodinproject.com/dashboard", "131", "27", true);
ex.active();

let ze = new course("Harvard CS50", "https://learning.edx.org/course/course-v1:HarvardX+CS50+X/home", "14", "0", false);
ze.active();

addCharToSelection(ex);
addCharToSelection(ze);
loadStored(library);

