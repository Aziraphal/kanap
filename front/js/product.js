//Extraire l'ID
const url = new URL(window.location.href);
console.log(url)
const currentIdProduct = url.searchParams.get("id");
console.log(currentIdProduct)


