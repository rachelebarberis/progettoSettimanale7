const api = 'https://striveschool-api.herokuapp.com/api/product/';
const myUrl = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzVhOWVmNTk3ZTI5ZjAwMTVjMmU2OWMiLCJpYXQiOjE3MzM5OTIxODEsImV4cCI6MTczNTIwMTc4MX0.QQRgxGrH9GlZ78fRXz_q6HAfzlO4n9VODTsUPrCzOKs";
const headers = {
    "Authorization": myUrl,
    "Content-Type": "application/json",
};
const productContainer = document.getElementById('productContainer');

document.addEventListener("DOMContentLoaded", () => {
    readProducts();
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
            col.classList.add('col-sm-4', 'col-md-3', 'mb-4');
        
            // Card
            const card = document.createElement('div');
            card.classList.add('card', 'h-100', 'shadow-sm', 'border-0', 'rounded');
        
            // Immagine
            const img = document.createElement('img');
            img.src = product.imageUrl;
            img.classList.add('card-img-top', 'p-3', 'rounded-top', 'mx-auto', 'd-block');
            img.style.objectFit = 'cover';
            img.style.height = '150px';
            img.style.width = 'auto';
        
            // Corpo della Card
            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body', 'd-flex', 'flex-column', 'justify-content-between');
        
            // Titolo
            const title = document.createElement('h5');
            title.classList.add('card-title', 'text-center', 'text-primary', 'fw-bold');
            title.innerText = product.name;
        
            // Descrizione
            const cardDescription = document.createElement('p');
            cardDescription.classList.add('card-text', 'text-muted');
            cardDescription.innerText = product.description;
        
            // Prezzo
            const price = document.createElement('p');
            price.classList.add('text-success', 'fw-bold', 'mb-1', 'text-center');
            price.innerText = `${product.price.toFixed(2)} €`;
        
            // Pulsanti
            const btn1 = document.createElement('a');
            btn1.setAttribute('href', `edit.html?_id=${product._id}`);
            btn1.textContent = 'Modifica';
            btn1.classList.add('btn', 'btn-primary', 'mx-5', 'btn-sm');
        
            const btn2 = document.createElement('button');
            btn2.setAttribute('type', 'button');
            btn2.textContent = 'Scopri di più';
            btn2.classList.add('btn', 'btn-secondary', 'mx-5', 'btn-sm', 'mt-2');
            btn2.addEventListener('click', () => {
                window.location.href = `details.html?_id=${product._id}`;
            });
        
           






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

