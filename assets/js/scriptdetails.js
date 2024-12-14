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


        detailsContainer.innerHTML = `
        <div clas="row">
                <img src="${product.imageUrl}" class="img-fluid w-25 col-3" alt="${product.name}">
                <div class="card-body">
                    <h1 class="card-title">${product.name}</h1>
                    <h4 class="text-muted">${product.price.toFixed(2)} €</h4>
                    <p class="card-text">${product.description}</p>
                </div> `;
    } catch (error) {
        console.error("Errore:", error);
        detailsContainer.innerHTML = '<p class="text-danger">Errore nel caricamento dei dettagli del prodotto.</p>';
    }
};

document.addEventListener("DOMContentLoaded", loadProductDetails);
