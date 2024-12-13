const api = 'https://striveschool-api.herokuapp.com/api/product/';
const myUrl = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzVhOWVmNTk3ZTI5ZjAwMTVjMmU2OWMiLCJpYXQiOjE3MzM5OTIxODEsImV4cCI6MTczNTIwMTc4MX0.QQRgxGrH9GlZ78fRXz_q6HAfzlO4n9VODTsUPrCzOKs";
const headers = {
    "Authorization" : myUrl,
    "Content-Type": "application/json",
}
const productContainer =document.getElementById('productContainer');
const productForm =document.getElementById('product-form');
const productName =document.getElementById('productName');
const productBrand = document.getElementById('productBrand');
const productPrice = document.getElementById('productPrice');
const productImg = document.getElementById('productImg');
const productDescription = document.getElementById('productDescription');
const btnSave = document.getElementById('btn-save');
const btnReset = document.getElementById('btn-reset');

let productList = [];
class product {
    constructor (_name, _description, _brand, _imageUrl, _price) {
        this.name=_name;
        this.description=_description;
        this.brand=_brand;
        this.imageUrl=_imageUrl;
        this.price=_price;
    }
};

let newProduct;




document.addEventListener('load', init());

function init() {
    readProducts();
}



async function readProducts() {
    try {
  
        const response = await fetch(api, {
            method: 'GET',
            headers: headers,
        });

        if (response.ok) {
            productForm.reset();
            alert('Prodotto aggiunto con successo!');
        } else {
            alert('Errore durante la creazione del prodotto.');
        }
    } catch (error) {
        console.error('Errore durante la creazione del prodotto:', error);
        alert('Errore durante la creazione del prodotto.');
    }
};
btnSave.addEventListener('submit', async (e) => {
    e.preventDefault(); 

    newProduct = new product (productName.value, productDescription.value, productBrand.value, productImg.value, parseInt(productPrice.value));
});






function printProduct() {
    empty.innerText = '';
    productList.forEach((product) => {
        const col = document.createElement('div');
        col.classList.add('col-sm-6 col-md-4, col-lg-4');

        const card = document.createElement('div');
        card.classList.add('card', 'mb-4', 'shadow-sm');

        const img = document.createElement('img');
        img.src = product.imgageUrl;
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

        card.appendChild(btn2);
        card.appendChild(btn1);
        cardBody.appendChild(cardDescription);
        cardBody.appendChild(title);
        card.appendChild(img);
        card.appendChild(cardBody);
        col.appendChild(card);
        productContainer.appendChild(col);
    });
}

