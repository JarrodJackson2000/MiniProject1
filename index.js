let jsonData = {};
let categoriesArray = [];

async function fetchData() {
  const response = await fetch("https://api.sampleapis.com/recipes/recipes");
  jsonData = await response.json();
}

async function generateCardsAndDropdown() {
  await fetchData();
  await generateCards();
  addDropdown();
}

async function generateCards() {
  const cuisineSet = new Set();
  jsonData.forEach((data) => {
    cuisineSet.add(data.cuisine || "Cuisine not found");
  });

  categoriesArray = [...cuisineSet];
  categoriesArray[3] = "Mexican";
  categoriesArray[4] = "Other";
  console.log(categoriesArray);
  clearPreviousCards();

  jsonData.forEach((data) => {
    const cardTemplate = document
      .getElementById("cardTemplate")
      .content.cloneNode(true);

    cardTemplate.querySelector(".imageTemplate").src =
      data.photoUrl || "not-found.jpg";
    cardTemplate.querySelector(".templateTitle").innerText =
      data.title || "Title not found";
    cardTemplate.querySelector(".templateDescription").innerText =
      data.description || "Description not found";
    cardTemplate.querySelector(".cuisineTemplate").innerText =
      data.cuisine || "Cuisine not found";
    cardTemplate.querySelector(".mainIngrediantTemplate").innerText =
      data.mainIngredient || "Main ingredient not found";
    cardTemplate.querySelector(".tagsTemplate").innerText =
      data.tags || "Tags not found";
    const linkTemplate = cardTemplate.querySelector(".linkTemplate");
    linkTemplate.innerText = "View Recipe";
    linkTemplate.setAttribute("href", data.url);
    document.querySelector("#insertTemplate").appendChild(cardTemplate);
  });
}

function clearPreviousCards() {
  const insertTemplate = document.querySelector("#insertTemplate");
  while (insertTemplate.firstChild) {
    insertTemplate.removeChild(insertTemplate.firstChild);
  }
}

function addDropdown() {
  const categoryTemplate = document
    .getElementById("categoryTemplate")
    .content.cloneNode(true);

  const dropdownMenu = categoryTemplate.querySelector(".dropdown-menu");

  // Clear any existing items in the dropdown template
  dropdownMenu.innerHTML = "";

  categoriesArray.forEach((category) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.classList.add("dropdown-item", "category");
    button.textContent = category;
    button.setAttribute("onclick", `organiseCategory('${category}')`);
    li.appendChild(button);
    dropdownMenu.appendChild(li);
  });

  const insertCategory = document.querySelector("#insertCategory");
  insertCategory.innerHTML = ""; // Clear previous dropdown
  insertCategory.appendChild(categoryTemplate);
}

function organiseCategory(categoryText) {
  const insertTemplate = document.querySelector("#insertTemplate");
  insertTemplate.innerHTML = "";

  const categoryArray = [];
  jsonData.forEach((data) => {
    if (categoryText === "Other") {
      // Display cards where cuisine is empty
      if (!data.cuisine) {
        categoryArray.push(data);
      }
    } else {
      // Display cards matching the categoryText
      if (data.cuisine === categoryText) {
        categoryArray.push(data);
      }
    }
  });

  categoryArray.forEach((data) => {
    const cardTemplate = document
      .getElementById("cardTemplate")
      .content.cloneNode(true);

    cardTemplate.querySelector(".imageTemplate").src =
      data.photoUrl || "not-found.jpg";
    cardTemplate.querySelector(".templateTitle").innerText =
      data.title || "Title not found";
    cardTemplate.querySelector(".templateDescription").innerText =
      data.description || "Description not found";
    cardTemplate.querySelector(".cuisineTemplate").innerText =
      data.cuisine || "Cuisine not found";
    cardTemplate.querySelector(".mainIngrediantTemplate").innerText =
      data.mainIngredient || "Main ingredient not found";
    cardTemplate.querySelector(".tagsTemplate").innerText =
      data.tags || "Tags not found";
    const linkTemplate = cardTemplate.querySelector(".linkTemplate");
    linkTemplate.innerText = "View Recipe";
    linkTemplate.setAttribute("href", data.url);

    insertTemplate.appendChild(cardTemplate);
  });
}
