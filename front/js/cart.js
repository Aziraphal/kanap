function displayCart() {
    // Récupération du panier dans le LocalStorage
    const cart = JSON.parse(localStorage.getItem('cart'));

    // Récupération de la section des éléments du panier
    const cartItemsSection = document.querySelector('#cart__items');

    // Vérification que le panier existe et n'est pas vide
    if (cart && cart.length > 0) {
        // Parcours du tableau de produits
        for (const data of cart) {
            // Création de l'élément article pour chaque produit
            const article = document.createElement('article');
            article.classList.add('cart__item');
            article.setAttribute('data-id', data.id);
            article.setAttribute('data-color', data.color);
            article.innerHTML = `
          <div class="cart__item__img">
            <img src="${data.imageUrl}" alt="${data.altTxt}">
          </div>
          <div class="cart__item__content">
            <div class="cart__item__content__description">
              <h2>${data.name}</h2>
              <p>${data.color}</p>
              <p>${data.price} €</p>
            </div>
            <div class="cart__item__content__settings">
              <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${data.quantity}">
              </div>
              <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
              </div>
            </div>
          </div>
        `;

            // Ajout de l'élément au panier
            cartItemsSection.appendChild(article);
        }
    } else {
        // Affichage d'un message si le panier est vide
        const messageElement = document.createElement('p');
        messageElement.textContent = 'Le panier est vide';
        cartItemsSection.appendChild(messageElement);
    }
}

// Appel de la fonction d'affichage du panier
displayCart();
