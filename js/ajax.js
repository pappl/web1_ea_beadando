const code = "ALH5L5";
fetchData();
document.getElementById("readBtn").addEventListener("click", fetchData);

function fetchData() {
  const tbody = document.querySelector("#dataTable tbody");
  tbody.innerHTML = "";

  fetch("http://gamf.nhely.hu/ajax2/", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      op: "read",
      code: code
    })
  })
    .then(res => res.json())
    .then(data => {
      let totalHeight = 0;
      let maxHeight = -Infinity;

      data.list.forEach(record => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
          <td>${record.id}</td>
          <td>${record.name}</td>
          <td>${record.height}</td>
          <td>${record.weight}</td>
        `;

        tbody.appendChild(tr);

        const height = parseFloat(record.height);
        if (!isNaN(height)) {
          totalHeight += height;
          if (height > maxHeight) maxHeight = height;
        }
      });

      const avgHeight = (totalHeight / data.list.length).toFixed(2);

      document.getElementById("summary").innerHTML = `
        <p>Magasság összeg: ${totalHeight}</p>
        <p>Magasság átlag: ${avgHeight}</p>
        <p>Legnagyobb magasság: ${maxHeight}</p>
      `;
    })
    .catch(err => {
      console.error("Hiba a beolvasás során:", err);
    });
}
document.getElementById("createBtn").addEventListener("click", createRecord);

function createRecord() {
  const name = document.getElementById("name").value.trim();
  const height = document.getElementById("height").value.trim();
  const weight = document.getElementById("weight").value.trim();
  const messageDiv = document.getElementById("createMsg");

  if (!name || !height || !weight) {
    messageDiv.textContent = "Minden mező kitöltése kötelező!";
    messageDiv.classList.add("error");
    return;
  }

  if (name.length > 30 || height.length > 30 || weight.length > 30) {
    messageDiv.textContent = "Egyik mező sem lehet hosszabb 30 karakternél!";
    messageDiv.classList.add("error");
    return;
  }

  fetch("http://gamf.nhely.hu/ajax2/", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      op: "create",
      name: name,
      height: height,
      weight: weight,
      code: code
    })
  })
    .then(res => res.text())
    .then(response => {
      if (response.includes("1")) {
        messageDiv.textContent = "Sikeres mentés!";
        messageDiv.classList.remove("error");
        fetchData();
        document.getElementById("name").value = "";
        document.getElementById("height").value = "";
        document.getElementById("weight").value = "";
      } else {
        messageDiv.textContent = "Nem sikerült menteni!";
        messageDiv.classList.add("error");
      }
    })
    .catch(err => {
      console.error("Hiba mentés közben:", err);
      messageDiv.textContent = "Hálózati hiba történt.";
      messageDiv.classList.add("error");
    });
}

let currentlyEditingId = null;

function fillUpdateForm(id, name, height, weight) {
  if (currentlyEditingId !== null) {
    alert("Előbb fejezd be az aktuális szerkesztést vagy nyomd meg a 'Mégse' gombot!");
    return;
  }

  document.getElementById("name").value = name;
  document.getElementById("height").value = height;
  document.getElementById("weight").value = weight;

  currentlyEditingId = id;

  document.getElementById("createBtn").style.display = "none";
  document.getElementById("updateBtn").style.display = "inline-block";
  document.getElementById("cancelBtn").style.display = "inline-block";

  document.getElementById("createMsg").textContent = `Szerkesztés alatt: #${id}`;
}

document.getElementById("getDataBtn").addEventListener("click", () => {
    const id = document.getElementById("editId").value;
    const msg = document.getElementById("anotherCreateMsg");
  
    if (!id) {
      msg.textContent = "Adj meg egy érvényes ID-t!";
      msg.classList.add("error");
      return;
    }
  
    fetch("http://gamf.nhely.hu/ajax2/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        op: "read",
        code: code
      })
    })
      .then(res => res.json())
      .then(data => {
        const item = data.list.find(record => record.id == id);
        if (!item) {
          msg.textContent = `Nem található rekord ezzel az ID-val: ${id}`;
          msg.classList.add("error");
          return;
        }
  
        document.getElementById("updateName").value = item.name;
        document.getElementById("updateHeight").value = item.height;
        document.getElementById("updateWeight").value = item.weight;
        currentlyEditingId = id;

        msg.textContent = `Rekord betöltve: #${id}`;
        msg.classList.remove("error");
      })
      .catch(err => {
        console.error(err);
        msg.textContent = "Hiba történt az adatlekérés során.";
        msg.classList.add("error");
      });
  });
  
//update
  document.getElementById("updateBtn").addEventListener("click", () => {
    const id = currentlyEditingId;
    const name = document.getElementById("updateName").value.trim();
    const height = document.getElementById("updateHeight").value.trim();
    const weight = document.getElementById("updateWeight").value.trim();
    const msg = document.getElementById("updateMsg");
  
    if (!id) {
      msg.textContent = "Nincs betöltött adat a módosításhoz.";
      msg.classList.add("error");
      return;
    }
  
    // Validáció
    if (!name || !height || !weight) {
      msg.textContent = "Minden mező kitöltése kötelező.";
      msg.classList.add("error");
      return;
    }
  
    if (name.length > 30 || height.length > 30 || weight.length > 30) {
      msg.textContent = "Max. 30 karakter hosszú lehet minden mező.";
      msg.classList.add("error");
      return;
    }
  
    // Küldés
    fetch("http://gamf.nhely.hu/ajax2/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        op: "update",
        id,
        name,
        height,
        weight,
        code
      })
    })
      .then(res => res.text())
      .then(response => {
        console.log("update response:", response);
        if (response.trim() === "1") {
          msg.textContent = "Sikeres módosítás!";
          msg.classList.remove("error");
          msg.classList.add("success");
          resetForm();
            fetchData();
        } else {
          msg.textContent = "Nem sikerült módosítani az adatot.";
          msg.classList.add("error");
        }
      })
      .catch(err => {
        console.error(err);
        msg.textContent = "Hiba történt a kérés során.";
        msg.classList.add("error");
      });
      
  });


  document.getElementById("AcancelBtn").addEventListener("click", () => {
    resetForm();
  });
  //mégse
  function resetForm() {
  document.getElementById("updateName").value = "";
  document.getElementById("updateHeight").value = "";
  document.getElementById("updateWeight").value = "";
  document.getElementById("editId").value = "";

  currentlyEditingId = null;

  const msg = document.getElementById("anotherCreateMsg");
  msg.textContent = "";
  msg.classList.remove("error");
}


//delete
document.getElementById("deleteBtn").addEventListener("click", () => {
    const id = document.getElementById("deleteId").value.trim();
    const msg = document.getElementById("deleteMsg");
  
    if (!id) {
      msg.textContent = "🔴 Add meg a törlendő rekord ID-ját!";
      msg.classList.add("error");
      return;
    }
  
    fetch("http://gamf.nhely.hu/ajax2/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        op: "delete",
        id,
        code
      })
    })
      .then(res => res.text())
      .then(response => {
        console.log("delete response:", response);
        if (response.trim() === "1") {
          msg.textContent = "Sikeres törlés!";
          msg.classList.remove("error");
          msg.classList.add("success");
          document.getElementById("deleteId").value = "";
          fetchData();
        } else {
          msg.textContent = "Nincs ilyen ID vagy nem a te rekordod.";
          msg.classList.add("error");
        }
      })
      .catch(err => {
        console.error(err);
        msg.textContent = "Hiba történt törlés közben.";
        msg.classList.add("error");
      });
  });
  