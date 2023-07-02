// Задання вихідних параметрів (title, [x], content) конфігурації модалки 
const modal = $.modal({
    title: 'Параметри',
    closable: true,
    content: `
        <div class="modal-form">
            <label for="name">Cup name:</label><br>
            <input type="text" id="name" name="name" class="modal-form-field" placeholder="Назва..."/><br><br>
            <label for="owner">Виробник :</label><br>
            <input type="text" id="owner" name="owner" min="10" max="1000" class="modal-form-field" placeholder="Впишіть власника"/><br><br>
            <label for="tech">Технологія друку:</label><br>
            <select id="tech" name="tech" class="modal-form-field">
                <option value="FDM">FDM</option>
                <option value="SLA">SLA</option>
                <option value="SLS">SLS</option>
            </select><br><br>
            <label for="material">Матеріал:</label><br>
            <select id="material" name="material" class="modal-form-field">
                <option value="Пластик">Пластик</option>
                <option value="Нейлон">Нейлон</option>
                <option value="Порошок">Порошок</option>
                <option value="Віск">Віск</option>
            </select><br><br>
            <label for="gabar">Габарити області друку :</label><br>
            <input type="text" id="gabar" name="gabar" min="10" max="1000" class="modal-form-field" placeholder="Впишіть габарити"/><br><br>
            <label for="speed">Максимальна швидкість друку :</label><br>
            <input type="number" id="speed" name="speed" min="10" max="1000" class="modal-form-field" placeholder="Впишіть власника"/><br><br>
            <div id= "img-prev-section">
                <img id="imgprev" src="" >
            </div>   
                <label for="file" id="label-select-img">Select image file:</label><br>
                <input type="file" id="imgfile" name="imgfile"><br><br>
            
            <button id="submitbtn" class="blue-button" onclick="myFunction()">Click me</button>
        </div> 
    `,
    width: '500px'
})

function countTotalVolume(){
    let volArr = document.getElementsByClassName("element-gabar")
    let totalVolume = 0
    for (let i=0; i<volArr.length; i++) {
        totalVolume+= Number(volArr[i].outerText)
    }
    document.getElementById("countresult").innerHTML = `Загальна кількість:  <b>${totalVolume} мм</b>`
}



countbtn.addEventListener('click', countTotalVolume)






