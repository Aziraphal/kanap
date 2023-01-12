//Crée une instance de l'objet URL en utilisant l'URL actuelle de la fenêtre du navigateur (window.location.href).
const url = new URL(window.location.href);
//console.log(url)

//Extrait l'ID de l'URL en utilisant la méthode searchParams.get() et en passant "id" en paramètre.
const currentIdProduct = url.searchParams.get("id");
//console.log(currentIdProduct)

//Crée une nouvelle URL en concaténant l'URL de base de l'API "apiProductsUrl" avec l'ID extrait "currentIdProduct".
const apiProductsUrl = 'http://localhost:3000/api/products/';
const productPage = apiProductsUrl + currentIdProduct;
//console.log(productPage)


//Affichage du produit sur la page
fetch(productPage)
  .then(r => r.json())
  .then((data) => {
    //console.log(data);

    //photo du produit
    let imageProduct = document.getElementsByClassName("item__img")[0];
    imageProduct.innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}"></img>`;

    //nom du produit
    let nameProduct = document.getElementById("title");
    nameProduct.innerHTML = `<h1 id="nameProduct">${data.name}</h1>`;

    //prix du produit
    let priceProduct = document.getElementById("price");
    priceProduct.innerHTML = `<span id="priceProduct">${data.price}</span>`;

    //description du produit
    let productDescription = document.getElementById("description");
    productDescription.innerHTML = `<p id="productDescription">${data.description}</p>`;

    //couleur du produit en utilisant une boucle permettant le choix aux utilisateurs
    for (let colors of data.colors) {
      console.log(colors);
      let productColors = document.createElement("option");
      document.querySelector("#colors").appendChild(productColors);
      productColors.value = colors;
      productColors.innerHTML = colors;
    }
  })
  .catch((error) => { });


// Fonction ajout du produit dans le panier (appelé lors du click)
function addToCart() {
  // Récupération des données du produit
  const currentIdProduct = url.searchParams.get("id");
  const currentColor = document.getElementById('colors').value;
  const currentQuantity = document.getElementById('quantity').value;

  // Création de l'objet représentant le produit
  const product = {
    id: currentIdProduct,
    color: currentColor,
    quantity: currentQuantity,
  };

  // Récupération du panier actuel dans le LocalStorage
  let cart = localStorage.getItem('cart');
  if (cart === null) {
    // Initialisation du panier s'il n'existe pas encore
    cart = [];
  } else {
    cart = JSON.parse(cart);
  }

  // Vérifie s'il y a déjà un produit de la même couleur dans le panier
  let existingProduct = null;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === currentIdProduct && cart[i].color === currentColor) {
      existingProduct = cart[i];
      break;
    }
  }

  // Si le produit existe déjà, augmente sa quantité
  if (existingProduct) {
    existingProduct.quantity = parseInt(existingProduct.quantity) + parseInt(currentQuantity);
  } else {
    // Sinon, ajoute le nouveau produit au panier
    cart.push(product);
  }

  // Enregistrement du panier mis à jour dans le LocalStorage
  localStorage.setItem('cart', JSON.stringify(cart));
}


// Récupération du bouton d'ajout au panier
const addToCartButton = document.getElementById('addToCart');

// Ajout d'un écouteur d'événement de clic sur le bouton
addToCartButton.addEventListener('click', addToCart)