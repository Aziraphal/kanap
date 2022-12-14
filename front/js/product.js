//Extraire l'ID
const url = new URL(window.location.href);
console.log(url)
const currentIdProduct = url.searchParams.get("id");
console.log(currentIdProduct)

//Affichage de l'objet par son id
const apiProductsUrl = 'http://localhost:3000/api/products/';
const productPage = apiProductsUrl + currentIdProduct;
console.log(productPage)

//Ajout des détails du produit
fetch(productPage)
    .then(r => r.json()
        .then((data) => {
            (console.log(data))

            //photo du produit
            let imageProduct = document.getElementsByClassName("item__img")[0]
            imageProduct.innerHTML = `<img src= "${data.imageUrl}" alt="${data.altTxt}"></img>`

            //nom du produit
            let nameProduct = document.getElementById("title")
            nameProduct.innerHTML = `<h1= nameProduct> ${data.name}</h1>`

            //prix du produit
            let priceProduct = document.getElementById("price")
            priceProduct.innerHTML = `<span= priceProduct> ${data.price}</span>`

            //description du produit
            let productDescription = document.getElementById("description")
            productDescription.innerHTML = `<p= productDescription> ${data.description}</p>`

            //couleur du produit en utilisant une boucle permettant le choix aux utilisateurs
            for (let colors of data.colors) {
                console.log(colors);
                let productColors = document.createElement("option");
                document.querySelector("#colors").appendChild(productColors);
                productColors.value = colors;
                productColors.innerHTML = colors;
            }
        }))
    .catch((error) => { })

//Ajout du produit dans le panier
//Initialisation du local storage
//let localStorageProduct = localStorage.getItem(canape)
//faire des fonctions
//find
//map
/*function addToCart(ajout){}
let quantiteCanape = document.getElementById("quantity")
let canape = ["id", "quantite", "couleur"]
console.log(canape)
let ajoutPanier = document.getElementById("addToCart")
ajoutPanier.addEventListener("click", (fonction clic) => {
    if (colors === null) {
        alert("Veuillez sélectionner une couleur");
    } else if (canapeQuantite === null) {
        alert("Veuillez sélectionner un nombre de canapé")
    } else {
        let canape = ["id", "colors", "quantité"]
        console.log(canape)
    }
    localStorage.setItem("produit", JSON.stringify(canape));
})*/



