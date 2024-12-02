const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const DATA_FILE = path.join(__dirname, 'products.json');

const getProducts = () => {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Помилка читання файлу products.json:', error);
        return [];
    }
};

const saveProducts = (products) => {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(products, null, 2));
    } catch (error) {
        console.error('Помилка запису у файл products.json:', error);
    }
};

app.get('/api/products', (req, res) => {
    const { search, sortBy } = req.query;
    let categories = req.query.category;

    let products = getProducts();

    if (categories) {
        if (!Array.isArray(categories)) {
            categories = [categories];
        }
        products = products.filter(product => categories.includes(product.category));
    }

    if (search) {
        const query = search.toLowerCase();
        products = products.filter(product => 
            product.name.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query)
        );
    }

    if (sortBy) {
        switch (sortBy) {
            case 'price-asc':
                products.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                products.sort((a, b) => b.price - a.price);
                break;
            case 'name-asc':
                products.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-desc':
                products.sort((a, b) => b.name.localeCompare(a.name));
                break;
            default:
                break;
        }
    }

    res.json(products);
});

app.get('/api/products/:id', (req, res) => {
    const products = getProducts();
    const productId = parseInt(req.params.id, 10);
    const product = products.find(p => p.id === productId);

    if (!product) {
        return res.status(404).json({ message: 'Продукт не знайдений.' });
    }

    res.json(product);
});

app.post('/api/products', (req, res) => {
    const products = getProducts();
    const newProduct = req.body;

    if (!newProduct.name || !newProduct.category || !newProduct.price) {
        return res.status(400).json({ message: 'Всі поля є обов\'язковими.' });
    }

    if (!newProduct.id) {
        newProduct.id = products.length > 0 ? products[products.length - 1].id + 1 : 1;
    } else {
        const existingProduct = products.find(p => p.id === newProduct.id);
        if (existingProduct) {
            return res.status(400).json({ message: 'Продукт з таким ID вже існує.' });
        }
    }

    products.push(newProduct);
    saveProducts(products);
    res.status(201).json(newProduct);
});

app.put('/api/products/:id', (req, res) => {
    const products = getProducts();
    const productId = parseInt(req.params.id, 10);
    const updatedProduct = req.body;

    const index = products.findIndex(product => product.id === productId);
    if (index === -1) {
        return res.status(404).json({ message: 'Продукт не знайдений.' });
    }

    products[index] = { ...products[index], ...updatedProduct };
    saveProducts(products);
    res.json(products[index]);
});

app.delete('/api/products/:id', (req, res) => {
    const products = getProducts();
    const productId = parseInt(req.params.id, 10);

    const index = products.findIndex(product => product.id === productId);
    if (index === -1) {
        return res.status(404).json({ message: 'Продукт не знайдений.' });
    }

    products.splice(index, 1);
    saveProducts(products);
    res.status(200).json({ message: 'Продукт видалено успішно.' });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Сервер запущено на http://localhost:${PORT}`);
});
