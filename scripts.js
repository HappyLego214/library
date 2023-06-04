const characterCards = document.querySelectorAll(".character-card");
const cardContainer = document.querySelector(".card-container");

let StatBtn = "";
let library = []
class char {
    constructor(name, race, role, status) {
        this.name = name
        this.race = race
        this.role = role
        this.status = status
    }

    active() {
        return (this.status ? this.status = "Active" : this.status = "Inactive");
    }
}

function addCharToSelection(character) {
    library.push(character);
}

function iterateThrough(array) {
    for (let i = 0; i < array.length; i++) {
        createCard(array[i].name, array[i].race, array[i].role, array[i].status);
    }
}

function createCard(name, race, role, status) {

    // CARD BODY

    const newCard = document.createElement('div');
    newCard.className = "character-card" ;
    cardContainer.append(newCard);

    const newStat = document.createElement('div');
    newStat.className = "character-stats";
    newCard.append(newStat);

    const newView = document.createElement('div');
    newView.className = "character-view";
    newCard.append(newView);

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
    newName.textContent = name;
    newUL.append(newName);

    // RACE

    const newRaceLabel = document.createElement('label');
    newRaceLabel.textContent = 'Race:';
    newRaceLabel.setAttribute('for', 'race');
    newUL.append(newRaceLabel);

    const newRace = document.createElement('li');
    newRace.className = 'race';
    newRace.textContent = race;
    newUL.append(newRace);

    // ROLE

    const newRoleLabel = document.createElement('label');
    newRoleLabel.textContent = 'Role:';
    newRoleLabel.setAttribute('for', 'role');
    newUL.append(newRoleLabel);

    const newRole = document.createElement('li');
    newRole.className = 'role';
    newRole.textContent = role;
    newUL.append(newRole);

    // STATUS

    const newStatBtn = document.createElement('button');
    newStatBtn.textContent = status;
    newStatBtn.className = 'stat-button';
    newStat.append(newStatBtn);

    StatBtn = document.querySelectorAll('.stat-button')
    activeButton();
}

// FIX BUTTON ACTIVE/INACTIVE STATE

function activeButton() {
    StatBtn.forEach((btn => {
        btn.addEventListener('click', () => {
            console.log(btn);
        });
    }));
}

// active character

let ex = new char("TheLegend", "Orc", "Berserker", true)
ex.active();

// inactive character

let ze = new char("ZzXt", "Human", "Archer", false)
ze.active();

let de = new char("Exp", "Elf", "Mage", true)
de.active();

addCharToSelection(ex);
addCharToSelection(ze);
addCharToSelection(de);


iterateThrough(library);