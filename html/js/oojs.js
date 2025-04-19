class Animal {
    constructor(name, age) {
      this.name = name;
      this.age = age;
    }
  
    describe() {
      return `${this.name}, ${this.age} éves`;
    }
  
    renderCard() {
      const div = document.createElement("div");
      div.className = "animal-card";
      div.textContent = this.describe();
      return div;
    }
  }
  
  
  class Dog extends Animal {
    constructor(name, age) {
      super(name, age);
    }
  
    describe() {
      return `Kutya: ${super.describe()}`;
    }
  }
  
  
  class Cat extends Animal {
    constructor(name, age) {
      super(name, age);
    }
  
    describe() {
      return `Macska: ${super.describe()}`;
    }
  }
  
  
  const addBtn = document.getElementById("addBtn");
  const nameInput = document.getElementById("name");
  const ageInput = document.getElementById("age");
  const typeSelect = document.getElementById("type");
  const animalList = document.getElementById("animalList");
  
  addBtn.addEventListener("click", () => {
    const name = nameInput.value.trim();
    const age = parseInt(ageInput.value);
    const type = typeSelect.value;
  
    if (!name || isNaN(age)) {
      alert("Kérlek add meg a nevet és kort!");
      return;
    }
  
    let animal;
    if (type === "Dog") {
      animal = new Dog(name, age);
    } else {
      animal = new Cat(name, age);
    }
  
    animalList.appendChild(animal.renderCard());
  
    
    nameInput.value = "";
    ageInput.value = "";
  });
  