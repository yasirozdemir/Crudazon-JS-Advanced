const url = "https://striveschool-api.herokuapp.com/api/product/";

window.onload = async () => {
  await getProducts();
};

let allProducts = [];

const getProducts = async () => {
  try {
    const response = await fetch(url, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5MzgxYWU3MzczODAwMTUzNzQzN2MiLCJpYXQiOjE2NzQxMzE0ODMsImV4cCI6MTY3NTM0MTA4M30.qBNNuqKudZ5WdbpCUHda7Hc58f7sqfu0OI6VOQIba5A",
      },
    });
    const productsData = await response.json();
    displayProducts(productsData);
    allProducts.forEach((product) => {
      allProducts.push(product);
    });
  } catch (error) {
    console.error(error);
  }
};

const productsContainer = document.querySelector("#productsContainer > .row");
const displayProducts = (productsArray) => {
  productsArray.innerHTML = "";
  const productsHTML = productsArray
    // name, description, brand, imageUrl, price
    .map(({ name, description, brand, imageUrl, price, _id }) => {
      return `<div class="product-card d-flex col-3 card mb-4 shadow-sm">
                <div class="m-1"><img class="card-img-top w-100" src="${imageUrl}" alt="product image" /></div>
                <div class="card-body p-2">
                <div class="d-flex flex-column justify-content-between align-items-center">
                    <strong class="card-title text-center">${name}</strong>
                    <p class="text-info">${brand}</p>
                    <p class="text-secondary">${description}</p>
                    <p class="text-info">${price === 0 ? "" : `$${price}`}</p>
                </div>
            </div>
        </div>`;
    })
    .join("");
  productsContainer.innerHTML = productsHTML;
};
