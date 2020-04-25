var monsterCount = 0;
var direction = true;
var max = 0

document.addEventListener("DOMContentLoaded", function(){
    fetchMonsters()
    let forBtn = document.getElementById("forward")
    let backBtn = document.getElementById("back")
    let createForm = document.getElementById("monster-form")
    createForm.addEventListener("submit", createMonster)

    forBtn.addEventListener("click", function(){
        let monsterContainer = document.getElementById("monster-container")
        monsterContainer.innerHTML = '';
        direction = true
        if(monsterCount === max){
            alert("Aint no monsters Junior")
        }else{
            monsterContainer.innerHTML = '';
            fetchMonsters()
        }
        
    })
    backBtn.addEventListener("click", function(){
        let monsterContainer = document.getElementById("monster-container")
        direction = false
        if(monsterCount < 100){
            alert("Aint no monsters Junior")
        }else{
            monsterContainer.innerHTML = '';
            fetchMonsters()
        }
    })

})

function fetchMonsters(){
    fetch("http://localhost:3000/monsters")
    .then(resp => resp.json())
    .then(json => renderMonsters(json))
}


function renderMonsters(data){  
    console.log(data[0])
   

    let monsterContainer = document.getElementById("monster-container")
    if (direction === true){
    for(var i = 0; i < 50; i++){
        
        let div = document.createElement("div")
        let h2 = document.createElement("h2")
        h2.innerText = data[monsterCount].name
        let h4 = document.createElement("h4")
        h4.innerText = data[monsterCount].age
        let p = document.createElement("p")
        p.innerText = data[monsterCount].description
        div.append(h2,h4,p)
        monsterContainer.append(div)
        monsterCount++
        max = data.length
        
        
    }
}else{
        monsterCount = monsterCount - 100
        for(var i = 0; i < 50; i++){
            let div = document.createElement("div")
            let h2 = document.createElement("h2")
            h2.innerText = data[monsterCount].name
            let h4 = document.createElement("h4")
            h4.innerText = data[monsterCount].age
            let p = document.createElement("p")
            p.innerText = data[monsterCount].description
            div.append(h2,h4,p)
            monsterContainer.append(div)
            monsterCount++
        }    
}


}

function createMonster(event){
    console.log("cool")
    var inputName = event.target.name.value
    var inputAge = event.target.age.value
    var inputDescription = event.target.description.value
    
    monsterObj = {
        "name": inputName,
        "age": inputAge,
        "description": inputDescription
    }
    var id = monsterObj.id
    fetch("http://localhost:3000/monsters", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
        },
 
        body: JSON.stringify(
        { 
            "name": monsterObj.name,
            "age": monsterObj.age,
            "description": monsterObj.description
        })
    })


    event.preventDefault()

}