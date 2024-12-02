import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import cardsData from '../../api/Cards.json';
import DocumentTitle from '../../components/helmet/document_title';
import './ItemPage.css';

function ItemPage() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    DocumentTitle("Catalog");

    const { index } = useParams();
    const card = cardsData[index];

    if (!card) {
        return <div>Card not found</div>;
    }

    const imageSrc = require(`../../${card.imgpath}`);

    

    return (
        <div className='itempage__main'>
            <div className='main__info'>
                <img src={imageSrc} alt={card.title} />
                <article>
                    <h1>{card.title}</h1>
                    <p>{card.text}</p>
                </article>
            </div>
            <div className='main__price-buttons'>
                <div className="main__price">
                        <p className="main__price-price">Price:</p>
                        <p>{card.price} $</p>
                    </div> 
                <div className='buttons'>
                    <Link to='/catalog'> 
                        <button className='buttons_go_back'>Go back</button>
                    </Link>
                    <button className='butons_add_to_cart'>Add to cart</button>
                </div>
            </div>
        </div>
    );
}

export default ItemPage;