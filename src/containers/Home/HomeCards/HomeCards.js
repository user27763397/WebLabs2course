import React, { useState } from 'react';
import CardItem from '../../../components/card_item/CardItem';
import cardsData from '../../../api/Cards.json';
import './HomeCards.css';

function HomeCards() {
    const [visibleCards, setVisibleCards] = useState(3);

    const showMoreCards = () => {
        setVisibleCards(visibleCards + 6);
    };

    const hideCards = () => {
        setVisibleCards(3);
    };

    return (
        <div>
            <div className='home__cards'>
                {cardsData.slice(0, visibleCards).map((card, index) => {
                    const imageSrc = require(`../../../${card.imgpath}`);
                    return (
                        <CardItem 
                            key={index} 
                            {...card} 
                            index={index} 
                            imageSrc={imageSrc} 
                        />
                    );
                })}
            </div>
            <div className='home__cards-button'>   
                {visibleCards < cardsData.length && (
                    <button onClick={showMoreCards}>Show More</button>
                )}
                {visibleCards > 3 && (
                    <button onClick={hideCards}>Hide</button>
                )}
            </div>
        </div> 
    );
}

export default HomeCards;