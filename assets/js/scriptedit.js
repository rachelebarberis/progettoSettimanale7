const api = 'https://striveschool-api.herokuapp.com/api/product/';
const myUrl = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzVhOWVmNTk3ZTI5ZjAwMTVjMmU2OWMiLCJpYXQiOjE3MzM5OTIxODEsImV4cCI6MTczNTIwMTc4MX0.QQRgxGrH9GlZ78fRXz_q6HAfzlO4n9VODTsUPrCzOKs";
const headers = {
    "Authorization": myUrl,
    "Content-Type": "application/json",
};

const productForm = document.getElementById('productForm');
const productName = document.getElementById('productName');
const productBrand = document.getElementById('productBrand');
const productPrice = document.getElementById('productPrice');
const productImg = document.getElementById('productImg');
const productDescription = document.getElementById('productDescription');
const btnSave = document.getElementById('btnSave');

const productID = new URLSearchParams(window.location.search).get('_id');


let editingProductId = productID || null;


const createProduct = async (payload) => {
    try {
        const response = await fetch(api, {
            method: "POST",
            headers,
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            alert("Prodotto creato con successo!");
            window.location.href = "index.html"; 
        } else {
            alert("Errore durante la creazione del prodotto.");
        }
    } catch (error) {
        console.error("Errore durante la creazione del prodotto:", error);
    }
};


const updateProduct = async (productId, payload) => {
    try {
        const response = await fetch(`${api}${productId}`, {
            method: "PUT",
            headers,
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            alert("Prodotto aggiornato con successo!");
            window.location.href = "index.html"; 
        } else {
            alert("Errore durante l'aggiornamento del prodotto!");
        }
    } catch (error) {
        console.error("Errore durante l'aggiornamento del prodotto:", error);
    }
};


const deleteProduct = async (productId) => {
    try {
        const response = await fetch(`${api}${productId}`, {
            method: "DELETE",
            headers,
        });

        if (response.ok) {
            alert("Prodotto eliminato con successo!");
            window.location.href = "index.html"; 
        } else {
            alert("Errore durante l'eliminazione del prodotto.");
        }
    } catch (error) {
        console.error("Errore durante l'eliminazione del prodotto:", error);
    }
};


productForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const payload = {
        name: productName.value,
        brand: productBrand.value,
        price: parseFloat(productPrice.value),
        imageUrl: productImg.value,
        description: productDescription.value,
    };

    if (!payload.name || !payload.brand || isNaN(payload.price) || !payload.imageUrl || !payload.description) {
        alert("Compila tutti i campi correttamente!");
        return;
    }

    if (editingProductId) {
        updateProduct(editingProductId, payload);
    } else {
        createProduct(payload);
    }
});


const loadProduct = async () => {
    if (!productID) return; 
    try {
        const response = await fetch(`${api}${productID}`, {
            method: "GET",
            headers,
        });

        if (!response.ok) throw new Error("Errore durante il caricamento del prodotto");

        const product = await response.json();

     
        productName.value = product.name;
        productBrand.value = product.brand;
        productPrice.value = product.price;
        productImg.value = product.imageUrl;
        productDescription.value = product.description;


        createDeleteButton(productID);
    } catch (error) {
        console.error("Errore durante il caricamento del prodotto:", error);
    }
};


const createDeleteButton = (productId) => {
    const form = document.getElementById('productForm');
    let deleteButton = document.getElementById('btnDelete');

    if (!deleteButton) {
        deleteButton = document.createElement('button');
        deleteButton.id = 'btnDelete';
        deleteButton.textContent = 'Elimina';
        deleteButton.classList.add('btn', 'btn-danger', 'mt-3');

       
        deleteButton.addEventListener('click', () => {
            if (confirm("Sei sicuro di voler eliminare questo prodotto?")) {
                deleteProduct(productId);
            }
        });

        form.appendChild(deleteButton);
    }
};

document.addEventListener("DOMContentLoaded", loadProduct);
