//web storage
window.addEventListener('DOMContentLoaded', loadItems);
    
    function addItem() {
        const input = document.getElementById('storageInput');
        const value = input.value.trim();
        if (!value) return;
    
        let items = JSON.parse(localStorage.getItem('myList')) || [];
        items.push(value);
        localStorage.setItem('myList', JSON.stringify(items));
        input.value = '';
        loadItems();
    }
    
    function loadItems() {
        const list = document.getElementById('storageList');
        list.innerHTML = '';
    
        const items = JSON.parse(localStorage.getItem('myList')) || [];
        items.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = item;
        list.appendChild(li);
        });
    }
    
    function clearItems() {
        if (confirm('Biztos törölni szeretnéd az összes adatot?')) {
        localStorage.removeItem('myList');
        loadItems();
        }
    } 
    
//web worker
function bigLoop(){
    if (typeof(Worker) !== "undefined") {
        var worker = new Worker('js/worker.js');
        worker.onmessage = function (event) {
            alert("Lefutott " + event.data + " ismétlés" );
        };
    } else {
        alert("Sorry, your browser does not support Web Workers..." );
    }
}
function shortMessage(){
    alert("Hello felhasználó! :)" );
}

//sse
let fakeSSEInterval = null;
    let counter = 1;
    
    function startFakeSSE() {
        const output = document.getElementById("sseOutput");
        output.innerHTML = "<li>Csatlakozva az 'ál-szerverhez'...</li>";
    
        fakeSSEInterval = setInterval(() => {
        const item = document.createElement("li");
        item.textContent = `Üzenet ${counter++} érkezett a szervertől (${new Date().toLocaleTimeString()})`;
        output.appendChild(item);
        }, 3000);
    }
    
    function stopFakeSSE() {
        clearInterval(fakeSSEInterval);
        const item = document.createElement("li");
        item.textContent = "Kapcsolat lezárva.";
        document.getElementById("sseOutput").appendChild(item);
    }

//drag and drop
const dragBox = document.getElementById("drag-box");
        const dropZone = document.getElementById("drop-zone");
      
        dragBox.addEventListener("dragstart", function (e) {
          e.dataTransfer.setData("text/plain", "drag-box");
        });
      
        dropZone.addEventListener("dragover", function (e) {
          e.preventDefault();
          dropZone.classList.add("hover");
        });
      
        dropZone.addEventListener("dragleave", function () {
          dropZone.classList.remove("hover");
        });
      
        dropZone.addEventListener("drop", function (e) {
          e.preventDefault();
          const data = e.dataTransfer.getData("text/plain");
      
          if (data === "drag-box") {
            dropZone.textContent = "Sikeresen ledobtad! :D";
            dropZone.classList.remove("hover");
          }
        });