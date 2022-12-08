//Récupérer chaine de requête dans l'url
//let product_url_id = window.location.search;
//console.log(product_url_id);

//extraine l'ID
/*let urlSearch = new URLSearchParams(product_url_id);
let idProduct = URLSearchParams.get(idProduct);
console.log(id);*/

/*const url = new URL(window.location.href);
const currentIdProduct = url.searchParams.get("id");
console.log("id") */

var str = "http://127.0.0.1:5502/front/html/index.html";
var url = new URL(str);
var id = url.searchParams.get("id");
console.log("id");