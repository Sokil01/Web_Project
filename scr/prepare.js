
function prepare(){
    let startArray = [
        {name: "NEOR Special", owner: 'Китай', material: "Нейлон", tech: "SLA", gabar: 500, speed: 150, pictname: "151718130.webp"},
        {name: "Weedo Tina2", owner: 'Китай', material: "Пластик", tech: "SLA", gabar: 200, speed: 40, pictname: "161847728.webp"},
        {name: "Anycubic Photon", owner: 'Китай', material: "Нейлон", tech: "FDM", gabar: 180, speed: 450, pictname: "329862636.webp"},
    ]
    
    localStorage.clear() 
    
    for (let i=0; i<startArray.length; i++) {   
        let row = startArray[i]
        let rowSt = JSON.stringify(row)
        localStorage.setItem(`${i}`, rowSt)
    }

    location.reload(); 
}