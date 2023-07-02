
function buildElementToPage(id, elem) {                          
    const element = document.createElement('div')
    element.classList.add('element')
    element.insertAdjacentHTML('afterbegin', `
    <div class="element-data">
        <img src="img/${elem.pictname}" class="element-img">
        <div class="element-name">${elem.name}</div>
        <p class="element-text">Виробник: <span class="element-owner">${elem.owner}</span></p> 
        <p class="element-text">Матеріал: <span class="element-material">${elem.material}</span></p> 
        <p class="element-text">Технологія: <span class="element-volume">${elem.tech}</span></p>
        <p class="element-text">Габарити: <span class="element-gabar">${elem.gabar}</span> мм</p>
        <p class="element-text">Макс. швидкість: <span class="element-speed">${elem.speed}</span> мм/с</p>
    </div>
    <div class="element-footer">
        <button class="blue-button" onclick="modifyModalToEdit(${id})">Змінити</button><span></span>
        <button class="red-button" onclick="removeElementFromStorage(${id})">Видалити</button>
    </div>
    <p></p>
    `)
    document.getElementsByClassName("displayzone")[0].appendChild(element)
}

function modifyModalToCreate() {
    document.getElementsByClassName("modal-title")[0].innerText = "Добавити принтер"
    document.getElementById("submitbtn").setAttribute("onclick", `addElementToLocalStorage()`)
    document.getElementById("submitbtn").innerText = "Добавити"
    document.getElementById("img-prev-section").setAttribute("style", "display: none")
    document.getElementById("label-select-img").innerText = "Вибрати фото:"
    modal.open()
}

function modifyModalToEdit(id) {
    document.getElementsByClassName("modal-title")[0].innerText = "Редагувати"
    document.getElementById("submitbtn").innerText = "Оновити"
    document.getElementById("submitbtn").setAttribute("onclick", `editElementInLocalStorage(${id})`)
    let edElem = JSON.parse(localStorage.getItem(id))
    document.getElementById("name").value = edElem.name;   
    document.getElementById("owner").value = edElem.owner;   
    document.getElementById("material").value = edElem.material;   
    document.getElementById("tech").value = edElem.tech;  
    document.getElementById("gabar").value = edElem.gabar; 
    document.getElementById("speed").value = edElem.speed;   
    document.getElementById("imgprev").setAttribute("src", `img/${edElem.pictname}`)
    document.getElementById("label-select-img").innerText = "Можете вибрати інший файл:"
    document.getElementById("img-prev-section").setAttribute("style", "display: block")
    modal.open()
}

function showPrewImg(){
    let filename = document.getElementById("imgfile").value.replace(/C:\\fakepath\\/, ''); 
    document.getElementById("imgprev").setAttribute("src", `img/${filename}`)
    document.getElementById("label-select-img").innerText = "Можете вибрати інший файл:"
    document.getElementById("img-prev-section").setAttribute("style", "display: block")
}

document.getElementById("imgfile").addEventListener("change", showPrewImg)

function validNameAndVolume(){
    let valid = true;
    let showMsg = '';
    let formName = document.getElementById("name").value.trim();
    let formOwner = document.getElementById("owner").value.trim();
    let formGabar = document.getElementById("gabar").value.trim();
    let formSpeed = document.getElementById("speed").value.trim();
    
    if (!formName) {
        showMsg = 'Назва принтера пуста. Заповніть назву!'
        valid = false;
    }  
    
    else if (!formOwner) {
        showMsg = showMsg + 'Назва виробника пустаю. Заповніть назву!'
        valid = false;
    }

    else if (!formGabar) {
        showMsg = showMsg + 'Поле габаритів не вказано. Заповніть поле!'
        valid = false;
    }

    else if (!formSpeed) {
        showMsg = showMsg + 'Поле максимальної швидкості не вказано. Заповніть поле!'
        valid = false;
    }
    
    if (valid) {return valid} else {alert (showMsg)}
   
}
function validImg() {
    if (document.getElementById("imgfile").value) {return true} 
    else {
        alert ("Фото принтера не вказано. Виберіть фото!")
        return false} ;
}

function addElementToLocalStorage(){
            
    if (validNameAndVolume() && validImg()) {
        let keyArr = [];
        for(let i=0; i<localStorage.length; i++) {
            let key = Number(localStorage.key(i)) ;
            keyArr[i] = key
        }
        const freeKey = Math.max(...keyArr) + 1; 
        let filename = document.getElementById("imgfile").value.replace(/C:\\fakepath\\/, ''); // Обрізаємо C:\fakepath\
        const newElement = {};
        newElement.name =  document.getElementById("name").value;   
        newElement.owner = document.getElementById("owner").value;  
        newElement.tech = document.getElementById("tech").value;   
        newElement.material = document.getElementById("material").value;  
        newElement.gabar = document.getElementById("gabar").value;  
        newElement.speed = document.getElementById("speed").value;   
        newElement.pictname = filename;   
        let rowSt = JSON.stringify(newElement)
        localStorage.setItem(`${freeKey}`, rowSt)
        modal.close()
        setTimeout(location.reload(), 1000)
    }
}
   
function editElementInLocalStorage(id) {
    if (validNameAndVolume()) {
        let edElem = JSON.parse(localStorage.getItem(id))
        edElem.name =  document.getElementById("name").value;   
        edElem.owner = document.getElementById("owner").value;   
        edElem.material = document.getElementById("material").value;   
        edElem.texh = document.getElementById("tech").value;  
        edElem.gabar = document.getElementById("gabar").value; 
        edElem.speed = document.getElementById("speed").value;   
        if (document.getElementById("imgfile").value) {
            let filename = document.getElementById("imgfile").value.replace(/C:\\fakepath\\/, ''); 
            edElem.pictname = filename; 
        }
        let rowSt = JSON.stringify(edElem)
        localStorage.setItem(`${id}`, rowSt)
        modal.close()
        setTimeout(location.reload(), 1000)
    }
   
}

function removeElementFromStorage(id){
    if (confirm("Ви справді хочете виділити цей принтер?")) {
        localStorage.removeItem(id)
        location.reload();    
    }

} 

let keyNumbers = Object.keys(localStorage).length

for (let k=0; k<keyNumbers; k++) {
    let keyName = localStorage.key(k)
    let row = JSON.parse(localStorage.getItem(keyName))
    buildElementToPage(keyName, row)
}

