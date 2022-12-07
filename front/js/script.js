
fetch(`http://localhost:3000/api/products`)                 //1. Récupérer les produits
    .then(r => r.json()
        .then(data => {
            for (let product of data) {
                let a = document.createElement("a")         //2. Construire HTML
                a.href = `./product.html?id=${product._id}`

                let article = document.createElement("article")
                article.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}"></img>
                                    <h3 class="productName">${product.name}</h3>
                                    <p class="productDescription">${product.description}</p>`
            
                a.appendChild(article)                     //3. Injecter dans le DOM
                document.querySelector("#items").appendChild(a)
            }
        
           // document.querySelector("#items").insertAdjacentHTML('beforeend', display)
            /*for (let article of data) {
                display += `
                    <a href="./product.html?id=${article._id}">
                        <article>
                            <img src="${article.imageUrl}" alt="${article.altTxt}"></img>
                            <h3 class="productName">${article.name}</h3>
                            <p class="productDescription">${article.description}</p>
                        </article>
                    </a>
                    `
            }
            console.log(display)
            document.querySelector("#items").insertAdjacentHTML('beforeend', display)*/
        })
        .catch(er => console.log(er)))


