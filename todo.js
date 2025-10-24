const list = document.querySelector(".list");
const input = document.querySelector("input");
const addBtn = document.querySelector(".create-btn");
const buttons = document.querySelectorAll(".filters button");

let content = [];
let type = "All";
let id = 1;

const ListItem = (item) => {
  return `
    <div class="item">
      <input type="checkbox" class="checkbox" id="${item.id}" ${
    item.isDone ? "checked" : ""
  }>
      <p class="${item.isDone ? "done" : ""}">${item.text}</p>
      <button id="${item.id}" class="delete-btn">delete</button>
    </div>
  `;
};

// ---------------- ADD BUTTON ----------------
addBtn.addEventListener("click", () => {
  if (input.value.trim() === "") return;

  content.push({
    id: id,
    text: input.value,
    isDone: false,
  });

  id++;
  input.value = "";

  render();
});

// ---------------- FILTER BUTTONS ----------------
buttons.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    buttons.forEach((button) => button.classList.remove("chosen"));
    btn.classList.add("chosen");

    if (i === 0) type = "All";
    else if (i === 1) type = "Active";
    else type = "Completed";

    render();
  });
});

// ---------------- RENDER ----------------
const render = () => {
  const elements = content
    .filter((item) => {
      if (type === "All") return true;
      if (type === "Active") return !item.isDone;
      return item.isDone;
    })
    .map((item) => ListItem(item))
    .join("");

  list.innerHTML = elements;
  addListeners();
};

// ---------------- EVENT LISTENERS ----------------
const addListeners = () => {
  const deleteBtns = document.querySelectorAll(".delete-btn");
  const checkboxes = document.querySelectorAll(".checkbox");

  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      content = content.filter((item) => item.id != btn.id);
      render();
    });
  });

  // Checkbox
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("click", () => {
      const item = content.find((item) => item.id == checkbox.id);
      item.isDone = !item.isDone;
      render();
    });
  });
};
