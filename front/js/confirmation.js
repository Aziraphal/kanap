// Récupération du numéro de commande dans l'URL pour affichage
let params = new URLSearchParams(window.location.search);
const orderId = params.get("id");
document.getElementById("orderId").innerHTML += `${orderId}`;