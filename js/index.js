// ------------------------ when < SOME EVENT > happens, 
// -------- I want to make a < WHAT KIND OF FETCH CALL >
// ------------------ and manipulate the DOM < HOW? >
// ``````````````````````````````````````````````````````
//
// 1. when the page loads,
//    make a get fetch
//    show the first 50 monsters
//      name, age, description
// 
document.addEventListener("DOMContentLoaded", () => {
    fetchMonsters()
    loadForm()
})

// 1. get fetch call for 50 only
function fetchMonsters(){

    fetch("http://localhost:3000/monsters/?_limit=50")
    .then(response => response.json())
    .then(monstersArray => {
        monstersArray.forEach((monster) => {renderMonster(monster)})
    })
}

// 1. render each with name, age, description
function renderMonster(monster){
    
    const name = monster.name
    const age = monster.age
    const description = monster.description

    const monsterContainer = document.querySelector("#monster-container")
    const monsterDiv = document.createElement("div")
    monsterDiv.id = monster.id
    monsterContainer.append(monsterDiv)
    
    const monsterName = document.createElement("h4")
    const monsterAge = document.createElement("h5")
    const monsterDescription = document.createElement("p")
    monsterDiv.append(monsterName, monsterAge, monsterDescription)

    monsterName.innerText = `Name: ${name}`
    monsterAge.innerText = `Age: ${age}`
    monsterDescription.innerText = `Description: ${description}`

    // 3. at the end of the list of monsters, show a button
    // when clicked, the button should load the next 50 monsters

    const forwardButton = document.querySelector("#forward")
    forwardButton.onclick = () => nextFifty(event)
    const backButton = document.querySelector("#back")
    backButton.onclick = () => previousFifty(event)
}

// 3. next 50 monsters and previous 50 monsters
const url = "http://localhost:3000/monsters/?_limit=50&_page="
let page = 1

function nextFifty(event){
    console.log("next 50 monsters please")
    const nextFifty = url + (++page)

    const parentNode = event.target.parentNode
    const container = parentNode.querySelector("#monster-container")
    container.innerHTML = ""

    fetch(nextFifty)
    .then(response => response.json())
    .then(monstersArray => {

        monstersArray.forEach((monster) => {renderMonster(monster)})
    })
}

function previousFifty(event){
    console.log("previous 50 monsters please")
    const previousFifty = url + (--page)

    const parentNode = event.target.parentNode
    const container = parentNode.querySelector("#monster-container")
    container.innerHTML = ""

    fetch(previousFifty)
    .then(response => response.json())
    .then(monstersArray => {
        monstersArray.forEach((monster) => {renderMonster(monster)})
    })
}


// 2. deliverables:
// Above your list of monsters, 
// you should have a form to create a new monster
// You should have fields for name, age, and description
// and a 'Create Monster Button'
// When you click the button, 
// the monster should be added to the list 
// and saved in the API.

// 2. Above the list of monsters, form to create new one
//    include fields for name, age, description
//    with a 'create monster button'
function loadForm(){
    console.log("form goes here")
    const formDiv = document.querySelector("#create-monster")
    const form = document.createElement("form")
    formDiv.append(form)

    const nameField = document.createElement("input")
    nameField.id = "name"
    nameField.placeholder = "Enter Name"

    const ageField = document.createElement("input")
    ageField.id = "age"
    ageField.placeholder = "Enter Age"

    const descriptionField = document.createElement("input")
    descriptionField.id = "description"
    descriptionField.placeholder = "Enter Description"

    const submitButton = document.createElement("button")
    submitButton.innerText = "Create Monster!"

    form.append(nameField, ageField, descriptionField, submitButton)
    form.addEventListener("submit", createMonster)
}

// 2. when you click the create monster button, 
//    the monster should be added to the list, 
//    and saved in the API.
function createMonster(event){
    console.log("create a monster!")
    event.preventDefault()
    const form = event.target

    monsterObject = 
    {
        name: event.target.name.value,
        age: event.target.age.value,
        description: event.target.description.value
    }

    fetch("http://localhost:3000/monsters", {
        method: "POST",
        headers: 
            {"Content-Type": "application/json",
            Accept: "application/json"},
        body: JSON.stringify(monsterObject)
    })
    .then(response => response.json())
    .then(newMonster => renderMonster(newMonster))

    form.reset()
}