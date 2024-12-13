const api = 'https://striveschool-api.herokuapp.com/api/product/';
const myUrl = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzVhOWVmNTk3ZTI5ZjAwMTVjMmU2OWMiLCJpYXQiOjE3MzM5OTIxODEsImV4cCI6MTczNTIwMTc4MX0.QQRgxGrH9GlZ78fRXz_q6HAfzlO4n9VODTsUPrCzOKs";
const headers = {
    "Authorization": myUrl,
    "Content-Type": "application/json",
};
const productContainer = document.getElementById('productContainer');

document.addEventListener("DOMContentLoaded", () => {
    readProducts(); // Carica i prodotti esistenti all'avvio
});
const readProducts = async () => {
    try {
        const response = await fetch(api, {
            method: "GET",
            headers,
        });

        if (!response.ok) {
            throw new Error("Errore nella chiamata API");
        }
        const products = await response.json();
        productContainer.innerHTML = "";
        products.forEach((product) => {
            const col = document.createElement('div');
            col.classList.add('col-sm-6,col-md-4,col-lg-4');

            const card = document.createElement('div');
            card.classList.add('card', 'mb-4', 'shadow-sm');

            const img = document.createElement('img');
            img.src = product.imageUrl;
            img.classList.add('bd-placeholder-img', 'card-img-top');

            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');

            const title = document.createElement('h4');
            title.classList.add('card-title');
            title.innerText = product.name;

            const cardDescription = document.createElement('p');
            cardDescription.innerText = product.description;

            const btn1 = document.createElement('button');
            btn1.setAttribute('type', 'button');
            btn1.textContent = 'Modifica';
            btn1.classList.add('btn', 'btn-sm', 'btn-outline-secondary');


            const btn2 = document.createElement('button');
            btn2.setAttribute('type', 'button');
            btn2.textContent = 'Scopri di piu';
            btn2.classList.add('btn', 'btn-sm', 'btn-outline-secondary');

         
           



            productContainer.appendChild(col);
            col.appendChild(card);
            card.appendChild(img);
            card.appendChild(cardBody);
            cardBody.appendChild(title); 
            cardBody.appendChild(cardDescription); 
            card.appendChild(btn1);
            card.appendChild(btn2);
        });
    } catch (error) {
        console.error("Errore durante il recupero dei prodotti:", error);
        productContainer.innerHTML = `<p class="text-danger">Errore durante il caricamento dei prodotti. Riprova più tardi.</p>`;
    }
};

