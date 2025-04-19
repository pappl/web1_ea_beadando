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


//canvas
const canvas = document.getElementById("rajz");
        const ctx = canvas.getContext("2d");
      
        // ház test
        ctx.fillStyle = "#ffcc66";
        ctx.fillRect(80, 120, 140, 120);
      
        // tető
        ctx.beginPath();
        ctx.moveTo(80, 120);
        ctx.lineTo(150, 60);
        ctx.lineTo(220, 120);
        ctx.closePath();
        ctx.fillStyle = "#cc6666";
        ctx.fill();
      
        // ajtó
        ctx.fillStyle = "#663300";
        ctx.fillRect(135, 180, 30, 60);
      
        // ablakok
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(95, 135, 25, 25);
        ctx.fillRect(180, 135, 25, 25);
      
        // függőleges vonal az ablakokon
        ctx.beginPath();
        ctx.moveTo(107.5, 135);
        ctx.lineTo(107.5, 160);
        ctx.moveTo(192.5, 135);
        ctx.lineTo(192.5, 160);
        ctx.stroke();
      
        // vízszintes vonal az ablakokon
        ctx.beginPath();
        ctx.moveTo(95, 147.5);
        ctx.lineTo(120, 147.5);
        ctx.moveTo(180, 147.5);
        ctx.lineTo(205, 147.5);
        ctx.stroke();