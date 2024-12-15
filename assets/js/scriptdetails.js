const api = 'https://striveschool-api.herokuapp.com/api/product/';
const myUrl = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzVhOWVmNTk3ZTI5ZjAwMTVjMmU2OWMiLCJpYXQiOjE3MzM5OTIxODEsImV4cCI6MTczNTIwMTc4MX0.QQRgxGrH9GlZ78fRXz_q6HAfzlO4n9VODTsUPrCzOKs";

const headers = {
    "Authorization": myUrl,
    "Content-Type": "application/json",
};

const detailsContainer = document.getElementById('detailsContainer');


const getProductIdFromUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('_id');
};


const loadProductDetails = async () => {
    const productId = getProductIdFromUrl();

    if (!productId) {
        detailsContainer.innerHTML = '<p class="text-danger">Nessun prodotto selezionato.</p>';
        return;
    }

    try {
        const response = await fetch(`${api}${productId}`, {
            method: "GET",
            headers,
        });

        if (!response.ok) {
            throw new Error("Errore nel recupero dei dettagli del prodotto.");
        }

        const product = await response.json();
        detailsContainer.innerHTML = "";
        const card = document.createElement('div');
        card.classList.add('card', 'h-100', 'mb-4', 'shadow-sm', 'border-white', 'mt-5');

        const row = document.createElement('div');
        row.classList.add('row', 'align-items-center', 'g-0');

        const imgCol = document.createElement('div');
        imgCol.classList.add('col-3');

        const img = document.createElement('img');
        img.src = product.imageUrl;
        img.alt = product.name;
        img.classList.add('img-fluid', 'rounded', 'ps-5', 'my-4');
        img.style.objectFit = 'cover';
        img.style.height = '150px';

        const bodyCol = document.createElement('div');
        bodyCol.classList.add('col-9');

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body', 'p-0');

        const title = document.createElement('h4');
        title.classList.add('card-title', 'text-center', 'text-primary');
        title.textContent = product.name;

        const price = document.createElement('h5');
        price.classList.add('text-success', 'fw-bold', 'mb-1', 'text-center');
        price.textContent = `${product.price.toFixed(2)} €`;

        const description = document.createElement('p');
        description.classList.add('card-text', 'text-muted');
        description.textContent = product.description;

     
        cardBody.appendChild(title);
        cardBody.appendChild(price);
        cardBody.appendChild(description);
        bodyCol.appendChild(cardBody);
        imgCol.appendChild(img);
        row.appendChild(imgCol);
        row.appendChild(bodyCol);
        card.appendChild(row);
        detailsContainer.appendChild(card);
       
    } catch (error) {
        console.error("Errore:", error);
        detailsContainer.innerHTML = '<p class="text-danger">Errore nel caricamento dei dettagli del prodotto.</p>';
    }
};

document.addEventListener("DOMContentLoaded", loadProductDetails);
