Element.prototype.appendAfter = function (el) {
  el.parentNode.insertBefore(this, el.nextSubling);
};

function noop() {}

function _createModalFooter(buttons = []) {
  if (buttons.length === 0) {
    return document.createElement("div");
  }

  const wrap = document.createElement("div");
  wrap.classList.add("modal__footer");

  buttons.forEach((btn) => {
    const nodeBtn = document.createElement("button");
    nodeBtn.classList.add("btn");
    nodeBtn.classList.add(btn.class || "secondary-btn");
    nodeBtn.textContent = btn.text;
    nodeBtn.onclick = btn.handler || noop;

    wrap.appendChild(nodeBtn);
  });

  return wrap;
}

function _createModal({
  title = "Modal window",
  closable = true,
  content = "",
  width = "600px",
  footerBtns,
}) {
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.insertAdjacentHTML(
    "afterbegin",
    `
    <div class="modal__backdrop" data-close="true">
      <div class="modal__content" style="width: ${width}; ">
        <div class="modal__header">
          <span class="modal__title">${title}</span>
          ${
            closable
              ? `<span class="modal__close" data-close="true">
                &times;
              </span>`
              : ""
          }
        </div>
        <div class="modal__body" data-content>
          ${content}
        </div>
      </div>
    </div>
  `
  );

  const footer = _createModalFooter(footerBtns);
  footer.appendAfter(modal.querySelector("[data-content]"));

  document.body.appendChild(modal);
  return modal;
}

export function modal(options) {
  const ANIMATION_SPEED = 200;

  const nodeModal = _createModal(options);

  let isClosing = false;
  let destroyed = false;

  const modalMethods = {
    open() {
      !isClosing && nodeModal.classList.add("open");
    },
    close() {
      isClosing = true;
      nodeModal.classList.remove("open");
      nodeModal.classList.add("hide");
      setTimeout(() => {
        nodeModal.classList.remove("hide");
        isClosing = false;
      }, ANIMATION_SPEED);
    },
  };

  const listener = (e) => {
    if (e.target.dataset.close) {
      modalMethods.close();
    }
  };

  nodeModal.addEventListener("click", listener);

  return Object.assign(modalMethods, {
    destroy() {
      nodeModal.parentNode.removeChild(nodeModal);
      nodeModal.removeEventListener("click", listener);
      destroyed = true;
    },
    setContent(html) {
      nodeModal.querySelector("[data-content]").innerHTML = html;
    },
  });
}

console.log("modal js opened");
