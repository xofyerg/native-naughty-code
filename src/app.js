import "./style.css";
import { isValid } from "./helpers/validation";
import { Question } from "./scripts/question";
import { modal } from "./plugins/modal";

const form = document.getElementById("input-form");
const input = form.querySelector("#input");
const submitBtn = form.querySelector("#submit");
const allBtn = document.getElementById("modal-btn");

window.addEventListener("load", Question.renderList);
form.addEventListener("submit", submitFormHandler);
input.addEventListener("input", () => {
  submitBtn.disabled = !isValid(input.value);
});
allBtn.addEventListener("click", showModal);

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

function showModal() {
  modal().open();
}
