import React, { useState } from "react";
import CatalogCards from "./CatalogCards/CatalogCards";
import DocumentTitle from "../../components/helmet/document_title";

function Catalog() {
    DocumentTitle("Catalog");
    return (
        <div>
            <CatalogCards/>
        </div>
    );
}

export default Catalog;