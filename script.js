document.addEventListener("DOMContentLoaded", function() {
  let products = [];

  function loadProducts() {
      const storedProducts = localStorage.getItem('products');
      if (storedProducts) {
          products = JSON.parse(storedProducts);
          initialize();
      } else {

          fetch('products.json')
              .then(response => {
                  if (!response.ok) {
                      throw new Error('Network response was not ok ' + response.statusText);
                  }
                  return response.json();
              })
              .then(data => {
                  products = data;
                  localStorage.setItem('products', JSON.stringify(products));
                  initialize();
              })
              .catch(error => {
                  document.getElementById("products-wrapper").innerHTML = "<p>Не вдалося завантажити каталог.</p>";
              });
      }
  }

  loadProducts();

  function initialize() {
      const filtersContainer = document.getElementById("filters-container");
      const productsWrapper = document.getElementById("products-wrapper");
      const searchInput = document.getElementById("search");
      const sortPriceSelect = document.getElementById("sortPrice");
      const totalPriceElement = document.getElementById("totalPrice");

      function displayProducts(filteredProducts) {
        productsWrapper.innerHTML = "";

        if (filteredProducts.length === 0) {
          productsWrapper.innerHTML = "<p>No products found.</p>";
          return;
        }

        filteredProducts.forEach(product => {
          const productElement = document.createElement("div");
          productElement.classList.add("product");

          productElement.innerHTML = `
            <img src="${product.imgUrl}" alt="${product.name}" class="product-image" />
            <h3>${product.name}</h3>
            <p>Price: $${product.price}</p>
          `;

          productsWrapper.appendChild(productElement);
        });
      }

      function calculateTotalPrice(filteredProducts) {
        const totalPrice = filteredProducts.reduce((total, product) => total + product.price, 0);
        totalPriceElement.textContent = totalPrice.toFixed(2);
      }

      function sortProducts(productsArray) {
        const sortValue = sortPriceSelect.value;
        if (sortValue === "asc") {
          return productsArray.sort((a, b) => a.price - b.price);
        } else if (sortValue === "desc") {
          return productsArray.sort((a, b) => b.price - a.price);
        }
        return productsArray;
      }

      function filterProducts() {
        const activeFilters = Array.from(filtersContainer.querySelectorAll(".check:checked")).map(
          checkbox => checkbox.id
        );
        
        const searchText = searchInput.value.trim().toLowerCase();

        let filteredProducts = products.filter(product => {
          const matchesCategory = activeFilters.length === 0 || activeFilters.includes(product.category);
          const matchesSearch = product.name.trim().toLowerCase().includes(searchText);
          return matchesCategory && matchesSearch;
        });

        filteredProducts = sortProducts(filteredProducts);

        displayProducts(filteredProducts);

        calculateTotalPrice(filteredProducts);
      }

      filtersContainer.addEventListener("change", filterProducts);
      searchInput.addEventListener("input", filterProducts);
      sortPriceSelect.addEventListener("change", filterProducts);

      displayProducts(products);
      calculateTotalPrice(products);
  }
});