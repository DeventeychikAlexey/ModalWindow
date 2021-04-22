myPlugin.confirm = function (options) {
  return new Promise((resolve, reject) => {
    const modal = myPlugin.modal({
      title: options.title,
      content: options.content,
      closable: false,
      maxWidth: "400px",
      footerButtons: [
        {
          text: "Подтвердить",
          type: "primary",
          handler() {
            modal.close();
            resolve();
          },
        },
        {
          text: "Отменить",
          type: "secondary",
          handler() {
            modal.close();
            reject();
          },
        },
      ],
    });

    modal.onClose = () => {
      modal.destroy();
    };

    setTimeout(modal.open, 0);
  });
};
