import "./styles/style.css";
import { isValid } from "./helpers/validation";
import { Question } from "./scss/scripts/question";
import { createModal } from "./helpers/modal";

const form = document.getElementById("input-form");
const input = form.querySelector("#input");
const submitBtn = form.querySelector("#submit");
const modalBtn = document.getElementById("modal-btn");

window.addEventListener("load", Question.renderList);
form.addEventListener("submit", submitFormHandler);
input.addEventListener("input", () => {
  submitBtn.disabled = !isValid(input.value);
});
modalBtn.addEventListener("click", openModal);

function submitFormHandler(e) {
  e.preventDefault();

  if (isValid(input.value)) {
    const question = {
      text: input.value.trim(),
      date: new Date().toJSON(),
    };

    Question.create(question).then(() => {
      submitBtn.disabled = true;
      input.value = "";
      submitBtn.disabled = false;
    });
  }
}

function openModal() {
  createModal("Authorization", "<h1>Auth</h1>");
}
