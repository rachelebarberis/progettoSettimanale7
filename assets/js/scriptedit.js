const api = 'https://striveschool-api.herokuapp.com/api/product/';
const myUrl = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzVhOWVmNTk3ZTI5ZjAwMTVjMmU2OWMiLCJpYXQiOjE3MzM5OTIxODEsImV4cCI6MTczNTIwMTc4MX0.QQRgxGrH9GlZ78fRXz_q6HAfzlO4n9VODTsUPrCzOKs";
const headers = {
    "Authorization" : myUrl,
    "Content-Type": "application/json",
}
const productContainer =document.getElementById('productContainer');
const productForm =document.getElementById('productForm');
const productName =document.getElementById('productName');
const productBrand = document.getElementById('productBrand');
const productPrice = document.getElementById('productPrice');
const productImg = document.getElementById('productImg');
const productDescription = document.getElementById('productDescription');
const btnSave = document.getElementById('btnSave');
const btnReset = document.getElementById('btnReset');

const productID = new URLSearchParams(window.location.search).get('_id');

let editingProductId = null;


const createProduct = async (payload) => {
    try {
        const response = await fetch(api, {
            method: "POST",
            headers,
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            alert("Prodotto creato con successo!");

            await readProducts();

            productForm.reset();

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
            editingProductId = null;
            btnSave.textContent = "Salva";
            productForm.reset();
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
            alert("Prodotto cancellato con successo!");
        } else {
            alert("Errore durante la cancellazione del prodotto!");
        }
    } catch (error) {
        console.error("Errore durante la cancellazione del prodotto:", error);
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


btnReset.addEventListener("click", () => {
    editingProductId = null;
    btnSave.textContent = "Salva";
    productForm.reset();
});


const editProduct = (productId, product) => {
    editingProductId = productId;
    btnSave.textContent = "Aggiorna";

    productName.value = product.name;
    productBrand.value = product.brand;
    productPrice.value = product.price;
    productImg.value = product.imageUrl;
    productDescription.value = product.description;
};

const loadProducts = async () => {
    try {
        const response = await fetch(api, { headers });
        if (response.ok) {
            const products = await response.json();
            console.log(products);


            products.forEach(product => {
                console.log(`Prodotto: ${product.name}`);

               
                console.log(`Modifica: editProduct('${product._id}', ${JSON.stringify(product)})`);
                console.log(`Cancella: deleteProduct('${product._id}')`);
            });
        } else {
            alert("Errore durante il caricamento dei prodotti!");
        }
    } catch (error) {
        console.error("Errore durante il caricamento dei prodotti:", error);
    }
};


loadProducts();
