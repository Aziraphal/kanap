//Extraire l'ID
const url = new URL(window.location.href);
console.log(url)
const currentIdProduct = url.searchParams.get("id");
console.log(currentIdProduct)

//Affichage de l'objet par son id
const apiProductsUrl = 'http://localhost:3000/api/products/';
const productPage = apiProductsUrl + currentIdProduct;

fetch(productPage)
        .then(r => r.json()
        .catch((error) => {}))




