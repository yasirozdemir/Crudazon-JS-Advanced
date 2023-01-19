// token => eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5MzgxYWU3MzczODAwMTUzNzQzN2MiLCJpYXQiOjE2NzQxMzE0ODMsImV4cCI6MTY3NTM0MTA4M30.qBNNuqKudZ5WdbpCUHda7Hc58f7sqfu0OI6VOQIba5A

const url = "https://striveschool-api.herokuapp.com/api/product/";

const parameters = new URLSearchParams(location.search);
const ID = parameters.get("id");

// if ID = null -> you're in the back office
// if ID has a value -> you're in the product details (editing)

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
    .map(({ name, brand, _id, imageUrl }) => {
      return `<tr>
                <td class="w-25"><img src="${imageUrl}" style="object-fit: contain; width:45px; height: 45px"></td>
                <td class="w-25">${name}</td>
                <td class="w-25">${brand}</td>
                <td class="w-25"><div class="btn-group mx-auto">
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
