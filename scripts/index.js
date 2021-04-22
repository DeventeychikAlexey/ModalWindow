let cards = [
  {
    id: 1,
    title: "Avocado",
    text: `Some quick example text to build on the card title and make up the
      bulk of the card's content.`,
    img:
      "https://ambassador-city-jomtien.ru/uploads/posts/2014-06/1402909243_avokado1.jpg",
    price: 100,
  },
  {
    id: 2,
    title: "Mango",
    text: `Some quick example text to build on the card title and make up the
    bulk of the card's content.`,
    img:
      "https://ambassador-city-jomtien.ru/uploads/posts/2014-06/1402727193_mango2.jpg",
    price: 999,
  },
  {
    id: 3,
    title: "Qiwi",
    text: `Some quick example text to build on the card title and make up the
    bulk of the card's content.`,
    img:
      "https://infoeda.com/wp-content/uploads/2019/04/Kivi-yagoda-ili-frukt.jpg",
    price: 25,
  },
  {
    id: 4,
    title: "Pomegranate",
    text: `Some quick example text to build on the card title and make up the
    bulk of the card's content.`,
    img: "https://lifeglobe.net/x/entry/842/pome01_5.jpg",
    price: 12345,
  },
  {
    id: 5,
    title: "Orange",
    text: `Some quick example text to build on the card title and make up the
    bulk of the card's content.`,
    img: "https://nauka.boltai.com/wp-content/uploads/sites/26/2015/07/238.jpg",
    price: 1,
  },
];

const toHTML = (card) => {
  return `<div class="card" style="width: 18rem">
    <img
      src="${card.img}" 
      class="card-img-top"
      alt="${card.title}"
    />
    <div class="card-body">
      <h5 class="card-title">${card.title}</h5>
      <p class="card-text">
      ${card.text}
      </p>
      <a href="#" class="btn btn-primary" data-btn="price" data-id=${card.id}>Посмотреть цену</a>
      <a href="#" class="btn btn-danger" data-btn="remove" data-id=${card.id}>Удалить</a>
    </div>
  </div>`;
};

function render() {
  const cardsElem = document.querySelector("#cards");

  // const html = cards.map(el=>toHTML(el)).join("");
  const html = cards.map(toHTML).join("");

  cardsElem.innerHTML = html;
}

const priceModal = myPlugin.modal({
  title: "Цена на товар",
  closable: true,
  footerButtons: [
    {
      text: "Закрыть",
      type: "primary",
      handler() {
        priceModal.close();
      },
    },
  ],
});

document.addEventListener("click", (event) => {
  event.preventDefault();
  const current = event.target;
  const btnType = current.dataset.btn;

  const id = current.dataset.id;
  const card = cards.find((el) => el.id == id);

  if (btnType === "price") {
    priceModal.setContent(
      `<p>Цена на 1кг ${card.title}: <strong>${card.price}$</strong></p>`
    );
    priceModal.open();
  } else if (btnType === "remove") {
    myPlugin
      .confirm({
        title: "Вы уверенны?",
        content: `<p>Вы удаляете <strong>${card.title}</strong><p>`,
      })
      .then(() => {
        cards = cards.filter((el) => el.id != id);
        render();
      })
      .catch(() => {});
  }
});

render();
