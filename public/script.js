const apiUrl = '/api/products';

document.addEventListener("DOMContentLoaded", function() {
    fetchProducts();

    document.getElementById('search').addEventListener('input', searchProducts);
    document.getElementById('sortPrice').addEventListener('change', sortProducts);
    document.getElementById('filters-container').addEventListener('change', filterProducts);
    
    const createProductForm = document.getElementById('create-product-form');
    if (createProductForm) {
        createProductForm.addEventListener('submit', createOrUpdateProduct);
    }

    document.getElementById('products-wrapper').addEventListener('click', handleProductActions);

    const openCreateModalButton = document.getElementById('open-create-modal');
    if (openCreateModalButton) {
        openCreateModalButton.addEventListener('click', () => {
            openProductModal(false);
        });
    }

    const closeModalButtons = document.querySelectorAll('.close-button');
    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            closeProductModal();
        });
    });

    window.addEventListener('click', (event) => {
        const modal = document.getElementById('create-product-modal');
        if (event.target === modal) {
            closeProductModal();
        }
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeProductModal();
        }
    });

    const productPriceInput = document.getElementById('product-price');
    if (productPriceInput) {
        productPriceInput.setAttribute('min', '1');
        productPriceInput.setAttribute('step', '1');
    }
});

function openProductModal(isEdit = false) {
    const modal = document.getElementById('create-product-modal');
    const modalTitle = modal.querySelector('h2');
    const submitButton = modal.querySelector('.primary-btn');
    const form = document.getElementById('create-product-form');

    if (isEdit) {
        modalTitle.textContent = 'Edit Product';
        submitButton.textContent = 'Save';
    } else {
        modalTitle.textContent = 'Create Product';
        submitButton.textContent = 'Save';
        form.dataset.isEdit = 'false';
        delete form.dataset.editId;

        form.reset();
    }

    modal.style.display = 'block';
}

function closeProductModal() {
    const modal = document.getElementById('create-product-modal');
    modal.style.display = 'none';
}

async function fetchProducts(queryParams = '') {
    showLoading();
    try {
        const response = await fetch(`${apiUrl}${queryParams}`);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        document.getElementById("products-wrapper").innerHTML = "<p>Не вдалося завантажити каталог продуктів.</p>";
        console.error('Error fetching products:', error);
    } finally {
        hideLoading();
    }
}

function displayProducts(products) {
    const productsWrapper = document.getElementById('products-wrapper');
    productsWrapper.innerHTML = '';

    if (products.length === 0) {
        productsWrapper.innerHTML = "<p>Продуктів не знайдено.</p>";
        calculateTotalPrice(products);
        return;
    }

    products.forEach(product => {
        productsWrapper.insertAdjacentHTML('beforeend', `
            <div class="product" data-id="${product.id}">
                <img src="${product.image}" alt="${product.name}" class="product-image" />
                <h3>${product.name}</h3>
                <p>Price: $${product.price.toFixed(2)}</p>
                <div class="button-group">
                    <button class="edit_button">Edit</button>
                    <button class="delete_button">Delete</button>
                </div>
            </div>
        `);
    });

    calculateTotalPrice(products);
}

function calculateTotalPrice(products) {
    const totalPrice = products.reduce((sum, product) => sum + product.price, 0);
    document.getElementById('totalPrice').textContent = `${totalPrice.toFixed(2)}`;
}

function handleProductActions(event) {
    const target = event.target;
    if (target.classList.contains('delete_button')) {
        const productElement = target.closest('.product');
        const productId = productElement.getAttribute('data-id');
        if (confirm('Ви впевнені, що хочете видалити цей продукт?')) {
            deleteProduct(productId);
        }
    }

    if (target.classList.contains('edit_button')) {
        const productElement = target.closest('.product');
        const productId = productElement.getAttribute('data-id');
        editProduct(productId);
    }
}

