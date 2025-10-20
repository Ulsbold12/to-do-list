const list = document.querySelector(".list");
const input = document.querySelector("input");
const button = document.querySelector(".create-btn");

let content = [];

const ListItem = (item, index) => {
  return `
    <div class="item">
      <input type="checkbox" class="checkbox" ${
        item.done ? "checked" : ""
      } data-index="${index}">
      <span class="${item.done ? "checked-text" : ""}">${item.text}</span>
      <button class="delete-btn" data-index="${index}">delete</button>
    </div>
  `;
};

const render = () => {
  list.innerHTML = content.map((item, index) => ListItem(item, index)).join("");

  addListeners();
};

const addListeners = () => {
  // 🗑️ Устгах товч
  const deleteBtns = document.querySelectorAll(".delete-btn");
  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = btn.dataset.index;
      content = content.filter((_, i) => i != index);
      render();
    });
  });

  // ✅ Checkbox toggle хийх
  const checkboxes = document.querySelectorAll(".checkbox");
  checkboxes.forEach((box) => {
    box.addEventListener("change", () => {
      const index = box.dataset.index;
      content[index].done = box.checked; // төлөв хадгална
      render();
    });
  });
};

button.addEventListener("click", () => {
  const value = input.value.trim();
  if (value === "") return;

  content.push({ text: value, done: false });
  input.value = "";
  render();
});
