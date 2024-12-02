import React from "react";
import "./Header.css";
import logo from "../../components/image/logo.png";
import Navigation from "../Navigation/Navigation";


function Header() {
    return (
        <header className="header">    
            <img className="logo" src={logo} />
            <Navigation />
        </header>
    )
}

export default Header;