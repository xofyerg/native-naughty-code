import "./styles/style.css";
import { isValid } from "./helpers/validation";

const form = document.getElementById("input-form");
const input = form.querySelector("#input");
const submitBtn = form.querySelector("#submit");

form.addEventListener("submit", submitFormHandler);

function submitFormHandler(e) {
  e.preventDefault();

  if (isValid(input.value)) {
    const question = {
      text: input.value.trim(),
      date: new Date().toJSON(),
    };

    submitBtn.disabled = true;

    input.value = "";
    submitBtn.disabled = false;
  }
}
