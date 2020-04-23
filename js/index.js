
document.addEventListener('DOMContentLoaded', function() {
    renderForm()
    fetchMonsters()
    

})


// When the page loads, show the first 50 monsters. 
//Each monster's name, age, and description should be shown.
function fetchMonsters() {
    //fetch the first 50 Monsters and render them to DOM with name, age and description 
    fetch('http://localhost:3000/monsters')
    .then(resp => resp.json())
    .then(monstersArray => { 
        for (let i = 0; i < 50; i++) {
            renderMonster(monstersArray[i])
          }
    })
}

function renderMonster(monster) {
    let monsterDiv = document.querySelector('#monster-container')
    let monsterCard = document.createElement("div")
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
    
    
}
// At the end of the list of monsters, show a button. When clicked, the button should load the next 50 monsters and show them.