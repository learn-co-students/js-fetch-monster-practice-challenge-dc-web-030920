
// When the page loads, show the first 50 monsters. Each monster's name, age, and description should be shown.
// when the page loads, make a get fetch, to render all monsters (name, age, description)

document.addEventListener("DOMContentLoaded", function(){
    
    const form = document.querySelector("form");
    form.addEventListener("submit", monsterForm);

    currentPage = 1;
    getMonsters(currentPage);

    
    // At the end of the list of monsters, show a button. When clicked, the button should load the next 50 monsters and show them.

    // page one should only show 50 ids
    // when you hit the forward button you take the previous lenth and show te next 50 ids, starting with the last id that was shown. 
    // when the back button is hit, you take the current length and show the previous 50 ids. 

    let nextPageButton = document.getElementById("forward")
    nextPageButton.addEventListener("click", nextPage)
    
    let previousPageButton = document.getElementById("back")
    previousPageButton.addEventListener("click", previousPage)
  
});



function getMonsters(currentPage){

    let monstersCount = 0
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${currentPage}`)
    .then(response => response.json())
    .then(monsters => {
        if(monsters.length > 0){
        monsters.forEach( (monster) =>  {monsterData(monster)})
        }else{
            alert("You've reached the end!")
        }
    })
}

function nextPage(){
    
    currentPage  += 1;
    getMonsters(currentPage)
}

function previousPage(){
    if(currentPage !== 1){
        currentPage -= 1
    }else{
        alert("You are on the first page")
    }
}

function monsterData(data){
    const monsterContainer = document.getElementById("monster-container");
    const monsterDiv = document.createElement("div");
    monsterDiv.classList.add("monster")
    monsterDiv.id = data.id;
    monsterContainer.appendChild(monsterDiv);

    const name = document.createElement("p");
    name.innerText = `Name: ${data.name}`;

    const age = document.createElement("p");
    age.innerText = `Age: ${data.age}`;

    const description = document.createElement("p");
    description.innerText = `Description: ${data.description}`;

    monsterDiv.append(name, age, description)
}


// Above your list of monsters, you should have a form to create a new monster. 
// You should have fields for name, age, and description, and a 'Create Monster Button'. 
// When you click the button, the monster should be added to the list and saved in the API.
// when the user clicks the submit button, make a POST request , to create a new monsters (name, age, description)

function monsterForm(event){
    const formObj = {
        name: event.currentTarget.name.value,
        age: event.currentTarget.age.value,
        description: event.currentTarget.description.value
    }
    event.preventDefault();

    fetch("http://localhost:3000/monsters", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(formObj)  
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        document.querySelector("form").reset();
        monsterData(data);
    })
    
}









