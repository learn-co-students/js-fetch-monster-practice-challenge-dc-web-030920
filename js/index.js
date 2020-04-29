const URL_PREFIX = 'http://localhost:3000/monsters';


document.addEventListener("DOMContentLoaded", () => {
  createMonsterForm()
  fetchMonsters()
  document.addEventListener("submit", createMonster)

  const forwardBtn = document.querySelector("#forward")
  const backwardBtn = document.querySelector("#back")

  forwardBtn.onclick = pageForward
  backwardBtn.onclick = pageBackward

})

let page = 1

function fetchMonsters() {
  document.querySelector("#monster-container").innerText = ""
  return fetch(URL_PREFIX + `?_limit=50&_page=${page}`)
    .then(resp => resp.json())
    .then(monsterArray =>
      monsterArray.forEach(monster => renderMonster(monster))
    )
}

function renderMonster(monster) {
  const div = document.querySelector("#monster-container")

  const name = document.createElement("h3")
  name.innerText = monster.name

  const age = document.createElement("p")
  age.innerText = parseInt(monster.age)

  const description = document.createElement("p")
  description.innerText = monster.description



  div.append(name, age, description)
}

function createMonsterForm() {
  const monsterContainer = document.querySelector("#create-monster")
  const form = document.createElement("form")

  const name = document.createElement("input")
  name.classList.add("name-field")
  name.placeholder = "Name..."

  const age = document.createElement("input")
  age.classList.add("age-field")
  age.placeholder = "Age..."

  const description = document.createElement("input")
  description.classList.add("description-field")
  description.placeholder = "description"

  const submit = document.createElement("input")
  submit.type = "submit"

  monsterContainer.append(form)
  form.append(name, age, description, submit)

}

function createMonster() {
  event.preventDefault()

  let obj = {

    name: document.querySelector(".name-field").value,
    age: document.querySelector(".age-field").value,
    description: document.querySelector(".description-field").value
  }


  fetch(URL_PREFIX, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(obj)

  })
}

function pageBackward() {
  if (page > 1) {
    --page
    fetchMonsters()
  }
}

function pageForward() {
  ++page
  fetchMonsters()
}