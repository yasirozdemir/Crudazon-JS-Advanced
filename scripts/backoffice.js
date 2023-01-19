// token => eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5MzgxYWU3MzczODAwMTUzNzQzN2MiLCJpYXQiOjE2NzQxMzE0ODMsImV4cCI6MTY3NTM0MTA4M30.qBNNuqKudZ5WdbpCUHda7Hc58f7sqfu0OI6VOQIba5A

// PRODUCT MODEL
//{
//   "_id": "5d318e1a8541744830bef139", //SERVER GENERATED
//   "name": "app test 1",  //REQUIRED
//   "description": "something longer", //REQUIRED
//   "brand": "nokia", //REQUIRED
//   "imageUrl": "https://drop.ndtv.com/TECH/product_database/images/2152017124957PM_635_nokia_3310.jpeg?downsize=*:420&output-quality=80", //REQUIRED
//   "price": 100, //REQUIRED
//   "userId": "admin", //SERVER GENERATED
//   "createdAt": "2019-07-19T09:32:10.535Z", //SERVER GENERATED
//   "updatedAt": "2019-07-19T09:32:10.535Z", //SERVER GENERATED
//   "__v": 0 //SERVER GENERATED
// }

// Card Example
/* <div class="d-flex card mb-4 shadow-sm">
  <img class="card-img-top w-100" src="" alt="product image" />
  <div class="card-body p-2">
    <div class="d-flex flex-column justify-content-between align-items-center">
      <strong class="card-title text-center">Product Name</strong>
      <p class="text-info">Brand</p>
      <p class="text-secondary">Description</p>
      <p class="text-info">Price</p>
      <div class="btn-group mx-auto">
        <button type="button" class="btn btn-sm btn-outline-secondary">
          Edit Product
        </button>
        <button type="button" class="btn btn-sm btn-outline-secondary">
          Delete Listing
        </button>
      </div>
    </div>
  </div>
</div> */

const url = "https://striveschool-api.herokuapp.com/api/product/";

const parameters = new URLSearchParams(location.search);
const ID = parameters.get("id");

// if ID = null -> you're in the back office
// if ID has a value -> you're in the product details

window.onload = async () => {
  try {
    if (ID !== null) {
      // editing a product
      const publishingButton = document.querySelector("#publishButton");
      publishingButton.remove();
      const productsTable = document.querySelector("#publishedProducts table");
      productsTable.remove();

      let response = await fetch(`${url}/${ID}`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5MzgxYWU3MzczODAwMTUzNzQzN2MiLCJpYXQiOjE2NzQxMzE0ODMsImV4cCI6MTY3NTM0MTA4M30.qBNNuqKudZ5WdbpCUHda7Hc58f7sqfu0OI6VOQIba5A",
        },
      });

      if (response.ok) {
        let { name, description, brand, imageUrl, price } =
          await response.json();
        document.querySelector("#productName").value = name;
        document.querySelector("#productDescription").value = description;
        document.querySelector("#productBrand").value = brand;
        document.querySelector("#productImageURL").value = imageUrl;
        document.querySelector("#productPrice").value = price;
      } else {
        console.error(response);
      }
    } else {
      // publishing a product
      getProducts();
      const editingButton = document.querySelector("#editButton");
      editingButton.remove();
    }
  } catch (error) {
    // todo handle error
    console.error(error);
  }
};

const publish = async (publishEvent) => {
  try {
    publishEvent.preventDefault();
    const newProduct = {
      name: document.querySelector("#productName").value,
      description: document.querySelector("#productDescription").value,
      brand: document.querySelector("#productBrand").value,
      imageUrl: document.querySelector("#productImageURL").value,
      price: document.querySelector("#productPrice").value,
    };

    const optionsForPublishing = {
      method: "POST",
      body: JSON.stringify(newProduct),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5MzgxYWU3MzczODAwMTUzNzQzN2MiLCJpYXQiOjE2NzQxMzE0ODMsImV4cCI6MTY3NTM0MTA4M30.qBNNuqKudZ5WdbpCUHda7Hc58f7sqfu0OI6VOQIba5A",
      }),
    };

    const response = await fetch(url, optionsForPublishing);
    if (response.ok) {
      console.log("Publishing successful");
      document.querySelector("#productName").value = "";
      document.querySelector("#productDescription").value = "";
      document.querySelector("#productBrand").value = "";
      document.querySelector("#productImageURL").value = "";
      document.querySelector("#productPrice").value = "";
      getProducts();
    } else {
      console.error("Publishing error");
    }
  } catch (error) {
    console.error(error);
  }
};

const edit = async (editEvent) => {
  try {
    editEvent.preventDefault();
    const editedProduct = {
      name: document.querySelector("#productName").value,
      description: document.querySelector("#productDescription").value,
      brand: document.querySelector("#productBrand").value,
      imageUrl: document.querySelector("#productImageURL").value,
      price: document.querySelector("#productPrice").value,
    };

    const optionsForEditing = {
      method: "PUT",
      body: JSON.stringify(editedProduct),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5MzgxYWU3MzczODAwMTUzNzQzN2MiLCJpYXQiOjE2NzQxMzE0ODMsImV4cCI6MTY3NTM0MTA4M30.qBNNuqKudZ5WdbpCUHda7Hc58f7sqfu0OI6VOQIba5A",
      }),
    };

    const response = await fetch(`${url}/${ID}`, optionsForEditing);

    if (response.ok) {
      console.log("Editing Successful");
    } else {
      console.error("Editing error");
    }
  } catch (error) {
    console.error(error);
  }
};

const getProducts = async () => {
  try {
    const response = await fetch(url, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5MzgxYWU3MzczODAwMTUzNzQzN2MiLCJpYXQiOjE2NzQxMzE0ODMsImV4cCI6MTY3NTM0MTA4M30.qBNNuqKudZ5WdbpCUHda7Hc58f7sqfu0OI6VOQIba5A",
      },
    });
    const productsData = await response.json();
    displayProductsToAdmin(productsData);
  } catch (error) {
    console.error(error);
  }
};

const publishedProductsContainer = document.querySelector(
  "#publishedProducts tbody"
);
const displayProductsToAdmin = (productsArray) => {
  productsArray.innerHTML = "";
  const productsHTML = productsArray
    // name, description, brand, imageUrl, price
    .map(({ name, brand, price, _id }) => {
      return `<tr>
                <td>${name}</td>
                <td>${brand}</td>
                <td>${price}</td>
                <td><div class="btn-group mx-auto">
                    <a
                      href='./backoffice.html?id=${_id}'
                      type="button"
                      class="btn btn-sm btn-outline-secondary"
                    >
                      Edit Product
                    </a>
                    <button
                      type="button"
                      class="btn btn-sm btn-outline-secondary" onclick="deleteProduct('${_id}')"
                    >
                      Delete Listing
                    </button>
                  </div></td>
                <td class="d-none">${_id}</td>
              </tr>`;
    })
    .join("");
  publishedProductsContainer.innerHTML = productsHTML;
};

const deleteProduct = async (productToDeleteID) => {
  try {
    const response = fetch(`${url}/${productToDeleteID}`, {
      method: "DELETE",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5MzgxYWU3MzczODAwMTUzNzQzN2MiLCJpYXQiOjE2NzQxMzE0ODMsImV4cCI6MTY3NTM0MTA4M30.qBNNuqKudZ5WdbpCUHda7Hc58f7sqfu0OI6VOQIba5A",
      },
    });
    if (response.ok) {
      await getProducts();
    }
  } catch (error) {
    console.error(error);
  }
};
