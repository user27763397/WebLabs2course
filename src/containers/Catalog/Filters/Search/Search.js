import React from "react";
import "./Search.css";

function Search({ onSearch }) {
    return (
        <div className="search">
            <input type="text" placeholder="Search" onChange={onSearch} />
        </div>
    );
}

export default Search;