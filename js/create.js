document.addEventListener("DOMContentLoaded", function() {
  const productForm = document.getElementById("productForm");

  productForm.addEventListener("submit", function(event) {
      event.preventDefault(); 

      const name = document.getElementById("productName").value.trim();
      const category = document.getElementById("productCategory").value;
      const price = parseFloat(document.getElementById("productPrice").value);
      const image = document.getElementById("productImage").value.trim();

      let products = [];
      const storedProducts = localStorage.getItem('products');
      if (storedProducts) {
          products = JSON.parse(storedProducts);
      }

      const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;

      const newProduct = {
          id: newId,
          name: name,
          category: category,
          price: price,
          imgUrl: image
      };

      products.push(newProduct);

      localStorage.setItem('products', JSON.stringify(products));

      alert("Product successfully added to the catalog!");

      productForm.reset();
  });
});
