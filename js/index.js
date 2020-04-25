const url = "http://localhost:3000/monsters/"
    const limit = "_limit=3"
    let page = 1

document.addEventListener("DOMContentLoaded", () => {
    createForm()
    getMonsters()
    const back = document.getElementById('back')
    const forward = document.getElementById('forward')
   
    back.onclick = previousPage;
    forward.onclick = nextPage;
})

function getMonsters(){
    document.querySelector("#monster-container").innerHTML = ''
    fetch(`${url}?${limit}&_page=${page}`)
    .then(response => response.json())
    .then(monsters => monsters.forEach(renderMonster))
}

function renderMonster(monster){
 
 const parent = document.querySelector("#monster-container")
 const div = document.createElement('div')
 const h2 = document.createElement('h2')
 const h4 = document.createElement('h4')
 const p = document.createElement('p')
 h2.innerText = monster.name
 h4.innerText = `Age: ${monster.age}`
 p.innerText = `Bio: ${monster.description}`
 parent.appendChild(div)
 div.append(h2, h4, p)
}

function previousPage(){
    if (page > 1){
    --page
    getMonsters()
    }
}

function nextPage(){
    ++page
    getMonsters()
}

function createForm(){
    const form = document.createElement('form'),
        name = document.createElement('input'),
        age = document.createElement('input'),
        bio = document.createElement('input'),
        button = document.createElement('button')
    name.id = "name"
    name.placeholder = "name..."
    age.id = "age"
    age.placeholder = "age..."
    bio.id = "description"
    bio.placeholder ="description..."
    button.innerText = "Create"
    document.getElementById("create-monster").appendChild(form)
    form.append(name, age, bio, button)
    form.onsubmit = () => createMonster(name.value, age.value, bio.value)

}

function createMonster(name, age, bio){
    const monster = {
        name: name,
        age: age,
        bio: bio
    }
    fetch("http://localhost:3000/monsters", {
    method: "POST",
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    },
    body: JSON.stringify(monster)
  })
}
