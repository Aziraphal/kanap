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
  console.log('test')
  // Récupération du panier dans le LocalStorage
  let cart = JSON.parse(localStorage.getItem('cart'));

// Parcours du panier
for (let i = 0; i < cart.length; i++) {
  // Si l'élément correspond à celui à supprimer
  if (cart[i].id === id && cart[i].color === color) {
  // Suppression de l'élément
  cart.splice(i, 1);
  break;
  }
  }
  
  // Mise à jour du panier dans le LocalStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  }

  let productsData = [];

async function displayCart() {
  // Initialisation des variables de total
  let totalQuantity = 0;
  let totalPrice = 0;
  // Récupération de la section des éléments du panier
  const cartItemsSection = document.querySelector('#cart__items');
  cartItemsSection.innerHTML = ""
  // Récupération du panier dans le LocalStorage
  const cart = JSON.parse(localStorage.getItem('cart'));

  // Vérification que le panier existe et n'est pas vide
  if (cart && cart.length > 0) {
    // Tableau contenant les informations sur les produits du panier
    let productsData = [];

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

      const deleteButtons = document.querySelectorAll('.deleteItem');
      deleteButtons.forEach(button => {
        button.addEventListener('click', function () {
          const item = this.closest('[data-id][data-color]');
          const id = item.getAttribute('data-id');
          const color = item.getAttribute('data-color');
          deleteFromCart(id, color);
        });
        button.addEventListener('click', displayCart)
      });

      //Appel de la fonction updateQuantity
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
        input.addEventListener('change', displayCart)
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

let contact;
// Récupère le formulaire
const form = document.querySelector('.cart__order__form');

// Déclaration des variables qui pourrait être utilisées dans plusieurs fonctions
let firstName, lastName, address, city, email;

// Fonction pour afficher un message d'erreur
function displayErrorMessage(message, elementId) {
  // Récupère l'élément de message d'erreur correspondant à l'élément de formulaire invalidé
  const errorElement = document.querySelector(`#${elementId}ErrorMsg`);

  // Affiche le message d'erreur
  errorElement.textContent = message;
}

// Fonction pour effacer un message d'erreur
function clearErrorMessage(elementId) {
  const errorElement = document.querySelector(`#${elementId}ErrorMsg`);
  errorElement.textContent = '';
}

// Écoute l'événement de soumission de formulaire
form.addEventListener('submit', (event) => {
  // Empêche le comportement par défaut (envoi du formulaire au serveur)
  event.preventDefault();

  // Récupère les valeurs des champs de formulaire
  firstName = form.elements.firstName.value;
  lastName = form.elements.lastName.value;
  address = form.elements.address.value;
  city = form.elements.city.value;
  email = form.elements.email.value;

  // Vérifie si le prénom est valide en utilisant une regex
  const firstNameRegex = /^[a-zA-Z]+$/
  if (!firstNameRegex.test(firstName)) {
    // Affiche un message d'erreur
    displayErrorMessage('Veuillez entrer un prénom valide', 'firstName');
    return;
  }

  // Vérifie si le nom est valide en utilisant une regex
  const lastNameRegex = /^[a-zA-Z]+$/
  if (!firstNameRegex.test(lastName)) {
    // Affiche un message d'erreur
    displayErrorMessage('Veuillez entrer un nom valide', 'lastName');
    return;
  }

  // Vérifie si l'adresse est valide en utilisant une regex
  const addressRegex = /^[0-9]+\s[a-zA-Z\sàáâãäåçèéêëìíîïðòóôõöùúûüýÿ,-]*$/
  if (!addressRegex.test(address)) {
    // Affiche un message d'erreur
    displayErrorMessage('Veuillez entrer une adresse valide', 'address');
    return;
  }

  // Vérifie si la ville est valide en utilisant une regex
  const cityRegex = /^[a-zA-Z\s']*$/
  if (!cityRegex.test(city)) {
    // Affiche un message d'erreur
    displayErrorMessage('Veuillez entrer une ville valide', 'city');
    return;
  }

  // Vérifie si l'e-mail est valide en utilisant une regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    // Affiche un message d'erreur
    displayErrorMessage('Veuillez entrer une adresse e-mail valide', 'email');
    return;
  }

  const products = productsData.map(productData => ({
    name: productData.name,
    color: productData.color,
    quantity: productData.quantity,
    price: productData.price
  }));
  
  fetch('/api/commande', {
    method: 'POST',
    body: JSON.stringify({
      contact: contact,
      products: products
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });})
  
  

// Ajoute des écouteurs d'événement change pour chaque élément de formulaire
form.elements.firstName.addEventListener('change', () => {
  clearErrorMessage('firstName');
  });
  
  form.elements.lastName.addEventListener('change', () => {
  clearErrorMessage('lastName');
  });
  
  form.elements.address.addEventListener('change', () => {
  clearErrorMessage('address');
  });
  
  form.elements.city.addEventListener('change', () => {
  clearErrorMessage('city');
  });
  
  form.elements.email.addEventListener('change', () => {
  clearErrorMessage('email');
  });
