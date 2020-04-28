

let page=1; 




document.addEventListener("DOMContentLoaded", () => {
    console.log("Dom was loaaaded!");
    addFormToPage();
    fetchAllMonsters();

    const back = document.getElementById('back')
    const forward = document.getElementById('forward')
   
    back.onclick = previousPage;
    forward.onclick = nextPage;

} )


function fetchAllMonsters(){

    fetch(`http://localhost:3000/monsters/?_limit=50&_page=` + page )
    .then(response => response.json())
    .then(monsters => { monsters.forEach((monster) => { renderMonsters(monster)})
    })

}

function renderMonsters(monster){
    console.log("Got one!")
    const monsterContainer = document.getElementById("monster-container") 

    let monsterDiv = document.createElement("div")
    // name
    let nameElement = document.createElement("h2")
    nameElement.innerText = `${monster.name}`
    //age 
    let ageElement = document.createElement("h4")
    let monsterAge = parseInt(monster.age)
    ageElement.innerText = `${monsterAge} years old.`
    // /description 
    let descriptionElement = document.createElement("p")
    descriptionElement.innerText = `${monster.description}`

    monsterDiv.append(nameElement, ageElement, descriptionElement)
    monsterContainer.appendChild(monsterDiv)


}


////adds form to the top of the page
function addFormToPage() {
    const formDivNode = document.getElementById("create-monster")

    const addForm = document.createElement("form")
    addForm.addEventListener("submit", createNewMonster)
    addForm.id = "add-monster-form"
    
    let nameField = document.createElement("input")
    nameField.id = "name";
    nameField.placeholder = "Name...";
    
    let ageField = document.createElement("input")
    ageField.id = "age";
    ageField.placeholder = "Age...";
    
    let descriptionField = document.createElement("input")
    descriptionField.id= "description"
    descriptionField.placeholder = "description...";
    
    let newMonsterBtn = document.createElement("button")
    newMonsterBtn.innerText = "Create Monster"
    
    addForm.append(nameField, ageField, descriptionField, newMonsterBtn)
    formDivNode.innerHTML = "<h3>Create a New Monster</h3>"
    //adds form to page 
    formDivNode.append(addForm)


}



function createNewMonster(event) {
    event.preventDefault();

    monstObj = { 
        name: document.querySelector("#name").value, 
        age: document.querySelector("#age").value, 
        description: document.querySelector("#description").value }

    fetch("http://localhost:3000/monsters", {

        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
            },
        body: JSON.stringify(monstObj)
    })
    .then(response => response.json() )
    .then( monster => renderMonsters(monster) )


}


function previousPage(){
    if (page > 1){
    --page;
    const monsterContainer = document.getElementById("monster-container") 
    monsterContainer.innerHTML = ""
    fetchAllMonsters();
    }
}

function nextPage(){
    ++page;
    const monsterContainer = document.getElementById("monster-container") 
    //below clears out current 50 monsters
    monsterContainer.innerHTML = ""
    //loads next 50 monsters. 
    fetchAllMonsters();
}
