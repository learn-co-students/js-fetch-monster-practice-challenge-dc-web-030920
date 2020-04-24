
document.addEventListener('DOMContentLoaded', function() {
    renderForm()
    initialFetch()
    let backButton = document.querySelector('#back')
    let forwardButton = document.querySelector('#forward')
    forwardButton.onclick = (handleForward)
    backButton.onclick = handleBack
})

function initialFetch() {
        //fetch the first 50 Monsters and render them to DOM with name, age and description 
        fetch('http://localhost:3000/monsters')
        .then(resp => resp.json())
        .then(array => renderMonsterList(array, 0, "forward"))
 }

// When the page loads, show the first 50 monsters. 
//Each monster's name, age, and description should be shown.


function renderMonsterList(monsterArray, num, direction) {
// needs to return an array of only 50 monsters at a time 
let monsterDiv = document.querySelector('#monster-container')
monsterDiv.innerHTML = ''
let end = num + 50 
if (direction === "forward"){
    end = num + 50 
    for (let i = num; i < end; i++) {
        renderMonster(monsterArray[i])
        }
    }
else 
    {let start = num - 50 
    if (start < 0)
        {for (let i = 0; i < 50; i++) {
        renderMonster(monsterArray[i])
        }}
    else { for (let i = start; i < num; i++) {
        renderMonster(monsterArray[i])}}
    }

}

function renderMonster(monster) {
    let monsterDiv = document.querySelector('#monster-container')
    let monsterCard = document.createElement("div")
    monsterCard.id = monster.id
    monsterDiv.appendChild(monsterCard)
    let nameNode = document.createElement("h2")
    nameNode.innerText= monster.name
    let ageNode = document.createElement("h4")
    ageNode.innerText = monster.age
    let descriptionNode = document.createElement("p")
    descriptionNode.innerText = monster.description 
    monsterCard.append(nameNode,ageNode,descriptionNode)
}


// Above your list of monsters, you should have a form to create a new monster. 
//You should have fields for name, age, and description, and a 'Create Monster Button'.
// When you click the button, the monster should be added to the list and saved in the API.
//
function renderForm() {
    let formContainer = document.querySelector('#create-monster')
    let formNode = document.createElement('form')
    formContainer.appendChild(formNode)
    let nameField = document.createElement('input')
    nameField.id = "name-input"
    nameField.placeholder = "Input Monster Name"
    let ageField = document.createElement('input')
    ageField.id = "age-input"
    ageField.placeholder = "Input Monster Age"
    let descriptionField = document.createElement('input')
    descriptionField.id = "description-input"
    descriptionField.placeholder = "Input Monster Description"
    let buttonNode = document.createElement('button')
    buttonNode.innerText = "create monster!"
    formNode.append(nameField, ageField, descriptionField, buttonNode)
    formNode.addEventListener('submit', createMonster)
}

function createMonster(e) {
    e.preventDefault()
    formNode = e.currentTarget
    ageField = document.querySelector('#age-input')
    nameField = document.querySelector('#name-input')
    descriptionField = document.querySelector('#description-input')
    monsterObj = {
        name: nameField.value,
        age: ageField.value,
        description: descriptionField.value
    }
        fetch('http://localhost:3000/monsters', {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(monsterObj)
        })
        .then (resp => resp.json())
        .then(newMonster => renderMonster(newMonster))
    formNode.reset()
}

function handleForward(){
    monsterDiv = document.querySelector('#monster-container')
    let sv = Number(monsterDiv.lastChild.id)
    fetch('http://localhost:3000/monsters')
    .then(resp => resp.json())
    .then(array => renderMonsterList(array, sv, "forward"))
}

function handleBack() {
    monsterDiv = document.querySelector('#monster-container')
    let sv = Number(monsterDiv.lastChild.id) - 50 
    fetch('http://localhost:3000/monsters')
    .then(resp => resp.json())
    .then(array => renderMonsterList(array, sv, "back"))
}