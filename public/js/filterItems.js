"use strict";

const filterItems = () => {
  const radioButtons = document.querySelectorAll("input[name=filter]");
  console.log(radioButtons);

  for (const radioButton of radioButtons) {
    radioButton.addEventListener("change", () => {
      const selectedElement = document.querySelector(
        "input[name=filter]:checked"
      );

      const todoItemElements = document.querySelectorAll(".todo-item");

      switch (selectedElement.id) {
        case "all":
          todoItemElements.forEach((element) => {
            element.classList.remove("hidden");
          });
          break;
        case "active":
          todoItemElements.forEach((element) => {
            if (element.childNodes[1].childNodes[1].checked) {
              element.classList.remove("hidden");
            }
            if (!element.childNodes[1].childNodes[1].checked) {
              element.classList.add("hidden");
            }
          });
          break;
        case "completed":
          todoItemElements.forEach((element) => {
            if (element.childNodes[1].childNodes[1].checked) {
              element.classList.add("hidden");
            }
            if (!element.childNodes[1].childNodes[1].checked) {
              element.classList.remove("hidden");
            }
          });
          break;
      }
    });
  }
};

export default filterItems;
