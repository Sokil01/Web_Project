function getArrayFromStorage() {
    let keyNumbers = Object.keys(localStorage).length 
    let elm = {}
    let incomingArr = []
    
    for (let i = 0; i < keyNumbers; i++) {
        let keyName = localStorage.key(i)
        let row = JSON.parse(localStorage.getItem(keyName))
        elm = {}    
        elm.id = keyName;
        elm.name = row.name;
        elm.owner = row.owner;
        elm.material = row.material;
        elm.tech = row.tech;
        elm.gabar = row.gabar;
        elm.speed = row.speed;
        elm.pictname = row.pictname;
        incomingArr.push(elm)
    }
    return incomingArr
}

function sortElements(){
    let checkBox = document.getElementById("sortcheckbox");
    if (checkBox.checked == true){
       let sortArr = getArrayFromStorage()
        
        function byField(field) {
            return (a, b) => +a[field] > +b[field] ? 1 : -1;
          }
        
        sortArr.sort(byField('speed'));
        
        document.getElementsByClassName("displayzone")[0].innerHTML = ''
        for (let n = 0; n <sortArr.length; n++) {
            let tempEl = sortArr[n]
            buildElementToPage(tempEl.id, tempEl)
        }
      } else {
        setTimeout(location.reload(), 1000)
      }
}

function searchElements(){
  document.getElementsByClassName("displayzone")[0].innerHTML = ''
  let searchtArr = getArrayFromStorage()
  let str = document.querySelector("#csearch").value
  let serchStr = str.toLowerCase();
  let  regExp = new RegExp(`${serchStr}`, "gi")
  let isFounded = false
  for (let i=0; i<searchtArr.length; i++) {
      let row = searchtArr[i]
      let strN = row.name.toLowerCase();
      let strV = row.volume;
      let strM = row.material.toLowerCase();
      if (regExp.test(strN) || regExp.test(strV) || regExp.test(strM)) {buildElementToPage(row.id, row)
                                                                        isFounded = true}
      }
  if (!isFounded) {document.getElementsByClassName("displayzone")[0].innerHTML = '<h1 style="color:red; width:100%; text-align: center;" >No matches found</h1>'}
   
}

refresh = () => location.reload()

sortcheckbox.addEventListener('click', sortElements)

searchbtn.addEventListener('click', searchElements)

cancelbtn.addEventListener('click', refresh)
