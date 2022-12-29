// Initialisation des variables de total
let totalQuantity = 0;
let totalPrice = 0;

function updateQuantity(id, color, quantity) {
  // Récupération du panier dans le LocalStorage
  let cart = JSON.parse(localStorage.getItem('cart'));

  // Mise à jour de la quantité du produit dans le panier
  cart = cart.map(item => {
    if (item.id === id && item.color === color) {
      item.quantity = quantity;
    }
    return item;
  });

  // Mise à jour du panier dans le LocalStorage
  localStorage.setItem('cart', JSON.stringify(cart));
}

function deleteFromCart(id, color) {
  // Récupération du panier dans le LocalStorage
  let cart = JSON.parse(localStorage.getItem('cart'));

  // Vérification que le panier existe
  if (cart) {
    let productFound = false;

    // Parcours du panier
    for (let i = 0; i < cart.length; i++) {
      // Si l'élément correspond à celui à supprimer
      if (cart[i].id === id && cart[i].color === color) {
        // Suppression de l'élément
        cart.splice(i, 1);
        productFound = true;
        break;
      }
    }

    // Si le produit a été trouvé et supprimé du panier
    if (productFound) {
      // Mise à jour du panier dans le LocalStorage
      if (cart.length > 0) {
        localStorage.setItem('cart', JSON.stringify(cart));
      } else {
        // Si le panier est vide, on le vide également dans le LocalStorage
        localStorage.removeItem('cart');
      }
      // Mise à jour de l'affichage du panier
      displayCart();}}}

      
async function displayCart() {
  // Récupération de la section des éléments du panier
  const cartItemsSection = document.querySelector('#cart__items');

  // Récupération du panier dans le LocalStorage
  const cart = JSON.parse(localStorage.getItem('cart'));

  // Vérification que le panier existe et n'est pas vide
  if (cart && cart.length > 0) {
    // Tableau contenant les informations sur les produits du panier
    const productsData = [];

    // Parcours du tableau de produits
    for (const item of cart) {
      // Récupération des informations sur le produit à l'aide de fetch
      const response = await fetch(`http://localhost:3000/api/products/${item.id}`);
      const data = await response.json();

      // Récupération de la quantité et de la couleur du produit dans le panier
      data.quantity = item.quantity;
      data.color = item.color;

      productsData.push(data);
    }


    // Parcours du tableau de produits
    for (const productData of productsData) {
      // Récupération de la quantité de l'article du panier
      const itemQuantity = cart.find(item => item.id === productData._id).quantity;
      // Création de l'élément article pour chaque produit
      const article = document.createElement('article');
      article.classList.add('cart__item');
      article.setAttribute('data-id', productData._id);
      article.setAttribute('data-color', productData.color);
      article.innerHTML = `
          <div class="cart__item__img">
            <img src="${productData.imageUrl}" alt="${productData.altTxt}">
          </div>
          <div class="cart__item__content">
            <div class="cart__item__content__description">
              <h2>${productData.name}</h2>
              <p>${productData.color}</p>
              <p>${productData.price} €</p>
            </div>
            <div class="cart__item__content__settings">
              <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productData.quantity}">
              </div>
              <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
              </div>
            </div>
          </div>
        `;

      // Ajout de l'élément au panier
      cartItemsSection.appendChild(article);

      const deleteButton = document.createElement('button');
      deleteButton.classList.add('deleteItem');
      deleteButton.textContent = 'Supprimer';
      deleteButton.addEventListener('click', () => {
        deleteFromCart(productData._id, productData.color);
      });


      const itemQuantityInputs = document.querySelectorAll('.itemQuantity');
      itemQuantityInputs.forEach(input => {
        input.addEventListener('change', function () {
          const item = this.closest('[data-id][data-color]');
          const id = item.getAttribute('data-id');
          const color = item.getAttribute('data-color');
          const quantity = this.value;
          // Mise à jour de la quantité dans le panier
          updateQuantity(id, color, quantity);
        });
      });

      totalQuantity += productData.quantity++;
      totalPrice += itemQuantity * productData.price;
    }

    // Mise à jour des éléments totalQuantity et totalPrice dans le HTML
    document.querySelector('#totalQuantity').textContent = totalQuantity;
    document.querySelector('#totalPrice').textContent = totalPrice;



  } else {
    // Affichage d'un message si le panier est vide
    const messageElement = document.createElement('p');
    messageElement.textContent = 'Le panier est vide';
    cartItemsSection.appendChild(messageElement);
  }
}


// Événement storage qui met à jour la page web lorsque les données du LocalStorage sont modifiées
window.addEventListener('storage', function (event) {
  // Mise à jour de l'affichage du panier sur la page web
  displayCart();
});

// Initialisation de l'affichage du panier sur la page web
displayCart();
