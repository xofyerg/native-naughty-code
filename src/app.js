import "./style.css";
import { isValid } from "./helpers/validation";
import { Question } from "./scripts/question";
import { modal } from "./plugins/modal";

const form = document.getElementById("input-form");
const input = form.querySelector("#input");
const submitBtn = form.querySelector("#submit");
const allBtn = document.getElementById("modal-btn");

const showModal = modal({
  title: "Simple modal window",
  closable: true,
  content: `
      <span>Modal body, some content</span>
    `,
  width: "600px",
  footerBtns: [
    {
      text: "Ok",
      class: "primary-btn",
      handler() {
        console.log("primary clicked");
      },
    },
    {
      text: "Cancel",
      class: "secondary-btn",
      handler() {
        showModal.close();
      },
    },
  ],
});

window.addEventListener("load", Question.renderList);
form.addEventListener("submit", submitFormHandler);
input.addEventListener("input", () => {
  submitBtn.disabled = !isValid(input.value);
});
allBtn.addEventListener("click", () => {
  showModal.open();
});

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
