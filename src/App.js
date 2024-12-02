import React from "react";
import Header from "./containers/Header/Header";
import Footer from "./containers/Footer/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./containers/Home/Home";
import Catalog from "./containers/Catalog/Catalog";
import ItemPage from "./containers/ItemPage/ItemPage";


function App() {
    return (
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/catalog/:index" element={<ItemPage />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    )
}

export default App; 