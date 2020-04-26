

document.addEventListener("DOMContentLoaded", () => {
   
        console.log('DOM loaded');
          showMonsters();
          const form = document.querySelector('.add-monstr-form')
          const fwdBtn = document.getElementById('forward')
          form.addEventListener('submit', handleForm)
          fwdBtn.addEventListener('click', showNext50)

});

function handleForm(e){
    e.preventDefault()
    monsterObj = {
        name: e.target.children[1].value,
        age: e.target.children[3].value,
        description: e.target.children[5].value
    }
    fetch('http://localhost:3000/monsters' , {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(monsterObj)
    })
    .then(response => {
       return response.json()
    })
    .then(monster => displayMonster(monster))
}

function showMonsters(){

    fetch("http://localhost:3000/monsters/?_limit=50&_page=1")
    .then((response) => {
    return response.json()
    })
    .then( data => {
        monsterArr = data
        monsterArr.forEach( monster => displayMonster(monster))
    })  

};


function displayMonster(monster){

    const container = document.getElementById('monster-container')
    const div = document.createElement('div')
    div.className = "container"
    const pName = document.createElement('h4')
    pName.id = "name"
    pName.innerText = monster['name']
    const pAge = document.createElement('p')
    pAge.id = "age"
    pAge.innerText = monster['age']
    const pDesc = document.createElement('p')
    pDesc.id = "description"
    pDesc.innerText = monster['description']
    div.append(pName, pAge, pDesc)
    container.appendChild(div)
}

function showNext50(){

    let num = 0
    fetch(`http://localhost:3000/monsters/?_limit=${num+50}`)
    .then((response) => {
    return response.json()
    })
    .then( data => {
        monsterArr = data
        monsterArr.forEach( monster => {
            // let num = 
           return  displayMonster(monster)
        })
    })     
}
