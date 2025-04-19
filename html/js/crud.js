const form = document.getElementById('dataForm');
const tableBody = document.querySelector('#dataTable tbody');
const searchInput = document.getElementById('searchInput');

let editModeId = null;

let idCounter = 0;
let data = [
  {id: idCounter++, name: "Dil Emma", city: "Debrecen", age: 41, occupation: "Mérnök" },
  {id: idCounter++, name: "Fá Zoltán", city: "Pécs", age: 29, occupation: "Grafikus" },
  {id: idCounter++, name: "Felk Elek", city: "Kecskemét", age: 35, occupation: "Tanár" },
  {id: idCounter++, name: "Gipsz Jakab", city: "Budapest", age: 23, occupation: "Építész" },
  {id: idCounter++, name: "Kukor Ica", city: "Győr", age: 31, occupation: "Projektmenedzser" }
];

let sortColumn = 'name';
let sortAsc = true;

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  const city = form.city.value.trim();
  const age = parseInt(form.age.value);
  const occupation = form.occupation.value.trim();

  if (!validate(name, city, age, occupation)) return;

  if (editModeId !== null) {
    const index = data.findIndex(row => row.id === editModeId);
    if (index !== -1) {
      data[index] = { id: editModeId, name, city, age, occupation };
    }
    editModeId = null;
    document.getElementById('submitBtn').textContent = 'Hozzáadás';
    document.getElementById('cancelBtn').style.display = 'none';
  } else {
    data.push({ id: idCounter++, name, city, age, occupation });
  }

  form.reset();
  renderTable();
});



function validate(name, city, age, occupation) {
  if (!name || !city || !occupation || isNaN(age)) return false;
  if (name.length > 30 || city.length > 30 || occupation.length > 30) return false;
  return true;
}


function renderTable() {
  const tableBody = document.querySelector('#dataTable tbody');
  tableBody.innerHTML = '';

  const query = document.getElementById('searchInput').value.toLowerCase();
  const column = document.getElementById('searchColumn').value;

  let filteredData = data.filter(row => {
    if (!query) return true;

    if (column === 'all') {
      return Object.values(row).some(value =>
        String(value).toLowerCase().includes(query)
      );
    } else {
      return String(row[column]).toLowerCase().includes(query);
    }
  });

  filteredData.sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortAsc ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortAsc ? 1 : -1;
    return 0;
  });
  filteredData.forEach((row) => {
    if (row.id === editModeId) return;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${row.name}</td>
      <td>${row.city}</td>
      <td>${row.age}</td>
      <td>${row.occupation}</td>
      <td>
        <button onclick="editRow(${row.id})" ${editModeId !== null ? 'disabled' : ''}><i class="fas fa-pencil"></i></button>
        <button onclick="deleteRow(${row.id})" ${editModeId !== null ? 'disabled' : ''}><i class="fas fa-trash"></i></button>
      </td>
    `;
    tableBody.appendChild(tr);
  });
}


function deleteRow(id) {
  data = data.filter(row => row.id !== id);
  renderTable();
}


function editRow(id) {
  const row = data.find(row => row.id === id);
  if (!row) return;

  editModeId = id;

  form.name.value = row.name;
  form.city.value = row.city;
  form.age.value = row.age;
  form.occupation.value = row.occupation;

  document.getElementById('submitBtn').textContent = 'Mentés';
  document.getElementById('cancelBtn').style.display = 'inline-block';

  renderTable();
}

document.getElementById('cancelBtn').addEventListener('click', () => {
  editModeId = null;
  form.reset();
  document.getElementById('submitBtn').textContent = 'Hozzáadás';
  document.getElementById('cancelBtn').style.display = 'none';
  renderTable();
});



searchInput.addEventListener('input', renderTable);

document.querySelectorAll('th[data-column]').forEach(th => {
  th.addEventListener('click', () => {
    const column = th.getAttribute('data-column');
    if (sortColumn === column) {
      sortAsc = !sortAsc;
    } else {
      sortColumn = column;
      sortAsc = true;
    }
    renderTable();
  });
});

window.addEventListener('DOMContentLoaded', renderTable);
