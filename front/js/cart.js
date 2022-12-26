async function displayCart() {
    // Récupération de la section des éléments du panier
    const cartItemsSection = document.querySelector('#cart__items');

    // Récupération du panier dans le LocalStorage
    const cart = JSON.parse(localStorage.getItem('cart'));
    console.log(cart)

    // Initialisation des variables de total
    let totalQuantity = 0;
    let totalPrice = 0;

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

            totalQuantity += itemQuantity;
            totalPrice += itemQuantity * productData.price;
        }

        // Mise à jour des éléments totalQuantity et totalPrice dans le HTML
        document.querySelector('#totalQuantity').textContent = totalQuantity;
        document.querySelector('#totalPrice').textContent = totalPrice.toFixed(2);

    } else {
        // Affichage d'un message si le panier est vide
        const messageElement = document.createElement('p');
        messageElement.textContent = 'Le panier est vide';
        cartItemsSection.appendChild(messageElement);
    }
}

// Appel de la fonction d'affichage du panier
displayCart();





