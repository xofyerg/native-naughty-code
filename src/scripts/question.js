export class Question {
  static create(question) {
    return fetch(
      "https://native-naughty-code-default-rtdb.europe-west1.firebasedatabase.app/questions.json",
      {
        method: "POST",
        body: JSON.stringify(question),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        question.id = res.name;
        return question;
      })
      .then(setQuestionsToLocal)
      .then(Question.renderList);
  }

  static renderList() {
    const questions = getQuestionsFromLocal();

    const html = questions.length
      ? questions.map(toCard).join("")
      : `<div>Question list is empty</div>`;

    const list = document.getElementById("post-form");
    list.innerHTML = html;
  }
}

function setQuestionsToLocal(question) {
  const all = getQuestionsFromLocal();
  all.push(question);

  localStorage.setItem("questions", JSON.stringify(all));
}

function getQuestionsFromLocal() {
  return JSON.parse(localStorage.getItem("questions") || "[]");
}

function toCard(question) {
  return `<div class="posts-form__item">
            <div class="posts-form__date">${new Date(
              question.date
            ).toLocaleDateString()}
                 ${new Date(question.date).toLocaleTimeString()}</div>
            <div class="posts-form__text">${question.text}</div>
          </div>`;
}
