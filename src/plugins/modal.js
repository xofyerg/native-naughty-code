function _createModal(options) {
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.insertAdjacentHTML(
    "afterbegin",
    `
    <div class="modal__backdrop">
      <div class="modal__content">
        <div class="modal__header">
          <span class="modal__title">Modal title</span>
          <span class="modal__close">&times;</span>
        </div>
        <div class="modal__body">
          <span>Modal body</span>
        </div>
        <div class="modal__footer">
          <button>Ok</button>
          <button>Cancel</button>
        </div>
      </div>
    </div>
  `
  );

  document.body.appendChild(modal);

  return modal;
}

export function modal(options) {
  const nodeModal = _createModal(options);

  return {
    open() {
      nodeModal.classList.add("open");
    },
    close() {
      nodeModal.classList.remove("open");
    },
    destroy() {},
  };
}

console.log("modal js opened");
