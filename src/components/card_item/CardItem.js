import React from "react";
import './CardItem.css';
import { Link, useLocation } from 'react-router-dom';

function CardItem({ title='No title.', text, imageSrc, price, index }) {
    const location = useLocation();


    return(
        <div className="cards_content">
            <img src={imageSrc} alt={title} className="cards__photo"/>
            <article>
                <h3 className="cards_title">{title}</h3>
                <p className="cards_desc">{text}</p>
                {location.pathname === '/catalog' && (
                    <div className="cards_price">
                        <p className="cards_price-price">Price:</p>
                        <p>{price} $</p>
                    </div> 
                )}
            </article>
            {location.pathname === '/catalog' && (
                <div className="cards__button-container">
                    <Link to={`/catalog/${index}`}>
                        <button className="cards__button">View More</button>
                    </Link>
                </div>
            )}
        </div>
    )
}

export default CardItem;
