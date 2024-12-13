const api_url = 'https://striveschool-api.herokuapp.com/api/product/';
const myUrl = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzVhOWVmNTk3ZTI5ZjAwMTVjMmU2OWMiLCJpYXQiOjE3MzM5OTIxODEsImV4cCI6MTczNTIwMTc4MX0.QQRgxGrH9GlZ78fRXz_q6HAfzlO4n9VODTsUPrCzOKs";
const headers = {
    "Authorization" : myUrl,
    "Content-Type": "application/json",
}
const productContainer =document.getElementById('productContainer');
const myForm =document.getElementById('product-form');
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
    btnSave.setAttribute('disabled', 'true');
    readProducts();
}



async function readProducts() {
    try{
        let read=await fetch(api_url);
        let response=await read.json();
        productList=response;
        if (productList.length>0) {
            printProduct();
        } else {
            empty.innerText= 'Nessun prodotto presente';
            return;
        }
    } catch (error) {
        console.log('Errore nel recupero dei dati: ', error);
        empty.innerText = `Errore nel recupero dei dati: ${error}`;
    }
};


const printProduct= () => {
    empty.innerText='';
    productList.forEach((product)=> {
        const col =document.createElement('div');
        col.classList.add('col-sm-6 col-md-4, col-lg-4');

        const card=document.createElement('div');
        card.classList.add('card', 'mb-4', 'shadow-sm');

        const img=document.createElement('img');
        img.src = product.imgageUrl;
        img.classList.add('bd-placeholder-img', 'card-img-top');

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const title =document.createElement('h4');
        title.classList.add('card-title');
        title.innerText= product.name;

        const cardDescription = document.createElement('p');
        cardDescription.innerText= product.description;

        const btn1= document.createElement('button');
        btn1.setAttribute('type', 'button');
        btn1.textContent = 'Modifica';
        btn1.classList.add('btn', 'btn-sm', 'btn-outline-secondary');


        const btn2= document.createElement('button');
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
    })
};

