//Extraire l'ID
const url = new URL(window.location.href);
console.log(url)
const currentIdProduct = url.searchParams.get("id");
console.log(currentIdProduct)

//Affichage de l'objet par son id
const apiProductsUrl = 'http://localhost:3000/api/products/';
const productPage = apiProductsUrl + currentIdProduct;
console.log(productPage)

fetch(productPage)
    .then(r => r.json()
        .then((data) => {
            (console.log(data))
            let imageProduct = document.getElementsByClassName("item__img")[0]
            imageProduct.innerHTML = `<img src= "${data.imageUrl}" alt="${data.altTxt}"></img>`
            let nameProduct = document.getElementById("title")
            nameProduct.innerHTML = `<h1 id= nameProduct> ${data.name}</h1>`
            let priceProduct = document.getElementById("price")
            priceProduct.innerHTML = `<span id= priceProduct> ${data.price}</span>`
            let productDescription = document.getElementById("description")
            productDescription.innerHTML = `<p id= productDescription> ${data.description}</p>`
        }))
        /*.then(data => {
(console.log(data))
for (let product of data) {
let item = document.querySelector(".item")
item.querySelector(".item__img").innerHTML(`<img src= "${product.imageUrl}" alt="${product.altTxt}"></img>`)
let imageProduct = document.createElement("img")
imageProduct.innerHTML = `<img src= "${product[4].imageUrl}" alt="${product.altTxt}"></img>`
.item__img.appendChild(imageProduct)
.querySelector(".item").appendChild(item__img)
}
})
.catch((error) => { }))*/