async function deleteProduct(id) {
    showLoading();
    try {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to delete product');
        }
        alert('Продукт видалено успішно.');
        fetchProducts();
    } catch (error) {
        console.error('Error deleting product:', error);
        alert(`Не вдалося видалити продукт: ${error.message}`);
    } finally {
        hideLoading();
    }
}

async function editProduct(id) {
    try {
        const response = await fetch(`${apiUrl}/${id}`);
        if (!response.ok) {
            throw new Error('Не вдалося отримати деталі продукту');
        }
        const product = await response.json();

        const form = document.getElementById('create-product-form');
        form.dataset.isEdit = 'true';
        form.dataset.editId = id;
        document.getElementById('product-name').value = product.name;
        document.getElementById('product-image').value = product.image;
        document.getElementById('product-price').value = product.price;
        document.getElementById('product-category').value = product.category;

        openProductModal(true);
    } catch (error) {
        console.error('Error editing product:', error);
        alert('Не вдалося завантажити дані продукту для редагування.');
    }
}

async function createOrUpdateProduct(event) {
    event.preventDefault();

    const form = document.getElementById('create-product-form');
    const isEdit = form.dataset.isEdit === 'true';
    const id = isEdit ? form.dataset.editId : null;
    const name = document.getElementById('product-name').value.trim();
    const image = document.getElementById('product-image').value.trim();
    const price = parseFloat(document.getElementById('product-price').value);
    const category = document.getElementById('product-category').value.trim().toLowerCase();

    if (!name || !image || isNaN(price) || !category) {
        alert('Будь ласка, заповніть всі поля правильно.');
        return;
    }

    if (price < 0) {
        alert('Ціна не може бути від\'ємною.');
        return;
    }

    const productData = { name, image, price, category };

    try {
        let response;
        if (isEdit) {
            response = await fetch(`${apiUrl}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update product');
            }
            alert('Продукт оновлено успішно.');
        } else {
            response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create product');
            }
            alert('Продукт створено успішно.');
        }

        form.reset();
        closeProductModal();
        fetchProducts();
    } catch (error) {
        console.error('Error creating/updating product:', error);
        alert(`Помилка: ${error.message}`);
    }
}

function searchProducts() {
    const searchText = document.getElementById('search').value.trim().toLowerCase();
    const selectedCategories = getSelectedCategories();
    const queryParams = buildQueryParams(searchText, selectedCategories);
    fetchProducts(queryParams);
}

function sortProducts() {
    const sortValue = document.getElementById('sortPrice').value;
    const searchText = document.getElementById('search').value.trim().toLowerCase();
    const selectedCategories = getSelectedCategories();
    const queryParams = buildQueryParams(searchText, selectedCategories, sortValue);
    fetchProducts(queryParams);
}

function filterProducts() {
    const searchText = document.getElementById('search').value.trim().toLowerCase();
    const selectedCategories = getSelectedCategories();
    const sortValue = document.getElementById('sortPrice').value;
    const queryParams = buildQueryParams(searchText, selectedCategories, sortValue);
    fetchProducts(queryParams);
}

function getSelectedCategories() {
    const checkboxes = document.querySelectorAll('input[name="category"]:checked');
    const categories = Array.from(checkboxes).map(cb => cb.value.toLowerCase());
    return categories;
}

function buildQueryParams(searchText, categories, sortValue = 'none') {
    const params = new URLSearchParams();

    if (searchText) {
        params.append('search', searchText);
    }

    if (categories.length > 0) {
        categories.forEach(category => params.append('category', category));
    }

    if (sortValue && sortValue !== 'none') {
        params.append('sortBy', sortValue);
    }

    return params.toString() ? `?${params.toString()}` : '';
}

function showLoading() {
    const loadingIndicator = document.getElementById('loading-indicator');
    if (loadingIndicator) {
        loadingIndicator.style.display = 'block';
    }
}

function hideLoading() {
    const loadingIndicator = document.getElementById('loading-indicator');
    if (loadingIndicator) {
        loadingIndicator.style.display = 'none';
    }
}
