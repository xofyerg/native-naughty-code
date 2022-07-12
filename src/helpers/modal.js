export function createModal(title, content) {
  const modal = document.createElement("div");
  modal.setAttribute("id", "modal-window");

  console.log(modal);

  modal.addEventListener("click", () => {
    modal.remove();
  });

  modal.classList.add("modal-window");
  modal.innerHTML = `<div class="modal-window__content">${title}${content}</div>`;

  document.body.append(modal);
}
