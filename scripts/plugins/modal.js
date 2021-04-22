Element.prototype.appendAfter = function (element) {
  element.parentNode.insertBefore(this, element.nextSibling);
};

myPlugin.modal = function (options) {
  const DEFAULT_WIDTH = "600px";

  function noop() {}

  function createModalFooter(buttons = []) {
    if (buttons.length === 0) {
      return document.createElement("div");
    } else {
      const wrap = document.createElement("div");
      wrap.classList.add("a-modal__footer");

      buttons.forEach((button) => {
        const btn = document.createElement("button");
        btn.textContent = button.text;
        btn.classList.add("btn");
        btn.classList.add(`btn-${button.type || "secondary"}`);
        btn.addEventListener("click", button.handler || noop);

        wrap.appendChild(btn);
      });

      return wrap;
    }
  }
  function createModal(ops) {
    const modal = document.createElement("div");
    modal.classList.add("a-modal");
    modal.insertAdjacentHTML(
      "afterbegin",
      `<div class="a-modal__overlay"  data-close="true">
    <div class="a-modal__body" style=max-width:${
      ops && ops.maxWidth ? ops.maxWidth : DEFAULT_WIDTH
    }>
      <div class="a-modal__top">
        <h2 class="a-modal__title">${
          ops && ops.title ? ops.title : "Title"
        }</h2>
        ${
          ops && ops.closable
            ? `<div class="a-modal__close" data-close="true">&times;</div>`
            : ""
        }
        </div>
      <div class="a-modal__content" data-content>
      ${ops && ops.content ? ops.content : ""}
      </div>
    </div>
  </div>`
    );
    const footer = createModalFooter(ops.footerButtons);
    footer.appendAfter(modal.querySelector("[data-content]"));
    document.body.appendChild(modal);
    return modal;
  }

  const modal = createModal(options);
  const ANIMATION_SPEED = 200;
  let closing = false;
  let destroyed = false;

  const obj = {
    onClose: () => {},
    onOpen: () => {},

    open() {
      if (destroyed) return console.log("Modal is destroyed");

      !closing && modal.classList.add("open");

      typeof obj.onOpen === "function" && obj.onOpen();
    },

    close() {
      closing = true;
      modal.classList.remove("open");
      modal.classList.add("hide");

      setTimeout(() => {
        modal.classList.remove("hide");
        closing = false;
      }, ANIMATION_SPEED);

      typeof obj.onClose === "function" && obj.onClose();
    },

    setContent(content) {
      modal.querySelector("[data-content]").innerHTML = content;
    },
  };

  const listener = (event) => {
    if (event.target.dataset.close) {
      obj.close();
    }
  };

  modal.addEventListener("click", listener);

  return Object.assign(obj, {
    destroy() {
      try {
        modal.parentNode.removeChild(modal);
        modal.removeEventListener("click", listener);
        destroyed = true;
      } catch (error) {
        console.error("Элемент не существует");
      }
    },
  });
};
