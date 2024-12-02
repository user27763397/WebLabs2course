document.addEventListener("DOMContentLoaded", function() {
    const editProductForm = document.getElementById("editProductForm");

    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));

    let products = [];
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
        products = JSON.parse(storedProducts);
    } else {
        alert("Product catalog is empty.");
        window.location.href = 'index.html';
        return;
    }

    const product = products.find(p => p.id === productId);
    if (!product) {
        alert("Product not found.");
        window.location.href = 'index.html';
        return;
    }

    document.getElementById("editProductName").value = product.name;
    document.getElementById("editProductCategory").value = product.category;
    document.getElementById("editProductPrice").value = product.price;
    document.getElementById("editProductImage").value = product.imgUrl;

    editProductForm.addEventListener("submit", function(event) {
        event.preventDefault(); 
        const updatedName = document.getElementById("editProductName").value.trim();
        const updatedCategory = document.getElementById("editProductCategory").value;
        const updatedPrice = parseFloat(document.getElementById("editProductPrice").value);
        const updatedImage = document.getElementById("editProductImage").value.trim();

        product.name = updatedName;
        product.category = updatedCategory;
        product.price = updatedPrice;
        product.imgUrl = updatedImage;

        localStorage.setItem('products', JSON.stringify(products));

        alert("Product successfully updated!");

        window.location.href = 'index.html';
    });
});
